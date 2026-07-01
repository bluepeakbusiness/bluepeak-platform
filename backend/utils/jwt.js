import "dotenv/config";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET?.trim();

if (!JWT_SECRET) {
    throw new Error("Missing required environment variable: JWT_SECRET");
}

const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Generate JWT Token
 */
export function generateToken(user) {

    return jwt.sign(
        {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: EXPIRES_IN
        }
    );

}

/**
 * Verify JWT Token
 */
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
