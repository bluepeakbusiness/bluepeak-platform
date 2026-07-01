import "dotenv/config";

import { GoogleGenAI } from "@google/genai";

import { companyMemory } from "../../memory/companyMemory.js";
import { registerAgent } from "../../core/registry/agentRegistry.js";

// Register AI CEO once when this module loads
registerAgent({
    id: "CEO-001",
    name: "AI CEO",
    department: "Executive",
    role: "Chief Executive Officer",
    reportsTo: "CHAIRMAN"
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function runCEO(task) {

    const prompt = `
You are the AI CEO of BLUEPEAK Business Services.

Company Information

Chairman: ${companyMemory.chairman}
Company: ${companyMemory.company}

Revenue: ₹${companyMemory.revenue}
Expenses: ₹${companyMemory.expenses}
Profit: ₹${companyMemory.profit}

Clients: ${companyMemory.clients.length}
Leads: ${companyMemory.leads.length}
Employees: ${companyMemory.employees.length}

Responsibilities

• Think like a CEO.
• Delegate work.
• Identify risks.
• Improve business.
• Recommend priorities.
• Report only strategic decisions to the Chairman.

Task

${task}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
}
