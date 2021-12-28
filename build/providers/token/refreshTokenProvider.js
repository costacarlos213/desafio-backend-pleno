"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRefreshToken = generateRefreshToken;

var _jsonwebtoken = require("jsonwebtoken");

function generateRefreshToken({
  id,
  role
}) {
  const accessToken = (0, _jsonwebtoken.sign)({
    sub: id,
    role
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TIME
  });
  return accessToken;
}