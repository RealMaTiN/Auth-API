const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 3,
    message: { statusCode: 429, message: "Too many requests. Please try again after 10 seconds." }
});

exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { statusCode: 429, message: "Too many authentication attempts. Please try again after 15 minutes." }
});