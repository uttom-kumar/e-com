import {UserModel} from "../models/UserModel.js";
import {CartModel} from "../models/CartModel.js";


export const CreateCartService = async (req, res) => {
    try{
        const userID = req.headers.user_id
        const reqBody = req.body;
        const {productID, color, qty, size} = reqBody;


        const user = await UserModel.findOne({_id : userID})

        if(!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'User not found',
            })
        }

        if(user?.role !== 'user') {
            return res.status(403).json({
                status: 'failed',
                message: 'Only users can add to cart',
            })
        }

        const data = await CartModel.create(
            {userID : userID},
            {
                userID: userID,
                productID : productID,
                color : color,
                qty : qty,
                size : size,
            }
        )

        return res.status(201).json({
            status: 'success',
            message: 'Cart created successfully',
            data :  data,
        })

    }catch(err){
        res.status(500).send({
            status: 'failed',
            message: "Something went wrong",
            error : err.toString()
        })
    }
}