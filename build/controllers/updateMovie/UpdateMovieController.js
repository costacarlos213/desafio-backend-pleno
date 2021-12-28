"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateMovieController = void 0;

class UpdateMovieController {
  constructor(updateMovieUseCase) {
    this.updateMovieUseCase = updateMovieUseCase;
  }

  async handle(req, res) {
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
      });
      return res.status(200).json(updatedMovie);
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

}

exports.UpdateMovieController = UpdateMovieController;