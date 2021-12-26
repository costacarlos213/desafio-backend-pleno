import { Movie } from "@entities/Movie/Movie"
import { IFilters } from "@useCases/getMovies/GetMoviesDTO"
import { IUpdateMovieDTO } from "@useCases/updateMovie/UpdateMovieDTO"

export interface IMovieRepository {
  save(movie: Movie): Promise<Movie>
  get(filter?: IFilters): Promise<Movie[]>
  update({ id, fields }: IUpdateMovieDTO): Promise<Movie>
  delete(id: string): Promise<{ id: string }>
}
