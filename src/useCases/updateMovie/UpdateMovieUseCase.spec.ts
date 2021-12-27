import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { pool } from "@config/database/pool"
import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { UpdateMovieUseCase } from "./UpdateMovieUseCase"

dayjs.extend(utc)

describe("Update Movie Use Case", () => {
  let movieId: number
  let movieRepository: MovieRepository
  let updateMovieUseCase: UpdateMovieUseCase

  beforeAll(async () => {
    const { rows } = await pool.query(
      "INSERT INTO movies (name, kind, stops_playing, release, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING id_movie;",
      [
        "Kung fu panda",
        "Cartoon",
        dayjs.utc().add(1, "month").toISOString(),
        dayjs.utc().toISOString(),
        "http://img.url.com/img.jpg"
      ]
    )

    movieRepository = new MovieRepository()
    updateMovieUseCase = new UpdateMovieUseCase(movieRepository)

    movieId = rows[0].id_movie
  })

  afterAll(async () => {
    await pool.query("TRUNCATE movies RESTART IDENTITY CASCADE;", async err => {
      if (err) {
        console.log(err)
      }

      await pool.end()
    })
  })

  it("Should be able to update movie", async () => {
    const lastWeek = dayjs.utc().subtract(1, "week").format()
    const yesterday = dayjs.utc().subtract(1, "day").format()

    const updatedMovie = await updateMovieUseCase.execute({
      id: movieId,
      fields: {
        name: "A lenda do dragão guerreiro",
        kind: "Action",
        release: lastWeek,
        stopsPlaying: yesterday,
        hasStoppedPlaying: true,
        imgUrl: "http://new.img.url/newimg.jpg"
      }
    })

    expect(updatedMovie.name).toEqual("A lenda do dragão guerreiro")
    expect(updatedMovie.kind).toEqual("Action")
    expect(
      dayjs(updatedMovie.release).utc().subtract(3, "hour").format()
    ).toEqual(lastWeek)
    expect(
      dayjs(updatedMovie.stops_playing).utc().subtract(3, "hour").format()
    ).toEqual(yesterday)
    expect(updatedMovie.img_url).toEqual("http://new.img.url/newimg.jpg")
  })

  it("Should not be able to make release date and 'stops playing date' be the same", async () => {
    const now = dayjs.utc().toISOString()

    await expect(
      updateMovieUseCase.execute({
        id: movieId,
        fields: {
          release: now,
          stopsPlaying: now
        }
      })
    ).rejects.toEqual(
      new Error(`Release date and "stops playing date" can't be the same`)
    )
  })

  it("Should not be able to remove name", async () => {
    await expect(
      updateMovieUseCase.execute({
        id: movieId,
        fields: {
          name: ""
        }
      })
    ).rejects.toEqual(
      new Error("Movie name, kind or image url can't be blank.")
    )
  })

  it("Should not be able to remove kind", async () => {
    const updatedMovie = await updateMovieUseCase.execute({
      id: movieId,
      fields: {
        kind: undefined
      }
    })

    expect(!!updatedMovie.kind).toBeTruthy()
    expect(updatedMovie.kind).not.toEqual("")
  })

  it("Should not be able to update field with too long param", async () => {
    let longName: string

    for (let i = 0; i < 255; i++) {
      longName += "a"
    }

    await expect(
      updateMovieUseCase.execute({
        id: movieId,
        fields: {
          name: longName
        }
      })
    ).rejects.toEqual(new Error("Too long field."))
  })

  it("Should not be able to update any field without an id", async () => {
    await expect(
      updateMovieUseCase.execute({
        id: undefined,
        fields: {
          name: "A lenda do dragão guerreiro"
        }
      })
    ).rejects.toEqual(new Error("Missing movie id."))
  })
})
