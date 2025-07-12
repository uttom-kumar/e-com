import mongoose from "mongoose"


const DataSchema = mongoose.Schema({
    subCategoryName : {type : String,  required : true, unique : true},
}, {timestamps : true, versionKey : false})

export const SubCategoryModel = mongoose.model('subcategories', DataSchema)