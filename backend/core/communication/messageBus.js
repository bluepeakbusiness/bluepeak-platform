const messages = [];

export function sendMessage(message) {
    const newMessage = {
        id: crypto.randomUUID(),
        from: message.from,
        to: message.to,
        subject: message.subject,
        body: message.body,
        priority: message.priority || "NORMAL",
        status: "PENDING",
        createdAt: new Date().toISOString(),
        completedAt: null
    };

    messages.push(newMessage);

    return newMessage;
}

export function getAllMessages() {
    return messages;
}

export function getInbox(agentId) {
    return messages.filter(m => m.to === agentId);
}

export function getOutbox(agentId) {
    return messages.filter(m => m.from === agentId);
}

export function completeMessage(id) {
    const msg = messages.find(m => m.id === id);

    if (!msg) return null;

    msg.status = "COMPLETED";
    msg.completedAt = new Date().toISOString();

    return msg;
}