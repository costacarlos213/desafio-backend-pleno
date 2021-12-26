import dayjs from "dayjs"
import { IMovie } from "./IMovie"

class Movie {
  private constructor(
    public readonly Name: string,
    public readonly Kind: string,
    public readonly ImageUrl: string,
    public readonly HasStoppedPlaying: boolean = false,
    public readonly StopsPlaying?: string,
    public readonly Release?: string,
    public readonly Id?: number
  ) {
    if (!Release) {
      this.Release = dayjs().toISOString()
    }
  }

  static create(movie: IMovie): Movie {
    const { id, name, kind, stopsPlaying, hasStoppedPlaying, release, imgUrl } =
      movie

    if (!name || !kind || !imgUrl) {
      throw new Error("Missing movie name, kind or image url.")
    }

    Object.keys(movie).forEach(key => {
      if (movie[key]?.length > 255) {
        throw new Error(`Field ${key} is too long.`)
      }
    })

    if (release && stopsPlaying && release === stopsPlaying) {
      throw new Error(`Release date and "stops playing date" can't be the same`)
    }

    return new Movie(
      name,
      kind,
      imgUrl,
      hasStoppedPlaying,
      stopsPlaying,
      release,
      id
    )
  }
}

export { Movie }
