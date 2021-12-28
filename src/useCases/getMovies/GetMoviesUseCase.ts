import {
  IDatabaseMovie,
  IMovieRepository
} from "@repositories/movieRepository/IMovieRepository"
import { IGetMoviesDTO } from "./GetMoviesDTO"

class GetMoviesUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(filters?: IGetMoviesDTO): Promise<IDatabaseMovie[]> {
    let hasStoppedPlaying: boolean

    if (!filters?.hasStoppedPlaying || filters?.hasStoppedPlaying === "false") {
      hasStoppedPlaying = false
    } else if (filters?.hasStoppedPlaying === "true") {
      hasStoppedPlaying = true
    } else if (filters?.hasStoppedPlaying === "both") {
      hasStoppedPlaying = undefined
    }

    const movies = await this.movieRepository.get({
      ...filters,
      hasStoppedPlaying,
      id: parseInt(filters?.id) || undefined,
      pagination: parseInt(filters?.pagination) || undefined
    })

    return movies
  }
}

export { GetMoviesUseCase }
