import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    userID: {type : mongoose.Schema.Types.ObjectId,  required : true},
    password: { type: String, required: true },
}, { timestamps: true, versionKey: false });

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export const UserPasswordModel = mongoose.model('userspassword', UserSchema);
