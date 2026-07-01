import express from "express";

console.log("✅ testRoutes loaded");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("TEST ROUTE HIT");

    res.json({
        success: true,
        message: "TEST ROUTE WORKING"
    });
});

export default router;