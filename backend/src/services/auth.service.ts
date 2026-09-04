import { User } from "../models/User.model"
import { signAccessToken } from "../utils/jwt"

export class NotImplementedError extends Error {
  constructor(message = "Not implemented") {
    super(message)
    this.name = "NotImplementedError"
  }
}

export async function issueDemoAccessToken() {
  const user = await User.findOne({ email: "demo@example.com" })
  if (!user) {
    throw new Error("Demo user is missing. Run npm run seed.")
  }

  return { accessToken: signAccessToken(user) }
}

export async function createShortCode(_accessToken: string): Promise<{
  shortCode: string
}> {
  throw new NotImplementedError()
}

export async function loginWithShortCode(_shortCode: string): Promise<{
  authCode: string
}> {
  throw new NotImplementedError()
}

export async function exchangeAuthCode(_authCode: string): Promise<{
  token: string
}> {
  throw new NotImplementedError()
}
