const { newError } = require('../utils/createResponse');

exports.notFound = (req, res, next) => {
    try {
        newError("Route not found. The requested endpoint does not exist.", 404);
    } catch (err) {
        next(err);
    }
}
