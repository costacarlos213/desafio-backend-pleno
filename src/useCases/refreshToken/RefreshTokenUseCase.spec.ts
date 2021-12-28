import { RefreshTokenUseCase } from "./RefreshTokenUseCase"
import { verify } from "jsonwebtoken"

describe("Generate new access token", () => {
  let refreshToken: RefreshTokenUseCase

  beforeAll(() => {
    refreshToken = new RefreshTokenUseCase()
  })

  it("Should be able to generate a new valid access token", () => {
    const token = refreshToken.execute({
      refreshToken: "eyJhb.ey0IjoxNTE2MjM5MDIyfQ.SflKxwRyJV_adQssw5c",
      role: "admin",
      userId: "1"
    })

    expect(verify(token, process.env.JWT_AUTH_SECRET)).toHaveProperty("exp")
  })
})
