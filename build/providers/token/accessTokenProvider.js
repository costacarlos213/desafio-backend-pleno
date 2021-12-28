"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAccessToken = generateAccessToken;

var _jsonwebtoken = require("jsonwebtoken");

function generateAccessToken({
  id,
  role
}) {
  const accessToken = (0, _jsonwebtoken.sign)({
    sub: id,
    role
  }, process.env.JWT_AUTH_SECRET, {
    expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
  });
  return accessToken;
}