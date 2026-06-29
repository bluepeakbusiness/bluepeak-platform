import express from "express";

import { getOrganization } from "./organizationEngine.js";

const router = express.Router();

router.get("/",(req,res)=>{

    res.json(getOrganization());

});

export default router;