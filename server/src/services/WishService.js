import {UserModel} from "../models/UserModel.js";
import {ProductModel} from "../models/ProductModel.js";
import {WishModel} from "../models/WishModel.js";


import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const SaveWishService = async (req, res) => {
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

        const data = await WishModel.updateOne(
            {userID : userID, productID : productID},
            {
                $set : {
                    userID : userID,
                    productID : productID,
                }
            },
            {upsert : true}
        )


        return res.status(201).json({
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

export const ReadWishListService = async (req, res) => {
    try{
        const userID = new ObjectId(req.headers.user_id)

        const MatchStage = {
            $match : {userID : userID}
        }

        const user = await UserModel.findById(userID)
        if(!user) {
            return res.status(400).json({
                status : 'failed',
                message : 'User not found',
            })
        }

        const JoinWithProductStage = {
            $lookup : {
                from : 'products',
                localField : 'productID',
                foreignField : '_id',
                as : 'product'
            }
        }

        const JoinWithProductDetailStage = {
            $lookup : {
                from : 'productdetails',
                localField : 'productID',
                foreignField : 'productID',
                as : 'productDetail'
            }
        }

        // const JoinWithReviewStage = {
        //     $lookup : {
        //         from : 'reviews',
        //         localField : 'productID',
        //         foreignField : 'productID',
        //         as : 'review'
        //     }
        // }

        const UnwindProductStage = {$unwind : {path : "$product", preserveNullAndEmptyArrays : true}}
        const UnwindProductDetailStage = {$unwind : {path : "$productDetail", preserveNullAndEmptyArrays : true}}
        // const UnwindReviewStage = {$unwind : {path : "$review", preserveNullAndEmptyArrays : true}}
        const ProjectionStage = {
            $project : {
                'createdAt' : 0,
                'updatedAt' : 0,
                'product.remark' : 0,
                'product.stock' : 0,
                'product.createdAt' : 0,
                'product.updatedAt' : 0,
                'productDetail.color':0,
                'productDetail.size':0,
                'productDetail.userID':0,
                'productDetail._id':0,
                'productDetail.createdAt':0,
                'productDetail.updatedAt':0,
                'productDetail.productID':0,
            }
        }

        const data = await WishModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            JoinWithProductDetailStage,
            // JoinWithReviewStage,

            UnwindProductStage,
            UnwindProductDetailStage,
            // UnwindReviewStage,
            ProjectionStage,
        ])

        return res.status(200).json({
            status : "success",
            message : "Wishlist Read Successfully",
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

export const DeleteWishListService = async (req, res) => {
    try{
        const userID = req.headers.user_id
        const productID = req.params.id
        const user = await UserModel.findById(userID)
        if(!user) {
            return res.status(400).json({
                status : 'failed',
                message : 'User not found',
            })
        }
        const data = await WishModel.deleteOne({userID : userID, productID : productID})
        if(data.deletedCount===0) {
            return res.status(400).json({
                status : 'failed',
                message : 'Wishlist item not found or already deleted',
            })
        }
        return res.status(200).json({
                status : 'success',
                message : 'Wish deleted successfully',
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