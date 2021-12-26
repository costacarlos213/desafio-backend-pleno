import { IUser } from "./IUser"

class User {
  private constructor(
    public readonly Role: string,
    public readonly Username: string,
    public readonly Password?: string,
    public readonly Id?: number
  ) {}

  static create(user: IUser): User {
    const { username, role, password, id } = user

    if (username.length > 255) {
      throw new Error("Too long username.")
    }

    return new User(role, username, password, id)
  }
}

export { User }
