import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { GetMoviesUseCase } from "./GetMoviesUseCase"
import { MovieRepositoryMock } from "@repositories/movieRepository/implementation/MovieRepositoryMock"

dayjs.extend(utc)

describe("Get movies", () => {
  let getMoviesUseCase: GetMoviesUseCase

  beforeAll(async () => {
    const movieRepo = new MovieRepositoryMock()
    getMoviesUseCase = new GetMoviesUseCase(movieRepo)
  })

  it("Should return an array with all movies", async () => {
    const movies = await getMoviesUseCase.execute()

    expect(Array.isArray(movies)).toBeTruthy()
    expect(movies.length).toEqual(3)
  })
})
