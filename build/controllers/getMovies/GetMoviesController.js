"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetMoviesController = void 0;

class GetMoviesController {
  constructor(getMoviesUseCase) {
    this.getMoviesUseCase = getMoviesUseCase;
  }

  async handle(req, res) {
    try {
      const movies = await this.getMoviesUseCase.execute(req.query);
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(401).json({
        message: error.message
      });
    }
  }

}

exports.GetMoviesController = GetMoviesController;