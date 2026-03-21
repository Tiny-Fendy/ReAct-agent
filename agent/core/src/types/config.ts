/**
 * LLM Client Configuration
 */
export interface LLMConfig {
  /**
   * Base URL for the LLM API endpoint
   * @example "https://api.openai.com/v1"
   */
  baseUrl: string;

  /**
   * API Key for authentication
   */
  apiKey: string;

  /**
   * Model name to use
   * @example "gpt-4", "gpt-3.5-turbo"
   */
  modelName: string;

  /**
   * Optional: Default temperature for completions
   */
  temperature?: number;

  /**
   * Optional: Maximum tokens for completions
   */
  maxTokens?: number;
}

/**
 * Environment variables interface
 */
export interface EnvConfig {
  LLM_BASE_URL: string;
  LLM_API_KEY: string;
  LLM_MODEL_NAME: string;
  LLM_TEMPERATURE?: string;
  LLM_MAX_TOKENS?: string;
}
