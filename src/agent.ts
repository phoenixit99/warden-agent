import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOllama } from "@langchain/ollama";
import { HumanMessage } from "@langchain/core/messages";
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Configure Warden Agent Kit
const config = {
  privateKeyOrAccount: process.env.PRIVATE_KEY as `0x${string}` || undefined,
};

// Initialize Warden Agent Kit
export const agentkit = new WardenAgentKit(config);
// Initialize Warden Agent Kit Toolkit and get tools
const wardenToolkit = new WardenToolkit(agentkit as any);
const tools = wardenToolkit.getTools();

// Configure LLM
// const llm = new ChatOllama({
//   model: "llama3.2",
//   temperature: 0,
//   maxRetries: 3,
//   baseUrl: "http://localhost:11434", // Local Ollama instance
// });

// const llm = new ChatOpenAI({
//     modelName: "llama-3.1-8b-instruct-fp8-l4",
//     temperature: 0,
//     maxRetries: 2,
//     apiKey: "thisIsIgnored",
//     configuration: {
//         baseURL: "https://ai.devnet.wardenprotocol.org/openai/v1",
//     },
// });

const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0,
    maxRetries: 2
});

// const llm = new ChatOpenAI(
//   {
//     modelName: "google/gemini-2.0-flash-exp:free",
//     openAIApiKey: process.env.OPENROUTER_API_KEY,
//   },
//   {
//     basePath: "https://openrouter.ai/api/v1",
//   }
// );

// const llm = new ChatOpenAI({
//     model: "o1-mini",
// });

// Store buffered conversation history in memory
const memory = new MemorySaver();
const agentConfig = {
  configurable: { 
    thread_id: "Warden Agent Kit CLI Agent !"
  },
};

// Create React Agent using the LLM and Warden Agent Kit tools
const agent = createReactAgent({
  llm,
  tools,
  checkpointSaver: memory,
  messageModifier: agentConfig.configurable.thread_id
});

export { agent, agentConfig };