import { IMovieRepository } from "@repositories/movieRepository/IMovieRepository"

class DeleteMovieUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(id: string): Promise<string> {
    if (!id) {
      throw new Error("Missing movie id.")
    }

    const { id: movieId } = await this.movieRepository.delete(id)

    return movieId
  }
}

export { DeleteMovieUseCase }
