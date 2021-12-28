import { LoginUserUseCase } from "@useCases/loginUser/LoginUserUseCase"
import { Request, Response } from "express"

class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { accessToken, refreshToken } = await this.loginUserUseCase.execute(
        {
          username: req.body.username,
          password: req.body.password
        }
      )

      res.cookie("access-token", accessToken, {
        path: "/",
        maxAge: 2 * 60 * 1000 // 2 min
      })

      res.cookie("JID", refreshToken, {
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
      })

      return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      return res.status(401).json({
        message: error.message
      })
    }
  }
}

export { LoginUserController }
