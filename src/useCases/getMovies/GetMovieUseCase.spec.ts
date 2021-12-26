import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { GetMoviesUseCase } from "./GetMoviesUseCase"

describe("Get movies", () => {
  let getMoviesUseCase: GetMoviesUseCase
  let movieRepo: MovieRepository

  beforeAll(() => {
    movieRepo = new MovieRepository()
    getMoviesUseCase = new GetMoviesUseCase(movieRepo)
  })

  it("Should return an array with all movies", async () => {
    const movies = await getMoviesUseCase.execute()

    expect(Array.isArray(movies)).toBeTruthy()
  })
})
