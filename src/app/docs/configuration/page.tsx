"use client";

import { CodePreview } from "@/components/docs/code-preview";
import { ScrollableHeading } from "@/components/docs/scrollable-heading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";

export default function ConfigurationPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6"></div>
        <div>
          <h1 className="text-4xl font-bold mb-4">Configuration Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master sidekick/cn's configuration system. From basic setup to
            advanced customization, learn how to tailor your AI assistant to
            your exact requirements.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            Runtime Configurable
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Type Safe
          </Badge>
          <Badge variant="secondary" className="px-3 py-1">
            Themeable
          </Badge>
        </div>
      </div>

      {/* Quick Start */}
      <Alert className="border-border bg-muted">
        <AlertDescription>
          <strong>Configuration Basics:</strong> Pass config to{" "}
          <code>SidekickProvider</code>. All settings are optional with sensible
          defaults. Changes require component re-render.
        </AlertDescription>
      </Alert>

      {/* Configuration Overview */}
      <Card className="p-8">
        <div className="text-center mb-6">
          <ScrollableHeading className="text-2xl font-semibold mb-2">
            Configuration Architecture
          </ScrollableHeading>
          <p className="text-muted-foreground">
            sidekick/cn uses a hierarchical configuration system with
            TypeScript-first design
          </p>
        </div>

        <CodePreview
          title="SidekickConfig Interface"
          code={`interface SidekickConfig {
  // ========== CORE AI SETTINGS ==========
  model?: string                    // AI model ID
  temperature?: number             // Response randomness (0.0-2.0)
  maxTokens?: number              // Max response length
  baseUrl?: string                // Custom API endpoint

  // ========== MODEL MANAGEMENT ==========
  modelConfig?: {
    allowedModels?: string[]       // Whitelist of models
    defaultModel?: string          // Default selected model
    hideIfSingleModel?: boolean    // Hide selector if only one model
    groupByProvider?: boolean      // Group by OpenAI/Anthropic/xAI
    allowModelChange?: boolean     // Let users switch models
  }

  // ========== FEATURE TOGGLES ==========
  featuresConfig?: {
    // AI Features
    enableBranching?: boolean      // Message branching/versioning
    showSources?: boolean          // Source citations
    showReasoning?: boolean        // AI reasoning traces
    enableSuggestions?: boolean    // Quick suggestion chips
    enableWorkflows?: boolean      // Custom workflow system
    maxHistoryLength?: number      // Message history limit

    // Input Features
    enableAttachments?: boolean    // File uploads
    enableTools?: boolean          // Function calling
    enableEditing?: boolean        // Message editing
    enableCopy?: boolean           // Copy message content
    enableVoiceInput?: boolean     // Voice input support
  }

  // ========== UI CUSTOMIZATION ==========
  uiConfig?: {
    theme?: "light" | "dark" | "system"  // Theme preference
    compactMode?: boolean          // Reduced spacing
    enableAnimations?: boolean     // Smooth transitions
    messageAnimation?: "fade" | "slide" | "none"  // Message appearance
    enableShimmer?: boolean        // Loading animations
    enableMarkdown?: boolean       // Markdown rendering
    showTokenCounts?: boolean      // Token usage display
  }

  // ========== SECURITY SETTINGS ==========
  securityConfig?: {
    maxMessageLength?: number      // Character limit per message
    rateLimitPerMinute?: number    // Messages per minute
    allowedFileTypes?: string[]    // Permitted file extensions
    maxFileSizeMB?: number         // Max file size
    enableContentFilter?: boolean  // Content moderation
    enablePIIProtection?: boolean  // PII detection/removal
  }

  // ========== FRAMEWORK INTEGRATIONS ==========
  frameworkConfig?: {
    enabled?: boolean             // Enable framework integrations

    // LangChain integration
    langchain?: {
      enabled?: boolean
      apiKey?: string
      baseUrl?: string
      models?: string[]
      agents?: Array<{
        id: string
        name: string
        description?: string
        config?: Record<string, any>
      }>
    }

    // LangFuse integration
    langfuse?: {
      enabled?: boolean
      publicKey?: string
      secretKey?: string
      host?: string
      projectId?: string
    }

    // LiteLLM integration
    litellm?: {
      enabled?: boolean
      apiKey?: string
      models?: string[]
      config?: Record<string, any>
    }

    // LlamaIndex integration
    llamaindex?: {
      enabled?: boolean
      apiKey?: string
      indexName?: string
      documents?: Array<{
        id: string
        content: string
        metadata?: Record<string, any>
      }>
    }

    // Mastra integration
    mastra?: {
      enabled?: boolean
      agents?: Array<{
        id: string
        name: string
        instructions?: string
        tools?: string[]
        memory?: Record<string, any>
      }>
    }

    // Pydantic AI integration
    pydanticai?: {
      enabled?: boolean
      models?: string[]
      outputTypes?: Array<{
        name: string
        schema: Record<string, any>
      }>
    }

    // Custom integrations
    custom?: Array<{
      id: string
      name: string
      type: string
      config?: Record<string, any>
      endpoint?: string
      auth?: {
        type: "bearer" | "basic" | "api-key"
        token?: string
        username?: string
        password?: string
      }
    }>
  }
}`}
        />

        <div className="mt-6 p-4 rounded-lg bg-muted/50">
          <h4 className="font-medium mb-3">Configuration Rules:</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              • <strong>All properties optional</strong> - Sensible defaults
              provided
            </li>
            <li>
              • <strong>Type-safe</strong> - Full TypeScript IntelliSense
              support
            </li>
            <li>
              • <strong>Runtime configurable</strong> - Can be changed
              dynamically
            </li>
            <li>
              • <strong>Inherited by children</strong> - Applies to all
              sidekick/cn components
            </li>
            <li>
              • <strong>Environment-aware</strong> - Adapts to development vs
              production
            </li>
          </ul>
        </div>
      </Card>

      {/* TypeScript Types */}
      <Card className="p-8">
        <ScrollableHeading className="text-xl font-semibold mb-6">
          TypeScript Types
        </ScrollableHeading>
        <p className="text-muted-foreground mb-6">
          Complete type definitions for advanced usage and custom integrations.
        </p>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="config">SidekickConfig</TabsTrigger>
            <TabsTrigger value="model">ModelConfig</TabsTrigger>
            <TabsTrigger value="features">FeaturesConfig</TabsTrigger>
            <TabsTrigger value="ui">UIConfig</TabsTrigger>
            <TabsTrigger value="framework">Framework</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <CodePreview
              title="SidekickConfig Type"
              code={`export interface SidekickConfig {
  // Core AI Settings
  model?: string
  temperature?: number
  maxTokens?: number
  baseUrl?: string

  // Sub-configurations
  modelConfig?: ModelConfig
  featuresConfig?: FeaturesConfig
  uiConfig?: UIConfig
  securityConfig?: SecurityConfig
}`}
            />
          </TabsContent>

          <TabsContent value="model" className="space-y-4">
            <CodePreview
              title="ModelConfig Type"
              code={`export interface ModelConfig {
  allowedModels?: string[]
  defaultModel?: string
  hideIfSingleModel?: boolean
  groupByProvider?: boolean
  allowModelChange?: boolean
}`}
            />
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <CodePreview
              title="FeaturesConfig Type"
              code={`export interface FeaturesConfig {
  // AI Features
  enableBranching?: boolean
  showSources?: boolean
  showReasoning?: boolean
  enableSuggestions?: boolean
  enableWorkflows?: boolean
  maxHistoryLength?: number

  // Input Features
  enableAttachments?: boolean
  enableTools?: boolean
  enableEditing?: boolean
  enableCopy?: boolean
  enableVoiceInput?: boolean
}`}
            />
          </TabsContent>

          <TabsContent value="ui" className="space-y-4">
            <CodePreview
              title="UIConfig Type"
              code={`export interface UIConfig {
  theme?: "light" | "dark" | "system"
  compactMode?: boolean
  enableAnimations?: boolean
  messageAnimation?: "fade" | "slide" | "none"
  enableShimmer?: boolean
  enableMarkdown?: boolean
  showTokenCounts?: boolean
}`}
            />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Configuration Categories */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Configuration Categories
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            sidekick/cn configuration is organized into logical categories for
            easy management.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-4"></div>
            <h3 className="font-semibold mb-2">Core AI</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Model selection, temperature, token limits, and API endpoints.
            </p>
            <div className="text-xs space-y-1">
              <div>• model, temperature</div>
              <div>• maxTokens, baseUrl</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-4"></div>
            <h3 className="font-semibold mb-2">Model Config</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Control available models, defaults, and user permissions.
            </p>
            <div className="text-xs space-y-1">
              <div>• allowedModels</div>
              <div>• defaultModel</div>
              <div>• allowModelChange</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-4"></div>
            <h3 className="font-semibold mb-2">Features</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enable/disable AI features like reasoning, sources, attachments.
            </p>
            <div className="text-xs space-y-1">
              <div>• enableBranching</div>
              <div>• showSources</div>
              <div>• enableWorkflows</div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-4"></div>
            <h3 className="font-semibold mb-2">UI Config</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Customize appearance, animations, and user experience.
            </p>
            <div className="text-xs space-y-1">
              <div>• enableAnimations</div>
              <div>• compactMode</div>
              <div>• theme</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Environment Configuration */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Environment Configuration
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Configure AI providers and deployment settings through environment
            variables.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"></div>
              <h3 className="font-semibold">Vercel Deployment</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Automatic configuration with Vercel AI Gateway. Set variables in
              your dashboard.
            </p>
            <CodePreview
              code={`# Vercel Dashboard > Project Settings > Environment Variables

# Required - At least one provider
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
XAI_API_KEY=xai-your-xai-key

# Optional - Custom base URL
AI_BASE_URL=https://api.example.com

# Optional - Rate limiting
AI_RATE_LIMIT=100
AI_RATE_WINDOW=60`}
            />
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted"></div>
              <h3 className="font-semibold">Local Development</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Create .env.local file in your project root for local development.
            </p>
            <CodePreview
              code={`# .env.local
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
XAI_API_KEY=xai-your-xai-key

# Development settings
NODE_ENV=development
AI_LOG_LEVEL=debug`}
            />
          </Card>
        </div>

        <Alert>
          <AlertDescription>
            <strong>Security Note:</strong> API keys are server-side only. They
            are never exposed to the client. Use different keys for development
            and production environments.
          </AlertDescription>
        </Alert>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Supported AI Providers</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center"></div>
              <div>
                <div className="font-medium">OpenAI</div>
                <div className="text-xs text-muted-foreground">
                  GPT-4, GPT-3.5
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center"></div>
              <div>
                <div className="font-medium">Anthropic</div>
                <div className="text-xs text-muted-foreground">
                  Claude models
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center"></div>
              <div>
                <div className="font-medium">xAI</div>
                <div className="text-xs text-muted-foreground">Grok models</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center"></div>
              <div>
                <div className="font-medium">Fireworks AI</div>
                <div className="text-xs text-muted-foreground">
                  Fast inference
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center"></div>
              <div>
                <div className="font-medium">AWS Bedrock</div>
                <div className="text-xs text-muted-foreground">Enterprise</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="w-8 h-8 bg-muted rounded flex items-center justify-center"></div>
              <div>
                <div className="font-medium">Google Vertex</div>
                <div className="text-xs text-muted-foreground">
                  Gemini models
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Detailed Configuration */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Detailed Configuration
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Every configuration option explained with examples and use cases.
          </p>
        </div>

        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="core">Core AI</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="ui">UI</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="core" className="space-y-6">
            <div className="grid gap-6">
              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">model</code>
                    <Badge variant="outline">string</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    The AI model to use for generating responses. Must be a
                    valid model ID from your AI gateway.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: "openai/gpt-4.1-mini"
                  </div>
                  <CodePreview
                    code={`// Available models
const config = {
  model: "openai/gpt-4.1",           // GPT-4.1
  model: "anthropic/claude-opus-4.5", // Claude Opus
  model: "xai/grok-4.1-fast-non-reasoning" // Grok Fast
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      temperature
                    </code>
                    <Badge variant="outline">number</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Controls response randomness. Lower values (0.1-0.3) for
                    focused answers, higher values (0.7-1.0) for creative
                    responses.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Range: 0.0 - 2.0 | Default: 0.7
                  </div>
                  <CodePreview
                    code={`const config = {
  temperature: 0.1,  // Very focused/deterministic
  temperature: 0.7,  // Balanced creativity (default)
  temperature: 1.2,  // Highly creative/random
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      maxTokens
                    </code>
                    <Badge variant="outline">number</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Maximum number of tokens the AI can generate in a single
                    response. Affects response length and cost.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Range: 1 - model limit | Default: 2000
                  </div>
                  <CodePreview
                    code={`const config = {
  maxTokens: 500,   // Short responses
  maxTokens: 2000,  // Balanced (default)
  maxTokens: 4000,  // Long detailed responses
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      baseUrl
                    </code>
                    <Badge variant="outline">string</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Custom API endpoint for AI requests. Useful for self-hosted
                    gateways or custom routing.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: "/api/ai"
                  </div>
                  <CodePreview
                    code={`const config = {
  baseUrl: "/api/ai",              // Default Next.js route
  baseUrl: "https://api.example.com/ai", // Custom endpoint
  baseUrl: "/custom/ai-endpoint"   // Custom Next.js route
}`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid gap-6">
              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      allowedModels
                    </code>
                    <Badge variant="outline">string[]</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Array of model IDs that users can select from. Empty array
                    allows all available models.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: [] (all models allowed)
                  </div>
                  <CodePreview
                    code={`const config = {
  modelConfig: {
    allowedModels: [], // All models (default)
    allowedModels: ["openai/gpt-4.1", "anthropic/claude-opus-4.5"],
    allowedModels: ["xai/grok-4.1-fast-non-reasoning"] // Only fast models
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      defaultModel
                    </code>
                    <Badge variant="outline">string</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    The model selected by default when the component loads.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: "openai/gpt-4.1-mini"
                  </div>
                  <CodePreview
                    code={`const config = {
  modelConfig: {
    defaultModel: "openai/gpt-4.1-mini",     // Cost-effective
    defaultModel: "anthropic/claude-opus-4.5", // Most capable
    defaultModel: "xai/grok-4.1-fast-non-reasoning" // Fastest
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      hideIfSingleModel
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Hide the model selector UI when only one model is available.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: true
                  </div>
                  <CodePreview
                    code={`const config = {
  modelConfig: {
    allowedModels: ["openai/gpt-4.1"], // Only one model
    hideIfSingleModel: true,  // ✅ Selector hidden
    hideIfSingleModel: false  // ❌ Selector shown anyway
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      groupByProvider
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Group models by provider (OpenAI, Anthropic, xAI) in the
                    selector dropdown.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: true
                  </div>
                  <CodePreview
                    code={`const config = {
  modelConfig: {
    groupByProvider: true,   // ✅ Grouped by provider
    groupByProvider: false   // ❌ Flat alphabetical list
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      allowModelChange
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Allow users to change models during conversation. When
                    false, locks to default model.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: true
                  </div>
                  <CodePreview
                    code={`const config = {
  modelConfig: {
    allowModelChange: true,   // ✅ Users can switch models
    allowModelChange: false   // ❌ Locked to default model
  }
}`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">AI Features</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Message Branching</span>
                    <Badge variant="outline">enableBranching</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Source Citations</span>
                    <Badge variant="outline">showSources</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reasoning Traces</span>
                    <Badge variant="outline">showReasoning</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Quick Suggestions</span>
                    <Badge variant="outline">enableSuggestions</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Input Features</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>File Attachments</span>
                    <Badge variant="outline">enableAttachments</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tool Calling</span>
                    <Badge variant="outline">enableTools</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Message Editing</span>
                    <Badge variant="outline">enableEditing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Message Copy</span>
                    <Badge variant="outline">enableCopy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Voice Input</span>
                    <Badge variant="outline">enableVoiceInput</Badge>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid gap-6">
              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      maxHistoryLength
                    </code>
                    <Badge variant="outline">number</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Maximum number of messages to keep in conversation history.
                    Older messages are automatically removed.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: 50
                  </div>
                  <CodePreview
                    code={`const config = {
  featuresConfig: {
    maxHistoryLength: 20,   // Short-term memory
    maxHistoryLength: 50,   // Balanced (default)
    maxHistoryLength: 100,  // Long conversations
    maxHistoryLength: 0     // Unlimited (not recommended)
  }
}`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ui" className="space-y-6">
            <div className="grid gap-6">
              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">theme</code>
                    <Badge variant="outline">"light" | "dark" | "system"</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Theme preference for the chat interface. "system" follows
                    user's OS preference.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: "system"
                  </div>
                  <CodePreview
                    code={`const config = {
  uiConfig: {
    theme: "light",   // Always light mode
    theme: "dark",    // Always dark mode
    theme: "system"   // Follow system preference (default)
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      compactMode
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Enable compact mode with reduced padding and spacing for
                    embedded usage.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: false
                  </div>
                  <CodePreview
                    code={`const config = {
  uiConfig: {
    compactMode: false,  // Standard spacing (default)
    compactMode: true    // Reduced padding/spacing
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      enableAnimations
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Enable smooth animations and transitions throughout the
                    interface.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: true
                  </div>
                  <CodePreview
                    code={`const config = {
  uiConfig: {
    enableAnimations: true,   // Smooth transitions (default)
    enableAnimations: false   // Disable all animations
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      messageAnimation
                    </code>
                    <Badge variant="outline">"fade" | "slide" | "none"</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Animation style for new messages appearing in the
                    conversation.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: "slide"
                  </div>
                  <CodePreview
                    code={`const config = {
  uiConfig: {
    messageAnimation: "slide",  // Slide in from bottom (default)
    messageAnimation: "fade",   // Fade in opacity
    messageAnimation: "none"    // No animation
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      enableShimmer
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Show animated shimmer loading effect while AI is generating
                    responses.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: true
                  </div>
                  <CodePreview
                    code={`const config = {
  uiConfig: {
    enableShimmer: true,   // Show loading animation (default)
    enableShimmer: false   // Plain loading text
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      enableMarkdown
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Render markdown formatting in AI responses (code blocks,
                    lists, etc.).
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: true
                  </div>
                  <CodePreview
                    code={`const config = {
  uiConfig: {
    enableMarkdown: true,   // Render markdown (default)
    enableMarkdown: false   // Plain text only
  }
}`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Alert className="border-border bg-muted">
              <AlertDescription>
                <strong>Security Note:</strong> These settings help protect
                against abuse but don't replace proper server-side validation
                and rate limiting.
              </AlertDescription>
            </Alert>

            <div className="grid gap-6">
              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      maxMessageLength
                    </code>
                    <Badge variant="outline">number</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Maximum character length allowed for user messages. Helps
                    prevent abuse and manage costs.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: 4000
                  </div>
                  <CodePreview
                    code={`const config = {
  securityConfig: {
    maxMessageLength: 1000,  // Short messages
    maxMessageLength: 4000,  // Standard (default)
    maxMessageLength: 8000,  // Long messages allowed
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      rateLimitPerMinute
                    </code>
                    <Badge variant="outline">number</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Maximum number of messages allowed per minute from a single
                    user. Helps prevent abuse.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: 20
                  </div>
                  <CodePreview
                    code={`const config = {
  securityConfig: {
    rateLimitPerMinute: 5,   // Very restrictive
    rateLimitPerMinute: 20,  // Balanced (default)
    rateLimitPerMinute: 60,  // Generous limit
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      allowedFileTypes
                    </code>
                    <Badge variant="outline">string[]</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    File extensions allowed for upload. Empty array disables
                    file attachments.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: [".txt", ".md", ".pdf", ".jpg", ".png"]
                  </div>
                  <CodePreview
                    code={`const config = {
  securityConfig: {
    allowedFileTypes: [".txt", ".md"],     // Text files only
    allowedFileTypes: [".jpg", ".png"],    // Images only
    allowedFileTypes: [],                  // No file uploads
    allowedFileTypes: [".txt", ".md", ".pdf", ".jpg", ".png"] // Default
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      maxFileSizeMB
                    </code>
                    <Badge variant="outline">number</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Maximum file size allowed for uploads in megabytes.
                  </p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Default: 10
                  </div>
                  <CodePreview
                    code={`const config = {
  securityConfig: {
    maxFileSizeMB: 1,   // Small files only
    maxFileSizeMB: 10,  // Standard (default)
    maxFileSizeMB: 50,  // Large files allowed
  }
}`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="framework" className="space-y-6">
            <Alert className="border-border bg-muted">
              <AlertDescription>
                <strong>Framework Integrations:</strong> Connect sidekick/cn
                with popular AI frameworks and tools. Requires additional setup
                and API keys.
              </AlertDescription>
            </Alert>

            <div className="grid gap-6">
              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      enabled
                    </code>
                    <Badge variant="outline">boolean</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Globally enable or disable all framework integrations.
                  </p>
                  <CodePreview
                    title="Enable Framework Integrations"
                    code={`frameworkConfig: {
  enabled: true
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      langchain
                    </code>
                    <Badge variant="outline">object</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Integrate with LangChain for advanced agent capabilities and
                    tool calling.
                  </p>
                  <CodePreview
                    title="LangChain Integration"
                    code={`frameworkConfig: {
  langchain: {
    enabled: true,
    apiKey: "your-langchain-api-key",
    baseUrl: "https://api.langchain.com",
    models: ["gpt-4", "claude-3"],
    agents: [{
      id: "research-agent",
      name: "Research Assistant",
      description: "Helps with research tasks",
      config: { temperature: 0.3 }
    }]
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      langfuse
                    </code>
                    <Badge variant="outline">object</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect to LangFuse for LLM observability and analytics.
                  </p>
                  <CodePreview
                    title="LangFuse Integration"
                    code={`frameworkConfig: {
  langfuse: {
    enabled: true,
    publicKey: "your-public-key",
    secretKey: "your-secret-key",
    host: "https://cloud.langfuse.com",
    projectId: "your-project-id"
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      litellm
                    </code>
                    <Badge variant="outline">object</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Use LiteLLM as a unified interface for multiple LLM
                    providers.
                  </p>
                  <CodePreview
                    title="LiteLLM Integration"
                    code={`frameworkConfig: {
  litellm: {
    enabled: true,
    apiKey: "your-litellm-key",
    models: ["gpt-4", "claude-3", "gemini-pro"],
    config: {
      drop_params: true,
      max_retries: 3
    }
  }
}`}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="p-4 border-b bg-muted/50">
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm font-medium">
                      custom
                    </code>
                    <Badge variant="outline">Array&lt;object&gt;</Badge>
                    <Badge variant="secondary">Optional</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    Define custom framework integrations for unsupported tools.
                  </p>
                  <CodePreview
                    title="Custom Integration"
                    code={`frameworkConfig: {
  custom: [{
    id: "my-custom-ai",
    name: "My Custom AI",
    type: "custom",
    endpoint: "https://api.my-custom-ai.com",
    config: { model: "custom-model-v1" },
    auth: {
      type: "bearer",
      token: "your-api-token"
    }
  }]
}`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Preset Configurations */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Configuration Presets
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Ready-to-use configuration presets for common use cases. Copy and
            customize as needed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 border-border bg-muted">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
              <h3 className="font-semibold">Minimal</h3>
              <Badge variant="secondary" className="text-xs">
                Free Tier
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Basic chat with essential features only. Perfect for getting
              started quickly.
            </p>
            <CodePreview
              code={`const minimalConfig = {
  model: "openai/gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
  modelConfig: {
    allowedModels: ["openai/gpt-3.5-turbo"],
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
    maxHistoryLength: 10,
  },
  uiConfig: {
    compactMode: true,
    enableAnimations: false,
  }
}`}
            />
          </Card>

          <Card className="p-6 border-border bg-muted">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
              <h3 className="font-semibold">Standard</h3>
              <Badge variant="secondary" className="text-xs">
                Pro Tier
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Full featured with all AI elements enabled. Balanced for most use
              cases.
            </p>
            <CodePreview
              code={`const standardConfig = {
  model: "openai/gpt-4.1",
  temperature: 0.7,
  maxTokens: 2000,
  modelConfig: {
    allowedModels: [], // All models
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
    maxHistoryLength: 50,
  },
  uiConfig: {
    enableAnimations: true,
    messageAnimation: "slide",
    enableShimmer: true,
    enableMarkdown: true,
  }
}`}
            />
          </Card>

          <Card className="p-6 border-border bg-muted">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
              <h3 className="font-semibold">Enterprise</h3>
              <Badge variant="secondary" className="text-xs">
                Enterprise
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Secure, compliant configuration for business use with enhanced
              security.
            </p>
            <CodePreview
              code={`const enterpriseConfig = {
  model: "anthropic/claude-opus-4.5",
  temperature: 0.3, // More deterministic
  maxTokens: 4000,
  securityConfig: {
    maxMessageLength: 2000,
    rateLimitPerMinute: 10,
    enableContentFilter: true,
    allowedFileTypes: [".txt", ".md", ".pdf"],
    maxFileSizeMB: 5,
    enablePIIProtection: true,
  },
  featuresConfig: {
    enableBranching: false,
    maxHistoryLength: 20,
  },
  uiConfig: {
    showTokenCounts: false,
    enableAnimations: true,
  }
}`}
            />
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Custom Presets</h3>
          <p className="text-muted-foreground mb-4">
            Create your own configuration presets for specific use cases or user
            roles.
          </p>

          <CodePreview
            title="Creating Custom Presets"
            code={`// config/presets.ts
export const presets = {
  developer: {
    model: "openai/gpt-4.1",
    featuresConfig: {
      showSources: true,
      showReasoning: true,
      enableAttachments: true,
      enableTools: true,
    }
  },

  customerService: {
    model: "anthropic/claude-opus-4.5",
    temperature: 0.3,
    featuresConfig: {
      enableSuggestions: true,
      maxHistoryLength: 100,
    },
    securityConfig: {
      enablePIIProtection: true,
      maxMessageLength: 1000,
    }
  },

  creative: {
    model: "xai/grok-4",
    temperature: 1.2,
    uiConfig: {
      enableMarkdown: true,
      messageAnimation: "fade",
    }
  }
}

// Usage
<SidekickProvider config={presets.developer}>
  <SidekickChat />
</SidekickProvider>`}
          />
        </Card>
      </section>

      {/* Environment Configuration */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Environment Configuration
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Configure sidekick/cn for different environments and deployment
            scenarios.
          </p>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Development vs Production</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Different configurations for development and production
            environments.
          </p>
          <CodePreview
            code={`// .env.local (Development)
AI_GATEWAY_API_KEY=dev_key_here
NEXT_PUBLIC_SIDECKICK_ENV=development

// .env.production (Production)
AI_GATEWAY_API_KEY=prod_key_here
NEXT_PUBLIC_SIDECKICK_ENV=production`}
          />
        </Card>
      </section>

      {/* API Integration */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            API Integration
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Integrate sidekick/cn with external APIs and services.
          </p>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Custom API Endpoints</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Configure custom API endpoints for specialized integrations.
          </p>
          <CodePreview
            code={`const customConfig = {
  apiConfig: {
    baseUrl: "https://api.yourcompany.com",
    endpoints: {
      chat: "/ai/chat",
      models: "/ai/models",
      workflows: "/ai/workflows"
    },
    headers: {
      "X-API-Key": process.env.YOUR_API_KEY
    }
  }
}`}
          />
        </Card>
      </section>

      {/* Security Settings */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Security Settings
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Configure security features and access controls for your AI
            assistant.
          </p>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Access Control</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Implement role-based access control and security measures.
          </p>
          <CodePreview
            code={`const secureConfig = {
  securityConfig: {
    enableRateLimiting: true,
    maxRequestsPerHour: 100,
    allowedDomains: ["yourcompany.com"],
    enableContentFiltering: true,
    logAllInteractions: true,
    encryptMessages: true
  }
}`}
          />
        </Card>
      </section>

      {/* Summary */}
      <section className="space-y-6">
        <Card className="p-8 bg-primary/5 border-primary/20">
          <div className="text-center">
            <ScrollableHeading className="text-2xl font-semibold mb-4">
              Configuration Summary
            </ScrollableHeading>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              sidekick/cn's configuration system provides complete control over
              your AI assistant's behavior, appearance, and security while
              maintaining sensible defaults for quick setup.
            </p>

            <div className="grid gap-4 md:grid-cols-3 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <p className="text-sm text-muted-foreground">
                  Configuration Options
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  Type-Safe
                </div>
                <p className="text-sm text-muted-foreground">
                  Full TypeScript Support
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  Runtime
                </div>
                <p className="text-sm text-muted-foreground">Dynamic Updates</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Runtime Configuration */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Runtime Configuration
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Update configuration dynamically during runtime without component
            re-mounting.
          </p>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Dynamic Updates</h3>
          <p className="text-muted-foreground mb-4">
            Use React state to dynamically update sidekick/cn configuration
            based on user preferences or application state.
          </p>

          <CodePreview
            title="Dynamic Configuration"
            code={`import { useState } from "react"
import { SidekickProvider, SidekickChat } from "@/components/sidekick"

function App() {
  const [config, setConfig] = useState({
    model: "openai/gpt-4.1-mini",
    temperature: 0.7,
    uiConfig: { theme: "system" }
  })

  const updateModel = (model: string) => {
    setConfig(prev => ({ ...prev, model }))
  }

  const toggleTheme = () => {
    setConfig(prev => ({
      ...prev,
      uiConfig: {
        ...prev.uiConfig,
        theme: prev.uiConfig?.theme === "dark" ? "light" : "dark"
      }
    }))
  }

  return (
    <SidekickProvider config={config}>
      <div>
        <button onClick={() => updateModel("anthropic/claude-opus-4.5")}>
          Switch to Claude
        </button>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <SidekickChat />
      </div>
    </SidekickProvider>
  )
}`}
          />

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Performance Note:</strong> Configuration updates trigger
              component re-renders. For frequent updates, consider using React's
              memoization or context optimization.
            </AlertDescription>
          </Alert>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Context-Based Configuration</h3>
          <p className="text-muted-foreground mb-4">
            Create configuration presets based on user roles, subscription
            tiers, or application contexts.
          </p>

          <CodePreview
            title="Role-Based Configuration"
            code={`// config/presets.ts
export const configPresets = {
  free: {
    model: "openai/gpt-3.5-turbo",
    maxTokens: 1000,
    featuresConfig: {
      enableBranching: false,
      showSources: false,
      maxHistoryLength: 10
    }
  },

  pro: {
    model: "openai/gpt-4.1",
    maxTokens: 4000,
    featuresConfig: {
      enableBranching: true,
      showSources: true,
      showReasoning: true,
      maxHistoryLength: 50
    }
  },

  enterprise: {
    model: "anthropic/claude-opus-4.5",
    maxTokens: 8000,
    securityConfig: {
      maxMessageLength: 4000,
      rateLimitPerMinute: 60,
      enablePIIProtection: true
    }
  }
}

// Usage
function App({ userTier }: { userTier: 'free' | 'pro' | 'enterprise' }) {
  return (
    <SidekickProvider config={configPresets[userTier]}>
      <SidekickChat />
    </SidekickProvider>
  )
}`}
          />
        </Card>
      </section>

      {/* Configuration Tips */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            Configuration Tips
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Best practices and important considerations.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
              Performance
            </h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Lower temperature for faster, more focused responses</li>
              <li>• Reduce maxTokens for quicker responses</li>
              <li>• Disable animations on slower devices</li>
              <li>• Use compact mode for mobile</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
              Cost Management
            </h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Use smaller models for simple tasks</li>
              <li>• Limit message history length</li>
              <li>• Restrict file uploads appropriately</li>
              <li>• Set reasonable rate limits</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
              User Experience
            </h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Enable suggestions for new users</li>
              <li>• Show reasoning for educational content</li>
              <li>• Use sources for research applications</li>
              <li>• Enable markdown for rich responses</li>
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-foreground flex items-center gap-2">
              Security
            </h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Always validate on server side too</li>
              <li>• Use appropriate file type restrictions</li>
              <li>• Set reasonable message length limits</li>
              <li>• Consider PII protection for sensitive data</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
