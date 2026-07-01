import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {

res.json({

report:`
Good Evening Chairman.

Today's Business Summary

Revenue is growing steadily.

Three high-value leads require attention.

Marketing campaign performed well.

Recommendation:

Approve the marketing budget.

Hire one sales executive.

Launch the WhatsApp campaign tomorrow.

`

});

});

export default router;