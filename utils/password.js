import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hash Password
 */
export async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare Password
 */
export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}