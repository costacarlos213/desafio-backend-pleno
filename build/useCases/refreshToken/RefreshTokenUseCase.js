"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _accessTokenProvider = require("../../providers/token/accessTokenProvider");

class RefreshTokenUseCase {
  execute(userData) {
    const {
      refreshToken,
      userId,
      role
    } = userData;

    if (!userId || !refreshToken || !role) {
      throw new Error("Missing token or userId.");
    }

    const accessToken = (0, _accessTokenProvider.generateAccessToken)({
      id: userId,
      role
    });
    return accessToken;
  }

}

exports.RefreshTokenUseCase = RefreshTokenUseCase;