import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { DeleteMovieUseCase } from "@useCases/deleteMovie/DeleteMovieUseCase"
import { DeleteMovieController } from "@controllers/deleteMovie/DeleteMovieController"

function DeleteMovieControllerFactory() {
  const movieRepo = new MovieRepository()

  const deleteMovieUseCase = new DeleteMovieUseCase(movieRepo)

  return new DeleteMovieController(deleteMovieUseCase)
}

const deleteMovieController = DeleteMovieControllerFactory()

export { deleteMovieController }
