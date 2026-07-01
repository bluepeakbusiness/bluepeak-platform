import {
    createMessage,
    fetchAllMessages,
    fetchInbox,
    fetchOutbox,
    markCompleted
} from "../services/messageService.js";

export function send(req, res) {

    try {

        const message = createMessage(req.body);

        res.status(201).json({
            success: true,
            message
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message
        });

    }

}

export function all(req, res) {

    res.json({
        success: true,
        total: fetchAllMessages().length,
        messages: fetchAllMessages()
    });

}

export function inbox(req, res) {

    const { agentId } = req.params;

    res.json({
        success: true,
        inbox: fetchInbox(agentId)
    });

}

export function outbox(req, res) {

    const { agentId } = req.params;

    res.json({
        success: true,
        outbox: fetchOutbox(agentId)
    });

}

export function complete(req, res) {

    const result = markCompleted(req.params.id);

    if (!result) {

        return res.status(404).json({
            success: false,
            message: "Message not found"
        });

    }

    res.json({
        success: true,
        message: result
    });

}