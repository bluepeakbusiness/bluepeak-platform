import { z } from "zod";

const baseUserSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  email: z.string().trim().email("Please provide a valid email."),
  role: z.string().trim().optional(),
  status: z.string().trim().optional(),
  avatar: z.string().trim().optional(),
  preferences: z.record(z.any()).optional(),
  permissions: z.array(z.string().trim()).optional(),
});

export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const updateUserSchema = baseUserSchema.partial();

export const profileUpdateSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required.").optional(),
  avatar: z.string().trim().optional(),
  preferences: z.record(z.any()).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(8, "Password must be at least 8 characters long."),
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().email("Please provide a valid email."),
  newPassword: z.string().min(8, "Password must be at least 8 characters long."),
});

export const inviteUserSchema = baseUserSchema.omit({ role: true }).extend({
  role: z.string().trim().optional(),
});

export const statusSchema = z.object({
  status: z.string().trim().min(1, "Status is required."),
});
