import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { CreateMovieUseCase } from "@useCases/createMovie/CreateMovieUseCase"
import { CreateMovieController } from "@controllers/createMovie/CreateMovieController"

function CreateMovieControllerFactory() {
  const movieRepo = new MovieRepository()

  const createMovieUseCase = new CreateMovieUseCase(movieRepo)

  return new CreateMovieController(createMovieUseCase)
}

const createMovieController = CreateMovieControllerFactory()

export { createMovieController }
