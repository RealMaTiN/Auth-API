const User = require('../model/user');
const { newError } = require('../utils/createResponse');

exports.getHome = (req, res) => {
    res.status(200).json({
        route: "mainRoute", 
        message: "Welcome to the main route!" 
    });

}

exports.getDashboard = async (req, res, next) => {
    const userId = req.userId;
    
    try {
        const user = await User.findOne({ _id: userId }).select("-__v -_id -password -updatedAt");

        if (!user) {
            newError("You need to login first to access this resource", 401);
        }

        res.status(200).json({ route: "DashboardRoute", message: `Welcome ${user.fullname}`, user })

    } catch (err) {
        next(err);

    }
}

exports.getAdminDashboard = async (req, res, next) => {
    const userId = req.userId;
    
    try {
        const user = await User.findOne({ _id: userId }).select("-__v -_id -password -updatedAt");
        
        if (!user) {
            newError("You need to login first to access this resource", 401);
        }

        const allUsers = await User.find({}).select("-__v -_id -password");

        res.status(200).json({ 
            route: "AdminDashboardRoute", 
            message: `Welcome ${user.fullname}`, 
            user,
            allUsers,
            total: allUsers.length
        });

    } catch (err) {
        next(err);

    }
}