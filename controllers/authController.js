import {
    registerUser,
    loginUser,
    getUserById
} from "../services/authService.js";

/**
 * Register
 */
export async function register(req, res) {

    try {

        const result = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            ...result
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

/**
 * Login
 */
export async function login(req, res) {

    try {

        const result = await loginUser(req.body);

        res.json({
            success: true,
            message: "Login successful.",
            ...result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }

}

/**
 * Current User Profile
 */
export async function profile(req, res) {

    try {

        const user = await getUserById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });

        }

        res.json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

}