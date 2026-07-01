import {
  assignRoleToUser,
  createRole as createRoleRepo,
  createRolePermission,
  deleteRole,
  getRoleById,
  getRoleByName,
  listRoles,
  removeRolePermissions,
  removeUserRole,
  updateRole as updateRoleRepo,
} from "./repository.js";

export async function listRolesService() {
  return listRoles();
}

export async function createRoleService(data) {
  const existing = await getRoleByName(data.name.toLowerCase());
  if (existing) throw new Error("Role already exists.");

  const role = await createRoleRepo({
    name: data.name.toLowerCase(),
    displayName: data.displayName,
    description: data.description,
    isDefault: data.isDefault || false,
    isSystem: data.isSystem || false,
  });

  return role;
}

export async function updateRoleService(id, data) {
  return updateRoleRepo(id, data);
}

export async function deleteRoleService(id) {
  return deleteRole(id);
}

export async function assignRoleService(userId, roleId) {
  return assignRoleToUser(userId, roleId);
}

export async function removeRoleService(userId, roleId) {
  return removeUserRole(userId, roleId);
}

export async function cloneRoleService(id) {
  const role = await getRoleById(id);
  if (!role) throw new Error("Role not found.");

  const cloned = await createRoleRepo({
    name: `${role.name}-copy`,
    displayName: `${role.displayName} Copy`,
    description: role.description,
    isDefault: false,
    isSystem: false,
  });

  for (const permission of role.rolePermissions) {
    await createRolePermission(cloned.id, permission.permissionId);
  }

  return cloned;
}
