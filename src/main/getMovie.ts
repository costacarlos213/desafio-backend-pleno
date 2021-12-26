import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { GetMoviesUseCase } from "@useCases/getMovies/GetMoviesUseCase"
import { GetMoviesController } from "@controllers/getMovies/GetMoviesController"

function GetMoviesControllerFactory() {
  const movieRepo = new MovieRepository()

  const getMoviesUseCase = new GetMoviesUseCase(movieRepo)

  return new GetMoviesController(getMoviesUseCase)
}

const getMoviesController = GetMoviesControllerFactory()

export { getMoviesController }
