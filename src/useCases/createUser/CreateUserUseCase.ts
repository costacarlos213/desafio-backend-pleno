import { User } from "@entities/User/User"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { ICreateUserDTO } from "./CreateUserDTO"
import bcrypt from "bcrypt"

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    username,
    role,
    userRole,
    password
  }: ICreateUserDTO): Promise<{ id: string }> {
    if (userRole !== "admin") {
      throw new Error("Only administrators can create new users.")
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const user = User.create({
      role,
      username,
      password: hashPassword
    })

    const userId = await this.userRepository.save(user)

    return userId
  }
}

export { CreateUserUseCase }
