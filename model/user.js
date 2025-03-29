const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    }
}, { timestamps: true });

const user = mongoose.model("User", userSchema);
module.exports = user;