import mongoose from "mongoose"

export type UserDocument = mongoose.Document & {
  email: string
  name: string
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
)

export const User = mongoose.model<UserDocument>("User", userSchema)
