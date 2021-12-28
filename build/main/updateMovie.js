"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMovieController = void 0;

var _MovieRepository = require("../repositories/movieRepository/implementation/MovieRepository");

var _UpdateMovieUseCase = require("../useCases/updateMovie/UpdateMovieUseCase");

var _UpdateMovieController = require("../controllers/updateMovie/UpdateMovieController");

function UpdateMovieControllerFactory() {
  const movieRepo = new _MovieRepository.MovieRepository();
  const updateMovieUseCase = new _UpdateMovieUseCase.UpdateMovieUseCase(movieRepo);
  return new _UpdateMovieController.UpdateMovieController(updateMovieUseCase);
}

const updateMovieController = UpdateMovieControllerFactory();
exports.updateMovieController = updateMovieController;