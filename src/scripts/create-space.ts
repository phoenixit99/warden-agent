import { WardenAgentKit } from "@wardenprotocol/warden-agent-kit-core";
import { WardenToolkit } from "@wardenprotocol/warden-langchain";
import dotenv from 'dotenv';

dotenv.config();

export async function createSpace(agentKit: any) {
    try {
        console.log('Setting up WardenToolkit...');
        const wardenToolkit = new WardenToolkit(agentKit as any);
        const tools = wardenToolkit.getTools();

        const createSpaceTool = tools.find(tool => tool.name === 'create_space');
        if (!createSpaceTool) {
            throw new Error('create_space tool not found');
        }

        console.log('Creating new space...');
        const response = await createSpaceTool.call({});
        console.log('Space creation response:', response);

        // Extract space ID from response
        const spaceId = response.match(/Space (\d+) created/)?.[1];
        if (!spaceId) {
            throw new Error('Failed to extract space ID from response');
        }

        return spaceId;
    } catch (error) {
        console.error('Error creating space:', error);
        throw error;
    }
}