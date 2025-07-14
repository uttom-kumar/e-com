import {UserModel} from "../models/UserModel.js";
import {ProductModel} from "../models/ProductModel.js";
import {ProductDetailsModel} from "../models/ProductDetailsModel.js";
import cloudinary from "../config/cloudinary.js";


export const CreateProductService = async (req, res) => {
    try{
        const userID = req.headers.user_id
        const reqBody = req.body
        reqBody.userID = userID;
        reqBody.productCode = Math.floor(100000 + Math.random() * 900000).toString()


        const user = await UserModel.findOne({_id : userID});

        if(!user){
            return res.status(400).json({
                status: "failed",
                message : 'User not found'
            })
        }

        if(user?.role !== 'admin'){
            return res.status(400).json({
                status: 'failed',
                message : 'Just Admin create Products'
            })
        }

        await ProductModel.create(reqBody)

        return res.status(201).json({
            status: "success",
            message : 'Product created successfully'
        })

    }catch(err){
        res.status(500).json({
            status: "failed",
            message : "something went wrong",
            error : err.toString()
        })
    }
}

export const UpdateProductService = async (req, res) => {
    try {
        const userID = req.headers.user_id
        const reqBody = req.body

        const user = await UserModel.findOne({_id : userID});
        if(!user){
            return res.status(400).json({
                status: "failed",
                message : 'User not found'
            })
        }
        if(user?.role !== 'admin'){
            return res.status(400).json({
                status: 'failed',
                message : 'Just Admin updated'
            })
        }

        await ProductModel.updateOne(
            {_id : reqBody.productID, userID: userID},
            {
                $set:reqBody,
            }
        )

        return res.status(201).json({
            status: "success",
            message : 'Product updated successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            status: "failed",
            message : "something went wrong",
            error : err.toString()
        })
    }
}

export const CreateProductDetailService = async (req, res) => {
    try {
        const userID = req.headers.user_id;
        const reqBody = req.body;

        // ✅ Step 1: Validate Admin
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ status: "failed", message: "Only Admins can create product details" });
        }

        // ✅ Step 2: Validate Images
        const rawFiles = req.files?.images;
        if (!rawFiles) {
            return res.status(400).json({ status: "failed", message: "At least one image is required" });
        }

        const fileArray = Array.isArray(rawFiles) ? rawFiles : [rawFiles];
        const validFiles = fileArray.filter(f => f && f.mimetype?.startsWith("image/"));

        if (validFiles.length === 0) {
            return res.status(400).json({ status: "failed", message: "No valid image files found" });
        }

        if (validFiles.length > 4) {
            return res.status(400).json({ status: "failed", message: "Maximum 4 images are allowed" });
        }

        // ✅ Step 3: Upload Images to Cloudinary
        const uploadedImages = [];
        for (const file of validFiles) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "products" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(file.data);
            });

            uploadedImages.push(result.secure_url);
        }

        // ✅ Step 4: Insert into DB
        const productDetail = {
            images: uploadedImages, // schema e img1 array
            color: reqBody.color,
            size: reqBody.size,
            userID : userID,
            productID: reqBody.productID
        };

        await ProductDetailsModel.create(productDetail);

        return res.status(201).json({
            status: "success",
            message: "Product details created successfully",
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: err.message || err.toString()
        });
    }
};


export const UpdateProductDetailsService = async (req, res) => {
    try {
        const userID = req.headers.user_id;

        const reqBody = req.body;
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }



    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "something went wrong",
            error: err.toString()
        })
    }
}
