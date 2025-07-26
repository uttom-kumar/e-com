import {UserModel} from "../models/UserModel.js";
import {ProductModel} from "../models/ProductModel.js";
import {WishModel} from "../models/WishModel.js";

export const CreateWishService = async (req, res) => {
    try{
        const userID = req.headers.user_id
        console.log(userID)
        const productID = req.params.id

        const user = await UserModel.findOne({_id : userID})
        if(!user) {
            return res.status(400).json({
                status : 'failed',
                message : 'User not found',
            })
        }
        if(user?.role !== 'user') {
            return res.status(400).json({
                status : 'failed',
                message : 'Only users can add to wishlist',
            })
        }

        const exitProduct = await ProductModel.findOne({_id : productID});
        if(!exitProduct){
            return res.status(400).json({
                status : 'failed',
                message : 'Product not found',
            })
        }

        const data = await WishModel.create({
            userID : userID,
            productID : productID,
        })


        return res.status(200).json({
            status : 'success',
            message : 'Wish created successfully',
            data : data,
        })

    }
    catch(err){
        return res.status(500).json({
            status : 'failed',
            message : 'Internal Server Error',
            error : err.toString()
        })
    }
}