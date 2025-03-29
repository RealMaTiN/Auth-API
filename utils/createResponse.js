exports.newError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
}

exports.newResponse = (res, statusCode, message, token, link) => {
    return res.status(statusCode).json({ statusCode, message, token, link });
}