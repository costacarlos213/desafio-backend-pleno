import { ICreateMovieDTO } from "@useCases/createMovie/CreateMovieDTO"
import { CreateMovieUseCase } from "@useCases/createMovie/CreateMovieUseCase"
import { Request, Response } from "express"

class CreateMovieController {
  constructor(private createMovieUseCase: CreateMovieUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { kind, name, release, stopsPlaying } = req.body as ICreateMovieDTO

    try {
      const movieId = await this.createMovieUseCase.execute({
        imgUrl: req.files[0].location,
        file: req.files[0],
        kind,
        name,
        release,
        stopsPlaying
      })

      return res.status(201).json(movieId)
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { CreateMovieController }
