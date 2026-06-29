import fs from "fs";

const file = "./memory/companyMemory.json";

export function readMemory() {
    return JSON.parse(fs.readFileSync(file));
}

export function saveMemory(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}