"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _Movie = require("./Movie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create new movie tests", () => {
  test("New Movie", () => {
    expect(_Movie.Movie.create({
      name: "Kung fu panda",
      kind: "Cartoon",
      imgUrl: "http://img.url.com/img.jpg",
      release: (0, _dayjs.default)().toISOString(),
      stopsPlaying: (0, _dayjs.default)().add(1, "month").toISOString()
    })).toBeInstanceOf(_Movie.Movie);
  });
  test("Too long name", () => {
    let name;

    for (let i = 0; i < 256; i++) {
      name += "a";
    }

    expect(() => {
      _Movie.Movie.validate({
        name,
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg",
        release: (0, _dayjs.default)().toISOString(),
        stopsPlaying: (0, _dayjs.default)().add(1, "month").toISOString()
      });
    }).toThrowError();
  });
  test("Same release and stops playing date", () => {
    const now = (0, _dayjs.default)().toISOString();
    expect(() => {
      _Movie.Movie.validate({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg",
        release: now,
        stopsPlaying: now
      });
    }).toThrowError();
  });
  test("No release and 'stops playing' date", () => {
    expect(() => {
      _Movie.Movie.validate({
        name: "Kung fu panda",
        kind: "Cartoon",
        imgUrl: "http://img.url.com/img.jpg"
      });
    }).not.toThrowError();
  });
  it("Should be able to use numbers and portuguese special chars in title", () => {
    const movie = _Movie.Movie.create({
      name: "300: A ascenção do império",
      kind: "Ação",
      imgUrl: "http://img.url.com/img.jpg"
    });

    expect(movie.Name).toEqual("300: A ascenção do império");
    expect(movie.Kind).toEqual("Ação");
  });
  it("Should be able to remove special chars", () => {
    const movie = _Movie.Movie.create({
      name: "M#i%¨*&ssã!o Im>po<ssí@vel()",
      kind: "Ação",
      imgUrl: "http://img.url.com/img.jpg"
    });

    expect(movie.Name).toEqual("Missão Impossível");
    expect(movie.Kind).toEqual("Ação");
  });
});