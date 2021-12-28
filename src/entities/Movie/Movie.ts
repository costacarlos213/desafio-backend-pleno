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
  ) {}

  static create(movie: IMovie): Movie {
    const { id, name, kind, stopsPlaying, hasStoppedPlaying, release, imgUrl } =
      movie

    const escapedName = name?.replace(/[^a-zA-Z0-9:,.\-/ áàãâéêíõóúç]/g, "")
    const escapedKind = kind?.replace(/[^a-zA-Z0-9:,.\-/ áàãâéêíõóúç]/g, "")

    this.validate({
      ...movie,
      name: escapedName,
      kind: escapedKind
    })

    return new Movie(
      escapedName,
      escapedKind,
      imgUrl,
      hasStoppedPlaying,
      stopsPlaying,
      release,
      id
    )
  }

  static validate(movie: IMovie): void {
    const { name, kind, stopsPlaying, release, imgUrl } = movie

    if (!name || !kind || !imgUrl || name.length === 0 || kind.length === 0) {
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
  }
}

export { Movie }
