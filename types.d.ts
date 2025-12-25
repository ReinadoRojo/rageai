import { Message } from "@openrouter/sdk/models";

type MMessage = Message & {
    timestamp: string;
}