import {
  assignRoleService,
  cloneRoleService,
  createRoleService,
  deleteRoleService,
  listRolesService,
  removeRoleService,
  updateRoleService,
} from "./service.js";
import { createRoleSchema, updateRoleSchema } from "./validator.js";

function sendResponse(res, status, success, message, data = null, errors = null) {
  return res.status(status).json({ success, message, data, errors, timestamp: new Date().toISOString() });
}

export async function listRolesHandler(req, res) {
  try {
    const roles = await listRolesService();
    return sendResponse(res, 200, true, "Roles fetched successfully.", roles);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function createRoleHandler(req, res) {
  try {
    const parsed = createRoleSchema.parse(req.body);
    const role = await createRoleService(parsed);
    return sendResponse(res, 201, true, "Role created successfully.", role);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function updateRoleHandler(req, res) {
  try {
    const parsed = updateRoleSchema.parse(req.body);
    const role = await updateRoleService(req.params.id, parsed);
    return sendResponse(res, 200, true, "Role updated successfully.", role);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function deleteRoleHandler(req, res) {
  try {
    await deleteRoleService(req.params.id);
    return sendResponse(res, 200, true, "Role deleted successfully.");
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function assignRoleHandler(req, res) {
  try {
    const result = await assignRoleService(req.body.userId, req.body.roleId);
    return sendResponse(res, 200, true, "Role assigned successfully.", result);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function removeRoleHandler(req, res) {
  try {
    const result = await removeRoleService(req.body.userId, req.body.roleId);
    return sendResponse(res, 200, true, "Role removed successfully.", result);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function cloneRoleHandler(req, res) {
  try {
    const role = await cloneRoleService(req.params.id);
    return sendResponse(res, 201, true, "Role cloned successfully.", role);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}
