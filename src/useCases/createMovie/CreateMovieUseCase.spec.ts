import { pool } from "@config/database/pool"
import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { ICreateMovieDTO } from "./CreateMovieDTO"
import { CreateMovieUseCase } from "./CreateMovieUseCase"

describe("Create Movie Tests", () => {
  let movieRepository
  let createMovieUseCase

  beforeAll(() => {
    movieRepository = new MovieRepository()
    createMovieUseCase = new CreateMovieUseCase(movieRepository)
  })

  afterAll(async () => {
    await pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err)
      }

      await pool.end()
    })
  })

  it("Should be able to create movie", async () => {
    const movieData: ICreateMovieDTO = {
      kind: "Cartoon",
      name: "Kung fu panda",
      imgUrl: "http://img.url.com/img.jpg"
    }

    const movieId = await createMovieUseCase.execute(movieData)

    expect(movieId).toHaveProperty("id")
  })

  it("Should not be able to create movie with no params", async () => {
    // eslint-disable-next-line
    // @ts-ignore
    await expect(createMovieUseCase.execute({})).rejects.toEqual(
      new Error("Missing movie name, kind or image url.")
    )
  })
})
