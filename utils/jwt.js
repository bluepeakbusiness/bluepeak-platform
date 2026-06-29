import jwt from "jsonwebtoken";

const JWT_SECRET =
    process.env.JWT_SECRET || "BLUEPEAK_AI_SECRET_KEY";

const EXPIRES_IN = "7d";

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

    try {

        return jwt.verify(token, JWT_SECRET);

    } catch {

        return null;

    }

}