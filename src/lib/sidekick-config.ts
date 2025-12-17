import type { AIProvider } from "@/lib/ai-gateway-models";
import type React from "react";

export type SidekickConfig = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  baseUrl?: string;
  modelConfig?: ModelConfig;
  featuresConfig?: FeaturesConfig;
  uiConfig?: UIConfig;
  securityConfig?: SecurityConfig;
  frameworkConfig?: FrameworkIntegrationConfig;
};

export type ModelConfig = {
  /**
   * List of allowed models.
   * - `undefined` or `[]`: Use all available AI SDK models
   * - `"*"`: Explicitly allow all AI SDK models
   * - `"none"`: Only allow the default model
   * - `string[]`: Specific list of allowed model IDs
   */
  allowedModels?: string[] | "*" | "none";
  /** Default selected model */
  defaultModel?: string;
  /** Hide model selector if only one model is available */
  hideIfSingleModel?: boolean;
  /** Group models by provider in the selector */
  groupByProvider?: boolean;
  /** Custom model list (overrides AI Gateway models) */
  customModels?: Array<{
    id: string;
    name: string;
    provider: AIProvider;
    description?: string;
    contextWindow?: number;
    capabilities?: string[];
  }>;
  /** Allow users to change models */
  allowModelChange?: boolean;
};

export type FeaturesConfig = {
  /** Enable message branching and version history */
  enableBranching?: boolean;
  /** Show sources and citations */
  showSources?: boolean;
  /** Display reasoning traces from model */
  showReasoning?: boolean;
  /** Enable suggestions and quick prompts */
  enableSuggestions?: boolean;
  /** Show workflow system */
  enableWorkflows?: boolean;
  /** Enable attachments in prompt input */
  enableAttachments?: boolean;
  /** Enable tool calling */
  enableTools?: boolean;
  /** Enable message regeneration */
  enableRegeneration?: boolean;
  /** Enable message editing */
  enableEditing?: boolean;
  /** Enable copy message */
  enableCopy?: boolean;
  /** Enable voice input */
  enableVoiceInput?: boolean;
  /** Maximum conversation history length */
  maxHistoryLength?: number;
};

export type UIConfig = {
  /** Show timestamps on messages */
  showTimestamps?: boolean;
  /** Show model name on messages */
  showModelName?: boolean;
  /** Show token counts */
  showTokenCounts?: boolean;
  /** Enable animations */
  enableAnimations?: boolean;
  /** Message appearance animation */
  messageAnimation?: "fade" | "slide" | "none";
  /** Enable shimmer loading effect */
  enableShimmer?: boolean;
  /** Enable markdown rendering */
  enableMarkdown?: boolean;
  /** Enable syntax highlighting for code */
  enableSyntaxHighlight?: boolean;
  /** Enable auto-scroll to latest message */
  enableAutoScroll?: boolean;
  /** Compact mode (smaller padding/spacing) */
  compactMode?: boolean;
  /** Custom avatar URL for assistant */
  assistantAvatar?: string;
  /** Custom avatar URL for user */
  userAvatar?: string;
  /** Theme preference */
  theme?: "light" | "dark" | "system";
};

export type SecurityConfig = {
  /** Maximum message length */
  maxMessageLength?: number;
  /** Rate limit: max messages per minute */
  rateLimitPerMinute?: number;
  /** Enable content filtering */
  enableContentFilter?: boolean;
  /** Allowed file types for attachments */
  allowedFileTypes?: string[];
  /** Maximum file size in MB */
  maxFileSizeMB?: number;
  /** Enable PII detection and redaction */
  enablePIIProtection?: boolean;
};

export type FrameworkIntegrationConfig = {
  /** Enable framework integrations */
  enabled?: boolean;
  /** LangChain integration configuration */
  langchain?: {
    enabled?: boolean;
    apiKey?: string;
    baseUrl?: string;
    models?: string[];
    agents?: Array<{
      id: string;
      name: string;
      description?: string;
      config?: Record<string, any>;
    }>;
  };
  /** LangFuse integration configuration */
  langfuse?: {
    enabled?: boolean;
    publicKey?: string;
    secretKey?: string;
    host?: string;
    projectId?: string;
  };
  /** LiteLLM integration configuration */
  litellm?: {
    enabled?: boolean;
    apiKey?: string;
    models?: string[];
    config?: Record<string, any>;
  };
  /** LlamaIndex integration configuration */
  llamaindex?: {
    enabled?: boolean;
    apiKey?: string;
    indexName?: string;
    documents?: Array<{
      id: string;
      content: string;
      metadata?: Record<string, any>;
    }>;
  };
  /** Mastra integration configuration */
  mastra?: {
    enabled?: boolean;
    agents?: Array<{
      id: string;
      name: string;
      instructions?: string;
      tools?: string[];
      memory?: Record<string, any>;
    }>;
  };
  /** Pydantic AI integration configuration */
  pydanticai?: {
    enabled?: boolean;
    models?: string[];
    outputTypes?: Array<{
      name: string;
      schema: Record<string, any>;
    }>;
  };
  /** Custom framework integrations */
  custom?: Array<{
    id: string;
    name: string;
    type: string;
    config?: Record<string, any>;
    endpoint?: string;
    auth?: {
      type: "bearer" | "basic" | "api-key";
      token?: string;
      username?: string;
      password?: string;
    };
  }>;
};

export type WorkflowDefinition = {
  id: string;
  name: string;
  description: string;
  systemPrompt?: string;
  tools?: string[];
  execute?: (input: any) => Promise<any>;
  icon?: string;
  category?: string;
};

