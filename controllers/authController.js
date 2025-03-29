const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../model/user');
const Token = require('../model/tokenBlackList');
const validator = require('../middlewares/validator');
const { newError, newResponse } = require('../utils/createResponse');
const { sendPasswordResetEmail } = require('../utils/emailService');

exports.registerHandler = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    
    try {
        await validator.registerValidator(req.body);
        const checkUser = await User.findOne({ email });

        if (checkUser) {
            newError("This email is already registered!", 422);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({ fullname, email, password: hashPassword });
        newResponse(res, 201, "You are registered now!");

    } catch (err) {
        next(err);
    }
}

exports.loginHandler = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        await validator.loginValidator(req.body);
        const user = await User.findOne({ email });

        if (!user) {
            newError("There is no user with this email address!", 404);
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            newError("Email or password is incorrect!", 401);
        }

        const token = JWT.sign({ 
            user: {
                id: user._id.toString(),
                fullname: user.fullname,
                userRole: user.userRole
            }
        }, process.env.JWT_SECRET, { expiresIn: "7d" });

        newResponse(res, 200, "You have logged in successfully!", token);

    } catch (err) {
        next(err);
    }
}

exports.forgetPasswordHandler = async (req, res, next) => {
    const { email } = req.body;

    try {
        await validator.forgetPasswordValidator(req.body);
        const user = await User.findOne({ email });

        if (!user) {
            newError("There is no user with this email address!", 404);
        }

        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        
        const resetLink = `http://${req.get('host')}/auth/reset-password/${token}`;
        
        try {
            await sendPasswordResetEmail(email, resetLink);
            newResponse(res, 200, "Password reset link has been sent to your email.");

        } catch (emailError) {
            console.error("Email sending error:", emailError);
            newError("Failed to send password reset email. Please try again later.", 500);

        }

    } catch (err) {
        next(err);
    }
}

exports.resetPasswordHandler = async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    const token = req.params.token;

    try {
        await validator.resetPasswordValidator(req.body);
        const checkToken = await Token.findOne({ token });

        if (checkToken) {
            newError("Your link has expired!", 410);
        }

        let decodedToken;
        try {
            decodedToken = JWT.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            newError("Invalid or expired token!", 401);
        }

        const user = await User.findOne({ _id: decodedToken.userId });

        if (!user) {
            newError("User not found!", 404);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;
        await user.save();
        await Token.create({ token });

        newResponse(res, 200, "Your password has been changed successfully!");

    } catch (err) {
        next(err);
    }
}

exports.logoutHandler = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    
    try {
        if (!authHeader) {
            newError("Authentication required. Please login first.", 401);
        }

        const token = authHeader.split(" ")[1];
        
        const existingToken = await Token.findOne({ token });
        if (existingToken) {
            newError("You are already logged out. This token is no longer valid.", 400);
        }
        
        await Token.create({ token });
        
        newResponse(res, 200, "You have been successfully logged out!");
        
    } catch (err) {
        next(err);
    }
}
