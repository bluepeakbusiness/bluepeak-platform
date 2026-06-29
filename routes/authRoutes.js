import express from "express";

import {
    register,
    login,
    profile
} from "../controllers/authController.js";

import {
    authenticate
} from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Register User
 * POST /api/auth/register
 */
router.post("/register", register);

/**
 * Login User
 * POST /api/auth/login
 */
router.post("/login", login);

/**
 * Current Logged-in User
 * GET /api/auth/profile
 */
router.get("/profile", authenticate, profile);

export default router;