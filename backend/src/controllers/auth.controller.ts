import type { Request, Response } from "express"
import * as authService from "../services/auth.service"

export async function issueDemoToken(_req: Request, res: Response) {
  const payload = await authService.issueDemoAccessToken()
  return res.json(payload)
}

export async function createShortCode(req: Request, res: Response) {
  const accessToken = String(req.body?.accessToken ?? "")
  if (!accessToken) {
    return res.status(400).json({ error: "accessToken is required" })
  }

  const payload = await authService.createShortCode(accessToken)
  return res.json(payload)
}

export async function loginWithShortCode(req: Request, res: Response) {
  const shortCode = String(req.body?.shortCode ?? "")
  if (!shortCode) {
    return res.status(400).json({ error: "shortCode is required" })
  }

  const payload = await authService.loginWithShortCode(shortCode)
  return res.json(payload)
}

export async function exchangeAuthCode(req: Request, res: Response) {
  const authCode = String(req.body?.authCode ?? "")
  if (!authCode) {
    return res.status(400).json({ error: "authCode is required" })
  }

  const payload = await authService.exchangeAuthCode(authCode)
  return res.json(payload)
}

export async function me(req: Request, res: Response) {
  return res.json({ user: req.user })
}
