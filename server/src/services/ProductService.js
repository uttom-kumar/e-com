import {UserModel} from "../models/UserModel.js";
import ProductModel from "../models/ProductModel.js";


export const CreateProductService = async (req, res) => {
    try{
        const userID = req.headers.user_id
        const {title, description, price, discount, discountPrice, productCode, remark, categoryID, subCategoryID} = req.body



        const user = await UserModel.findOne({userID :  userID});

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

        await ProductModel.create(
            {userID : userID},
            {

            }
        )


    }catch(err){
        res.status(500).json({
            status: "failed",
            message : "something went wrong",
            error : err.toString()
        })
    }
}