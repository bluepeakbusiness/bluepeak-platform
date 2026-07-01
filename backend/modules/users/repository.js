import prisma from "../../config/prisma.js";

const userSelect = {
  id: true,
  fullName: true,
  email: true,
  role: true,
  status: true,
  avatar: true,
  preferences: true,
  permissions: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
};

const userWithPasswordSelect = {
  ...userSelect,
  password: true,
};

export async function listUsers() {
  return prisma.user.findMany({
    select: userSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
}

export async function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
    select: userWithPasswordSelect,
  });
}

export async function createUser(data) {
  return prisma.user.create({
    data,
    select: userSelect,
  });
}

export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
    select: userSelect,
  });
}

export async function updatePassword(id, password) {
  return prisma.user.update({
    where: { id },
    data: { password },
    select: userSelect,
  });
}

export async function updateLastLogin(id) {
  return prisma.user.update({
    where: { id },
    data: { lastLoginAt: new Date() },
    select: userSelect,
  });
}

export async function deleteUser(id) {
  return prisma.user.delete({
    where: { id },
  });
}

export async function createAuditLog(data) {
  return prisma.auditLog.create({ data });
}

export async function listAuditLogs(userId) {
  return prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
