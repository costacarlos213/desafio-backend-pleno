"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = verifyToken;

var _jsonwebtoken = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        message: "Invalid Session",
        data: "Missing access token"
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = await (0, _jsonwebtoken.verify)(token.trim(), process.env.JWT_AUTH_SECRET);
    req.body = { ...req.body,
      userData: decoded,
      token
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Session",
      data: error.message
    });
  }
}