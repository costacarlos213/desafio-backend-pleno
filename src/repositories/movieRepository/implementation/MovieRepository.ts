import aws from "aws-sdk"

import { Movie } from "@entities/Movie/Movie"
import { IUpdateMovieDTO } from "@useCases/updateMovie/UpdateMovieDTO"
import { pool } from "@config/database/pool"
import { IDatabaseMovie, IFilters, IMovieRepository } from "../IMovieRepository"

class MovieRepository implements IMovieRepository {
  async update({ id, fields }: IUpdateMovieDTO): Promise<IDatabaseMovie> {
    let query = "UPDATE movies x SET "
    query += "name = COALESCE($1, x.name), "
    query += "kind = COALESCE($2, x.kind), "
    query += "stops_playing = COALESCE($3, x.stops_playing), "
    query += "release = COALESCE($4, x.release), "
    query += "has_stopped_playing = COALESCE($5, x.has_stopped_playing), "
    query += "img_url = COALESCE($6, x.img_url) FROM"
    query +=
      "(SELECT id_movie, img_url FROM movies WHERE id_movie = $7 FOR UPDATE) y WHERE "
    query += "x.id_movie = y.id_movie RETURNING x.*, y.img_url AS old_img_url;"

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

    if (databaseResponse.rows[0].old_img_url) {
      const s3 = new aws.S3({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
        },
        region: process.env.AWS_DEFAULT_REGION
      })

      const imgUrl: string = databaseResponse.rows[0].old_img_url

      const imgName = imgUrl.split("/")[3].replace("%40", "@")

      s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: imgName
      })
        .promise()
        .then(resp => resp)

      delete databaseResponse.rows[0].old_img_url
    }

    return databaseResponse.rows[0]
  }

  async delete(id: number): Promise<{ id: number }> {
    const s3 = new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
      },
      region: process.env.AWS_DEFAULT_REGION
    })

    const query =
      "DELETE FROM movies WHERE id_movie = $1 RETURNING id_movie, img_url;"

    const { rows } = await pool.query(query, [id])

    if (rows.length === 0) {
      throw new Error("Trying to delete unknown id.")
    }

    const imgUrl: string = rows[0].img_url

    const imgName = imgUrl.split("/")[3].replace("%40", "@")

    s3.deleteObject({
      Bucket: process.env.AWS_BUCKET,
      Key: imgName
    })
      .promise()
      .then(resp => resp)

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
    query += "(stops_playing <= $5 OR $5 IS NULL) AND "
    query += "(has_stopped_playing = $6 OR $6 IS NULL) "
    query += "LIMIT 10 OFFSET ($7 - 1) * 10;"

    const { rows } = await pool.query(query, [
      filter?.id,
      filter?.name,
      filter?.kind,
      filter?.release,
      filter?.stopsPlaying,
      filter?.hasStoppedPlaying,
      filter?.pagination
    ])

    return rows
  }
}

export { MovieRepository }
