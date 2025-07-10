import mongoose from "mongoose"

const DataSchema = mongoose.Schema({
    categoryName : {type : String,  required : true, unique : true},
}, {timestamps : true, versionKey : false})

export const CategoryModel = mongoose.model('categories', DataSchema)