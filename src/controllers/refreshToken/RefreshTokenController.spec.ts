import request from "supertest"

import { generateRefreshToken } from "../../providers/token/refreshTokenProvider"
import { app } from "../../app"

import { pool } from "@config/database/pool"

describe("Generate new access token", () => {
  let refreshToken: string

  beforeAll(async () => {
    refreshToken = generateRefreshToken({ id: "213", role: "admin" })

    await pool.query(
      "INSERT INTO users (id_user, username, password, role, jid) VALUES ($1, $2, $3, $4, $5) RETURNING id_user;",
      ["213", "Joao", "strongpassword", "admin", refreshToken]
    )
  })

  afterAll(async () => {
    await pool.query("TRUNCATE users RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err)
      }

      await pool.end()
    })
  })

  it("Should be able to generate a new valid access token", async () => {
    const response = await request(app)
      .get("/token")
      .set(
        "Cookie",
        `JID=${refreshToken}; Expires=Thu, 27 Jan 2022 18:38:31 GMT; Max-Age=2592000; Path=/; HttpOnly; Domain=localhost`
      )

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty("accessToken")
    expect(response.header).toHaveProperty("set-cookie")
    expect(
      response.header["set-cookie"][0].startsWith("access-token")
    ).toBeTruthy()
  })

  it("Should not be able to generate new access token without jid cookie", async () => {
    const response = await request(app).get("/token")

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual("Missing token.")
  })

  it.only("Should not be able to generate new access token with different jid", async () => {
    const differentJID = generateRefreshToken({ id: "213", role: "employee" })

    const response = await request(app)
      .get("/token")
      .set(
        "Cookie",
        `JID=${differentJID}; Expires=Thu, 27 Jan 2022 18:38:31 GMT; Max-Age=2592000; Path=/; HttpOnly; Domain=localhost`
      )

    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual("Wrong refresh token.")
  })
})
