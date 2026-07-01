import {
  createPermission as createPermissionRepo,
  deletePermission,
  getPermissionById,
  getPermissionByKey,
  listPermissions,
  updatePermission as updatePermissionRepo,
} from "./repository.js";

export async function listPermissionsService() {
  return listPermissions();
}

export async function createPermissionService(data) {
  const existing = await getPermissionByKey(data.key.toLowerCase());
  if (existing) throw new Error("Permission already exists.");

  return createPermissionRepo({
    key: data.key.toLowerCase(),
    module: data.module,
    action: data.action,
    description: data.description,
  });
}

export async function updatePermissionService(id, data) {
  return updatePermissionRepo(id, data);
}

export async function deletePermissionService(id) {
  return deletePermission(id);
}
