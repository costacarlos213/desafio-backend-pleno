import { IUser } from "./IUser"
import { v4 } from "uuid"

class User {
  private constructor(
    public readonly Role: "admin" | "employee",
    public readonly Username: string,
    public readonly Password?: string,
    public readonly Id?: string,
    public readonly JID?: string
  ) {
    if (!Id) {
      this.Id = v4()
    }
  }

  static create(user: IUser): User {
    const { username, role, password, id, JID } = user

    this.validade(user)

    return new User(role, username, password, id, JID)
  }

  static validade(user: IUser): void {
    if (!user.username || user.username === "") {
      throw new Error("Username can't be blank.")
    }

    Object.keys(user).forEach(key => {
      if (user[key]?.length > 255) {
        throw new Error(`${key} is too long.`)
      }
    })
  }
}

export { User }
