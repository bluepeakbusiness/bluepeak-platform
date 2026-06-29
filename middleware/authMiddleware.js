import { verifyToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Authorization header missing."
            });

        }

        if (!authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Invalid authorization format."
            });

        }

        const token = authHeader.split(" ")[1];

        const user = verifyToken(token);

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid or expired token."
            });

        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Authentication failed."
        });

    }

}

/**
 * Role Authorization
 *
 * Example:
 * authorize("ADMIN")
 * authorize("CEO","ADMIN")
 */
export function authorize(...roles) {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized."
            });

        }

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access denied."
            });

        }

        next();

    };

}eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtcXhwbXdmbzAwMDB2OTR3OGN6Y2hqOGwiLCJmdWxsTmFtZSI6IkFtaXIgU2hhaWtoIiwiZW1haWwiOiJhbWlyQHRlc3QuY29tIiwicm9sZSI6IkNMSUVOVCIsImlhdCI6MTc4MjY0NzMyMywiZXhwIjoxNzgzMjUyMTIzfQ.CYoudRICMrMAxR_r703YtXAq5sxo-Url0vbuHzv9ShE