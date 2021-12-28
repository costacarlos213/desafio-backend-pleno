import { IMovieRepository } from "@repositories/movieRepository/IMovieRepository"

class DeleteMovieUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(id: string, role: "admin" | "employee"): Promise<number> {
    if (!id) {
      throw new Error("Missing movie id.")
    }

    if (role !== "admin") {
      throw new Error("Only administrators can permanently delete movies.")
    }

    const { id: movieId } = await this.movieRepository.delete(parseInt(id))

    return movieId
  }
}

export { DeleteMovieUseCase }
