import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { ILoginDTO, ITokens } from "./LoginUserDTO"
import { compare } from "bcrypt"
import { generateAccessToken } from "../../providers/token/accessTokenProvider"
import { generateRefreshToken } from "../../providers/token/refreshTokenProvider"

class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ username, password }: ILoginDTO): Promise<ITokens> {
    if (!username || username === "") throw new Error("Wrong credentials.")

    const user = await this.userRepository.getUniqueUser({
      username
    })

    if (!user) throw new Error("Wrong credentials.")

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) throw new Error("Wrong credentials.")

    const accessToken = generateAccessToken({
      id: user.id_user,
      role: user.role
    })

    const refreshToken = generateRefreshToken({
      id: user.id_user,
      role: user.role
    })

    await this.userRepository.update({
      id: user.id_user,
      fields: {
        jid: refreshToken
      }
    })

    return {
      accessToken,
      refreshToken
    }
  }
}

export { LoginUserUseCase }
