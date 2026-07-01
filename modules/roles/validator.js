import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().trim().min(2, "Role name is required."),
  displayName: z.string().trim().min(2, "Display name is required."),
  description: z.string().trim().optional(),
  isDefault: z.boolean().optional(),
  isSystem: z.boolean().optional(),
});

export const updateRoleSchema = createRoleSchema.partial();
