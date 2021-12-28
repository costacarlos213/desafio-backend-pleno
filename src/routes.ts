import { Router } from "express"
import { createMovieController } from "./main/createMovie"
import { createUserController } from "./main/createUser"
import { deleteMovieController } from "./main/deleteMovie"
import { getMoviesController } from "./main/getMovie"
import { loginUserController } from "./main/loginUser"
import { refreshTokenController } from "./main/refreshToken"
import { updateMovieController } from "./main/updateMovie"
import { uploadFileMiddleware } from "./middlewares/uploadFile"
import { verifyRefreshToken } from "./middlewares/verifyRefreshToken"
import { verifyToken } from "./middlewares/verifyToken"

const router = Router()

// User Routes

router.post("/user", verifyToken, async (req, res) => {
  return await createUserController.handle(req, res)
})

// Auth Routes

router.post("/auth", async (req, res) => {
  return await loginUserController.handle(req, res)
})

router.get("/token", verifyRefreshToken, async (req, res) => {
  return await refreshTokenController.handle(req, res)
})

// Movie Routes

router.post("/movie", [verifyToken, uploadFileMiddleware], async (req, res) => {
  return await createMovieController.handle(req, res)
})

router.get("/movie", async (req, res) => {
  return await getMoviesController.handle(req, res)
})

router.put("/movie", [verifyToken, uploadFileMiddleware], async (req, res) => {
  return await updateMovieController.handle(req, res)
})

router.delete("/movie/:id", verifyToken, async (req, res) => {
  return await deleteMovieController.handle(req, res)
})

export { router }
