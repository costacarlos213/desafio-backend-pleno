"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _DeleteMovieUseCase = require("./DeleteMovieUseCase");

var _MovieRepositoryMock = require("../../repositories/movieRepository/implementation/MovieRepositoryMock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

describe("Delete Movie", () => {
  let deleteMovieUseCase;
  const movieId = 1;
  beforeAll(async () => {
    const movieRepository = new _MovieRepositoryMock.MovieRepositoryMock();
    deleteMovieUseCase = new _DeleteMovieUseCase.DeleteMovieUseCase(movieRepository);
  });
  it("Should be able to delete movie", async () => {
    const deletedId = await deleteMovieUseCase.execute(movieId.toString(), "admin");
    expect(deletedId).toEqual(movieId);
  });
  it("Should not be able to delete movie without id", async () => {
    const unknownId = undefined;
    await expect(deleteMovieUseCase.execute(unknownId, "admin")).rejects.toEqual(new Error("Missing movie id."));
  });
  it("Should not be able to delete movie being an employee", async () => {
    await expect(deleteMovieUseCase.execute(movieId.toString(), "employee")).rejects.toEqual(new Error("Only administrators can permanently delete movies."));
  });
});