import {UserModel} from "../models/UserModel.js";
import {EncodedToken} from "../utility/TokenUtility.js";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import dotenv from 'dotenv';
dotenv.config();

import {EmailSend} from "../utility/EmailUtility.js";
import {UserPasswordModel} from "../models/userPasswordModel.js";
import {OtpModel} from "../models/OtpModel.js";
import cloudinary from "../config/cloudinary.js";


const {JWT_EXPIRE_TIME} = process.env;





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
            userID: userInstance['_id'],
            password: reqBody.password,
            oldPassword: reqBody.password,
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
            message: "Something went wrong!",
            error: err.toString()
        });
    }
};

export const LoginService = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "User not found"
            });
        }

        // 2. Get user's password
        const userPassword = await UserPasswordModel.findOne({ userID: user._id });
        if (!userPassword) {
            return res.status(400).json({
                status: "failed",
                message: "Password record not found"
            });
        }

        // 3. Validate password
        const isPasswordValid = await bcrypt.compare(password, userPassword['password']);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: "failed",
                message: "Password does not match"
            });
        }

        // 4. Create token
        const token = EncodedToken(user['email'], user['_id'], user['role']);

        // 5. Set token in cookie
        const options = {
            maxAge: JWT_EXPIRE_TIME,
            httpOnly: true,
            sameSite: "None",
            secure: false
        };
        res.cookie("token", token, options);

        // 6. Return response
        return res.status(200).json({
            status: "success",
            message: "Login Successfully",
            token: token
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        });
    }
};

export const LogoutService = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            status: "success",
            message: "Logout Successfully"
        });
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        });
    }
}

export const SendOTPService = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "Email not found"
            });
        }

        // Rate limit check
        const now = new Date();
        const existingOtp = await OtpModel.findOne({ email });
        if (existingOtp && now - existingOtp.otpSentAt < 60 * 1000) {
            return res.status(429).json({
                status: "failed",
                message: "Please wait 1 minute before requesting a new code."
            });
        }

        // Generate 6-digit OTP
        const code = Math.floor(100000 + Math.random() * 900000);
        const EmailTo = email;
        const EmailText = `${code}`;
        const EmailSubject = `${process.env.APP_NAME || 'MyApp'} - Email Verification Code`;

        await EmailSend(EmailTo, EmailText, EmailSubject);

        await OtpModel.updateOne(
            { email },
            {
                $set: {
                    otp: code,
                    otpSentAt: now,
                    otpExpireAt: new Date(now.getTime() + 5 * 60 * 1000)
                }
            },
            { upsert: true }
        );

        return res.status(201).json({
            status: "success",
            message: "6-digit code sent successfully"
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        });
    }
};

export const VerifyOTPService = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const record = await OtpModel.findOne({ email });

        if (!record || record.otp !== otp) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid or expired OTP"
            });
        }

        if (new Date() > record.otpExpireAt) {
            await OtpModel.updateOne({ email }, { $set: { otp: null } });

            return res.status(400).json({
                status: "failed",
                message: "OTP expired. Please request a new one."
            });
        }

        // Success
        await OtpModel.updateOne({ email }, { $set: { otp: otp } });

        return res.status(200).json({
            status: "success",
            message: "OTP verified successfully"
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        });
    }
};

export const RecoverPasswordService = async (req, res) => {
    try {
        const {email, password, otp} = req.body;

        const user =  await UserModel.findOne({ email : email });

        if(!user) {
            return res.status(400).json({
                status: "failed",
                message: "Email not found"
            })
        }

        if(password.length < 8) {
            return res.status(400).json({
                status: "failed",
                message: "Password must be at least 8 characters"
            })
        }

        const findUserOtp = await OtpModel.findOne({email: email})
        const validOTP = findUserOtp?.['otp']
        if(validOTP !== otp) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid Otp"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserPasswordModel.updateOne(
            { userID : user._id },
            {
                $set: {
                    password: hashedPassword,
                }
            }
        )

        await OtpModel.updateOne({ email }, {
            $set: {
                otp : null
            }
        })

        return res.status(200).json({
            status: "success",
            message: "Password updated successfully"
        });

    }catch (err){
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        })
    }
}



// user profile update
export const UserReadProfileService = async (req, res) => {
    try {
        const userID =new ObjectId(req.headers['user_id']);

        const matchStage = [
            {
                $match : {_id: userID}
            }
        ]

        const user = await UserModel.aggregate([
            matchStage
        ])

        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "User profile read successfully",
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        });
    }
};

export const UpdateProfileService = async (req, res) => {
    try {
        const userID = req.headers.user_id;
        const reqBody = req.body;
        const file = req.files?.image;

        // Step 1: Get current user
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }

        let imageUrl = user.profileImg;

        // Step 2: If image provided, delete old and upload new one
        if (file && file.data) {
            // Delete old image from Cloudinary
            if (user.profileImg) {
                const segments = user.profileImg.split('/');
                const fileName = segments[segments.length - 1];
                const publicId = `profile_photo/${fileName.split('.')[0]}`;
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (delErr) {
                    console.warn("Failed to delete old image:", delErr.message);
                }
            }

            // Upload new image
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "profile_photo" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(file.data);
            });

            imageUrl = uploadResult.secure_url;
        }

        // Step 3: Update user data
        const result = await UserModel.updateOne(
            { _id: userID },
            {
                $set: {
                    ...reqBody,
                    profileImg: imageUrl
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({
                status: "failed",
                message: "No changes made or user not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Profile updated successfully"
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        });
    }
};

export const UpdatePasswordService = async (req, res) => {
    try{
        const userID = req.headers['user_id'];
        const reqBody = req.body

        const user = await UserModel.findOne({ _id : userID })

        if(!user) {
            return res.status(400).json({
                status: "failed",
                message: "user not found"
            })
        }

        const HashPassword = await bcrypt.hash(reqBody.password, 10);

        const result = await UserPasswordModel.updateOne(
            {userID : userID},
            {$set : {password : HashPassword}}
        )

        if (result.modifiedCount === 0) {
            return res.status(400).json({
                status: "failed",
                message: "No changes made or user not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Profile updated successfully"
        });

    }catch(err){
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong!",
            error: err.toString()
        })
    }
}







