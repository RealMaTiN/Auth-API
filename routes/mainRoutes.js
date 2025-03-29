const mainController = require('../controllers/mainController');
const { authenticated, isAdmin } = require('../middlewares/auth');
const { limiter } = require('../utils/rateLimiter');
const { Router } = require("express");
const router = Router();

// @Route --> GET /
// @Desc --> Home route
router.get("/", mainController.getHome);

// @Route --> GET /dashboard
// @Desc --> Dashboard route
router.get("/dashboard", limiter, authenticated, mainController.getDashboard);

// @Route --> GET /admin
// @Desc --> Admin dashboard route
router.get("/admin", limiter, authenticated, isAdmin, mainController.getAdminDashboard);

module.exports = router;