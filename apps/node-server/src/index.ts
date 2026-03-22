import { createApp, createRouter, eventHandler, toNodeListener, readBody } from 'h3';
import { createServer } from 'node:http';
import { LLMClient } from '@react-agent/core';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize LLM Client
const llmClient = new LLMClient();

// Create app
const app = createApp();

// Create router
const router = createRouter();

// Health check endpoint
router.get(
  '/health',
  eventHandler(() => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: '@react-agent/node-server',
      version: '0.0.1',
    };
  })
);

// Chat endpoint
router.post(
  '/api/chat',
  eventHandler(async (event) => {
    const body = await readBody<{ messages?: unknown }>(event);
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return {
        error: 'Invalid request',
        message: 'messages array is required',
      };
    }

    try {
      const response = await llmClient.createCompletion(messages);
      return {
        success: true,
        data: {
          choices: response.choices,
          usage: response.usage,
        },
      };
    } catch (error) {
      console.error('Chat completion error:', error);
      return {
        error: 'LLM request failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  })
);

// Get model info endpoint
router.get(
  '/api/model',
  eventHandler(() => {
    const config = llmClient.getConfig();
    return {
      modelName: config.modelName,
      baseUrl: config.baseUrl,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    };
  })
);

// Use router
app.use(router);

// Start server
const port = process.env.PORT || 3000;
const server = createServer(toNodeListener(app));

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📝 Health check: http://localhost:${port}/health`);
  console.log(`💬 Chat API: http://localhost:${port}/api/chat`);
  console.log(`🤖 Model Info: http://localhost:${port}/api/model`);
});
