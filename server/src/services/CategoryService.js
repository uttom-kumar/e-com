import {CategoryModel} from "../models/CategoryModel.js";
import cloudinary from "../config/cloudinary.js";


export const CreateCategoryService = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const file = req.files?.image;

        const category = await CategoryModel.findOne({categoryName:categoryName});

        if (category) {
            return res.status(400).json({
                status: "failed",
                message:"Category name already exists. Please choose a different name."
            });
        }

        // ✅ Check image file
        if (!file || !file.mimetype.startsWith("image/")) {
            return res.status(400).json({
                status: "failed",
                message: "A valid image file is required"
            });
        }

        // ✅ Upload to Cloudinary (folder: categories)
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "categories" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(file.data);
        });

        // ✅ Save to MongoDB
        await CategoryModel.create({
            categoryName,
            image: result.secure_url
        });

        return res.status(201).json({
            status: "success",
            message: "Category created successfully"
        });

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: "Something went wrong",
            error: err.message || err.toString()
        });
    }
};