import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {

  res.json({

    success: true,

    message: "Welcome to BLUEPEAK AI Enterprise Cloud API",

    version: "v1",

  });

});

export default router;