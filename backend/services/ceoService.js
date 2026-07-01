import { companyMemory } from "../memory/companyMemory.js";

export function getCEOReport(){

return{

company:companyMemory.company,

chairman:companyMemory.chairman,

revenue:companyMemory.revenue,

expenses:companyMemory.expenses,

profit:companyMemory.profit,

employees:companyMemory.employees.length,

clients:companyMemory.clients.length,

leads:companyMemory.leads.length,

pendingApprovals:companyMemory.approvals.length,

tasks:companyMemory.tasks.length

};

}