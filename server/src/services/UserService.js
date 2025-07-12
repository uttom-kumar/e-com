import {UserModel} from "../models/UserModel.js";
import {EncodedToken} from "../utility/TokenUtility.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import {EmailSend} from "../utility/EmailUtility.js";
import {UserPasswordModel} from "../models/userPasswordModel.js";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




export const RegisterService = async (req, res) => {
    try {
        let reqBody = req.body;
        let user = await UserModel.findOne({ email: reqBody.email });

        if (user) {
            return res.status(400).json({
                status: "failed",
                message: "Email already exists"
            });
        }

        if (reqBody.password?.length < 8) {
            return res.status(400).json({
                status: "failed",
                message: "Password must be at least 8 characters"
            });
        }

        const userInstance = new UserModel(reqBody);

        const passwordInstance = new UserPasswordModel({
            userID: userInstance._id,
            password: reqBody.password
        });

        try {
            await userInstance.save();
            await passwordInstance.save();
        }catch (error) {
            await UserModel.findByIdAndDelete(userInstance._id);
            return res.status(500).json({
                status: "failed",
                message: "Password saving failed, user rolled back",
                error: error.toString()
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Registration successful!"
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: err.toString()
        });
    }
};





