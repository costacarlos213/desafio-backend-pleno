"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _GetMoviesUseCase = require("./GetMoviesUseCase");

var _MovieRepositoryMock = require("../../repositories/movieRepository/implementation/MovieRepositoryMock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

describe("Get movies", () => {
  let getMoviesUseCase;
  beforeAll(async () => {
    const movieRepo = new _MovieRepositoryMock.MovieRepositoryMock();
    getMoviesUseCase = new _GetMoviesUseCase.GetMoviesUseCase(movieRepo);
  });
  it("Should return an array with all movies", async () => {
    const movies = await getMoviesUseCase.execute();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toEqual(3);
  });
});