import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOllama } from "@langchain/ollama";
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Configure Warden Agent Kit
const config = {
  privateKeyOrAccount: process.env.PRIVATE_KEY as `0x${string}` || undefined,
};

// Initialize Warden Agent Kit
const agentkit = new WardenAgentKit(config);
// Initialize Warden Agent Kit Toolkit and get tools
const wardenToolkit = new WardenToolkit(agentkit as any);
const tools = wardenToolkit.getTools();

// Uncomment and update the Ollama configuration
const llm = new ChatOllama({
  model: "llama3.2",
  temperature: 0,
  maxRetries: 3,
  baseUrl: "http://localhost:11434", // Local Ollama instance
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


// Store buffered conversation history in memory
const memory = new MemorySaver();
const agentConfig = {
  configurable: { thread_id: "Warden Agent Kit CLI Agent Example!" },
};

// Create React Agent using the LLM and Warden Agent Kit tools
const agent = createReactAgent({
  llm,
  tools,
  checkpointSaver: memory,
  messageModifier:
    "You're a helpful assistant that can help with a variety of tasks related to web3 transactions. " +
    "You should only use the provided tools to carry out tasks, interpret the users input " +
    "and select the correct tool to use for the required tasks or tasks.",
});

export { agent, agentConfig };