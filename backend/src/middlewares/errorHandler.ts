import type { NextFunction, Request, Response } from "express"
import { NotImplementedError } from "../services/auth.service"

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof NotImplementedError) {
    return res.status(501).json({ error: "Not implemented" })
  }

  if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Invalid token" })
  }

  return res.status(500).json({ error: error.message || "Server error" })
}
