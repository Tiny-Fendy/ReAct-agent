import type { ToolFunction } from './types';

/**
 * Tool Registry for managing and executing tools
 */
export class ToolRegistry {
  private tools: Map<string, ToolFunction> = new Map();

  /**
   * Register a single tool
   */
  register(tool: ToolFunction): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool "${tool.name}" is already registered`);
    }
    this.tools.set(tool.name, tool);
  }

  /**
   * Register multiple tools at once
   */
  registerAll(tools: ToolFunction[]): void {
    tools.forEach((tool) => this.register(tool));
  }

  /**
   * Get a tool by name
   */
  get(name: string): ToolFunction | undefined {
    return this.tools.get(name);
  }

  /**
   * Check if a tool exists
   */
  has(name: string): boolean {
    return this.tools.has(name);
  }

  /**
   * Execute a tool by name with provided arguments
   */
  async execute(name: string, args: Record<string, unknown>): Promise<unknown> {
    const tool = this.get(name);
    if (!tool) {
      throw new Error(`Tool "${name}" not found`);
    }
    return tool.execute(args);
  }

  /**
   * Get all registered tools as OpenAI function definitions
   */
  getFunctions(): Array<{
    type: 'function';
    function: {
      name: string;
      description: string;
      parameters: ToolFunction['parameters'];
    };
  }> {
    return Array.from(this.tools.values()).map((tool) => ({
      type: 'function' as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      },
    }));
  }

  /**
   * Get list of all tool names
   */
  getToolNames(): string[] {
    return Array.from(this.tools.keys());
  }

  /**
   * Clear all registered tools
   */
  clear(): void {
    this.tools.clear();
  }
}
