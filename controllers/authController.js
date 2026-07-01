import { loginSchema, registerSchema } from "../modules/auth/validator.js";
import {
    registerUser,
    loginUser,
    getUserById
} from "../services/authService.js";

/**
 * Standard API Response
 */
function sendResponse(res, status, success, message, data = null) {
    return res.status(status).json({
        success,
        message,
        data,
        timestamp: new Date().toISOString()
    });
}

function getErrorMessage(error) {
    return error.issues?.[0]?.message || error.message;
}

/**
 * Register User
 */
export async function register(req, res) {
    try {
        const payload = registerSchema.parse(req.body);
        const result = await registerUser(payload);

        return sendResponse(
            res,
            201,
            true,
            "User registered successfully.",
            result
        );

    } catch (error) {
        return sendResponse(
            res,
            400,
            false,
            getErrorMessage(error)
        );
    }
}

/**
 * Login User
 */
export async function login(req, res) {
    try {
        const payload = loginSchema.parse(req.body);
        const result = await loginUser(payload);

        return sendResponse(
            res,
            200,
            true,
            "Login successful.",
            result
        );

    } catch (error) {
        return sendResponse(
            res,
            401,
            false,
            getErrorMessage(error)
        );
    }
}

/**
 * Current Logged-in User
 */
export async function profile(req, res) {
    try {
        const user = await getUserById(req.user.id);

        if (!user) {
            return sendResponse(
                res,
                404,
                false,
                "User not found."
            );
        }

        return sendResponse(
            res,
            200,
            true,
            "Profile fetched successfully.",
            user
        );

    } catch (error) {
        return sendResponse(
            res,
            500,
            false,
            error.message
        );
    }
}
