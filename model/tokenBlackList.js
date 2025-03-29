const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1200 });

const token = mongoose.model("removedToken", tokenSchema);
module.exports = token;