"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _pool = require("../../config/database/pool");

var _app = require("../../app");

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

describe("Delete Movie Controller", () => {
  let movieId;
  let bearer;
  beforeAll(async () => {
    const {
      rows
    } = await _pool.pool.query("INSERT INTO movies (name, kind, stops_playing, release, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING id_movie;", ["Kung fu panda", "Cartoon", _dayjs.default.utc().add(1, "month").toISOString(), _dayjs.default.utc().toISOString(), "http://img.url.com/img.jpg"]);
    bearer = `Bearer ${(0, _jsonwebtoken.sign)({
      sub: "312785567",
      role: "admin"
    }, process.env.JWT_AUTH_SECRET, {
      expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
    })}`;
    movieId = rows[0].id_movie;
  });
  afterAll(async () => {
    await _pool.pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err);
      }

      await _pool.pool.end();
    });
  });
  it("Should be able to delete movie", async () => {
    const response = await (0, _supertest.default)(_app.app).delete(`/movie/${movieId}`).set("Authorization", bearer);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(movieId);
  });
  it("Should not be able to delete unknkown id", async () => {
    const response = await (0, _supertest.default)(_app.app).delete("/movie/9999").set("Authorization", bearer);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Trying to delete unknown id.");
  });
  it("Should not be able to find route", async () => {
    const response = await (0, _supertest.default)(_app.app).delete("/movie").set("Authorization", bearer);
    expect(response.status).toEqual(404);
  });
});