import { pool } from "@config/database/pool"
import { app } from "../../app"
import request from "supertest"
import dayjs from "dayjs"

describe("Update Movie Controller", () => {
  let movieId: number

  beforeAll(async () => {
    const { rows } = await pool.query(
      "INSERT INTO movies (name, kind, stops_playing, release, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING id_movie;",
      [
        "Kung fu panda",
        "Cartoon",
        dayjs().add(1, "month").toISOString(),
        dayjs().toISOString(),
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

  it("Should be able to update movie", async () => {
    const response = await request(app)
      .put("/movie")
      .send({
        id: movieId,
        fields: {
          name: "A lenda do dragão guerreiro"
        }
      })

    expect(response.status).toEqual(200)
    expect(response.body.name).toEqual("A lenda do dragão guerreiro")
  })

  it("Should not be able to remove any required fields", async () => {
    const response = await request(app)
      .put("/movie")
      .send({
        id: movieId,
        fields: {
          name: undefined,
          kind: ""
        }
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Movie name, kind or image url can't be blank."
    })
  })

  it("Should be able to update any field with the wrong id type", async () => {
    const response = await request(app)
      .put("/movie")
      .send({
        id: movieId.toString(),
        fields: {
          name: "Kung fu panda 3"
        }
      })

    expect(response.status).toEqual(200)
    expect(response.body.name).toEqual("Kung fu panda 3")
  })

  it("Should be able to make a request with no fields to update", async () => {
    const response = await request(app).put("/movie").send({
      id: movieId,
      fields: {}
    })

    expect(response.status).toEqual(200)
    expect(response.body.kind).toEqual("Cartoon")
  })
})
