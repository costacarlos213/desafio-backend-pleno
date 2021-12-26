import dayjs from "dayjs"
import { IMovie } from "./IMovie"

class Movie {
  private constructor(
    public readonly Name: string,
    public readonly Kind: string,
    public readonly StopsPlaying: string,
    public readonly HasStoppedPlaying: boolean = false,
    public readonly Release?: string,
    public readonly Id?: number
  ) {
    if (!Release) {
      this.Release = dayjs().toISOString()
    }
  }

  static create(movie: IMovie): Movie {
    const { id, name, kind, stopsPlaying, hasStoppedPlaying, release } = movie

    Object.keys(movie).forEach(key => {
      if (movie[key].length > 255) {
        throw new Error(`Field ${key} is too long`)
      }
    })

    if (release === stopsPlaying) {
      throw new Error(`Release date and "stops playing date" can't be the same`)
    }

    return new Movie(name, kind, stopsPlaying, hasStoppedPlaying, release, id)
  }
}

export { Movie }
