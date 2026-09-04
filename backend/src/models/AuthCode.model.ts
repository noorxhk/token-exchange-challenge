import mongoose from "mongoose"

// TODO: define how an auth code is stored and when it expires

const authCodeSchema = new mongoose.Schema({}, { timestamps: true })

export const AuthCode = mongoose.model("AuthCode", authCodeSchema)
