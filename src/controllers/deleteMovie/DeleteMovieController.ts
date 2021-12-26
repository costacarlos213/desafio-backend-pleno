import { DeleteMovieUseCase } from "@useCases/deleteMovie/DeleteMovieUseCase"
import { Request, Response } from "express"

class DeleteMovieController {
  constructor(private deleteMovieUseCase: DeleteMovieUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const deletedMoviedId = this.deleteMovieUseCase.execute(
        req.query.id?.toString()
      )

      return res.status(200).json({
        id: deletedMoviedId
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { DeleteMovieController }
