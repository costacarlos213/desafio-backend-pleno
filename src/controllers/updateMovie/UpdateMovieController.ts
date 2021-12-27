import { UpdateMovieUseCase } from "@useCases/updateMovie/UpdateMovieUseCase"
import { Request, Response } from "express"

class UpdateMovieController {
  constructor(private updateMovieUseCase: UpdateMovieUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id, fields } = req.body

    try {
      const updatedMovie = await this.updateMovieUseCase.execute({
        id,
        fields
      })

      return res.status(200).json(updatedMovie)
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { UpdateMovieController }
