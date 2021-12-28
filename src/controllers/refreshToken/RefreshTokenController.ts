import { Request, Response } from "express"
import { RefreshTokenUseCase } from "@useCases/refreshToken/RefreshTokenUseCase"

class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const accessToken = await this.refreshTokenUseCase.execute({
        userId: req.body.userData.sub,
        role: req.body.userData.role,
        refreshToken: req.body.refreshToken
      })

      res.cookie("access-token", accessToken, {
        path: "/",
        maxAge: 2 * 60 * 1000 // 2 min
      })

      return res.status(200).json({ accessToken })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export { RefreshTokenController }
