import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import notFound from "./core/middleware/notFound.js";
import errorHandler from "./core/middleware/errorHandler.js";

const app = express();

// ----------------------
// Security
// ----------------------
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// ----------------------
// Performance
// ----------------------
app.use(compression());

// ----------------------
// Parsers
// ----------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ----------------------
// Logger
// ----------------------
app.use(morgan("dev"));

// ----------------------
// Health Check
// ----------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    application: "BLUEPEAK AI Enterprise Cloud",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

// ----------------------
// API Routes
// ----------------------
app.use("/api/v1", routes);

// ----------------------
// Not Found
// ----------------------
app.use(notFound);

// ----------------------
// Error Handler
// ----------------------
app.use(errorHandler);

export default app;