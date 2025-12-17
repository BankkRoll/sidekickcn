/**
 * AI Client for sidekick/cn
 * Uses Vercel AI Gateway - no direct provider API calls
 * Supports framework integrations (LangChain, LangFuse, etc.)
 */

export interface AIClientConfig {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  framework?: {
    type:
      | "langchain"
      | "langfuse"
      | "litellm"
      | "llamaindex"
      | "mastra"
      | "pydanticai"
      | "custom";
    config?: Record<string, any>;
    endpoint?: string;
  };
}

export interface AIResponse {
  response: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
}

export class AIClient {
  private config: AIClientConfig;

  constructor(config: AIClientConfig = {}) {
    this.config = {
      model: "openai/gpt-4.1",
      maxTokens: 500,
      temperature: 0.7,
      ...config,
    };
  }

  async sendPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
      tools?: any[];
    },
  ): Promise<AIResponse> {
    try {
      // Route to framework-specific handler if configured
      if (this.config.framework) {
        return this.sendFrameworkPrompt(prompt, options);
      }

      // Default AI Gateway implementation
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          messages: options?.messages,
          systemPrompt: options?.systemPrompt,
          tools: options?.tools,
          model: this.config.model,
          maxTokens: this.config.maxTokens,
          temperature: this.config.temperature,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("AI Client error:", error);
      throw error;
    }
  }

  private async sendFrameworkPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
      tools?: any[];
    },
  ): Promise<AIResponse> {
    const { framework } = this.config;

    switch (framework?.type) {
      case "langchain":
        return this.sendLangChainPrompt(prompt, options);

      case "langfuse":
        return this.sendLangFusePrompt(prompt, options);

      case "litellm":
        return this.sendLiteLLMPrompt(prompt, options);

      case "llamaindex":
        return this.sendLlamaIndexPrompt(prompt, options);

      case "mastra":
        return this.sendMastraPrompt(prompt, options);

      case "pydanticai":
        return this.sendPydanticAIPrompt(prompt, options);

      case "custom":
        return this.sendCustomFrameworkPrompt(prompt, options);

      default:
        throw new Error(`Unsupported framework: ${framework?.type}`);
    }
  }

  private async sendLangChainPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
    },
  ): Promise<AIResponse> {
    // LangChain integration via AI Gateway
    const response = await fetch("/api/ai/frameworks/langchain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        messages: options?.messages,
        systemPrompt: options?.systemPrompt,
        model: this.config.model,
        config: this.config.framework?.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`LangChain request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  private async sendLangFusePrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
    },
  ): Promise<AIResponse> {
    // LangFuse integration with tracing
    const response = await fetch("/api/ai/frameworks/langfuse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        messages: options?.messages,
        systemPrompt: options?.systemPrompt,
        model: this.config.model,
        config: this.config.framework?.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`LangFuse request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  private async sendLiteLLMPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
    },
  ): Promise<AIResponse> {
    // LiteLLM integration
    const response = await fetch("/api/ai/frameworks/litellm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        messages: options?.messages,
        systemPrompt: options?.systemPrompt,
        model: this.config.model,
        config: this.config.framework?.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`LiteLLM request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  private async sendLlamaIndexPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
    },
  ): Promise<AIResponse> {
    // LlamaIndex integration with knowledge base
    const response = await fetch("/api/ai/frameworks/llamaindex", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        messages: options?.messages,
        systemPrompt: options?.systemPrompt,
        model: this.config.model,
        config: this.config.framework?.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`LlamaIndex request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  private async sendMastraPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
      tools?: any[];
    },
  ): Promise<AIResponse> {
    // Mastra agent integration
    const response = await fetch("/api/ai/frameworks/mastra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        messages: options?.messages,
        systemPrompt: options?.systemPrompt,
        tools: options?.tools,
        model: this.config.model,
        config: this.config.framework?.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mastra request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  private async sendPydanticAIPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
    },
  ): Promise<AIResponse> {
    // Pydantic AI integration with structured output
    const response = await fetch("/api/ai/frameworks/pydanticai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        messages: options?.messages,
        systemPrompt: options?.systemPrompt,
        model: this.config.model,
        config: this.config.framework?.config,
      }),
    });

    if (!response.ok) {
      throw new Error(`Pydantic AI request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  private async sendCustomFrameworkPrompt(
    prompt: string,
    options?: {
      messages?: Array<{ role: string; content: string }>;
      systemPrompt?: string;
      tools?: any[];
    },
  ): Promise<AIResponse> {
    // Custom framework integration
    const endpoint =
      this.config.framework?.endpoint || "/api/ai/frameworks/custom";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        messages: options?.messages,
        systemPrompt: options?.systemPrompt,
        tools: options?.tools,
        model: this.config.model,
        config: this.config.framework?.config,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Custom framework request failed: ${response.statusText}`,
      );
    }

    return await response.json();
  }

  updateConfig(config: Partial<AIClientConfig>) {
    this.config = { ...this.config, ...config };
  }
}

export function createAIClient(config?: AIClientConfig): AIClient {
  return new AIClient(config);
}
