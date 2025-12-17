// Known AI providers - this can be extended dynamically
export type AIProvider =
  | "openai"
  | "anthropic"
  | "xai"
  | "google"
  | "meta"
  | "mistral"
  | "cohere"
  | "azure"
  | "bedrock"
  | "vertex"
  | "groq"
  | "fireworks"
  | "deepseek"
  | "cerebras"
  | "bfl"
  | "alibaba"
  | "arcee-ai"
  | "baseten"
  | "deepinfra"
  | "inception"
  | "meituan"
  | "minimax"
  | "moonshotai"
  | "morph"
  | "novita"
  | "parasail"
  | "perplexity"
  | "streamlake"
  | "vercel"
  | "voyage"
  | "zai"
  | string; // Allow any string for dynamic providers

export type AIModel = {
  id: string;
  name: string;
  provider: AIProvider;
  description?: string;
  contextWindow?: number;
  capabilities?: string[];
  logo?: string;
  modelType?: "language" | "embedding";
  pricing?: {
    input?: number;
    output?: number;
    cachedInputTokens?: number;
    cacheCreationInputTokens?: number;
  };
};

// Default models - can be overridden by dynamic discovery
export const DEFAULT_AI_MODELS: AIModel[] = [
  // OpenAI Models
  {
    id: "openai/gpt-5.2",
    name: "GPT-5.2",
    provider: "openai",
    description: "Most advanced OpenAI model with superior reasoning",
    contextWindow: 128000,
    capabilities: ["text", "code", "vision", "reasoning"],
    logo: "/logos/openai.svg",
    modelType: "language",
  },
  {
    id: "openai/gpt-5",
    name: "GPT-5",
    provider: "openai",
    description: "Advanced reasoning and generation",
    contextWindow: 128000,
    capabilities: ["text", "code", "vision"],
    logo: "/logos/openai.svg",
    modelType: "language",
  },
  {
    id: "openai/gpt-5-mini",
    name: "GPT-5 Mini",
    provider: "openai",
    description: "Fast and efficient for most tasks",
    contextWindow: 128000,
    capabilities: ["text", "code"],
    logo: "/logos/openai.svg",
    modelType: "language",
  },
  {
    id: "openai/gpt-5-nano",
    name: "GPT-5 Nano",
    provider: "openai",
    description: "Ultra-fast for simple tasks",
    contextWindow: 32000,
    capabilities: ["text"],
    logo: "/logos/openai.svg",
    modelType: "language",
  },
  {
    id: "openai/gpt-4.1-mini",
    name: "GPT-4.1 Mini",
    provider: "openai",
    description: "Cost-effective GPT-4 class model",
    contextWindow: 128000,
    capabilities: ["text", "code"],
    logo: "/logos/openai.svg",
    modelType: "language",
  },

  // Anthropic Models
  {
    id: "anthropic/claude-opus-4.5",
    name: "Claude Opus 4.5",
    provider: "anthropic",
    description: "Most capable Claude model for complex tasks",
    contextWindow: 200000,
    capabilities: ["text", "code", "vision", "reasoning"],
    logo: "/logos/anthropic.svg",
    modelType: "language",
  },
  {
    id: "anthropic/claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
    description: "Balanced performance and speed",
    contextWindow: 200000,
    capabilities: ["text", "code", "vision"],
    logo: "/logos/anthropic.svg",
    modelType: "language",
  },
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: "anthropic",
    description: "Previous generation balanced model",
    contextWindow: 200000,
    capabilities: ["text", "code", "vision"],
    logo: "/logos/anthropic.svg",
    modelType: "language",
  },
  {
    id: "anthropic/claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "anthropic",
    description: "Cost-effective Claude 3 series",
    contextWindow: 200000,
    capabilities: ["text", "code"],
    logo: "/logos/anthropic.svg",
    modelType: "language",
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
    description: "Fastest Claude model",
    contextWindow: 200000,
    capabilities: ["text"],
    logo: "/logos/anthropic.svg",
    modelType: "language",
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "anthropic",
    description: "Fast and affordable",
    contextWindow: 200000,
    capabilities: ["text"],
    logo: "/logos/anthropic.svg",
    modelType: "language",
  },

  // xAI Models (Grok)
  {
    id: "xai/grok-4.1-fast-non-reasoning",
    name: "Grok 4.1 Fast",
    provider: "xai",
    description: "Fast Grok without reasoning traces",
    contextWindow: 128000,
    capabilities: ["text", "code"],
    logo: "/logos/xai.svg",
    modelType: "language",
  },
  {
    id: "xai/grok-code-fast-1",
    name: "Grok Code Fast",
    provider: "xai",
    description: "Optimized for code generation",
    contextWindow: 128000,
    capabilities: ["code", "text"],
    logo: "/logos/xai.svg",
    modelType: "language",
  },
];

