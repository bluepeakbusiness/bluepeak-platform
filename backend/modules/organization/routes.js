import express from 'express';
import {
  createOrganizationHandler,
  deleteOrganizationHandler,
  getOrganizationHandler,
  listOrganizationsHandler,
  updateOrganizationHandler,
} from './controller.js';

const router = express.Router();

router.get('/', listOrganizationsHandler);
router.post('/', createOrganizationHandler);
router.get('/:id', getOrganizationHandler);
router.put('/:id', updateOrganizationHandler);
router.delete('/:id', deleteOrganizationHandler);

export default router;
