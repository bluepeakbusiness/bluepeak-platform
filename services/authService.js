import prisma from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

/**
 * Register User
 */
export async function registerUser(data) {

    const { fullName, email, password } = data;

    if (!fullName || !email || !password) {
        throw new Error("All fields are required.");
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("Email already registered.");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            fullName,
            email,
            password: hashedPassword,
            role: "CLIENT"
        }
    });

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    };
}

/**
 * Login User
 */
export async function loginUser(data) {

    const { email, password } = data;

    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const validPassword = await comparePassword(
        password,
        user.password
    );

    if (!validPassword) {
        throw new Error("Invalid email or password.");
    }

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    };
}

/**
 * Get User by ID
 */
export async function getUserById(id) {

    return await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true
        }
    });

}