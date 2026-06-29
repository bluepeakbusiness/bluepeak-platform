import express from "express";

import { askCEO } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ceo", askCEO);

export default router;