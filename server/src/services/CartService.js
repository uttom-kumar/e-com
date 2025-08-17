import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import {UserModel} from "../models/UserModel.js";
import {CartModel} from "../models/CartModel.js";


export const CreateCartService = async (req, res) => {
    try{
        const productID = req.params.id;
        const userID = req.headers.user_id
        const reqBody = req.body;
        const {color, qty, size} = reqBody;


        const user = await UserModel.findOne({_id : userID})

        if(!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found',
            })
        }

        if(user?.role !== 'user') {
            return res.status(400).json({
                status: 'failed',
                message: 'Only users can add to cart',
            })
        }

        // Check if the product is already in the cart
        const existingCartItem = await CartModel.findOne({ productID: productID, userID: userID });

        if (existingCartItem) {
            existingCartItem.qty += qty;
            existingCartItem.color = color;
            existingCartItem.size = size;
            await existingCartItem.save();

            return res.status(201).json({
                status: 'success',
                message: 'Cart quantity updated successfully',
                data: existingCartItem,
            });
        }

        // If not in cart, create new item
        const newCartItem = await CartModel.create({
            userID,
            productID,
            color,
            qty,
            size,
        });

        return res.status(201).json({
            status: 'success',
            message: 'Cart created successfully',
            data: newCartItem,
        });

    }catch(err){
        res.status(500).send({
            status: 'failed',
            message: "Something went wrong",
            error : err.toString()
        })
    }
}

export const DeleteCartService = async (req, res) => {
    try{
        const cartID = req.params.id;
        const userID = req.headers.user_id;
        const user = await UserModel.findOne({_id : userID})

        if(!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found',
            })
        }

        const Cart = await CartModel.findOne({_id : cartID, userID : userID})
        if(!Cart) {
            return res.status(400).json({
                status: 'failed',
                message: 'Cart not found',
            })
        }

        await Cart.deleteOne({_id : cartID, userID : userID})
        return res.status(200).json({
            status: 'success',
            message: 'Cart deleted successfully',
        })
    }
    catch(err){
        res.status(500).send({
            status: 'failed',
            message: "Something went wrong",
            error : err.toString()
        })
    }
}

export const UpdateCartService = async (req, res) => {
    try{
        const cartID = req.params.id;
        const userID = req.headers.user_id;
        const reqBody = req.body;
        const {productID, color, qty, size} = reqBody;

        const user = await UserModel.findOne({_id : userID})
        if(!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found',
            })
        }

        const Cart = await CartModel.findOne({_id : cartID, userID : userID})
        if(!Cart) {
            return res.status(400).json({
                status: 'failed',
                message: 'Cart not found',
            })
        }

        await CartModel.updateOne(
            {_id : cartID, userID : userID},
            {
                $set: {
                    color : color,
                    qty : qty,
                    size : size,
                }
            }
        )
        return res.status(200).json({
            status: 'success',
            message: 'Cart updated successfully',
        })

    }catch(err){
        res.status(500).send({
            status: 'failed',
            message: "Something went wrong",
            error : err.toString()
        })
    }
}

export const ReadCartService = async (req, res) => {
    try{
        const userID = new ObjectId(req.headers.user_id);
        const MatchStage = {
            $match : {userID : userID}
        }

        const user = await UserModel.findOne({_id : userID})
        if(!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found',
            })
        }

        const JoinWithProductStage = {
            $lookup : {
                from: 'products',
                localField: 'productID',
                foreignField: '_id',
                as: 'product'
            }
        }

        const JoinWithProductDetailStage = {
            $lookup : {
                from: 'productdetails',
                localField: 'productID',
                foreignField: 'productID',
                as: 'productDetail'
            }
        }

        const projectionStage = {
            $project : {
                'createdAt' : 0,
                'updatedAt' : 0,
                'product.createdAt' : 0,
                'product.updatedAt' : 0,
                'product.userID' : 0,
                'product.categoryID' : 0,
                'product.description' : 0,
                'productDetail.createdAt' : 0,
                'productDetail.updatedAt' : 0,
                'productDetail.productID' : 0,
                'productDetail.userID' : 0,
            }
        }


        const UnwindProductStage = {$unwind : {path : "$product", preserveNullAndEmptyArrays : true}}
        const UnwindProductDetailStage = {$unwind : {path : "$productDetail", preserveNullAndEmptyArrays : true}}

        const data = await CartModel.aggregate([
            MatchStage,
            JoinWithProductStage,
            JoinWithProductDetailStage,

            UnwindProductStage,
            UnwindProductDetailStage,

            projectionStage,
        ])
        return res.status(200).json({
            status: 'success',
            message: 'Cart read successfully',
            data : data,
        })
    }
    catch(err){
        res.status(500).send({
            status: 'failed',
            message: "Something went wrong",
            error : err.toString()
        })
    }
}