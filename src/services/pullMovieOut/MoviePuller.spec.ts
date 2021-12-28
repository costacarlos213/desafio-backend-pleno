import { MovieRepositoryMock } from "@repositories/movieRepository/implementation/MovieRepositoryMock"
import { MoviePuller } from "./MoviePuller"

describe("Stops movie playing", () => {
  let moviePuller: MoviePuller

  beforeAll(() => {
    const movieRepository = new MovieRepositoryMock()

    moviePuller = new MoviePuller(movieRepository)
  })

  it("Should stops movie playing", () => {
    moviePuller.execute()
  })
})
