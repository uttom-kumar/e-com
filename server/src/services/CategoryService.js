import {CategoryModel} from "../models/CategoryModel.js";


export const CreateCategoryService = async(req, res) => {
    try{
        const {categoryName} = req.body;
        await CategoryModel.create({
                categoryName : categoryName
        })

        return res.status(201).send({
            success: "success",
            message: "Created successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            status: "failed",
            message: "something went wrong",
            error: err.toString()
        })
    }
}