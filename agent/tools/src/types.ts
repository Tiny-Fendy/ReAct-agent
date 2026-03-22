import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

/**
 * Tool function definition
 */
export interface ToolFunction {
  /**
   * Unique name for the tool
   */
  name: string;

  /**
   * Description of what the tool does
   */
  description: string;

  /**
   * JSON Schema for the tool's parameters
   */
  parameters: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description?: string;
      enum?: unknown[];
      items?: {
        type: string;
        description?: string;
      };
    }>;
    required?: string[];
    additionalProperties?: boolean;
  };

  /**
   * The actual function to execute
   * @param args - Parsed arguments from the LLM
   * @returns Result of the tool execution (can be string or object)
   */
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Tool response for function call results
 */
export interface ToolResponse {
  role: 'tool';
  content: string;
  tool_call_id: string;
}

/**
 * Extended message type with tool calls
 * Using type intersection instead of extends to avoid interface issues
 */
export type MessageWithToolCall = ChatCompletionMessageParam & {
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: {
      name: string;
      arguments: string;
    };
  }>;
};
