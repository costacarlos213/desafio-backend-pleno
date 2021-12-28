"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRefreshToken = verifyRefreshToken;

var _UserRepository = require("../repositories/userRepository/implementation/UserRepository");

var _jsonwebtoken = require("jsonwebtoken");

async function verifyRefreshToken(req, res, next) {
  const refreshToken = req.cookies.JID;
  if (!refreshToken) return res.status(401).json({
    message: "Missing token."
  });

  try {
    const decoded = await (0, _jsonwebtoken.verify)(refreshToken, process.env.JWT_REFRESH_SECRET);
    req.body = { ...req.body,
      userData: decoded,
      refreshToken
    };
    const userRepository = new _UserRepository.UserRepository();
    const storedToken = await userRepository.getUniqueUser({
      id: decoded.sub.toString()
    });

    if (!storedToken) {
      res.clearCookie("JID");
      return res.status(401).json({
        message: "Refresh token isn't stored."
      });
    }

    if (storedToken.jid !== refreshToken) {
      res.clearCookie("JID");
      return res.status(401).json({
        message: "Wrong refresh token."
      });
    }

    next();
  } catch (error) {
    res.clearCookie("JID");
    return res.status(401).json({
      message: "Invalid session",
      data: error.message
    });
  }
}