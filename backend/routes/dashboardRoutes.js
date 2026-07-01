import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    revenue: 125000,
    leads: 48,
    aiEmployees: 31,
    approvals: 5,

    notifications: [
      "Invoice #1008 Paid",
      "Facebook Campaign Started",
      "3 New WhatsApp Leads",
      "GST Filing Completed"
    ],

    tasks: [
      "Approve Marketing Budget",
      "Review CEO Report",
      "Reply to VIP Client"
    ]
  });
});

export default router;