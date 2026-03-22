import type { ToolFunction } from '../types';

/**
 * Example tool: Add two numbers
 * This is a template for creating new tools
 */
export const addTool: ToolFunction = {
  name: 'add',
  description: 'Add two numbers together',
  parameters: {
    type: 'object',
    properties: {
      a: {
        type: 'number',
        description: 'First number',
      },
      b: {
        type: 'number',
        description: 'Second number',
      },
    },
    required: ['a', 'b'],
    additionalProperties: false,
  },
  execute: async (args: Record<string, unknown>) => {
    const { a, b } = args as { a: number; b: number };
    return a + b;
  },
};
