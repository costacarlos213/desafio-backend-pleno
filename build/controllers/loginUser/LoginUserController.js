"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginUserController = void 0;

class LoginUserController {
  constructor(loginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  async handle(req, res) {
    try {
      const {
        accessToken,
        refreshToken
      } = await this.loginUserUseCase.execute({
        username: req.body.username,
        password: req.body.password
      });
      res.cookie("access-token", accessToken, {
        path: "/",
        maxAge: 2 * 60 * 1000 // 2 min

      });
      res.cookie("JID", refreshToken, {
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month

      });
      return res.status(200).json({
        accessToken,
        refreshToken
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message
      });
    }
  }

}

exports.LoginUserController = LoginUserController;