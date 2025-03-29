const authController = require('../controllers/authController');
const { limiter, authLimiter } = require('../utils/rateLimiter');
const { Router } = require("express");
const router = Router();

// @Route --> POST /
// @Desc --> User register route
router.post("/register", limiter, authController.registerHandler);

// @Route --> POST /login
// @Desc --> User login route
router.post("/login", authLimiter, authController.loginHandler);

// @Route --> POST /forget-password
// @Desc --> User forget-password route
router.post("/forget-password", authLimiter, authController.forgetPasswordHandler);

// @Route --> POST /reset-password/:token
// @Desc --> User reset-password route
router.post("/reset-password/:token", authLimiter, authController.resetPasswordHandler);

// @Route --> POST /logout
// @Desc --> User logout route
router.post("/logout", authController.logoutHandler);

module.exports = router;