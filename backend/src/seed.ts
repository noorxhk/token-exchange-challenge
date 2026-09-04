import mongoose from "mongoose"
import { env } from "./config/env"
import { User } from "./models/User.model"

async function seed() {
  await mongoose.connect(env.mongoUri)

  await User.findOneAndUpdate(
    { email: "demo@example.com" },
    { email: "demo@example.com", name: "Demo User" },
    { upsert: true, new: true },
  )

  console.log("Seeded demo@example.com")
  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
