import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import { env } from "./config/env"
import { errorHandler } from "./middlewares/errorHandler"
import { authRouter } from "./routes/auth.routes"

const app = express()

app.use(cors({ origin: env.clientOrigin }))
app.use(express.json())
app.get("/health", (_req, res) => res.json({ ok: true }))
app.use("/api/auth", authRouter)
app.use(errorHandler)

async function start() {
  await mongoose.connect(env.mongoUri)
  app.listen(env.port, () => {
    console.log(`API listening on ${env.port}`)
  })
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
