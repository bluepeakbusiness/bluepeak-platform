import prisma from "../../config/prisma.js";

export async function listRoles() {
  return prisma.role.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      rolePermissions: {
        include: { permission: true },
      },
    },
  });
}

export async function getRoleById(id) {
  return prisma.role.findUnique({
    where: { id },
    include: {
      rolePermissions: {
        include: { permission: true },
      },
    },
  });
}

export async function getRoleByName(name) {
  return prisma.role.findUnique({ where: { name } });
}

export async function createRole(data) {
  return prisma.role.create({ data });
}

export async function updateRole(id, data) {
  return prisma.role.update({ where: { id }, data });
}

export async function deleteRole(id) {
  return prisma.role.delete({ where: { id } });
}

export async function createRolePermission(roleId, permissionId) {
  return prisma.rolePermission.create({ data: { roleId, permissionId } });
}

export async function removeRolePermissions(roleId) {
  return prisma.rolePermission.deleteMany({ where: { roleId } });
}

export async function assignRoleToUser(userId, roleId) {
  return prisma.userRole.create({ data: { userId, roleId } });
}

export async function removeUserRole(userId, roleId) {
  return prisma.userRole.deleteMany({ where: { userId, roleId } });
}
