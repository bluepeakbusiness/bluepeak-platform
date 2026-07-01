/**
 * Middleware : notFound
 */

export default function(req, res, next) {
    res.status(404).json({
        success: false,
        message: "Route not found.",
        code: "ROUTE_NOT_FOUND"
    });
}
