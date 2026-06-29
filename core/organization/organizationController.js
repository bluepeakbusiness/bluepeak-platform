import {
    getOrganization,
    getCompany,
    getDepartments,
    getRoles,
    getHierarchy,
    getPermissions,
} from "./organizationEngine.js";

export function organization(req, res) {
    return res.json({
        success: true,
        data: getOrganization(),
    });
}

export function company(req, res) {
    return res.json({
        success: true,
        data: getCompany(),
    });
}

export function departments(req, res) {
    return res.json({
        success: true,
        data: getDepartments(),
    });
}

export function roles(req, res) {
    return res.json({
        success: true,
        data: getRoles(),
    });
}

export function hierarchy(req, res) {
    return res.json({
        success: true,
        data: getHierarchy(),
    });
}

export function permissions(req, res) {
    return res.json({
        success: true,
        data: getPermissions(),
    });
}