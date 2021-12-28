import { RefreshTokenUseCase } from "@useCases/refreshToken/RefreshTokenUseCase"
import { RefreshTokenController } from "@controllers/refreshToken/RefreshTokenController"

function RefreshTokenControllerFactory() {
  const refreshTokenUseCase = new RefreshTokenUseCase()

  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

  return refreshTokenController
}

const refreshTokenController = RefreshTokenControllerFactory()

export { refreshTokenController }
