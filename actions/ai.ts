"use server";

import { MMessage } from "@/types";
import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.AI_SK,
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

const ai_model = process.env.AI_MODEL || "google/gemini-2.5-flash"

export const messageSubmit = async (userMessage: string, clientHistory: string) => {
    // 1. Read session storage
    const history = JSON.parse(clientHistory) as MMessage[]

    console.log("History ready!")

    // 2. Append message
    history.push({ role: "user", content: userMessage, timestamp: new Date().toISOString() })

    // 3. Query AI
    const response = await client.chat.send({
        model: ai_model,
        messages: history,
        stream: false,
    });

    const selected = { timestamp: new Date().toISOString(), ...response.choices[0].message}
    history.push(selected)

    // 5. Return response to UI
    return {
        "success": true,
        "history": history, // send new history
        "response": selected // Select the message from the first choice
    }
}