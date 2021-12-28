import { UserRepositoryMock } from "@repositories/userRepository/implementation/UserRepositoryMock"
import { LoginUserUseCase } from "./LoginUserUseCase"

describe("Login Use Case", () => {
  let loginUserUseCase: LoginUserUseCase

  beforeAll(() => {
    const userRepository = new UserRepositoryMock()

    loginUserUseCase = new LoginUserUseCase(userRepository)
  })

  it("Should be able to login user", async () => {
    const tokens = await loginUserUseCase.execute({
      username: "Joao",
      password: "strongpassword"
    })

    expect(tokens).toHaveProperty("accessToken")
    expect(tokens).toHaveProperty("refreshToken")
  })

  it("Should not be able to login with no username", async () => {
    await expect(
      loginUserUseCase.execute({
        password: "strongpassword",
        username: undefined
      })
    ).rejects.toEqual(new Error("Wrong credentials."))
  })

  it("Should not be able to login with unknown username", async () => {
    await expect(
      loginUserUseCase.execute({
        password: "strongpassword",
        username: "Marcos"
      })
    ).rejects.toEqual(new Error("Wrong credentials."))
  })

  it("Should not be able to login with wrong password", async () => {
    await expect(
      loginUserUseCase.execute({
        password: "weekpassword",
        username: "Joao"
      })
    ).rejects.toEqual(new Error("Wrong credentials."))
  })
})
