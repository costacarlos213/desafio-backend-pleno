import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { GetMoviesUseCase } from "./GetMoviesUseCase"
import { pool } from "@config/database/pool"

dayjs.extend(utc)

describe("Get movies", () => {
  let getMoviesUseCase: GetMoviesUseCase
  let movieRepo: MovieRepository

  beforeAll(async () => {
    movieRepo = new MovieRepository()
    getMoviesUseCase = new GetMoviesUseCase(movieRepo)

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
    const movies = await getMoviesUseCase.execute()

    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toEqual(10)
  })

  it("Should return the second page of movies", async () => {
    const movies = await getMoviesUseCase.execute({
      pagination: 2
    })

    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toEqual(1)
  })

  it("Should return every fantasy movie", async () => {
    const movies = await getMoviesUseCase.execute({
      kind: "Fantasy"
    })

    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toEqual(5)
  })

  it("Should return every movie that has been pulled out", async () => {
    const movies = await getMoviesUseCase.execute({
      hasStoppedPlaying: true
    })

    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toEqual(1)
  })

  it("Should return every movie with the number 5", async () => {
    const movies = await getMoviesUseCase.execute({
      name: "5"
    })

    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toEqual(2)
  })

  it("Should return every movie that will release after a date", async () => {
    const movies = await getMoviesUseCase.execute({
      release: "2022-01-22T20:14:00.000Z"
    })

    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toEqual(5)
  })
})
