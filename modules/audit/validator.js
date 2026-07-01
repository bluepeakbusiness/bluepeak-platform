import { z } from 'zod';

export const auditLogSchema = z.object({
  userId: z.string().trim().optional(),
  actorId: z.string().trim().optional(),
  action: z.string().trim().min(2, 'Action is required.'),
  entity: z.string().trim().optional(),
  details: z.string().trim().optional(),
  ipAddress: z.string().trim().optional(),
  browser: z.string().trim().optional(),
  operatingSystem: z.string().trim().optional(),
});