export type AIElementComponent = React.ComponentType<any>;

export const DEFAULT_SIDEKICK_CONFIG: SidekickConfig = {
  model: "openai/gpt-4.1-mini",
  temperature: 0.7,
  maxTokens: 2000,
  baseUrl: "/api/ai",
  modelConfig: {
    allowedModels: "*", // All AI SDK models allowed
    defaultModel: "openai/gpt-4.1-mini",
    hideIfSingleModel: true,
    groupByProvider: true,
    allowModelChange: true,
  },
  featuresConfig: {
    enableBranching: true,
    showSources: true,
    showReasoning: true,
    enableSuggestions: true,
    enableWorkflows: true,
    enableAttachments: true,
    enableTools: true,
    enableRegeneration: true,
    enableEditing: true,
    enableCopy: true,
    enableVoiceInput: false,
    maxHistoryLength: 50,
  },
  uiConfig: {
    showTimestamps: true,
    showModelName: true,
    showTokenCounts: false,
    enableAnimations: true,
    messageAnimation: "slide",
    enableShimmer: true,
    enableMarkdown: true,
    enableSyntaxHighlight: true,
    enableAutoScroll: true,
    compactMode: false,
    theme: "system",
  },
  securityConfig: {
    maxMessageLength: 4000,
    rateLimitPerMinute: 20,
    enableContentFilter: true,
    allowedFileTypes: [".txt", ".md", ".pdf", ".jpg", ".png"],
    maxFileSizeMB: 10,
    enablePIIProtection: false,
  },
};

export const DEFAULT_WORKFLOWS: WorkflowDefinition[] = [
  {
    id: "summarize",
    name: "Summarize",
    description: "Summarize the given content concisely",
    systemPrompt:
      "You are a helpful assistant that provides concise summaries.",
    icon: "FileText",
    category: "Analysis",
  },
  {
    id: "explain",
    name: "Explain",
    description: "Explain a concept in simple terms",
    systemPrompt:
      "You are a helpful assistant that explains concepts clearly and simply.",
    icon: "BookOpen",
    category: "Education",
  },
  {
    id: "generate-code",
    name: "Generate Code",
    description: "Generate code based on requirements",
    systemPrompt:
      "You are an expert programmer. Generate clean, efficient code.",
    icon: "Code",
    category: "Development",
  },
  {
    id: "debug",
    name: "Debug",
    description: "Help debug code and find issues",
    systemPrompt:
      "You are an expert debugger. Analyze code and identify issues.",
    icon: "Bug",
    category: "Development",
  },
  {
    id: "translate",
    name: "Translate",
    description: "Translate text between languages",
    systemPrompt:
      "You are a professional translator. Translate accurately while preserving meaning.",
    icon: "Languages",
    category: "Language",
  },
];

/** Utility function to merge configs with deep merging */
export function mergeConfigs(
  base: SidekickConfig,
  override: Partial<SidekickConfig>,
): SidekickConfig {
  return {
    ...base,
    ...override,
    modelConfig: {
      ...base.modelConfig,
      ...override.modelConfig,
    },
    featuresConfig: {
      ...base.featuresConfig,
      ...override.featuresConfig,
    },
    uiConfig: {
      ...base.uiConfig,
      ...override.uiConfig,
    },
    securityConfig: {
      ...base.securityConfig,
      ...override.securityConfig,
    },
    frameworkConfig: {
      ...base.frameworkConfig,
      ...override.frameworkConfig,
    },
  };
}

/** Preset configurations for common use cases */
export const SIDEKICK_PRESETS = {
  minimal: {
    modelConfig: {
      allowedModels: "none", // Only default model allowed
      hideIfSingleModel: true,
      allowModelChange: false,
    },
    featuresConfig: {
      enableBranching: false,
      showSources: false,
      showReasoning: false,
      enableSuggestions: false,
      enableWorkflows: false,
      enableAttachments: false,
      enableTools: false,
    },
    uiConfig: {
      showTimestamps: false,
      showModelName: false,
      compactMode: true,
    },
  } as Partial<SidekickConfig>,

  standard: DEFAULT_SIDEKICK_CONFIG,

  advanced: {
    modelConfig: {
      allowedModels: "*", // All AI SDK models
      groupByProvider: true,
      allowModelChange: true,
    },
    featuresConfig: {
      enableBranching: true,
      showSources: true,
      showReasoning: true,
      enableSuggestions: true,
      enableWorkflows: true,
      enableAttachments: true,
      enableTools: true,
      enableVoiceInput: true,
    },
    uiConfig: {
      showTimestamps: true,
      showModelName: true,
      showTokenCounts: true,
      enableAnimations: true,
    },
  } as Partial<SidekickConfig>,

  secure: {
    securityConfig: {
      maxMessageLength: 2000,
      rateLimitPerMinute: 10,
      enableContentFilter: true,
      allowedFileTypes: [".txt", ".md"],
      maxFileSizeMB: 5,
      enablePIIProtection: true,
    },
    featuresConfig: {
      enableAttachments: false,
      maxHistoryLength: 20,
    },
  } as Partial<SidekickConfig>,

  codingAssistant: {
    modelConfig: {
      allowedModels: "*", // All models for maximum flexibility
      defaultModel: "anthropic/claude-opus-4.5",
    },
    featuresConfig: {
      enableTools: true,
      showReasoning: true,
      enableWorkflows: true,
    },
    uiConfig: {
      enableSyntaxHighlight: true,
      showModelName: true,
    },
  } as Partial<SidekickConfig>,
};
