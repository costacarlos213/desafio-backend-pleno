import { Movie } from "@entities/Movie/Movie"
import { IFilters } from "@useCases/getMovies/GetMoviesDTO"
import { IUpdateMovieDTO } from "@useCases/updateMovie/UpdateMovieDTO"
import dayjs from "dayjs"
import { IMovieRepository } from "../IMovieRepository"

class MovieRepository implements IMovieRepository {
  async update({ id, fields }: IUpdateMovieDTO): Promise<Movie> {
    const movie = Movie.create({
      imgUrl: "http://img.url.com/img.jpg",
      kind: "Cartoon",
      name: "Kung Fu Panda",
      hasStoppedPlaying: false,
      id: 3,
      release: dayjs().subtract(1, "month").toISOString(),
      stopsPlaying: dayjs().add(1, "month").toISOString()
    })

    return movie
  }

  async delete(id: string): Promise<{ id: string }> {
    return { id }
  }

  async save(movie: Movie): Promise<Movie> {
    Object.assign(movie, {
      Id: 10
    })

    return movie
  }

  async get(filter?: IFilters): Promise<Movie[]> {
    const movie = Movie.create({
      imgUrl: "http://img.url.com/img.jpg",
      kind: "Cartoon",
      name: "Kung Fu Panda",
      hasStoppedPlaying: false,
      id: 3,
      release: dayjs().subtract(1, "month").toISOString(),
      stopsPlaying: dayjs().add(1, "month").toISOString()
    })

    return [movie]
  }
}

export { MovieRepository }
