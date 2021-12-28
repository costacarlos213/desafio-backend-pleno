import { User } from "@entities/User/User"

export interface IUniqueFields {
  username?: string
  id?: string
}

export interface IDatabaseUser {
  // eslint-disable-next-line
  id_user?: string
  role?: "admin" | "employee"
  password?: string
  jid?: string
  username?: string
}

export interface IUpdateUserDTO {
  id: string
  fields: IDatabaseUser
}

export interface IUserRepository {
  save(user: User): Promise<{ id: string }>
  getUniqueUser({ id, username }: IUniqueFields): Promise<IDatabaseUser>
  update({ id, fields }: IUpdateUserDTO): Promise<IDatabaseUser>
}
