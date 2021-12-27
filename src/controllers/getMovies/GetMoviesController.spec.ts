import { app } from "../../app"
import request from "supertest"
import { pool } from "@config/database/pool"

describe("Get Movies Controller", () => {
  beforeAll(async () => {
    let query = "INSERT INTO movies "
    query +=
      "(name, kind, stops_playing, release, img_url, has_stopped_playing) VALUES"
    query +=
      "('Missão Impossível', 'Action', '2022-01-12T23:00:00.000Z', '2021-12-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Missão Impossível 2', 'Action', '2022-01-12T23:00:00.000Z', '2021-12-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Missão Impossível 3', 'Action', '2022-01-12T23:00:00.000Z', '2021-12-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Missão Impossível 4', 'Action', '2022-01-12T23:00:00.000Z', '2021-12-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Missão Impossível 5', 'Action', '2022-01-12T23:00:00.000Z', '2021-12-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Shrek', 'Fantasy', '2022-02-12T23:00:00.000Z', '2022-01-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Shrek 2', 'Fantasy', '2022-02-12T23:00:00.000Z', '2022-01-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Shrek forever', 'Fantasy', '2022-02-12T23:00:00.000Z', '2022-01-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Third Shrek', 'Fantasy', '2022-02-12T23:00:00.000Z', '2022-01-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Shrek 5', 'Fantasy', '2022-02-12T23:00:00.000Z', '2022-01-26T20:14:00.000Z', 'http://img.url.com/img.jpg', false), "
    query +=
      "('Norbit', 'Comedy', '2021-11-12T23:00:00.000Z', '2021-12-12T20:14:00.000Z', 'http://img.url.com/img.jpg', true); "

    await pool.query(query)
  })

  afterAll(async () => {
    await pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err)
      }

      await pool.end()
    })
  })

  it("Should return an array with all movies", async () => {
    const response = await request(app).get("/movie")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(10)
  })

  it("Should return the second page of movies", async () => {
    const response = await request(app).get("/movie?pagination=2")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(1)
  })

  it("Should return every fantasy movie", async () => {
    const response = await request(app).get("/movie?kind=Fantasy")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(5)
  })

  it("Should return every movie that has been pulled out", async () => {
    const response = await request(app).get("/movie?hasStoppedPlaying=true")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(1)
  })

  it("Should return every movie with the number 5", async () => {
    const response = await request(app).get("/movie?name=5")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(2)
  })

  it("Should intepret url encoding", async () => {
    const response = await request(app).get(
      "/movie?name=Miss%C3%A3o%20Imposs%C3%ADvel"
    )

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(5)
    expect(response.body[0].name).toEqual("Missão Impossível")
  })

  it("Should return every movie that will release after a date", async () => {
    const response = await request(app).get(
      "/movie?release=2022-01-22T20:14:00.000Z"
    )

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toEqual(5)
  })
})
