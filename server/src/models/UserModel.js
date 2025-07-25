import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    profileImg : {type: String, default: ''},
    name : {type: String, required: true},
    birthday : {type: String, required: true},
    email : {type: String, required: true},
    phone : {type: String, required: true},
    gender : {type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {timestamps : true, versionKey : false})

export const UserModel = mongoose.model('users', DataSchema);