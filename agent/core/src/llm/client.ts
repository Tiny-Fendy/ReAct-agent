import OpenAI from 'openai';
import type { LLMConfig } from '../types';

/**
 * LLM Client for interacting with OpenAI-compatible APIs
 */
export class LLMClient {
  private client: OpenAI;
  private config: LLMConfig;

  constructor(config?: LLMConfig) {
    this.config = this.loadConfig(config);

    this.client = new OpenAI({
      baseURL: this.config.baseUrl,
      apiKey: this.config.apiKey,
    });
  }

  /**
   * Load configuration from provided config or environment variables
   */
  private loadConfig(config?: LLMConfig): LLMConfig {
    if (config) {
      return config;
    }

    const baseUrl = process.env.LLM_BASE_URL;
    const apiKey = process.env.LLM_API_KEY;
    const modelName = process.env.LLM_MODEL_NAME;
    const temperature = process.env.LLM_TEMPERATURE;
    const maxTokens = process.env.LLM_MAX_TOKENS;

    if (!baseUrl || !apiKey || !modelName) {
      throw new Error(
        'Missing required environment variables: LLM_BASE_URL, LLM_API_KEY, LLM_MODEL_NAME'
      );
    }

    return {
      baseUrl,
      apiKey,
      modelName,
      temperature: temperature ? parseFloat(temperature) : undefined,
      maxTokens: maxTokens ? parseInt(maxTokens, 10) : undefined,
    };
  }

  /**
   * Get current configuration
   */
  getConfig(): LLMConfig {
    return { ...this.config };
  }

  /**
   * Create a chat completion
   */
  async createCompletion(messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) {
    const response = await this.client.chat.completions.create({
      model: this.config.modelName,
      messages,
      temperature: this.config.temperature,
    });

    return response;
  }

  /**
   * Get the underlying OpenAI client instance
   */
  getClient(): OpenAI {
    return this.client;
  }
}
