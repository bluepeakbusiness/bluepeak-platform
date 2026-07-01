import express from 'express';
import { listAuditLogsHandler, writeAuditLogHandler } from './controller.js';
import { authenticate, authorize } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, authorize('ADMIN', 'CEO'), listAuditLogsHandler);
router.post('/', authenticate, writeAuditLogHandler);

export default router;
