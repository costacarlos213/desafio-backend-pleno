"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMovieController = void 0;

var _MovieRepository = require("../repositories/movieRepository/implementation/MovieRepository");

var _DeleteMovieUseCase = require("../useCases/deleteMovie/DeleteMovieUseCase");

var _DeleteMovieController = require("../controllers/deleteMovie/DeleteMovieController");

function DeleteMovieControllerFactory() {
  const movieRepo = new _MovieRepository.MovieRepository();
  const deleteMovieUseCase = new _DeleteMovieUseCase.DeleteMovieUseCase(movieRepo);
  return new _DeleteMovieController.DeleteMovieController(deleteMovieUseCase);
}

const deleteMovieController = DeleteMovieControllerFactory();
exports.deleteMovieController = deleteMovieController;