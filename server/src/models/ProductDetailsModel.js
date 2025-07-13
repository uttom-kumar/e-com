import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    img1 : {type : String, required : true},
    img2 : {type : String, required : true},
    img3 : {type : String, required : true},
    img4 : {type : String, required : true},

    color : {type : String, required : true},
    size : {type : String, required : true},

    userID : {type : mongoose.Types.ObjectId, required : true},
    productID: {type : mongoose.Schema.Types.ObjectId,  required : true}

},{timestamps : true, versionKey : false})

export const ProductDetailsModel = mongoose.model('productDetails', DataSchema);