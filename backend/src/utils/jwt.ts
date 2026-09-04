import jwt from "jsonwebtoken"
import { env } from "../config/env"
import type { UserDocument } from "../models/User.model"

export type AccessTokenPayload = {
  sub: string
  email: string
  kind: "access"
}

export type SessionTokenPayload = {
  sub: string
  email: string
  kind: "session"
}

export function signAccessToken(user: UserDocument) {
  const payload: AccessTokenPayload = {
    sub: user.id,
    email: user.email,
    kind: "access",
  }

  return jwt.sign(payload, env.jwtSecret, { expiresIn: "20m" })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as AccessTokenPayload
}

export function signSessionToken(user: UserDocument) {
  const payload: SessionTokenPayload = {
    sub: user.id,
    email: user.email,
    kind: "session",
  }

  return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" })
}

export function verifySessionToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as SessionTokenPayload
}
