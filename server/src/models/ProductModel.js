import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: String, required: true},
    discount : {type: Boolean, required: true},
    discountPrice : {type: String, required: true},
    productCode : {type: String, required: true},
    remark : {type: String, default: ''},

    categoryID : {type : mongoose.Types.ObjectId, required: true},
    subCategoryID : {type: mongoose.Types.ObjectId, required: true},
},{timestamps : true, versionKey : false})

export default ProductModel = mongoose.model('products', DataSchema);