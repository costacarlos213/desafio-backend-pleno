"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateMovieController = void 0;

class CreateMovieController {
  constructor(createMovieUseCase) {
    this.createMovieUseCase = createMovieUseCase;
  }

  async handle(req, res) {
    const {
      kind,
      name,
      release,
      stopsPlaying
    } = req.body;

    try {
      const movieId = await this.createMovieUseCase.execute({
        imgUrl: req.files[0].location,
        file: req.files[0],
        kind,
        name,
        release,
        stopsPlaying
      });
      return res.status(201).json(movieId);
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

}

exports.CreateMovieController = CreateMovieController;