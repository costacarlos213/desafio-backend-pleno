import request from "supertest"
import dayjs from "dayjs"

import { pool } from "@config/database/pool"
import { app } from "../../app"
import { sign } from "jsonwebtoken"

describe("Create Movie Controller", () => {
  let bearer: string

  beforeAll(() => {
    bearer = `Bearer ${sign(
      { sub: "312785567", role: "admin" },
      process.env.JWT_AUTH_SECRET,
      {
        expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
      }
    )}`
  })

  afterAll(async () => {
    await pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err)
      }

      await pool.end()
    })
  })

  it("Should be able to create new movie", async () => {
    const response = await request(app)
      .post("/movie")
      .field("name", "Kung fu panda")
      .field("kind", "Cartoon")
      .attach(
        "image",
        "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg"
      )
      .set("Authorization", bearer)
      .set("Content-Type", "multipart/form-data")

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
  })

  it("Should be able to create new movie with all params", async () => {
    const response = await request(app)
      .post("/movie")
      .field("name", "Kung fu panda")
      .field("kind", "Cartoon")
      .field("release", dayjs().toISOString())
      .field("stopsPlaying", dayjs().add(1, "month").toISOString())
      .attach(
        "image",
        "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg"
      )
      .set("Authorization", bearer)
      .set("Content-Type", "multipart/form-data")

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
  })

  it("Should not be able to create movie without name", async () => {
    const response = await request(app)
      .post("/movie")
      .field("kind", "Cartoon")
      .attach(
        "image",
        "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg"
      )
      .set("Authorization", bearer)
      .set("Content-Type", "multipart/form-data")

    expect(response.status).toBe(400)
  })

  it("Should not be able to create movie without kind", async () => {
    const response = await request(app)
      .post("/movie")
      .field("name", "Kung fu panda")
      .attach(
        "image",
        "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg"
      )
      .set("Authorization", bearer)
      .set("Content-Type", "multipart/form-data")

    expect(response.status).toBe(400)
  })
})
