const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("[DATABASE] MongoDB connected successfully.");

    } catch (err) {
        console.log(`[DATABASE] MongoDB connection error!`);
        console.log(err);
        process.exit(1);

    }
}

module.exports = connectDB;