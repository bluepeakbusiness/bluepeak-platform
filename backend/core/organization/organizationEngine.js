import { COMPANY } from "./companyRegistry.js";
import { DEPARTMENTS } from "./departmentRegistry.js";
import { ROLES } from "./roleRegistry.js";
import { HIERARCHY } from "./hierarchy.js";
import { PERMISSIONS } from "./permissions.js";

/**
 * Get Organization Information
 */
export function getOrganization() {
    return {
        company: COMPANY,
        departments: DEPARTMENTS,
        roles: ROLES,
        hierarchy: HIERARCHY,
        permissions: PERMISSIONS,
    };
}

/**
 * Get Company Details
 */
export function getCompany() {
    return COMPANY;
}

/**
 * Get Departments
 */
export function getDepartments() {
    return DEPARTMENTS;
}

/**
 * Get Roles
 */
export function getRoles() {
    return ROLES;
}

/**
 * Get Organization Hierarchy
 */
export function getHierarchy() {
    return HIERARCHY;
}

/**
 * Get Permissions
 */
export function getPermissions() {
    return PERMISSIONS;
}