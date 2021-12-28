import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

export async function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const refreshToken = req.cookies.JID

  if (!refreshToken) return res.status(401).json({ message: "Missing token." })

  try {
    const decoded = await verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    req.body = {
      ...req.body,
      userData: decoded,
      refreshToken
    }

    const userRepository = new UserRepository()

    const storedToken = await userRepository.getUniqueUser({
      id: decoded.sub.toString()
    })

    if (!storedToken) {
      res.clearCookie("JID")

      return res.status(401).json({ message: "Refresh token isn't stored." })
    }

    if (storedToken.jid !== refreshToken) {
      res.clearCookie("JID")

      return res.status(401).json({ message: "Wrong refresh token." })
    }

    next()
  } catch (error) {
    res.clearCookie("JID")

    return res
      .status(401)
      .json({ message: "Invalid session", data: error.message })
  }
}
