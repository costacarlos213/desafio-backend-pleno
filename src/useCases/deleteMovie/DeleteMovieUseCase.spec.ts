import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { pool } from "@config/database/pool"
import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { DeleteMovieUseCase } from "./DeleteMovieUseCase"

dayjs.extend(utc)

describe("Delete Movie", () => {
  let movieRepository: MovieRepository
  let deleteMovieUseCase: DeleteMovieUseCase
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

    movieRepository = new MovieRepository()
    deleteMovieUseCase = new DeleteMovieUseCase(movieRepository)

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
    const deletedId = await deleteMovieUseCase.execute(movieId.toString())

    expect(deletedId).toEqual(movieId)
  })

  it("Should not be able to delete movie without id", async () => {
    const unknownId = undefined

    await expect(deleteMovieUseCase.execute(unknownId)).rejects.toEqual(
      new Error("Missing movie id.")
    )
  })
})
