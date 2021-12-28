"use strict";

var _pool = require("../../config/database/pool");

var _app = require("../../app");

var _supertest = _interopRequireDefault(require("supertest"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

describe("Update Movie Controller", () => {
  let movieId;
  let bearer;
  beforeAll(async () => {
    const movieInsertResponse = await _pool.pool.query("INSERT INTO movies (name, kind, stops_playing, release, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING id_movie;", ["Kung fu panda", "Cartoon", (0, _dayjs.default)().add(1, "month").toISOString(), (0, _dayjs.default)().toISOString(), "https://movieposters2.com/images/673334-b.jpg"]);
    bearer = `Bearer ${(0, _jsonwebtoken.sign)({
      sub: "312785567",
      role: "admin"
    }, process.env.JWT_AUTH_SECRET, {
      expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
    })}`;
    movieId = movieInsertResponse.rows[0].id_movie;
  });
  afterAll(async () => {
    await _pool.pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err);
      }

      await _pool.pool.end();
    });
  });
  it("Should be able to update movie", async () => {
    const lastWeek = _dayjs.default.utc().subtract(1, "week").format();

    const yesterday = _dayjs.default.utc().subtract(1, "day").format();

    const response = await (0, _supertest.default)(_app.app).put("/movie").field("name", "Avengers").field("kind", "Action").field("release", lastWeek).field("stopsPlaying", yesterday).field("hasStoppedPlaying", true).field("id", movieId).attach("image", "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\avengers.jpg").set("Authorization", bearer).set("Content-Type", "multipart/form-data");
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Avengers");
    expect(response.body.kind).toEqual("Action");
    expect((0, _dayjs.default)(response.body.release).utc().subtract(3, "hour").format()).toEqual(lastWeek);
    expect((0, _dayjs.default)(response.body.stops_playing).utc().subtract(3, "hour").format()).toEqual(yesterday);
  });
  it("Should not be able to remove any required fields", async () => {
    const response = await (0, _supertest.default)(_app.app).put("/movie").field("name", "").field("kind", "").field("id", movieId).set("Authorization", bearer).set("Content-Type", "multipart/form-data");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Movie name, kind or image url can't be blank."
    });
  });
  it("Should be able to make a request with no fields to update", async () => {
    const response = await (0, _supertest.default)(_app.app).put("/movie").field("id", movieId).set("Authorization", bearer).set("Content-Type", "multipart/form-data");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
});