import express from "express";
import {
  auditTrailHandler,
  changePasswordHandler,
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  inviteUserHandler,
  listUsersHandler,
  profileHandler,
  resetPasswordHandler,
  updateProfileHandler,
  updateStatusHandler,
  updateUserHandler,
} from "./controller.js";
import { authenticate, authorize } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authenticate, profileHandler);
router.put("/profile", authenticate, updateProfileHandler);
router.patch("/change-password", authenticate, changePasswordHandler);
router.get("/", authenticate, authorize("ADMIN", "CEO"), listUsersHandler);
router.post("/", authenticate, authorize("ADMIN", "CEO"), createUserHandler);
router.post("/invite", authenticate, authorize("ADMIN", "CEO"), inviteUserHandler);
router.post("/reset-password", authenticate, authorize("ADMIN", "CEO"), resetPasswordHandler);
router.get("/:id/audit", authenticate, auditTrailHandler);
router.patch("/:id/status", authenticate, authorize("ADMIN", "CEO"), updateStatusHandler);
router.get("/:id", authenticate, getUserHandler);
router.patch("/:id", authenticate, updateUserHandler);
router.delete("/:id", authenticate, authorize("ADMIN", "CEO"), deleteUserHandler);

export default router;
