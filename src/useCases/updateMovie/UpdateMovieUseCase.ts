import {
  IDatabaseMovie,
  IMovieRepository
} from "@repositories/movieRepository/IMovieRepository"
import { IUpdateMovieDTO } from "./UpdateMovieDTO"

class UpdateMovieUseCase {
  constructor(private movieRepository: IMovieRepository) {}

  async execute({ id, fields }: IUpdateMovieDTO): Promise<IDatabaseMovie> {
    if (!id) {
      throw new Error("Missing movie id.")
    }

    Object.keys(fields).forEach(key => {
      if (fields[key]?.length > 255) {
        throw new Error("Too long field.")
      }

      if (key !== "hasStoppedPlaying") {
        fields[key] = fields[key]?.replace(
          /[^a-zA-Z0-9:,%.\-/ áàãâéêíõóúç]/g,
          ""
        )
      }
    })

    if (fields.name === "" || fields.imgUrl === "" || fields.kind === "") {
      throw new Error("Movie name, kind or image url can't be blank.")
    }

    if (
      fields.release &&
      fields.stopsPlaying &&
      fields.release === fields.stopsPlaying
    ) {
      throw new Error(`Release date and "stops playing date" can't be the same`)
    }

    const updatedMovie = await this.movieRepository.update({ id, fields })

    return updatedMovie
  }
}

export { UpdateMovieUseCase }
