import prisma from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

/**
 * Normalize Email
 */
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

/**
 * Build Safe User Object
 */
function buildUserResponse(user) {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    };
}

/**
 * Register User
 */
export async function registerUser(data) {
    const { fullName, email, password } = data;

    if (!fullName?.trim()) {
        throw new Error("Full name is required.");
    }

    if (!email?.trim()) {
        throw new Error("Email is required.");
    }

    if (!password) {
        throw new Error("Password is required.");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }

    const normalizedEmail = normalizeEmail(email);

    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (existingUser) {
        throw new Error("Email already registered.");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "CLIENT",
        },
    });

    return {
        token: generateToken(user),
        user: buildUserResponse(user),
    };
}

/**
 * Login User
 */
export async function loginUser(data) {
    const { email, password } = data;

    if (!email?.trim()) {
        throw new Error("Email is required.");
    }

    if (!password) {
        throw new Error("Password is required.");
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const passwordMatched = await comparePassword(
        password,
        user.password
    );

    if (!passwordMatched) {
        throw new Error("Invalid email or password.");
    }

    return {
        token: generateToken(user),
        user: buildUserResponse(user),
    };
}

/**
 * Get User Profile
 */
export async function getUserById(id) {
    return prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
}