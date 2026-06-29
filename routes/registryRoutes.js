import express from "express";
import { getAllAgents } from "../core/registry/agentRegistry.js";

const router = express.Router();

router.get("/", (req, res) => {

    const agents = getAllAgents();

    res.json({
        success: true,
        totalAgents: agents.length,
        agents
    });

});

export default router;