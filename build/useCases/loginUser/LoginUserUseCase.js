"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginUserUseCase = void 0;

var _bcrypt = require("bcrypt");

var _accessTokenProvider = require("../../providers/token/accessTokenProvider");

var _refreshTokenProvider = require("../../providers/token/refreshTokenProvider");

class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    username,
    password
  }) {
    if (!username || username === "") throw new Error("Wrong credentials.");
    const user = await this.userRepository.getUniqueUser({
      username
    });
    if (!user) throw new Error("Wrong credentials.");
    const isPasswordValid = await (0, _bcrypt.compare)(password, user.password);
    if (!isPasswordValid) throw new Error("Wrong credentials.");
    const accessToken = (0, _accessTokenProvider.generateAccessToken)({
      id: user.id_user,
      role: user.role
    });
    const refreshToken = (0, _refreshTokenProvider.generateRefreshToken)({
      id: user.id_user,
      role: user.role
    });
    await this.userRepository.update({
      id: user.id_user,
      fields: {
        jid: refreshToken
      }
    });
    return {
      accessToken,
      refreshToken
    };
  }

}

exports.LoginUserUseCase = LoginUserUseCase;