/**
 * AUTO-GENERATED
 * BLUEPEAK AI OS Route Registry
 */

import express from 'express';

import authRoutes from '../modules/auth/routes.js';
import organizationRoutes from '../modules/organization/routes.js';
import usersRoutes from '../modules/users/routes.js';
import rolesRoutes from '../modules/roles/routes.js';
import permissionsRoutes from '../modules/permissions/routes.js';
import auditRoutes from '../modules/audit/routes.js';
import ceoRoutes from './ceoRoutes.js';
import ceoAgentRoutes from './ceoAgentRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import systemRoutes from './systemRoutes.js';
import registryRoutes from './registryRoutes.js';
import testRoutes from './testRoutes.js';
import messageRoutes from './messageRoutes.js';
import aiRoutes from './aiRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/organization', organizationRoutes);
router.use('/users', usersRoutes);
router.use('/roles', rolesRoutes);
router.use('/permissions', permissionsRoutes);
router.use('/audit', auditRoutes);
router.use('/ceo', ceoRoutes);
router.use('/ceo-agent', ceoAgentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/system', systemRoutes);
router.use('/registry', registryRoutes);
router.use('/messages', messageRoutes);
router.use('/test', testRoutes);
router.use('/ai', aiRoutes);

export default router;
