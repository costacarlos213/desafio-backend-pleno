import { Movie } from "@entities/Movie/Movie"
import { IMovieRepository } from "@repositories/movieRepository/IMovieRepository"
import { IUpdateMovieDTO } from "./UpdateMovieDTO"

class UpdateMovieUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute({ id, fields }: IUpdateMovieDTO): Promise<Movie> {
    const updatedMovie = await this.movieRepository.update({ id, fields })

    return updatedMovie
  }
}

export { UpdateMovieUseCase }
