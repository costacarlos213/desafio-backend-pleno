import { MovieRepositoryMock } from "@repositories/movieRepository/implementation/MovieRepositoryMock"
import { ICreateMovieDTO } from "./CreateMovieDTO"
import { CreateMovieUseCase } from "./CreateMovieUseCase"

describe("Create Movie Tests", () => {
  let createMovieUseCase

  beforeAll(() => {
    const movieRepository = new MovieRepositoryMock()
    createMovieUseCase = new CreateMovieUseCase(movieRepository)
  })

  it("Should be able to create movie", async () => {
    const movieData: ICreateMovieDTO = {
      kind: "Cartoon",
      name: "Kung fu panda",
      imgUrl: "http://img.url.com/img.jpg"
    }

    const movieId = await createMovieUseCase.execute(movieData)

    expect(movieId).toHaveProperty("id")
  })

  it("Should not be able to create movie with no params", async () => {
    // eslint-disable-next-line
    // @ts-ignore
    await expect(createMovieUseCase.execute({})).rejects.toEqual(
      new Error("Missing movie name, kind or image url.")
    )
  })
})