// Global registry for dynamic models
let _dynamicModels: AIModel[] = [...DEFAULT_AI_MODELS];

// Function to get all available models (static + dynamic)
export function getAvailableModels(): AIModel[] {
  return [..._dynamicModels];
}

// Function to register additional models dynamically
export function registerModels(models: AIModel[]): void {
  // Merge with existing models, avoiding duplicates by id
  const existingIds = new Set(_dynamicModels.map((m) => m.id));
  const newModels = models.filter((m) => !existingIds.has(m.id));
  _dynamicModels = [..._dynamicModels, ...newModels];
}

// Function to register models from AI Gateway discovery
export function registerGatewayModels(gatewayModels: any[]): void {
  const models: AIModel[] = gatewayModels.map((gm) => ({
    id: gm.id,
    name: gm.name || gm.id.split("/")[1] || gm.id,
    provider: gm.id.split("/")[0] as AIProvider,
    description: gm.description,
    contextWindow: gm.contextWindow,
    capabilities: gm.capabilities || [],
    logo: getProviderLogo(gm.id.split("/")[0]),
    modelType: gm.modelType || "language",
    pricing: gm.pricing,
  }));
  registerModels(models);
}

// For backward compatibility
export const AI_GATEWAY_MODELS = DEFAULT_AI_MODELS;

// Function to get provider logo path
export function getProviderLogo(provider: string): string | undefined {
  const logoMap: Record<string, string> = {
    openai: "/logos/openai.svg",
    anthropic: "/logos/anthropic.svg",
    xai: "/logos/xai.svg",
    google: "/logos/google.svg",
    azure: "/logos/azure.svg",
    bedrock: "/logos/aws.svg",
    vertex: "/logos/google.svg",
    groq: "/logos/groq.svg",
    fireworks: "/logos/fireworks.svg",
    deepseek: "/logos/deepseek.svg",
    cerebras: "/logos/cerebras.svg",
    bfl: "/logos/bfl.svg",
    alibaba: "/logos/alibaba.svg",
    arcee: "/logos/arcee.svg",
    baseten: "/logos/baseten.svg",
    deepinfra: "/logos/deepinfra.svg",
    inception: "/logos/inception.svg",
    meituan: "/logos/meituan.svg",
    minimax: "/logos/minimax.svg",
    moonshotai: "/logos/moonshot.svg",
    morph: "/logos/morph.svg",
    novita: "/logos/novita.svg",
    parasail: "/logos/parasail.svg",
    perplexity: "/logos/perplexity.svg",
    streamlake: "/logos/streamlake.svg",
    vercel: "/logos/vercel.svg",
    voyage: "/logos/voyage.svg",
    zai: "/logos/zai.svg",
    meta: "/logos/meta.svg",
    mistral: "/logos/mistral.svg",
    cohere: "/logos/cohere.svg",
  };
  return logoMap[provider];
}

export function getModelsByProvider(provider: AIProvider): AIModel[] {
  return getAvailableModels().filter((m) => m.provider === provider);
}

export const MODELS_BY_PROVIDER = getAvailableModels().reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, AIModel[]>,
);

export const PROVIDER_LABELS: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  xai: "xAI (Grok)",
  google: "Google",
  azure: "Azure",
  bedrock: "Amazon Bedrock",
  vertex: "Vertex AI",
  groq: "Groq",
  fireworks: "Fireworks",
  deepseek: "DeepSeek",
  cerebras: "Cerebras",
  bfl: "Black Forest Labs",
  alibaba: "Alibaba Cloud",
  "arcee-ai": "Arcee AI",
  baseten: "Baseten",
  deepinfra: "DeepInfra",
  inception: "Inception",
  meituan: "Meituan",
  minimax: "MiniMax",
  moonshotai: "Moonshot AI",
  morph: "Morph",
  novita: "Novita",
  parasail: "Parasail",
  perplexity: "Perplexity",
  streamlake: "StreamLake",
  vercel: "Vercel",
  voyage: "Voyage AI",
  zai: "Z.ai",
  meta: "Meta",
  mistral: "Mistral",
  cohere: "Cohere",
};

export function getModelById(modelId: string): AIModel | undefined {
  return AI_GATEWAY_MODELS.find((m) => m.id === modelId);
}

export function filterModels(models: AIModel[], query: string): AIModel[] {
  const lowerQuery = query.toLowerCase();
  return models.filter(
    (model) =>
      model.name.toLowerCase().includes(lowerQuery) ||
      (model.description &&
        model.description.toLowerCase().includes(lowerQuery)) ||
      model.provider.toLowerCase().includes(lowerQuery),
  );
}
