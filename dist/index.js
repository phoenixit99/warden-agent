"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agent_1 = require("./agent");
const dotenv_1 = __importDefault(require("dotenv"));
const readline_1 = __importDefault(require("readline"));
const messages_1 = require("@langchain/core/messages");
// Load environment variables
dotenv_1.default.config();
async function runChatMode(agent, config) {
    console.log("Starting chat mode... Type 'exit' to end.");
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));
    try {
        while (true) {
            const userInput = await question("\nPrompt: ");
            if (userInput.toLowerCase() === "exit") {
                break;
            }
            const stream = await agent.stream({ messages: [new messages_1.HumanMessage(userInput)] }, config);
            for await (const chunk of stream) {
                if ("agent" in chunk) {
                    console.log(chunk.agent.messages[0].content);
                }
                else if ("tools" in chunk) {
                    console.log(chunk.tools.messages[0].content);
                }
                console.log("-------------------");
            }
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        rl.close();
    }
}
async function main() {
    try {
        await runChatMode(agent_1.agent, agent_1.agentConfig);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
// Only run if this is the main module
if (require.main === module) {
    console.log("Starting Agent...");
    main().catch((error) => {
        console.error("Fatal error:", error);
        process.exit(1);
    });
}
