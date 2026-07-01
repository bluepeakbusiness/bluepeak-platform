import express from "express";

import {
    organization,
    company,
    departments,
    roles,
    hierarchy,
    permissions,
} from "./organizationController.js";

const router = express.Router();

router.get("/", organization);

router.get("/company", company);

router.get("/departments", departments);

router.get("/roles", roles);

router.get("/hierarchy", hierarchy);

router.get("/permissions", permissions);

export default router;