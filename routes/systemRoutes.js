import express from "express";

import { getAllAgents } from "../core/registry/agentRegistry.js";
import { getAllMessages } from "../core/communication/messageBus.js";

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        success: true,

        system: {

            company: "BLUEPEAK Business Services",

            version: "1.0.0",

            status: "ONLINE"

        },

        statistics: {

            totalAgents: getAllAgents().length,

            totalMessages: getAllMessages().length

        },

        agents: getAllAgents(),

        messages: getAllMessages()

    });

});

export default router;