import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import express from "express";

import apiRouter from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

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

app.use("/api", apiRouter);

// ==========================================
// ERROR HANDLING
// ==========================================

app.use(notFound);
app.use(errorHandler);

export default app;
