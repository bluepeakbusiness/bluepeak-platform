import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      "You are BLUEPEAK AI, a professional business assistant. Help customers with accounting, GST, taxation, Tally, bookkeeping, business registration, quotations, emails, and WhatsApp messages. Introduce yourself professionally.",
  });

  console.log(response.text);
}

main();