import {
  createPermissionService,
  deletePermissionService,
  listPermissionsService,
  updatePermissionService,
} from "./service.js";
import { createPermissionSchema, updatePermissionSchema } from "./validator.js";

function sendResponse(res, status, success, message, data = null, errors = null) {
  return res.status(status).json({ success, message, data, errors, timestamp: new Date().toISOString() });
}

export async function listPermissionsHandler(req, res) {
  try {
    const permissions = await listPermissionsService();
    return sendResponse(res, 200, true, "Permissions fetched successfully.", permissions);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function createPermissionHandler(req, res) {
  try {
    const parsed = createPermissionSchema.parse(req.body);
    const permission = await createPermissionService(parsed);
    return sendResponse(res, 201, true, "Permission created successfully.", permission);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function updatePermissionHandler(req, res) {
  try {
    const parsed = updatePermissionSchema.parse(req.body);
    const permission = await updatePermissionService(req.params.id, parsed);
    return sendResponse(res, 200, true, "Permission updated successfully.", permission);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function deletePermissionHandler(req, res) {
  try {
    await deletePermissionService(req.params.id);
    return sendResponse(res, 200, true, "Permission deleted successfully.");
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}
