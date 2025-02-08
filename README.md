# Warden Agent Kit

The Warden Agent Kit is a powerful toolkit that enables AI Agents to seamlessly interact with both offchain and onchain functionalities through the Warden Protocol. This kit provides autonomous capabilities for blockchain interactions, smart contract management, and decentralized operations.

## Overview

The Warden Agent Kit empowers AI Agents to:
- Create and manage blockchain spaces
- Generate and manage cryptographic keys
- Execute onchain transactions
- Manage orders and smart contract interactions
- Integrate with various AI frameworks

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- Git
- npm (comes with Node.js) or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/phoenixit99/warden-agent.git
cd warden-agent
```

2. Install dependencies
```bash
# Using npm
npm install

# OR using yarn
yarn install
```

3. Create and configure environment file
```bash
cp .env.example .env
```

## Key Features

- **Framework Agnostic**: Seamlessly integrates with any AI Agent framework
- **Warden Protocol Integration**: Native support for autonomous onchain operations
- **LangChain Compatibility**: Works with existing LangChain tools and ecosystem
- **Extensible Architecture**: Customizable templates for specific use cases
- **Smart Contract Integration**: Support for arbitrary contract invocations

## Project Structure

```
warden-agent/
├── src/              # Source files
│   ├── core/         # Core Warden Agent functionality
│   ├── protocols/    # Protocol integrations
│   ├── tools/       # LangChain tools and utilities
│   └── types/       # TypeScript type definitions
├── dist/            # Compiled files
├── tests/           # Test files
└── package.json     # Project dependencies and scripts
```

## Usage

### Development Mode
```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

### Production Mode
```bash
# Using npm
npm run build
npm start

# OR using yarn
yarn build
yarn start
```

## Troubleshooting

If you encounter installation issues:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete node_modules and package-lock.json:
```bash
rm -rf node_modules
rm package-lock.json
```

3. Reinstall dependencies:
```bash
npm install
```

4. If you see experimental warnings, you can either:
   - Ignore them as they don't affect functionality
   - Or use an LTS version of Node.js (recommended)

## Development

1. Make your changes
2. Run tests
```bash
npm test
```

3. Build the project
```bash
npm run build
```

## Integration Examples

### Basic Agent Setup
```typescript
import { WardenAgent } from '@warden/agent-kit';

const agent = new WardenAgent({
  // Configuration options
});

// Initialize agent capabilities
await agent.initialize();
```

### Smart Contract Interaction
```typescript
// Example of contract interaction
const result = await agent.executeContract({
  contract: "contractAddress",
  method: "methodName",
  params: []
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
