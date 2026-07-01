import express from "express";

console.log("✅ messageRoutes imported");

import {
    send,
    all,
    inbox,
    outbox,
    complete
} from "../controllers/messageController.js";

const router = express.Router();

// Send a message
router.post("/send", send);

// Get all messages
router.get("/", all);

// Get inbox
router.get("/inbox/:agentId", inbox);

// Get outbox
router.get("/outbox/:agentId", outbox);

// Complete
router.put("/complete/:id", complete);

export default router;