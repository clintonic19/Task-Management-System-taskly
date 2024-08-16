const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: [true, "Email is already taken"],
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },

    role: {
        type: String,
        required: true,
    },

    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
    }],

    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },

    
}, { timeStamps: true } );

// Encrypt password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword){  
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);