import { generateAccessToken } from "../../providers/token/accessTokenProvider"
import { IRefreshTokenDTO } from "./RefreshTokenDTO"

class RefreshTokenUseCase {
  execute(userData: IRefreshTokenDTO): string {
    const { refreshToken, userId, role } = userData

    if (!userId || !refreshToken || !role) {
      throw new Error("Missing token or userId.")
    }

    const accessToken = generateAccessToken({
      id: userId,
      role
    })

    return accessToken
  }
}

export { RefreshTokenUseCase }
