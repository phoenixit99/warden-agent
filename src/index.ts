import { agent, agentConfig } from './agent';
import dotenv from 'dotenv';
import readline from 'readline';
import { HumanMessage } from "@langchain/core/messages";

// Load environment variables
dotenv.config();

async function runChatMode(agent: any, config: any) {
    console.log("Starting chat mode... Type 'exit' to end.");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = (prompt: string): Promise<string> =>
        new Promise((resolve) => rl.question(prompt, resolve));

    try {
        while (true) {
            const userInput = await question("\nPrompt: ");

            if (userInput.toLowerCase() === "exit") {
                break;
            }

            const stream = await agent.stream(
                { messages: [new HumanMessage(userInput)] },
                config
            );

            for await (const chunk of stream) {
                if ("agent" in chunk) {
                    console.log(chunk.agent.messages[0].content);
                } else if ("tools" in chunk) {
                    console.log(chunk.tools.messages[0].content);
                }
                console.log("-------------------");
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }
}

async function main() {
    try {
        await runChatMode(agent, agentConfig);
    } catch (error) {
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