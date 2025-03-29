const JWT = require('jsonwebtoken');
const User = require('../model/user');
const Token = require('../model/tokenBlackList');
const { newError } = require('../utils/createResponse');

exports.authenticated = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    try {
        if (!authHeader) {
            newError("Authentication required. Please login first.", 401);
        }

        const token = authHeader.split(" ")[1];

        // Check if token is in blacklist
        const blacklistedToken = await Token.findOne({ token });
        if (blacklistedToken) {
            newError("Invalid or expired token. Please login again.", 401);
        }

        const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            newError("Invalid authentication token.", 401);
        }

        req.userId = decodedToken.user.id;
        next();

    } catch (err) {
        next(err);
    }
}

exports.isAdmin = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    try {
        if (!authHeader) {
            newError("Authentication required. Please login first.", 401);
        }

        const token = authHeader.split(" ")[1];

        // Check if token is in blacklist
        const blacklistedToken = await Token.findOne({ token });
        if (blacklistedToken) {
            newError("Invalid or expired token. Please login again.", 401);
        }

        const decodedToken = JWT.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            newError("Invalid authentication token.", 401);
        }

        const user = await User.findById(decodedToken.user.id).select("userRole");
        if (user.userRole === "admin") {
            next();
        } else {
            newError("Access denied. Admin privileges required.", 403);
        }

    } catch (err) {
        next(err);
    }
}