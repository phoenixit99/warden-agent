"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentConfig = exports.agent = void 0;
const warden_agent_kit_core_1 = require("@wardenprotocol/warden-agent-kit-core");
const warden_langchain_1 = require("@wardenprotocol/warden-langchain");
const langgraph_1 = require("@langchain/langgraph");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const ollama_1 = require("@langchain/ollama");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables first
dotenv_1.default.config();
// Configure Warden Agent Kit
const config = {
    privateKeyOrAccount: process.env.PRIVATE_KEY || undefined,
};
// Initialize Warden Agent Kit
const agentkit = new warden_agent_kit_core_1.WardenAgentKit(config);
// Initialize Warden Agent Kit Toolkit and get tools
const wardenToolkit = new warden_langchain_1.WardenToolkit(agentkit);
const tools = wardenToolkit.getTools();
// Uncomment and update the Ollama configuration
const llm = new ollama_1.ChatOllama({
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
const memory = new langgraph_1.MemorySaver();
const agentConfig = {
    configurable: { thread_id: "Warden Agent Kit CLI Agent Example!" },
};
exports.agentConfig = agentConfig;
// Create React Agent using the LLM and Warden Agent Kit tools
const agent = (0, prebuilt_1.createReactAgent)({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: "You're a helpful assistant that can help with a variety of tasks related to web3 transactions. " +
        "You should only use the provided tools to carry out tasks, interpret the users input " +
        "and select the correct tool to use for the required tasks or tasks.",
});
exports.agent = agent;
