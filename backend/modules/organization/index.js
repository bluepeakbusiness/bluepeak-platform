/**
 * BLUEPEAK AI OS
 * Module: organization
 * File: index.js
 */

export { default as routes } from './routes.js';
export {
  organization,
  company,
  departments,
  roles,
  hierarchy,
  permissions,
} from '../../core/organization/organizationController.js';
