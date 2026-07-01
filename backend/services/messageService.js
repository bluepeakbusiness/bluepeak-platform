import {
    sendMessage,
    getAllMessages,
    getInbox,
    getOutbox,
    completeMessage
} from "../core/communication/messageBus.js";

export function createMessage(data) {

    if (!data.from || !data.to || !data.subject || !data.body) {
        throw new Error("Missing required fields.");
    }

    return sendMessage(data);
}

export function fetchAllMessages() {
    return getAllMessages();
}

export function fetchInbox(agentId) {
    return getInbox(agentId);
}

export function fetchOutbox(agentId) {
    return getOutbox(agentId);
}

export function markCompleted(id) {
    return completeMessage(id);
}