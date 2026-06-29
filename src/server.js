import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "./app.js";
import prisma from "./config/prisma.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Database Connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server Running on Port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();

async function shutdown() {

  console.log("Closing Server...");

  await prisma.$disconnect();

  server.close(() => {
    console.log("Server Closed");
    process.exit(0);
  });

}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);