import express from "express";
import {
  createPermissionHandler,
  deletePermissionHandler,
  listPermissionsHandler,
  updatePermissionHandler,
} from "./controller.js";
import { authenticate, authorize } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("ADMIN", "CEO"), listPermissionsHandler);
router.post("/", authenticate, authorize("ADMIN", "CEO"), createPermissionHandler);
router.patch("/:id", authenticate, authorize("ADMIN", "CEO"), updatePermissionHandler);
router.delete("/:id", authenticate, authorize("ADMIN", "CEO"), deletePermissionHandler);

export default router;
