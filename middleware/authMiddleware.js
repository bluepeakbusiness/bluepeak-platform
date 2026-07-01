import prisma from "../config/prisma.js";
import { AuthenticationError, AuthorizationError } from "../utils/errors.js";
import { verifyToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(new AuthenticationError(
                "Authorization header missing.",
                "AUTHORIZATION_HEADER_MISSING"
            ));
        }

        const match = authHeader.match(/^Bearer\s+(\S+)$/i);

        if (!match) {
            return next(new AuthenticationError(
                "Invalid authorization format.",
                "INVALID_AUTHORIZATION_FORMAT"
            ));
        }

        const decoded = verifyToken(match[1]);

        if (!decoded?.id) {
            return next(new AuthenticationError(
                "Invalid or expired token.",
                "INVALID_TOKEN"
            ));
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                status: true,
                deletedAt: true,
            },
        });

        if (!user) {
            return next(new AuthenticationError(
                "User associated with this token no longer exists.",
                "USER_NOT_FOUND"
            ));
        }

        if (user.status !== "ACTIVE" || user.deletedAt) {
            return next(new AuthenticationError(
                "User account is not active.",
                "USER_INACTIVE"
            ));
        }

        req.user = user;

        return next();
    } catch (error) {
        if (["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"].includes(error.name)) {
            return next(new AuthenticationError(
                "Invalid or expired token.",
                "INVALID_TOKEN"
            ));
        }

        return next(error);
    }
}

export function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AuthenticationError());
        }

        if (!roles.includes(req.user.role)) {
            return next(new AuthorizationError());
        }

        return next();
    };
}
