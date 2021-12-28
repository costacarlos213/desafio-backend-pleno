"use strict";

var _MovieRepositoryMock = require("../../repositories/movieRepository/implementation/MovieRepositoryMock");

var _MoviePuller = require("./MoviePuller");

describe("Stops movie playing", () => {
  let moviePuller;
  beforeAll(() => {
    const movieRepository = new _MovieRepositoryMock.MovieRepositoryMock();
    moviePuller = new _MoviePuller.MoviePuller(movieRepository);
  });
  it("Should stops movie playing", () => {
    moviePuller.execute();
  });
});