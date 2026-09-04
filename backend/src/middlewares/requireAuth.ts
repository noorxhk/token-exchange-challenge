import type { NextFunction, Request, Response } from "express"
import { User } from "../models/User.model"
import { verifySessionToken } from "../utils/jwt"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        name: string
      }
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization ?? ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : ""

  if (!token) {
    return res.status(401).json({ error: "Missing session token" })
  }

  const payload = verifySessionToken(token)
  if (payload.kind !== "session") {
    return res.status(401).json({ error: "Invalid session token" })
  }

  const user = await User.findById(payload.sub)
  if (!user) {
    return res.status(401).json({ error: "User not found" })
  }

  req.user = { id: user.id, email: user.email, name: user.name }
  return next()
}
