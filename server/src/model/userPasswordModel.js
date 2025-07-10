import mongoose from "mongoose"

const DataSchema = mongoose.Schema({
    userID: {type : mongoose.Schema.Types.ObjectId,  required : true},
    password : {type: String, required: true},

}, {timestamps : true, versionKey : false})
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export const WishModel = mongoose.model('wishes', DataSchema)