import { Movie } from "@entities/Movie/Movie"
import { IMovieRepository } from "@repositories/movieRepository/IMovieRepository"
import { ICreateMovieDTO } from "./CreateMovieDTO"

class CreateMovieUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(movie: ICreateMovieDTO): Promise<{ id: number }> {
    const movieEntity = Movie.create({
      ...movie,
      name: movie.name?.toLowerCase()?.trim(),
      kind: movie.kind?.toLowerCase()?.trim()
    })

    return await this.movieRepository.save(movieEntity)
  }
}

export { CreateMovieUseCase }
