import { pool } from "@config/database/pool"
import { User } from "@entities/User/User"
import {
  IUserRepository,
  IUniqueFields,
  IDatabaseUser,
  IUpdateUserDTO
} from "../IUserRepository"

class UserRepository implements IUserRepository {
  async save(user: User): Promise<{ id: string }> {
    let query = "INSERT INTO users "
    query += "(id_user, username, password, role, JID) VALUES "
    query += "($1, $2, $3, $4, $5) RETURNING id_user"

    const { rows } = await pool.query(query, [
      user.Id,
      user.Username,
      user.Password,
      user.Role,
      user.JID
    ])

    return {
      id: rows[0].id_user
    }
  }

  async getUniqueUser({ id, username }: IUniqueFields): Promise<IDatabaseUser> {
    let query = "SELECT * FROM users WHERE "
    query += "(id_user = $1 OR $1 IS NULL) AND "
    query += "(username = $2 OR $2 IS NULL);"

    const { rows } = await pool.query(query, [id, username])

    return rows[0]
  }

  async update({ fields, id }: IUpdateUserDTO): Promise<IDatabaseUser> {
    let query = "UPDATE users SET "
    query += "username = COALESCE($1, username), "
    query += "password = COALESCE($2, password), "
    query += "role = COALESCE($3, role), "
    query += "JID = COALESCE($4, JID) WHERE "
    query += "id_user = $5 RETURNING *;"

    const databaseResponse = await pool.query(query, [
      fields.username,
      fields.password,
      fields.role,
      fields.jid,
      id
    ])

    if (databaseResponse.rowCount === 0) {
      throw new Error("Unable to find user with this id.")
    }

    return databaseResponse.rows[0]
  }
}

export { UserRepository }
