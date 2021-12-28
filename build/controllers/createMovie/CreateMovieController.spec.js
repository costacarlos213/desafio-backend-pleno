"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _pool = require("../../config/database/pool");

var _app = require("../../app");

var _jsonwebtoken = require("jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Create Movie Controller", () => {
  let bearer;
  beforeAll(() => {
    bearer = `Bearer ${(0, _jsonwebtoken.sign)({
      sub: "312785567",
      role: "admin"
    }, process.env.JWT_AUTH_SECRET, {
      expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
    })}`;
  });
  afterAll(async () => {
    await _pool.pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err);
      }

      await _pool.pool.end();
    });
  });
  it("Should be able to create new movie", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/movie").field("name", "Kung fu panda").field("kind", "Cartoon").attach("image", "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg").set("Authorization", bearer).set("Content-Type", "multipart/form-data");
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
  it("Should be able to create new movie with all params", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/movie").field("name", "Kung fu panda").field("kind", "Cartoon").field("release", (0, _dayjs.default)().toISOString()).field("stopsPlaying", (0, _dayjs.default)().add(1, "month").toISOString()).attach("image", "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg").set("Authorization", bearer).set("Content-Type", "multipart/form-data");
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
  it("Should not be able to create movie without name", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/movie").field("kind", "Cartoon").attach("image", "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg").set("Authorization", bearer).set("Content-Type", "multipart/form-data");
    expect(response.status).toBe(400);
  });
  it("Should not be able to create movie without kind", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/movie").field("name", "Kung fu panda").attach("image", "C:\\Users\\Carlos\\Documents\\cinema\\src\\public\\uploads\\kung-fu-panda.jpg").set("Authorization", bearer).set("Content-Type", "multipart/form-data");
    expect(response.status).toBe(400);
  });
});