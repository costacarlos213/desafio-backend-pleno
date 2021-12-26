import { User } from "./User"

describe("Create new user tests", () => {
  test("New user", () => {
    expect(() => {
      User.create({
        role: "admin",
        username: "João",
        password: "joaozinho123"
      })
    }).not.toThrowError()
  })

  test("Too long username", () => {
    let username: string

    for (let i = 0; i < 256; i++) {
      username += "a"
    }

    expect(() => {
      User.create({
        role: "admin",
        username,
        password: "joaozinho123"
      })
    }).toThrowError()
  })
})
