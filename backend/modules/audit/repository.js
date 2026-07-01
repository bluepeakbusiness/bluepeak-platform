import prisma from '../../config/prisma.js';

export async function listAuditLogsRepo(userId) {
  return prisma.auditLog.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { createdAt: 'desc' },
  });
}

export async function writeAuditLogRepo(data) {
  return prisma.auditLog.create({ data });
}
