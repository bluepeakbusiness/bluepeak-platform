import express from "express";
import {
  assignRoleHandler,
  cloneRoleHandler,
  createRoleHandler,
  deleteRoleHandler,
  listRolesHandler,
  removeRoleHandler,
  updateRoleHandler,
} from "./controller.js";
import { authenticate, authorize } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("ADMIN", "CEO"), listRolesHandler);
router.post("/", authenticate, authorize("ADMIN", "CEO"), createRoleHandler);
router.patch("/:id", authenticate, authorize("ADMIN", "CEO"), updateRoleHandler);
router.delete("/:id", authenticate, authorize("ADMIN", "CEO"), deleteRoleHandler);
router.post("/assign", authenticate, authorize("ADMIN", "CEO"), assignRoleHandler);
router.post("/remove", authenticate, authorize("ADMIN", "CEO"), removeRoleHandler);
router.post("/:id/clone", authenticate, authorize("ADMIN", "CEO"), cloneRoleHandler);

export default router;
