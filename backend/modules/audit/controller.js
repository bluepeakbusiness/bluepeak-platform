import { listAuditLogsService, writeAuditLogService } from './service.js';
import { auditLogSchema } from './validator.js';

function sendResponse(res, status, success, message, data = null, errors = null) {
  return res.status(status).json({ success, message, data, errors, timestamp: new Date().toISOString() });
}

export async function listAuditLogsHandler(req, res) {
  try {
    const logs = await listAuditLogsService(req.query.userId || null);
    return sendResponse(res, 200, true, 'Audit logs fetched successfully.', logs);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function writeAuditLogHandler(req, res) {
  try {
    const parsed = auditLogSchema.parse(req.body);
    const log = await writeAuditLogService(parsed);
    return sendResponse(res, 201, true, 'Audit log created successfully.', log);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}
