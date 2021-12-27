import { IFilters } from "@useCases/getMovies/GetMoviesDTO"
import { GetMoviesUseCase } from "@useCases/getMovies/GetMoviesUseCase"
import { Request, Response } from "express"

class GetMoviesController {
  constructor(private getMoviesUseCase: GetMoviesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const filters: IFilters = {
      hasStoppedPlaying: !!req.query?.hasStoppedPlaying,
      id: parseInt(req.query?.id?.toString()) || undefined,
      name: req.query?.name?.toString(),
      kind: req.query?.kind?.toString(),
      release: req.query?.release?.toString(),
      pagination: parseInt(req.query?.pagination?.toString()) || undefined
    }

    try {
      const movies = await this.getMoviesUseCase.execute(filters)

      return res.status(200).json(movies)
    } catch (error) {
      return res.status(401).json({
        message: error.message
      })
    }
  }
}

export { GetMoviesController }
