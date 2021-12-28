import { GetMoviesUseCase } from "@useCases/getMovies/GetMoviesUseCase"
import { Request, Response } from "express"

class GetMoviesController {
  constructor(private getMoviesUseCase: GetMoviesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const movies = await this.getMoviesUseCase.execute(req.query)

      return res.status(200).json(movies)
    } catch (error) {
      return res.status(401).json({
        message: error.message
      })
    }
  }
}

export { GetMoviesController }
