import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { DeleteMovieUseCase } from "./DeleteMovieUseCase"
import { MovieRepositoryMock } from "@repositories/movieRepository/implementation/MovieRepositoryMock"

dayjs.extend(utc)

describe("Delete Movie", () => {
  let deleteMovieUseCase: DeleteMovieUseCase
  const movieId = 1

  beforeAll(async () => {
    const movieRepository = new MovieRepositoryMock()
    deleteMovieUseCase = new DeleteMovieUseCase(movieRepository)
  })

  it("Should be able to delete movie", async () => {
    const deletedId = await deleteMovieUseCase.execute(
      movieId.toString(),
      "admin"
    )

    expect(deletedId).toEqual(movieId)
  })

  it("Should not be able to delete movie without id", async () => {
    const unknownId = undefined

    await expect(
      deleteMovieUseCase.execute(unknownId, "admin")
    ).rejects.toEqual(new Error("Missing movie id."))
  })

  it("Should not be able to delete movie being an employee", async () => {
    await expect(
      deleteMovieUseCase.execute(movieId.toString(), "employee")
    ).rejects.toEqual(
      new Error("Only administrators can permanently delete movies.")
    )
  })
})
