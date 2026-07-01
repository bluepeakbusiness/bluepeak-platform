import { z } from "zod";

export const createPermissionSchema = z.object({
  key: z.string().trim().min(2, "Permission key is required."),
  module: z.string().trim().min(2, "Module is required."),
  action: z.string().trim().min(2, "Action is required."),
  description: z.string().trim().optional(),
});

export const updatePermissionSchema = createPermissionSchema.partial();
