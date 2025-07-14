import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    images : [{type : String, required : true}],

    color : {type : String, required : true},
    size : {type : String, required : true},

    userID : {type : mongoose.Types.ObjectId, required : true},
    productID: {type : mongoose.Schema.Types.ObjectId,  required : true}

},{timestamps : true, versionKey : false})

export const ProductDetailsModel = mongoose.model('productDetails', DataSchema);