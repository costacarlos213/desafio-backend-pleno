import request from "supertest"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { pool } from "@config/database/pool"

import { app } from "../../app"

dayjs.extend(utc)

describe("Delete Movie Controller", () => {
  let movieId: number

  beforeAll(async () => {
    const { rows } = await pool.query(
      "INSERT INTO movies (name, kind, stops_playing, release, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING id_movie;",
      [
        "Kung fu panda",
        "Cartoon",
        dayjs.utc().add(1, "month").toISOString(),
        dayjs.utc().toISOString(),
        "http://img.url.com/img.jpg"
      ]
    )

    movieId = rows[0].id_movie
  })

  afterAll(async () => {
    await pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err)
      }

      await pool.end()
    })
  })

  it("Should be able to delete movie", async () => {
    const response = await request(app).delete(`/movie/${movieId}`)

    expect(response.status).toEqual(200)
    expect(response.body.id).toEqual(movieId)
  })

  it("Should not be able to delete unknkown id", async () => {
    const response = await request(app).delete("/movie/9999")

    expect(response.status).toEqual(400)
    expect(response.body.message).toEqual("Trying to delete unknown id.")
  })

  it("Should not be able to find route", async () => {
    const response = await request(app).delete("/movie")

    expect(response.status).toEqual(404)
  })
})
