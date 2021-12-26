import { Movie } from "@entities/Movie/Movie"
import { IMovieRepository } from "@repositories/movieRepository/IMovieRepository"
import { ICreateMovieDTO } from "./CreateMovieDTO"

class CreateMovieUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(movie: ICreateMovieDTO): Promise<Movie> {
    const movieEntity = Movie.create(movie)

    return await this.movieRepository.save(movieEntity)
  }
}

export { CreateMovieUseCase }
