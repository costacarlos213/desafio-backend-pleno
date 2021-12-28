"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUserController = void 0;

var _LoginUserUseCase = require("../useCases/loginUser/LoginUserUseCase");

var _LoginUserController = require("../controllers/loginUser/LoginUserController");

var _UserRepository = require("../repositories/userRepository/implementation/UserRepository");

function LoginUserControllerFactory() {
  const UserRepo = new _UserRepository.UserRepository();
  const loginUserUseCase = new _LoginUserUseCase.LoginUserUseCase(UserRepo);
  return new _LoginUserController.LoginUserController(loginUserUseCase);
}

const loginUserController = LoginUserControllerFactory();
exports.loginUserController = loginUserController;