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

/**
 * Register User
 */
export async function register(req, res) {
    try {
        const result = await registerUser(req.body);

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
            error.message
        );
    }
}

/**
 * Login User
 */
export async function login(req, res) {
    try {
        const result = await loginUser(req.body);

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
            error.message
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