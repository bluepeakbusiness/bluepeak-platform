import { CEOAgent } from "../agents/ceoAgent.js";

export async function askCEO(req, res){

    const report = req.body.report;

    const answer = await CEOAgent(report);

    res.json({
        answer
    });

}