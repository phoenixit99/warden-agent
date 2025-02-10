import { agent, agentConfig, agentkit } from './agent';
import { checkSpaces } from './scripts/check-spaces';
import dotenv from 'dotenv';
import readline from 'readline';
import { HumanMessage } from "@langchain/core/messages";
import { createSpace } from './scripts/create-space';

// Load environment variables
dotenv.config();

async function runChatMode(agent: any, agentConfig: any) {
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

            // Handle space-related queries
            if (userInput.toLowerCase().includes("get spaces") ||
                userInput.toLowerCase().includes("show spaces") ||
                userInput.toLowerCase().includes("list spaces")) {
                // Check spaces directly using agentkit
                console.log("Checking available spaces...");
                const spaces = await checkSpaces(agentkit);
                console.log(spaces);
                continue;
            }
            if (userInput.toLowerCase().includes("create spaces")) {
                // Check spaces directly using agentkit
                console.log("Create spaces...");
                const spaces = await createSpace(agentkit);
                console.log(spaces);
                continue;
            }            
            // Handle other queries
            const stream = await agent.stream(
                { messages: [new HumanMessage(userInput)] },
                agentConfig
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
        // Continue with chat mode
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