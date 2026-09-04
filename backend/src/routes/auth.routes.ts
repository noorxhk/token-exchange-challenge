import { Router } from "express"
import * as authController from "../controllers/auth.controller"
import { asyncHandler } from "../middlewares/asyncHandler"
import { requireAuth } from "../middlewares/requireAuth"

export const authRouter = Router()

authRouter.post("/demo-token", asyncHandler(authController.issueDemoToken))
authRouter.post("/short-code", asyncHandler(authController.createShortCode))
authRouter.post("/login", asyncHandler(authController.loginWithShortCode))
authRouter.post("/token", asyncHandler(authController.exchangeAuthCode))
authRouter.get("/me", asyncHandler(requireAuth), asyncHandler(authController.me))
