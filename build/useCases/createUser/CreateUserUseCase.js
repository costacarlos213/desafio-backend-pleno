"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _User = require("../../entities/User/User");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    username,
    role,
    userRole,
    password
  }) {
    if (userRole !== "admin") {
      throw new Error("Only administrators can create new users.");
    }

    const hashPassword = await _bcrypt.default.hash(password, 8);

    const user = _User.User.create({
      role,
      username,
      password: hashPassword
    });

    const userId = await this.userRepository.save(user);
    return userId;
  }

}

exports.CreateUserUseCase = CreateUserUseCase;