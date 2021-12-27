import { Movie } from "@entities/Movie/Movie"
import { IFilters } from "@useCases/getMovies/GetMoviesDTO"
import { IUpdateMovieDTO } from "@useCases/updateMovie/UpdateMovieDTO"
import { pool } from "@config/database/pool"
import { IDatabaseMovie, IMovieRepository } from "../IMovieRepository"

class MovieRepository implements IMovieRepository {
  async update({ id, fields }: IUpdateMovieDTO): Promise<IDatabaseMovie> {
    let query = "UPDATE movies SET "
    query += "name = COALESCE($1, name), "
    query += "kind = COALESCE($2, kind), "
    query += "stops_playing = COALESCE($3, stops_playing), "
    query += "release = COALESCE($4, release), "
    query += "has_stopped_playing = COALESCE($5, has_stopped_playing), "
    query += "img_url = COALESCE($6, img_url) WHERE "
    query += "id_movie = $7 RETURNING *;"

    const databaseResponse = await pool.query(query, [
      fields.name,
      fields.kind,
      fields.stopsPlaying,
      fields.release,
      fields.hasStoppedPlaying,
      fields.imgUrl,
      id
    ])

    if (databaseResponse.rowCount === 0) {
      throw new Error("Unable to find a movie with this id.")
    }

    return databaseResponse.rows[0]
  }

  async delete(id: number): Promise<{ id: number }> {
    const query = "DELETE FROM movies WHERE id_movie = $1 RETURNING id_movie;"

    const { rows } = await pool.query(query, [id])

    if (rows.length === 0) {
      throw new Error("Trying to delete unknown id.")
    }

    return {
      id: rows[0].id_movie
    }
  }

  async save(movie: Movie): Promise<{ id: number }> {
    let query = "INSERT INTO movies "
    query += "(name, kind, stops_playing, release, img_url) VALUES "
    query += "($1, $2, $3, $4, $5) RETURNING id_movie;"

    const { rows } = await pool.query(query, [
      movie.Name,
      movie.Kind,
      movie.StopsPlaying,
      movie.Release,
      movie.ImageUrl
    ])

    return {
      id: rows[0].id_movie
    }
  }

  async get(filter?: IFilters): Promise<IDatabaseMovie[]> {
    let query = "SELECT * FROM movies WHERE "
    query += "(id_movie = $1 OR $1 IS NULL) AND "
    query += "(name LIKE '%' || $2  || '%' OR $2 IS NULL) AND "
    query += "(kind = $3 OR $3 IS NULL) AND "
    query += "(release >= $4 OR $4 IS NULL) AND "
    query += "(has_stopped_playing = $5 OR $5 IS NULL) "
    query += "LIMIT 10 OFFSET ($6 - 1) * 10;"

    const { rows } = await pool.query(query, [
      filter?.id,
      filter?.name,
      filter?.kind,
      filter?.release,
      filter?.hasStoppedPlaying,
      filter?.pagination
    ])

    return rows
  }
}

export { MovieRepository }
