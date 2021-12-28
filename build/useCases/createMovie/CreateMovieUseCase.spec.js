"use strict";

var _MovieRepositoryMock = require("../../repositories/movieRepository/implementation/MovieRepositoryMock");

var _CreateMovieUseCase = require("./CreateMovieUseCase");

describe("Create Movie Tests", () => {
  let createMovieUseCase;
  beforeAll(() => {
    const movieRepository = new _MovieRepositoryMock.MovieRepositoryMock();
    createMovieUseCase = new _CreateMovieUseCase.CreateMovieUseCase(movieRepository);
  });
  it("Should be able to create movie", async () => {
    const movieData = {
      kind: "Cartoon",
      name: "Kung fu panda",
      imgUrl: "http://img.url.com/img.jpg"
    };
    const movieId = await createMovieUseCase.execute(movieData);
    expect(movieId).toHaveProperty("id");
  });
  it("Should not be able to create movie with no params", async () => {
    // eslint-disable-next-line
    // @ts-ignore
    await expect(createMovieUseCase.execute({})).rejects.toEqual(new Error("Missing movie name, kind or image url."));
  });
});