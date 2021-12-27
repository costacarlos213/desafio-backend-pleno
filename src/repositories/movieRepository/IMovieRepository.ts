import { Movie } from "@entities/Movie/Movie"
import { IFilters } from "@useCases/getMovies/GetMoviesDTO"
import { IUpdateMovieDTO } from "@useCases/updateMovie/UpdateMovieDTO"

/* eslint-disable */ 
export interface IDatabaseMovie {
  id_movie: number
  name: string
  kind: string
  stops_playing: string | null
  release: null | string
  has_stopped_playing: boolean
  img_url: string
}
/* eslint-enable */

export interface IMovieRepository {
  save(movie: Movie): Promise<{ id: number }>
  get(filter?: IFilters): Promise<IDatabaseMovie[]>
  update({ id, fields }: IUpdateMovieDTO): Promise<IDatabaseMovie>
  delete(id: number): Promise<{ id: number }>
}
