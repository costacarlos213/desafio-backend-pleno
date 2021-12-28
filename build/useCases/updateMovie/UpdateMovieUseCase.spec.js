"use strict";

var _MovieRepositoryMock = require("../../repositories/movieRepository/implementation/MovieRepositoryMock");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _UpdateMovieUseCase = require("./UpdateMovieUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

describe("Update Movie Use Case", () => {
  const movieId = 1;
  let updateMovieUseCase;
  beforeAll(async () => {
    updateMovieUseCase = new _UpdateMovieUseCase.UpdateMovieUseCase(new _MovieRepositoryMock.MovieRepositoryMock());
  });
  it("Should be able to update movie", async () => {
    const lastWeek = _dayjs.default.utc().subtract(1, "week").format();

    const yesterday = _dayjs.default.utc().subtract(1, "day").format();

    const updated = await updateMovieUseCase.execute({
      id: movieId,
      fields: {
        name: "A lenda do dragão guerreiro",
        kind: "Action",
        release: lastWeek,
        stopsPlaying: yesterday,
        hasStoppedPlaying: true,
        imgUrl: "http://new.img.url/newimg.jpg"
      }
    });
    expect(typeof updated).toEqual("object");
  });
  it("Should not be able to make release date and 'stops playing date' be the same", async () => {
    const now = _dayjs.default.utc().toISOString();

    await expect(updateMovieUseCase.execute({
      id: movieId,
      fields: {
        release: now,
        stopsPlaying: now
      }
    })).rejects.toEqual(new Error(`Release date and "stops playing date" can't be the same`));
  });
  it("Should not be able to remove name", async () => {
    await expect(updateMovieUseCase.execute({
      id: movieId,
      fields: {
        name: ""
      }
    })).rejects.toEqual(new Error("Movie name, kind or image url can't be blank."));
  });
  it("Should not be able to remove kind", async () => {
    const updatedMovie = await updateMovieUseCase.execute({
      id: movieId,
      fields: {
        kind: undefined
      }
    });
    expect(!!updatedMovie.kind).toBeTruthy();
    expect(updatedMovie.kind).not.toEqual("");
  });
  it("Should not be able to update field with too long param", async () => {
    let longName;

    for (let i = 0; i < 255; i++) {
      longName += "a";
    }

    await expect(updateMovieUseCase.execute({
      id: movieId,
      fields: {
        name: longName
      }
    })).rejects.toEqual(new Error("Too long field."));
  });
  it("Should not be able to update any field without an id", async () => {
    await expect(updateMovieUseCase.execute({
      id: undefined,
      fields: {
        name: "A lenda do dragão guerreiro"
      }
    })).rejects.toEqual(new Error("Missing movie id."));
  });
});