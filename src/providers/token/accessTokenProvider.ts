import { sign } from "jsonwebtoken"
import { ITokensDTO } from "./ITokens"

export function generateAccessToken({ id, role }: ITokensDTO): string {
  const accessToken = sign({ sub: id, role }, process.env.JWT_AUTH_SECRET, {
    expiresIn: parseInt(process.env.JWT_ACCESS_TIME)
  })

  return accessToken
}
