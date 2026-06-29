import { COMPANY } from "./companyRegistry.js";
import { DEPARTMENTS } from "./departmentRegistry.js";
import { ROLES } from "./roleRegistry.js";
import { HIERARCHY } from "./hierarchy.js";
import { PERMISSIONS } from "./permissions.js";

export function getOrganization(){

    return{

        company:COMPANY,

        departments:DEPARTMENTS,

        roles:ROLES,

        hierarchy:HIERARCHY,

        permissions:PERMISSIONS

    };

}