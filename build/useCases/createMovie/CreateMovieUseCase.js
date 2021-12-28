"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateMovieUseCase = void 0;

var _Movie = require("../../entities/Movie/Movie");

class CreateMovieUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(movie) {
    const movieEntity = _Movie.Movie.create({ ...movie,
      name: movie.name?.toLowerCase()?.trim(),
      kind: movie.kind?.toLowerCase()?.trim()
    });

    return await this.movieRepository.save(movieEntity);
  }

}

exports.CreateMovieUseCase = CreateMovieUseCase;