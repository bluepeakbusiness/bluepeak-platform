const agents = new Map();

export function registerAgent(agent) {

    agents.set(agent.id, {
        ...agent,
        status: "ONLINE",
        currentTask: null,
        lastSeen: new Date().toISOString(),
        createdAt: new Date().toISOString()
    });

}

export function getAllAgents() {
    return Array.from(agents.values());
}

export function getAgent(id) {
    return agents.get(id);
}

export function updateAgent(id, updates) {

    const agent = agents.get(id);

    if (!agent) return;

    agents.set(id, {
        ...agent,
        ...updates,
        lastSeen: new Date().toISOString()
    });

}

export function removeAgent(id) {
    agents.delete(id);
}