import mongoose from "mongoose"

const DataSchema = mongoose.Schema({
    image : {type : String, required : true},
    categoryName : {type : String,  required : true, unique : true},
}, {timestamps : true, versionKey : false})

export const CategoryModel = mongoose.model('categories', DataSchema)