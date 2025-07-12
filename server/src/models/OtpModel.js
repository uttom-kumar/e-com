import mongoose from "mongoose"

const DataSchema = mongoose.Schema({
    userID: {type : mongoose.Schema.Types.ObjectId,  required : true}

}, {timestamps : true, versionKey : false})

export const OtpModel = mongoose.model('otp', DataSchema)