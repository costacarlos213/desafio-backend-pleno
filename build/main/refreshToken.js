"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshTokenController = void 0;

var _RefreshTokenUseCase = require("../useCases/refreshToken/RefreshTokenUseCase");

var _RefreshTokenController = require("../controllers/refreshToken/RefreshTokenController");

function RefreshTokenControllerFactory() {
  const refreshTokenUseCase = new _RefreshTokenUseCase.RefreshTokenUseCase();
  const refreshTokenController = new _RefreshTokenController.RefreshTokenController(refreshTokenUseCase);
  return refreshTokenController;
}

const refreshTokenController = RefreshTokenControllerFactory();
exports.refreshTokenController = refreshTokenController;