export default function errorHandler(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.statusCode || 500;
    const response = {
        success: false,
        message: statusCode === 500 ? "Internal server error." : error.message,
        code: error.code || "INTERNAL_SERVER_ERROR",
    };

    if (error.details) {
        response.details = error.details;
    }

    return res.status(statusCode).json(response);
}
