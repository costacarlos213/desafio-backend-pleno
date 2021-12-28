import { sign } from "jsonwebtoken"
import { ITokensDTO } from "./ITokens"

export function generateRefreshToken({ id, role }: ITokensDTO): string {
  const accessToken = sign({ sub: id, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TIME
  })

  return accessToken
}
