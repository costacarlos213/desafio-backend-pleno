"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteMovieController = void 0;

class DeleteMovieController {
  constructor(deleteMovieUseCase) {
    this.deleteMovieUseCase = deleteMovieUseCase;
  }

  async handle(req, res) {
    try {
      const deletedMoviedId = await this.deleteMovieUseCase.execute(req.params.id?.toString(), req.body.userData.role);
      return res.status(200).json({
        id: deletedMoviedId
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

}

exports.DeleteMovieController = DeleteMovieController;