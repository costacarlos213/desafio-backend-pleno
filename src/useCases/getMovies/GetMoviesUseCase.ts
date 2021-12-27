import {
  IDatabaseMovie,
  IMovieRepository
} from "@repositories/movieRepository/IMovieRepository"
import { IFilters } from "./GetMoviesDTO"

class GetMoviesUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(filters?: IFilters): Promise<IDatabaseMovie[]> {
    const movies = await this.movieRepository.get(filters)

    return movies
  }
}

export { GetMoviesUseCase }
