"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _createMovie = require("./main/createMovie");

var _createUser = require("./main/createUser");

var _deleteMovie = require("./main/deleteMovie");

var _getMovie = require("./main/getMovie");

var _loginUser = require("./main/loginUser");

var _refreshToken = require("./main/refreshToken");

var _updateMovie = require("./main/updateMovie");

var _uploadFile = require("./middlewares/uploadFile");

var _verifyRefreshToken = require("./middlewares/verifyRefreshToken");

var _verifyToken = require("./middlewares/verifyToken");

const router = (0, _express.Router)(); // Movie Routes

exports.router = router;
router.post("/movie", [_verifyToken.verifyToken, _uploadFile.uploadFileMiddleware], async (req, res) => {
  return await _createMovie.createMovieController.handle(req, res);
});
router.get("/movie", async (req, res) => {
  return await _getMovie.getMoviesController.handle(req, res);
});
router.put("/movie", [_verifyToken.verifyToken, _uploadFile.uploadFileMiddleware], async (req, res) => {
  return await _updateMovie.updateMovieController.handle(req, res);
});
router.delete("/movie/:id", _verifyToken.verifyToken, async (req, res) => {
  return await _deleteMovie.deleteMovieController.handle(req, res);
}); // User Routes

router.post("/user", _verifyToken.verifyToken, async (req, res) => {
  return await _createUser.createUserController.handle(req, res);
}); // Auth Routes

router.post("/auth", async (req, res) => {
  return await _loginUser.loginUserController.handle(req, res);
});
router.get("/token", _verifyRefreshToken.verifyRefreshToken, async (req, res) => {
  return await _refreshToken.refreshTokenController.handle(req, res);
});