import { addTask } from "../taskQueue/taskQueue.js";

export function startWorkflow(workflow){

    workflow.steps.forEach(step=>{

        addTask(step);

    });

}