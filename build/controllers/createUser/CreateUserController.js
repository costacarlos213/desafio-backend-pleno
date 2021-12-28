"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(req, res) {
    try {
      const userId = await this.createUserUseCase.execute({
        password: req.body.password,
        role: req.body.role,
        userRole: req.body.userData.role,
        username: req.body.username
      });
      return res.status(201).json(userId);
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

}

exports.CreateUserController = CreateUserController;