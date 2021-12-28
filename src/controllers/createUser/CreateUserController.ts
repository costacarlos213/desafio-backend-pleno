import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase"
import { Request, Response } from "express"

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const userId = await this.createUserUseCase.execute({
        password: req.body.password,
        role: req.body.role,
        userRole: req.body.userData.role,
        username: req.body.username
      })

      return res.status(201).json(userId)
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { CreateUserController }
