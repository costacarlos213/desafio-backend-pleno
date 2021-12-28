"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMovieController = void 0;

var _MovieRepository = require("../repositories/movieRepository/implementation/MovieRepository");

var _CreateMovieUseCase = require("../useCases/createMovie/CreateMovieUseCase");

var _CreateMovieController = require("../controllers/createMovie/CreateMovieController");

function CreateMovieControllerFactory() {
  const movieRepo = new _MovieRepository.MovieRepository();
  const createMovieUseCase = new _CreateMovieUseCase.CreateMovieUseCase(movieRepo);
  return new _CreateMovieController.CreateMovieController(createMovieUseCase);
}

const createMovieController = CreateMovieControllerFactory();
exports.createMovieController = createMovieController;