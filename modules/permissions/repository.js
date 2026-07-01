import prisma from "../../config/prisma.js";

export async function listPermissions() {
  return prisma.permission.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPermissionById(id) {
  return prisma.permission.findUnique({ where: { id } });
}

export async function getPermissionByKey(key) {
  return prisma.permission.findUnique({ where: { key } });
}

export async function createPermission(data) {
  return prisma.permission.create({ data });
}

export async function updatePermission(id, data) {
  return prisma.permission.update({ where: { id }, data });
}

export async function deletePermission(id) {
  return prisma.permission.delete({ where: { id } });
}
