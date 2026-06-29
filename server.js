import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

import organizationRoutes from "./core/organization/organizationRoutes.js";
import ceoRoutes from "./routes/ceoRoutes.js";
import ceoAgentRoutes from "./routes/ceoAgentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import systemRoutes from "./routes/systemRoutes.js";
import registryRoutes from "./routes/registryRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {
    res.json({
        status: "Running",
        company: "BLUEPEAK Business Services",
        ai: "BLUEPEAK AI",
        version: "1.0.0"
    });
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is healthy"
    });
});

// ==========================================
// AI CHAT
// ==========================================

app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({
                success: false,
                reply: "Message is required."
            });

        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message
        });

        res.json({
            success: true,
            reply: response.text
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            reply: "Gemini Error"
        });

    }

});

// ==========================================
// REQUEST LOGGER
// ==========================================

app.use((req, res, next) => {

    console.log(`${req.method} ${req.originalUrl}`);

    next();

});

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/organization", organizationRoutes);
app.use("/api/ceo", ceoRoutes);
app.use("/api/ceo-agent", ceoAgentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/system", systemRoutes);
app.use("/api/registry", registryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);

// ==========================================
// SERVER
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("");
    console.log("=======================================");
    console.log("🚀 BLUEPEAK AI OS Started");
    console.log("=======================================");

    console.log(`Server        : http://localhost:${PORT}`);
    console.log(`Health        : http://localhost:${PORT}/health`);
    console.log(`Chat          : http://localhost:${PORT}/api/chat`);
    console.log(`Registry      : http://localhost:${PORT}/api/registry`);
    console.log(`Messages      : http://localhost:${PORT}/api/messages`);

    console.log("");
    console.log("Loaded Modules");
    console.log("✓ Organization Engine");
    console.log("✓ Agent Registry");
    console.log("✓ Communication Bus");
    console.log("✓ AI Chat");
    console.log("");
    console.log("✅ messageRoutes loaded");

});