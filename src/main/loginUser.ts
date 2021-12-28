import { LoginUserUseCase } from "@useCases/loginUser/LoginUserUseCase"
import { LoginUserController } from "@controllers/loginUser/LoginUserController"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"

function LoginUserControllerFactory() {
  const UserRepo = new UserRepository()

  const loginUserUseCase = new LoginUserUseCase(UserRepo)

  return new LoginUserController(loginUserUseCase)
}

const loginUserController = LoginUserControllerFactory()

export { loginUserController }
