import mongoose from "mongoose"

// TODO: define how a short code is stored and when it expires

const shortCodeSchema = new mongoose.Schema({}, { timestamps: true })

export const ShortCode = mongoose.model("ShortCode", shortCodeSchema)
