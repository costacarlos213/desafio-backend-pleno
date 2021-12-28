"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMoviesController = void 0;

var _MovieRepository = require("../repositories/movieRepository/implementation/MovieRepository");

var _GetMoviesUseCase = require("../useCases/getMovies/GetMoviesUseCase");

var _GetMoviesController = require("../controllers/getMovies/GetMoviesController");

function GetMoviesControllerFactory() {
  const movieRepo = new _MovieRepository.MovieRepository();
  const getMoviesUseCase = new _GetMoviesUseCase.GetMoviesUseCase(movieRepo);
  return new _GetMoviesController.GetMoviesController(getMoviesUseCase);
}

const getMoviesController = GetMoviesControllerFactory();
exports.getMoviesController = getMoviesController;