import {
  createAuditLog,
  createUser as createUserRepo,
  deleteUser,
  getUserByEmail,
  getUserById,
  listAuditLogs,
  listUsers as listUsersRepo,
  updateLastLogin,
  updatePassword,
  updateUser as updateUserRepo,
} from "./repository.js";
import { comparePassword, hashPassword } from "../../utils/password.js";

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function createTemporaryPassword() {
  return `Temp-${Math.random().toString(36).slice(2, 10)}!A`;
}

function serializeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    status: user.status,
    avatar: user.avatar,
    preferences: user.preferences,
    permissions: user.permissions,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function recordAudit(actorId, userId, action, details) {
  if (!actorId && !userId) return;

  await createAuditLog({
    actorId,
    userId,
    action,
    details: typeof details === "string" ? details : JSON.stringify(details),
  });
}

export async function listUsers(actor) {
  if (!actor || !["ADMIN", "CEO"].includes(actor.role)) {
    throw new Error("Only administrators can list users.");
  }

  const users = await listUsersRepo();
  return users.map(serializeUser);
}

export async function getUser(id, actor) {
  const user = await getUserById(id);

  if (!user) {
    throw new Error("User not found.");
  }

  if (actor?.id !== id && !["ADMIN", "CEO"].includes(actor?.role)) {
    throw new Error("Forbidden.");
  }

  return serializeUser(user);
}

export async function getProfile(id) {
  const user = await getUserById(id);
  if (!user) {
    throw new Error("User not found.");
  }

  return serializeUser(user);
}

export async function createUser(data, actor) {
  if (!actor || !["ADMIN", "CEO"].includes(actor.role)) {
    throw new Error("Only administrators can create users.");
  }

  const normalizedEmail = normalizeEmail(data.email);
  const existingUser = await getUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("A user with that email already exists.");
  }

  const hashedPassword = await hashPassword(data.password);
  const user = await createUserRepo({
    fullName: data.fullName.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: data.role || "CLIENT",
    status: data.status || "ACTIVE",
    avatar: data.avatar,
    preferences: data.preferences || {},
    permissions: data.permissions || [],
  });

  await recordAudit(actor.id, user.id, "CREATE_USER", {
    email: normalizedEmail,
    role: user.role,
  });

  return serializeUser(user);
}

export async function updateUser(id, data, actor) {
  const user = await getUserById(id);

  if (!user) {
    throw new Error("User not found.");
  }

  const isAdmin = ["ADMIN", "CEO"].includes(actor?.role);
  const isSelf = actor?.id === id;

  if (!isAdmin && !isSelf) {
    throw new Error("Forbidden.");
  }

  if (!isAdmin) {
    const restrictedFields = ["role", "status", "permissions"];
    const attemptedRestricted = restrictedFields.filter((field) => Object.prototype.hasOwnProperty.call(data, field));

    if (attemptedRestricted.length) {
      throw new Error("You can only update your profile information.");
    }
  }

  const updateData = { ...data };

  if (updateData.email) {
    const normalizedEmail = normalizeEmail(updateData.email);
    const existingUser = await getUserByEmail(normalizedEmail);

    if (existingUser && existingUser.id !== id) {
      throw new Error("A user with that email already exists.");
    }

    updateData.email = normalizedEmail;
  }

  if (updateData.fullName) {
    updateData.fullName = updateData.fullName.trim();
  }

  const updatedUser = await updateUserRepo(id, updateData);
  await recordAudit(actor.id, id, "UPDATE_USER", {
    fields: Object.keys(updateData),
  });

  return serializeUser(updatedUser);
}

export async function deleteUserById(id, actor) {
  if (!actor || !["ADMIN", "CEO"].includes(actor.role)) {
    throw new Error("Only administrators can delete users.");
  }

  const user = await getUserById(id);
  if (!user) {
    throw new Error("User not found.");
  }

  await deleteUser(id);
  await recordAudit(actor.id, id, "DELETE_USER", { deletedUser: user.email });

  return { deleted: true, id };
}

export async function changePassword(id, currentPassword, newPassword, actor) {
  const user = await getUserByEmail((await getUserById(id))?.email || "");

  if (!user) {
    throw new Error("User not found.");
  }

  if (actor?.id !== id) {
    throw new Error("You can only change your own password.");
  }

  const passwordMatches = await comparePassword(currentPassword, user.password);

  if (!passwordMatches) {
    throw new Error("Current password is incorrect.");
  }

  const hashedPassword = await hashPassword(newPassword);
  await updatePassword(id, hashedPassword);
  await recordAudit(actor.id, id, "CHANGE_PASSWORD", { changed: true });

  return { success: true };
}

export async function resetPassword(email, newPassword, actor) {
  if (!actor || !["ADMIN", "CEO"].includes(actor.role)) {
    throw new Error("Only administrators can reset passwords.");
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await getUserByEmail(normalizedEmail);

  if (!user) {
    throw new Error("User not found.");
  }

  const hashedPassword = await hashPassword(newPassword);
  await updatePassword(user.id, hashedPassword);
  await recordAudit(actor.id, user.id, "RESET_PASSWORD", {
    email: normalizedEmail,
  });

  return { success: true };
}

export async function inviteUser(data, actor) {
  if (!actor || !["ADMIN", "CEO"].includes(actor.role)) {
    throw new Error("Only administrators can invite users.");
  }

  const normalizedEmail = normalizeEmail(data.email);
  const existingUser = await getUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("A user with that email already exists.");
  }

  const tempPassword = createTemporaryPassword();
  const hashedPassword = await hashPassword(tempPassword);
  const user = await createUserRepo({
    fullName: data.fullName.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: data.role || "CLIENT",
    status: "INVITED",
    avatar: data.avatar,
    preferences: data.preferences || {},
    permissions: data.permissions || [],
  });

  await recordAudit(actor.id, user.id, "INVITE_USER", {
    email: normalizedEmail,
    role: user.role,
  });

  return {
    user: serializeUser(user),
    temporaryPassword: tempPassword,
  };
}

export async function updateStatus(id, status, actor) {
  if (!actor || !["ADMIN", "CEO"].includes(actor.role)) {
    throw new Error("Only administrators can change user status.");
  }

  const user = await getUserById(id);
  if (!user) {
    throw new Error("User not found.");
  }

  const updatedUser = await updateUserRepo(id, { status });
  await recordAudit(actor.id, id, "UPDATE_STATUS", { status });

  return serializeUser(updatedUser);
}

export async function getAuditTrail(id, actor) {
  const user = await getUserById(id);
  if (!user) {
    throw new Error("User not found.");
  }

  if (actor?.id !== id && !["ADMIN", "CEO"].includes(actor?.role)) {
    throw new Error("Forbidden.");
  }

  return listAuditLogs(id);
}

export async function loginUser(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const user = await getUserByEmail(normalizedEmail);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const passwordMatches = await comparePassword(password, user.password);
  if (!passwordMatches) {
    throw new Error("Invalid email or password.");
  }

  await updateLastLogin(user.id);
  await recordAudit(user.id, user.id, "LOGIN", { email: normalizedEmail });

  return serializeUser(await getUserById(user.id));
}
