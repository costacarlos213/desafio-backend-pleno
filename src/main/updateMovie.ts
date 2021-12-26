import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { UpdateMovieUseCase } from "@useCases/updateMovie/UpdateMovieUseCase"
import { UpdateMovieController } from "@controllers/updateMovie/UpdateMovieController"

function UpdateMovieControllerFactory() {
  const movieRepo = new MovieRepository()

  const updateMovieUseCase = new UpdateMovieUseCase(movieRepo)

  return new UpdateMovieController(updateMovieUseCase)
}

const updateMovieController = UpdateMovieControllerFactory()

export { updateMovieController }
