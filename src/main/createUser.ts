import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase"
import { CreateUserController } from "@controllers/createUser/CreateUserController"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"

function CreateUserControllerFactory() {
  const UserRepo = new UserRepository()

  const createUserUseCase = new CreateUserUseCase(UserRepo)

  return new CreateUserController(createUserUseCase)
}

const createUserController = CreateUserControllerFactory()

export { createUserController }
