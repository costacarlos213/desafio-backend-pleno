"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetMoviesUseCase = void 0;

class GetMoviesUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(filters) {
    let hasStoppedPlaying;

    if (!filters?.hasStoppedPlaying || filters?.hasStoppedPlaying === "false") {
      hasStoppedPlaying = false;
    } else if (filters?.hasStoppedPlaying === "true") {
      hasStoppedPlaying = true;
    } else if (filters?.hasStoppedPlaying === "both") {
      hasStoppedPlaying = undefined;
    }

    const movies = await this.movieRepository.get({ ...filters,
      hasStoppedPlaying,
      id: parseInt(filters?.id) || undefined,
      pagination: parseInt(filters?.pagination) || undefined
    });
    return movies;
  }

}

exports.GetMoviesUseCase = GetMoviesUseCase;