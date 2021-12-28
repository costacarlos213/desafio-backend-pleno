"use strict";

var _RefreshTokenUseCase = require("./RefreshTokenUseCase");

var _jsonwebtoken = require("jsonwebtoken");

describe("Generate new access token", () => {
  let refreshToken;
  beforeAll(() => {
    refreshToken = new _RefreshTokenUseCase.RefreshTokenUseCase();
  });
  it("Should be able to generate a new valid access token", () => {
    const token = refreshToken.execute({
      refreshToken: "eyJhb.ey0IjoxNTE2MjM5MDIyfQ.SflKxwRyJV_adQssw5c",
      role: "admin",
      userId: "1"
    });
    expect((0, _jsonwebtoken.verify)(token, process.env.JWT_AUTH_SECRET)).toHaveProperty("exp");
  });
});