"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserController = void 0;

var _CreateUserUseCase = require("../useCases/createUser/CreateUserUseCase");

var _CreateUserController = require("../controllers/createUser/CreateUserController");

var _UserRepository = require("../repositories/userRepository/implementation/UserRepository");

function CreateUserControllerFactory() {
  const UserRepo = new _UserRepository.UserRepository();
  const createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(UserRepo);
  return new _CreateUserController.CreateUserController(createUserUseCase);
}

const createUserController = CreateUserControllerFactory();
exports.createUserController = createUserController;