import { pool } from "@config/database/pool"
import { app } from "../../app"
import request from "supertest"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { sign } from "jsonwebtoken"

dayjs.extend(utc)

describe("Update Movie Controller", () => {
  let movieId: number
  let bearer: string

  beforeAll(async () => {
    const movieInsertResponse = await pool.query(
      "INSERT INTO movies (name, kind, stops_playing, release, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING id_movie;",
      [
        "Kung fu panda",
        "Cartoon",
        dayjs().add(1, "month").toISOString(),
        dayjs().toISOString(),
        "https://movieposters2.com/images/673334-b.jpg"
      ]
    )

    bearer = `Bearer ${sign(
      { sub: "312785567", role: "admin" },
      process.env.JWT_AUTH_SECRET,
      {
        expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
      }
    )}`

    movieId = movieInsertResponse.rows[0].id_movie
  })

  afterAll(async () => {
    await pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err)
      }

      await pool.end()
    })
  })

  it("Should be able to update movie", async () => {
    const lastWeek = dayjs.utc().subtract(1, "week").format()
    const yesterday = dayjs.utc().subtract(1, "day").format()

    const response = await request(app)
      .put("/movie")
      .field("name", "Avengers")
      .field("kind", "Action")
      .field("release", lastWeek)
      .field("stopsPlaying", yesterday)
      .field("hasStoppedPlaying", true)
      .field("id", movieId)
      .attach(
        "image",
        "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\avengers.jpg"
      )
      .set("Authorization", bearer)
      .set("Content-Type", "multipart/form-data")

    expect(response.status).toEqual(200)

    expect(response.body.name).toEqual("Avengers")

    expect(response.body.kind).toEqual("Action")

    expect(
      dayjs(response.body.release).utc().subtract(3, "hour").format()
    ).toEqual(lastWeek)

    expect(
      dayjs(response.body.stops_playing).utc().subtract(3, "hour").format()
    ).toEqual(yesterday)
  })

  it("Should not be able to remove any required fields", async () => {
    const response = await request(app)
      .put("/movie")
      .field("name", "")
      .field("kind", "")
      .field("id", movieId)
      .set("Authorization", bearer)
      .set("Content-Type", "multipart/form-data")

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Movie name, kind or image url can't be blank."
    })
  })

  it("Should be able to make a request with no fields to update", async () => {
    const response = await request(app)
      .put("/movie")
      .field("id", movieId)
      .set("Authorization", bearer)
      .set("Content-Type", "multipart/form-data")

    expect(response.status).toEqual(200)
    expect(typeof response.body).toEqual("object")
  })
})
