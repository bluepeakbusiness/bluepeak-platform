import express from "express";
import { runCEO } from "../agents/executives/ceoAgent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await runCEO(req.body.task);

    res.json({
      success: true,
      report: result,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;