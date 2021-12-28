import { MovieRepository } from "@repositories/movieRepository/implementation/MovieRepository"
import { MoviePuller } from "src/services/pullMovieOut/MoviePuller"
import { CronScheduler } from "src/services/cron/cron"

function moviePullerTaskFactory() {
  const movieRepo = new MovieRepository()

  const moviePullerService = new MoviePuller(movieRepo)
  const moviePullerScherduler = new CronScheduler(
    async () => await moviePullerService.execute()
  )

  const task = moviePullerScherduler.execute("0 1 * * *") // each day at 1am

  return task
}

const moviePullerTask = moviePullerTaskFactory()

export { moviePullerTask }
