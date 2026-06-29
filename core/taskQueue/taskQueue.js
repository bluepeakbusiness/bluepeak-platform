// =======================================
// BLUEPEAK AI OS
// Task Queue
// =======================================

const tasks = [];

// ----------------------------
// Create Task
// ----------------------------

export function createTask(data) {

    const task = {

        id: crypto.randomUUID(),

        title: data.title,

        description: data.description || "",

        assignedTo: data.assignedTo || null,

        assignedBy: data.assignedBy || "SYSTEM",

        priority: data.priority || "NORMAL",

        status: "PENDING",

        createdAt: new Date().toISOString(),

        startedAt: null,

        completedAt: null

    };

    tasks.push(task);

    return task;

}

// ----------------------------
// Get All Tasks
// ----------------------------

export function getAllTasks() {

    return tasks;

}

// ----------------------------
// Pending
// ----------------------------

export function getPendingTasks() {

    return tasks.filter(task => task.status === "PENDING");

}

// ----------------------------
// Running
// ----------------------------

export function getRunningTasks() {

    return tasks.filter(task => task.status === "RUNNING");

}

// ----------------------------
// Completed
// ----------------------------

export function getCompletedTasks() {

    return tasks.filter(task => task.status === "COMPLETED");

}

// ----------------------------
// By Agent
// ----------------------------

export function getTasksByAgent(agentId) {

    return tasks.filter(task => task.assignedTo === agentId);

}

// ----------------------------
// Start Task
// ----------------------------

export function startTask(id) {

    const task = tasks.find(t => t.id === id);

    if (!task) return null;

    task.status = "RUNNING";

    task.startedAt = new Date().toISOString();

    return task;

}

// ----------------------------
// Complete Task
// ----------------------------

export function completeTask(id) {

    const task = tasks.find(t => t.id === id);

    if (!task) return null;

    task.status = "COMPLETED";

    task.completedAt = new Date().toISOString();

    return task;

}

// ----------------------------
// Delete Task
// ----------------------------

export function deleteTask(id) {

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) return false;

    tasks.splice(index, 1);

    return true;

}