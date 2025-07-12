import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    otpSentAt: { type: Date, default: Date.now },
    otpExpireAt: { type: Date, required: true }
}, { versionKey: false });

export const OtpModel = mongoose.model("otps", OtpSchema);
