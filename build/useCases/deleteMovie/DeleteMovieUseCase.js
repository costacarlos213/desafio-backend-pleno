"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteMovieUseCase = void 0;

class DeleteMovieUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(id, role) {
    if (!id) {
      throw new Error("Missing movie id.");
    }

    if (role !== "admin") {
      throw new Error("Only administrators can permanently delete movies.");
    }

    const {
      id: movieId
    } = await this.movieRepository.delete(parseInt(id));
    return movieId;
  }

}

exports.DeleteMovieUseCase = DeleteMovieUseCase;