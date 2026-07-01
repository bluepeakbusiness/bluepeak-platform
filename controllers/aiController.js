import { runCEO } from "../agents/executives/ceoAgent.js";

export async function askCEO(req, res) {
    try {
        const report = req.body.report;
        const answer = await runCEO(report);

        res.json({
            success: true,
            answer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}