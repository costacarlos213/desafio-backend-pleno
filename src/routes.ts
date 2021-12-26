import { Router } from "express"
import { createMovieController } from "./main/createMovie"
import { deleteMovieController } from "./main/deleteMovie"
import { getMoviesController } from "./main/getMovie"
import { updateMovieController } from "./main/updateMovie"

const router = Router()

// Movie Routes

router.post("/movie", async (req, res) => {
  return await createMovieController.handle(req, res)
})

router.get("/movie", async (req, res) => {
  return await getMoviesController.handle(req, res)
})

router.put("/movie", async (req, res) => {
  return await updateMovieController.handle(req, res)
})

router.delete("/movie", async (req, res) => {
  return await deleteMovieController.handle(req, res)
})

export { router }
