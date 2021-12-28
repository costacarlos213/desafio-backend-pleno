import { UpdateMovieUseCase } from "@useCases/updateMovie/UpdateMovieUseCase"
import { Request, Response } from "express"

class UpdateMovieController {
  constructor(private updateMovieUseCase: UpdateMovieUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const updatedMovie = await this.updateMovieUseCase.execute({
        id: req.body.id,
        fields: {
          imgUrl: req.body?.location,
          name: req.body?.name,
          hasStoppedPlaying: req.body?.hasStoppedPlaying,
          kind: req.body?.kind,
          release: req.body?.release,
          stopsPlaying: req.body?.stopsPlaying
        }
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
