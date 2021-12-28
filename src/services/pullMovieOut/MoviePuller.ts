import { IMovieRepository } from "@repositories/movieRepository/IMovieRepository"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

class MoviePuller {
  constructor(private movieRepository: IMovieRepository) {}

  async execute(): Promise<void> {
    const today = dayjs
      .utc()
      .set("hour", 23)
      .set("minute", 59)
      .set("second", 59)
      .format()

    const stoppedPlayingMovies = await this.movieRepository.get({
      stopsPlaying: today,
      hasStoppedPlaying: false
    })

    stoppedPlayingMovies.forEach(async movie => {
      await this.movieRepository.update({
        id: movie.id_movie,
        fields: {
          hasStoppedPlaying: true
        }
      })
    })
  }
}

export { MoviePuller }
