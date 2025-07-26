import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: Number, required: true},
    discount : {type: Boolean, required: true},
    discountPrice : {type: Number, required: true},
    productCode : {type: String, required: true, unique:true},
    remark : {type: String, default: ''},
    stock : {type: Number, default: '0'},

    userID : {type : mongoose.Types.ObjectId, required: true},
    categoryID : {type : mongoose.Types.ObjectId, required: true},
},{timestamps : true, versionKey : false})

export const ProductModel = mongoose.model('products', DataSchema);