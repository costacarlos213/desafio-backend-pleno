"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moviePullerTask = void 0;

var _MovieRepository = require("../repositories/movieRepository/implementation/MovieRepository");

var _MoviePuller = require("src/services/pullMovieOut/MoviePuller");

var _cron = require("src/services/cron/cron");

function moviePullerTaskFactory() {
  const movieRepo = new _MovieRepository.MovieRepository();
  const moviePullerService = new _MoviePuller.MoviePuller(movieRepo);
  const moviePullerScherduler = new _cron.CronScheduler(async () => await moviePullerService.execute());
  const task = moviePullerScherduler.execute("0 1 * * *"); // each day at 1am

  return task;
}

const moviePullerTask = moviePullerTaskFactory();
exports.moviePullerTask = moviePullerTask;