import {
  changePassword,
  createUser,
  deleteUserById,
  getAuditTrail,
  getProfile,
  getUser,
  inviteUser,
  listUsers,
  resetPassword,
  updateStatus,
  updateUser,
} from "./service.js";
import {
  changePasswordSchema,
  createUserSchema,
  inviteUserSchema,
  profileUpdateSchema,
  resetPasswordSchema,
  statusSchema,
  updateUserSchema,
} from "./validator.js";

function sendResponse(res, status, success, message, data = null) {
  return res.status(status).json({ success, message, data });
}

export async function listUsersHandler(req, res) {
  try {
    const users = await listUsers(req.user);
    return sendResponse(res, 200, true, "Users fetched successfully.", users);
  } catch (error) {
    return sendResponse(res, 403, false, error.message);
  }
}

export async function getUserHandler(req, res) {
  try {
    const user = await getUser(req.params.id, req.user);
    return sendResponse(res, 200, true, "User fetched successfully.", user);
  } catch (error) {
    return sendResponse(res, error.message === "User not found." ? 404 : 403, false, error.message);
  }
}

export async function createUserHandler(req, res) {
  try {
    const parsed = createUserSchema.parse(req.body);
    const user = await createUser(parsed, req.user);
    return sendResponse(res, 201, true, "User created successfully.", user);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function updateUserHandler(req, res) {
  try {
    const parsed = updateUserSchema.parse(req.body);
    const user = await updateUser(req.params.id, parsed, req.user);
    return sendResponse(res, 200, true, "User updated successfully.", user);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function deleteUserHandler(req, res) {
  try {
    const result = await deleteUserById(req.params.id, req.user);
    return sendResponse(res, 200, true, "User deleted successfully.", result);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function profileHandler(req, res) {
  try {
    const profile = await getProfile(req.user.id);
    return sendResponse(res, 200, true, "Profile fetched successfully.", profile);
  } catch (error) {
    return sendResponse(res, 404, false, error.message);
  }
}

export async function updateProfileHandler(req, res) {
  try {
    const parsed = profileUpdateSchema.parse(req.body);
    const profile = await updateUser(req.user.id, parsed, req.user);
    return sendResponse(res, 200, true, "Profile updated successfully.", profile);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function changePasswordHandler(req, res) {
  try {
    const parsed = changePasswordSchema.parse(req.body);
    const result = await changePassword(req.user.id, parsed.currentPassword, parsed.newPassword, req.user);
    return sendResponse(res, 200, true, "Password changed successfully.", result);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function resetPasswordHandler(req, res) {
  try {
    const parsed = resetPasswordSchema.parse(req.body);
    const result = await resetPassword(parsed.email, parsed.newPassword, req.user);
    return sendResponse(res, 200, true, "Password reset successfully.", result);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function inviteUserHandler(req, res) {
  try {
    const parsed = inviteUserSchema.parse(req.body);
    const result = await inviteUser(parsed, req.user);
    return sendResponse(res, 201, true, "User invited successfully.", result);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function updateStatusHandler(req, res) {
  try {
    const parsed = statusSchema.parse(req.body);
    const user = await updateStatus(req.params.id, parsed.status, req.user);
    return sendResponse(res, 200, true, "User status updated successfully.", user);
  } catch (error) {
    return sendResponse(res, 400, false, error.message);
  }
}

export async function auditTrailHandler(req, res) {
  try {
    const logs = await getAuditTrail(req.params.id, req.user);
    return sendResponse(res, 200, true, "Audit trail fetched successfully.", logs);
  } catch (error) {
    return sendResponse(res, 403, false, error.message);
  }
}
