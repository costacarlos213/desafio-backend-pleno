import { UserRepositoryMock } from "@repositories/userRepository/implementation/UserRepositoryMock"
import { CreateUserUseCase } from "./CreateUserUseCase"

describe("Login Use Case", () => {
  let createUserUseCase: CreateUserUseCase

  beforeAll(() => {
    const userRepository = new UserRepositoryMock()

    createUserUseCase = new CreateUserUseCase(userRepository)
  })

  it("Should be able to create new user", async () => {
    const userId = await createUserUseCase.execute({
      password: "strongpassword",
      role: "employee",
      userRole: "admin",
      username: "adalberto"
    })

    expect(userId).toHaveProperty("id")
  })

  it("Should not be able to create a new user with employee creds", async () => {
    await expect(
      createUserUseCase.execute({
        password: "strongpassword",
        role: "employee",
        userRole: "employee",
        username: "adalberto"
      })
    ).rejects.toEqual(new Error("Only administrators can create new users."))
  })
})
