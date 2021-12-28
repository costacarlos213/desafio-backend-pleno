"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenController = void 0;

class RefreshTokenController {
  constructor(refreshTokenUseCase) {
    this.refreshTokenUseCase = refreshTokenUseCase;
  }

  async handle(req, res) {
    try {
      const accessToken = await this.refreshTokenUseCase.execute({
        userId: req.body.userData.sub,
        role: req.body.userData.role,
        refreshToken: req.body.refreshToken
      });
      res.cookie("access-token", accessToken, {
        path: "/",
        maxAge: 2 * 60 * 1000 // 2 min

      });
      return res.status(200).json({
        accessToken
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

}

exports.RefreshTokenController = RefreshTokenController;