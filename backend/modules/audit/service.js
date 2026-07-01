import { listAuditLogsRepo, writeAuditLogRepo } from './repository.js';

export async function listAuditLogsService(userId) {
  return listAuditLogsRepo(userId);
}

export async function writeAuditLogService(data) {
  return writeAuditLogRepo(data);
}
