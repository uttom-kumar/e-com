import {UserModel} from "../models/UserModel.js";
import {ProductModel} from "../models/ProductModel.js";


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
            {userID: userID},
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