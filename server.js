import "dotenv/config";

import app from "./app.js";

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
    console.log(`Auth          : http://localhost:${PORT}/api/auth`);

});
