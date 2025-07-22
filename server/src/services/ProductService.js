import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import {UserModel} from "../models/UserModel.js";
import {ProductModel} from "../models/ProductModel.js";
import {ProductDetailsModel} from "../models/ProductDetailsModel.js";
import cloudinary from "../config/cloudinary.js";
import {CategoryModel} from "../models/CategoryModel.js";



export const CreateProductService = async (req, res) => {
    try{
        const userID = req.headers.user_id
        const reqBody = req.body
        reqBody.userID = userID;
        reqBody.productCode = Math.floor(100000 + Math.random() * 900000).toString()

        if(reqBody.categoryID === undefined){
            return res.status(400).json({
                status: "failed",
                message : 'Category is required'
            })
        }

        const category = await CategoryModel.findOne({_id: reqBody.categoryID})

        if(!category) {
            return res.status(400).json({
                status: "failed",
                message : 'Category not found'
            })
        }

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



        const data = await ProductModel.create(reqBody)

        return res.status(201).json({
            status: "success",
            message : 'Product created successfully',
            data : data
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

        // checked products
        const exitProduct = await ProductModel.findOne({_id : reqBody.productID});
        if(!exitProduct){
            return res.status(400).json({
                status: "failed",
                message : 'Product not found'
            })
        }


        const exitProductDetails = await ProductDetailsModel.findOne({productID : reqBody.productID});
        if(exitProductDetails){
            return res.status(400).json({
                status: "failed",
                message : 'Product Details already exists'
            })
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

        // ✅ Step 1: Validate Admin
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ status: "failed", message: "Only Admins can update product details" });
        }

        // ✅ Step 2: Find existing product details
        const productDetail = await ProductDetailsModel.findOne({
            productID: reqBody.productID,
            userID: userID
        });

        if (!productDetail) {
            return res.status(404).json({ status: "failed", message: "Product details not found" });
        }

        // ✅ Step 3: Handle images
        const rawFiles = req.files?.images;
        const fileArray = Array.isArray(rawFiles) ? rawFiles : rawFiles ? [rawFiles] : [];

        // Initialize updated images array
        const updatedImages = [...productDetail.images];

        for (let i = 0; i < fileArray.length; i++) {
            const file = fileArray[i];
            if (file && file.mimetype?.startsWith("image/")) {
                // Upload new image
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

                // Delete old image from Cloudinary
                const oldImageURL = updatedImages[i];
                if (oldImageURL) {
                    const publicId = oldImageURL.split("/").slice(-1)[0].split(".")[0];
                    await cloudinary.uploader.destroy(`products/${publicId}`);
                }

                // Replace the image at that index
                updatedImages[i] = result.secure_url;
            }
        }

        // ✅ Step 4: Update product detail
        productDetail.images = updatedImages;
        productDetail.color = reqBody.color || productDetail.color;
        productDetail.size = reqBody.size || productDetail.size;
        await productDetail.save();

        return res.status(200).json({
            status: "success",
            message: "Product details updated successfully",
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: err.toString()
        });
    }
};

export const ReadProductDetailService = async (req, res) => {
    try {
        const JoinWithCategoryStage = {
            $lookup : {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        }

        const JoinWithProductDetailStage = {
            $lookup : {
                from: 'productdetails',
                localField: '_id',
                foreignField: 'productID',
                as: 'detail'
            }
        }

        const JoinWithReviewStage = {
            $lookup : {
                from: 'reviews',
                localField: '_id',
                foreignField: 'productID',
                as: 'review'
            }
        }

        const UnwindCategoryStage = {
            $unwind : { path: "$category", preserveNullAndEmptyArrays: true }
        }
        const UnwindProductDetailsStage = {
            $unwind : { path: "$detail", preserveNullAndEmptyArrays: true }
        }
        const UnwindReviewStage = {
            $unwind : { path: "$review", preserveNullAndEmptyArrays: true }
        }

        const projectionStage = {
            $project : {
                'category.createdAt' : 0,
                'category.updatedAt' : 0,
                'detail.createdAt' : 0,
                'detail.updatedAt' : 0,
            }
        }

        const data = await ProductModel.aggregate([
            JoinWithCategoryStage,
            JoinWithProductDetailStage,
            JoinWithReviewStage,
            UnwindCategoryStage,
            UnwindProductDetailsStage,
            UnwindReviewStage,

            projectionStage
        ])

        return res.status(200).json({
            status: "success",
            message: "Product details created successfully",
            data: data
        })

    }
    catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: err.toString()
        })
    }
}

export const ProductDetailService = async (req, res) => {
    try {
        const productID = new ObjectId(req.params.id);

        const MatchStage = {
            $match : {_id: productID}
        }

        const JoinWithCategoryStage = {
            $lookup : {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        }

        const JoinWithProductDetailStage = {
            $lookup : {
                from: 'productdetails',
                localField: '_id',
                foreignField: 'productID',
                as: 'detail'
            }
        }

        const JoinWithReviewStage = {
            $lookup : {
                from: 'reviews',
                localField: '_id',
                foreignField: 'productID',
                as: 'review'
            }
        }

        const JoinWithReviewUserStage = {
            $lookup : {
                from: 'users',
                localField: 'review.userID',
                foreignField: '_id',
                as: 'review.user'
            }
        }

        const UnwindCategoryStage = { $unwind : { path: "$category", preserveNullAndEmptyArrays: true } }
        const UnwindProductDetailsStage = { $unwind : { path: "$detail", preserveNullAndEmptyArrays: true } }
        const UnwindReviewStage = { $unwind : { path: "$review", preserveNullAndEmptyArrays: true } }
        const UnwindReviewUserStage = { $unwind : { path: "$review.user", preserveNullAndEmptyArrays: true } }

        const projectionStage = {
            $project : {
                'category.createdAt' : 0,
                'category.updatedAt' : 0,
                'detail.createdAt' : 0,
                'detail.updatedAt' : 0,
                'review.createdAt' : 0,
                'review.updatedAt' : 0,
                'review.user.createdAt' : 0,
                'review.user.updatedAt' : 0,
                'review.user.role' : 0,
                'review.user.email' : 0,
                'review.user.phone' : 0,
                'review.user.address' : 0,
            }
        }

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithCategoryStage,
            JoinWithProductDetailStage,
            JoinWithReviewStage,
            UnwindCategoryStage,
            UnwindProductDetailsStage,
            UnwindReviewStage,
            JoinWithReviewUserStage,
            UnwindReviewUserStage,

            projectionStage
        ])

        return res.status(200).json({
            status: "success",
            message: "Product details created successfully",
            data: data
        })

    }
    catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: err.toString()
        })
    }
}


