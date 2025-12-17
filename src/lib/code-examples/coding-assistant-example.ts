import { ApiComponent } from "@/components/docs/code-preview";
import { baseNextJsProject } from "./base-project";

// Complete Coding Assistant Example (includes base project + specific additions)
export const codingAssistantExample: ApiComponent = {
  name: "Coding Assistant",
  version: "1.0.0",
  files: [
    ...baseNextJsProject.files,
    // Enhanced environment variables
    {
      path: ".env.local",
      content: `# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Anthropic API Key for Claude models
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Vercel AI Gateway (recommended for production)
AI_GATEWAY_URL=https://your-project.vercel.app/api/ai`,
    },

    // Enhanced API route with multiple model support
    {
      path: "src/app/api/ai/route.ts",
      content: `import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

const MODEL_PROVIDERS = {
  'gpt-4o': openai('gpt-4o'),
  'gpt-4o-mini': openai('gpt-4o-mini'),
  'claude-3-5-sonnet': anthropic('claude-3-5-sonnet-20241022'),
  'claude-3-haiku': anthropic('claude-3-haiku-20240307'),
}

export async function POST(request: NextRequest) {
  try {
    const {
      messages,
      model = 'gpt-4o-mini',
      temperature = 0.3,
      maxTokens = 4000
    } = await request.json()

    const modelInstance = MODEL_PROVIDERS[model as keyof typeof MODEL_PROVIDERS]
    if (!modelInstance) {
      return NextResponse.json(
        { error: \`Model \${model} not supported\` },
        { status: 400 }
      )
    }

    const { text } = await generateText({
      model: modelInstance,
      messages,
      temperature,
      maxTokens,
      system: \`You are an expert coding assistant. Provide accurate, helpful responses about:
      - Programming languages and frameworks
      - Code debugging and optimization
      - Best practices and design patterns
      - API design and architecture
      - Testing and quality assurance

      Always provide code examples when relevant. Be concise but thorough.
      If asked for code, ensure it's production-ready and well-commented.\`
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}`,
    },

    // Enhanced sidekick/cn config for coding
    {
      path: "src/lib/sidekick-config.ts",
      content: `export interface SidekickConfig {
  model?: string
  temperature?: number
  maxTokens?: number
  baseUrl?: string

  modelConfig?: ModelConfig
  featuresConfig?: FeaturesConfig
  uiConfig?: UIConfig
  securityConfig?: SecurityConfig
}

export interface ModelConfig {
  allowedModels?: string[]
  defaultModel?: string
  allowModelChange?: boolean
  groupByProvider?: boolean
  hideIfSingleModel?: boolean
}

export interface FeaturesConfig {
  enableBranching?: boolean
  showSources?: boolean
  showReasoning?: boolean
  enableSuggestions?: boolean
  enableWorkflows?: boolean
  enableAttachments?: boolean
  enableTools?: boolean
  enableVoiceInput?: boolean
  maxHistoryLength?: number
  enableEditing?: boolean
  enableCopy?: boolean
}

export interface UIConfig {
  theme?: 'light' | 'dark' | 'system'
  compactMode?: boolean
  enableAnimations?: boolean
  messageAnimation?: 'fade' | 'slide' | 'none'
  enableShimmer?: boolean
  enableMarkdown?: boolean
  showTimestamps?: boolean
  showModelName?: boolean
  showTokenCounts?: boolean
  enableSyntaxHighlight?: boolean
  enableAutoScroll?: boolean
}

export interface SecurityConfig {
  maxMessageLength?: number
  rateLimitPerMinute?: number
  enableContentFilter?: boolean
  allowedFileTypes?: string[]
  maxFileSizeMB?: number
  enablePIIProtection?: boolean
}

export interface WorkflowDefinition {
  id: string
  name: string
  description: string
  systemPrompt?: string
  icon?: string
  category?: string
  tools?: string[]
  execute?: (input: any) => Promise<any>
}

export const DEFAULT_SIDEKICK_CONFIG: SidekickConfig = {
  model: 'claude-3-haiku',
  temperature: 0.3,
  maxTokens: 4000,
  baseUrl: '/api/ai',

  modelConfig: {
    allowedModels: ['claude-3-haiku', 'claude-3-5-sonnet', 'gpt-4o-mini', 'gpt-4o'],
    defaultModel: 'claude-3-haiku',
    allowModelChange: true,
    groupByProvider: true,
    hideIfSingleModel: false,
  },

  featuresConfig: {
    enableBranching: true,
    showSources: true,
    showReasoning: true,
    enableSuggestions: true,
    enableWorkflows: true,
    enableAttachments: true,
    enableTools: true,
    enableVoiceInput: false,
    maxHistoryLength: 100,
    enableEditing: true,
    enableCopy: true,
  },

  uiConfig: {
    theme: 'system',
    compactMode: false,
    enableAnimations: true,
    messageAnimation: 'slide',
    enableShimmer: true,
    enableMarkdown: true,
    showTimestamps: true,
    showModelName: true,
    showTokenCounts: false,
    enableSyntaxHighlight: true,
    enableAutoScroll: true,
  },

  securityConfig: {
    maxMessageLength: 8000,
    rateLimitPerMinute: 30,
    enableContentFilter: false,
    allowedFileTypes: ['.js', '.ts', '.tsx', '.jsx', '.py', '.java', '.cpp', '.c', '.go', '.rs', '.php', '.rb', '.md', '.txt'],
    maxFileSizeMB: 10,
    enablePIIProtection: false,
  },
}

export const DEFAULT_WORKFLOWS: WorkflowDefinition[] = [
  {
    id: 'code-review',
    name: 'Code Review',
    description: 'Review code for bugs, improvements, and best practices',
    systemPrompt: \`You are an expert code reviewer. Analyze the provided code and:
1. Identify potential bugs or issues
2. Suggest improvements for performance, security, and maintainability
3. Check for adherence to best practices
4. Provide actionable feedback with specific examples
5. Rate the code quality on a scale of 1-10\`,
    icon: 'Code',
    category: 'Development',
  },
  {
    id: 'debug',
    name: 'Debug Code',
    description: 'Find and fix bugs in code',
    systemPrompt: \`You are a debugging expert. Help identify and fix issues in code by:
1. Analyzing error messages and stack traces
2. Identifying logical errors and edge cases
3. Suggesting fixes with clear explanations
4. Providing test cases to reproduce issues
5. Offering prevention strategies for similar bugs\`,
    icon: 'Bug',
    category: 'Development',
  },
  {
    id: 'optimize',
    name: 'Optimize Performance',
    description: 'Improve code performance and efficiency',
    systemPrompt: \`You are a performance optimization expert. Help improve code by:
1. Identifying performance bottlenecks
2. Suggesting algorithmic improvements
3. Recommending memory and CPU optimizations
4. Providing benchmarking strategies
5. Explaining trade-offs between different approaches\`,
    icon: 'Zap',
    category: 'Development',
  },
  {
    id: 'unit-tests',
    name: 'Write Unit Tests',
    description: 'Generate comprehensive unit tests',
    systemPrompt: \`You are a testing expert. Create thorough unit tests by:
1. Identifying critical code paths and edge cases
2. Writing tests for both positive and negative scenarios
3. Including proper mocking and setup
4. Following testing best practices (Arrange-Act-Assert)
5. Adding descriptive test names and comments\`,
    icon: 'TestTube',
    category: 'Testing',
  },
  {
    id: 'refactor',
    name: 'Refactor Code',
    description: 'Improve code structure and maintainability',
    systemPrompt: \`You are a refactoring expert. Help improve code by:
1. Identifying code smells and anti-patterns
2. Suggesting better abstractions and structures
3. Improving readability and maintainability
4. Applying SOLID principles and design patterns
5. Explaining the benefits of each refactoring\`,
    icon: 'Wrench',
    category: 'Development',
  },
  {
    id: 'document',
    name: 'Add Documentation',
    description: 'Generate comprehensive code documentation',
    systemPrompt: \`You are a documentation expert. Create clear documentation by:
1. Writing comprehensive function/class documentation
2. Explaining parameters, return values, and side effects
3. Providing usage examples and code samples
4. Documenting important design decisions
5. Creating API documentation in standard formats\`,
    icon: 'FileText',
    category: 'Documentation',
  }
]`,
    },

    // Enhanced AI client with streaming support
    {
      path: "src/lib/ai-client.ts",
      content: `import { SidekickConfig } from './sidekick-config'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
  sources?: Source[]
  metadata?: Record<string, any>
}

export interface Source {
  title: string
  href: string
  type?: 'internal' | 'external'
}

export interface StreamingCallbacks {
  onToken?: (token: string) => void
  onComplete?: (fullResponse: string) => void
  onError?: (error: Error) => void
}

export class AIClient {
  private config: SidekickConfig

  constructor(config: SidekickConfig) {
    this.config = config
  }

  async sendMessage(
    message: string,
    context: Message[] = [],
    callbacks?: StreamingCallbacks
  ): Promise<string> {
    try {
      const messages = [
        ...context.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: 'user' as const, content: message }
      ]

      const response = await fetch(this.config.baseUrl || '/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model: this.config.model,
          temperature: this.config.temperature,
          maxTokens: this.config.maxTokens,
          stream: !!callbacks,
        }),
      })

      if (!response.ok) {
        throw new Error(\`API request failed: \${response.status}\`)
      }

      const data = await response.json()

      if (callbacks?.onComplete) {
        callbacks.onComplete(data.response)
      }

      return data.response
    } catch (error) {
      if (callbacks?.onError) {
        callbacks.onError(error as Error)
      }
      throw error
    }
  }

  async sendPrompt(prompt: string, callbacks?: StreamingCallbacks): Promise<string> {
    return this.sendMessage(prompt, [], callbacks)
  }

  // Utility method for code analysis
  async analyzeCode(code: string, language: string): Promise<{
    issues: string[]
    suggestions: string[]
    rating: number
  }> {
    const prompt = \`Analyze this \${language} code and provide feedback:

\`\`\`\${language}
\${code}
\`\`\`

Please provide:
1. List of potential issues or bugs
2. Suggestions for improvement
3. Overall code quality rating (1-10)

Be specific and actionable in your feedback.\`

    const response = await this.sendMessage(prompt)

    // Parse the response (simplified parsing)
    const issues = response.match(/issues?:?\s*\n?(.*?)(?=\n\s*(suggestions|rating|\n\n|\$))/is)?.[1]
      ?.split('\\n')
      ?.filter(line => line.trim().startsWith('-'))
      ?.map(line => line.trim().substring(1).trim()) || []

    const suggestions = response.match(/suggestions?:?\s*\n?(.*?)(?=\n\s*(rating|\n\n|\$))/is)?.[1]
      ?.split('\\n')
      ?.filter(line => line.trim().startsWith('-'))
      ?.map(line => line.trim().substring(1).trim()) || []

    const ratingMatch = response.match(/rating:?\s*(\d+)/i)
    const rating = ratingMatch ? parseInt(ratingMatch[1]) : 5

    return { issues, suggestions, rating }
  }
}

export const createAIClient = (config: SidekickConfig) => {
  return new AIClient(config)
}`,
    },

    // Enhanced hook with more features
    {
      path: "src/hooks/use-sidekick.tsx",
      content: `"use client"

import * as React from 'react'
import { AIClient, Message, createAIClient, StreamingCallbacks } from '@/lib/ai-client'
import { SidekickConfig, DEFAULT_SIDEKICK_CONFIG, WorkflowDefinition } from '@/lib/sidekick-config'

export interface SidekickContextType {
  config: SidekickConfig
  messages: Message[]
  isLoading: boolean
  workflows: WorkflowDefinition[]

  // Actions
  sendPrompt: (prompt: string, options?: Partial<SidekickConfig>, callbacks?: StreamingCallbacks) => Promise<string>
  addMessage: (message: Omit<Message, 'id'>) => void
  clearMessages: () => void
  triggerWorkflow: (workflowId: string, input: any) => Promise<any>
  registerAIElement: (name: string, component: any) => void
  addWorkflow: (workflow: WorkflowDefinition) => void
  analyzeCode: (code: string, language: string) => Promise<{
    issues: string[]
    suggestions: string[]
    rating: number
  }>

  // Registered elements
  registeredElements: Record<string, any>
}

const SidekickContext = React.createContext<SidekickContextType | null>(null)

export function createSidekickContext(
  config: SidekickConfig,
  workflows: WorkflowDefinition[]
): SidekickContextType {
  const mergedConfig = { ...DEFAULT_SIDEKICK_CONFIG, ...config }
  const aiClient = createAIClient(mergedConfig)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [registeredElements, setRegisteredElements] = React.useState<Record<string, any>>({})

  return {
    config: mergedConfig,
    messages,
    isLoading,
    workflows,
    registeredElements,

    sendPrompt: async (prompt: string, options?: Partial<SidekickConfig>, callbacks?: StreamingCallbacks) => {
      setIsLoading(true)
      try {
        const finalConfig = { ...mergedConfig, ...options }
        const client = createAIClient(finalConfig)
        const response = await client.sendMessage(prompt, messages, {
          ...callbacks,
          onComplete: (fullResponse) => {
            callbacks?.onComplete?.(fullResponse)
            setIsLoading(false)
          },
          onError: (error) => {
            callbacks?.onError?.(error)
            setIsLoading(false)
          }
        })
        return response
      } catch (error) {
        setIsLoading(false)
        throw error
      }
    },

    addMessage: (message: Omit<Message, 'id'>) => {
      const newMessage: Message = {
        ...message,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, newMessage])
    },

    clearMessages: () => {
      setMessages([])
    },

    triggerWorkflow: async (workflowId: string, input: any) => {
      const workflow = workflows.find(w => w.id === workflowId)
      if (!workflow) {
        throw new Error(\`Workflow \${workflowId} not found\`)
      }

      if (workflow.execute) {
        return await workflow.execute(input)
      }

      // Default workflow implementation
      let prompt = workflow.systemPrompt || ''

      if (workflow.id === 'code-review') {
        prompt += \`

Code to review:
\`\`\`
\${input.code || input}
\`\`\`
\`
      } else if (workflow.id === 'debug') {
        prompt += \`

Code with issue:
\`\`\`
\${input.code || input}
\`\`\`

Error/Problem: \${input.error || 'Please identify the issue'}
\`
      } else if (workflow.id === 'optimize') {
        prompt += \`

Code to optimize:
\`\`\`
\${input.code || input}
\`\`\`
\`
      } else {
        prompt += \`

Input: \${JSON.stringify(input)}
\`
      }

      return await aiClient.sendMessage(prompt, [])
    },

    registerAIElement: (name: string, component: any) => {
      setRegisteredElements(prev => ({ ...prev, [name]: component }))
    },

    addWorkflow: (workflow: WorkflowDefinition) => {
      workflows.push(workflow)
    },

    analyzeCode: async (code: string, language: string) => {
      return await aiClient.analyzeCode(code, language)
    },
  }
}

export function useSidekick(): SidekickContextType {
  const context = React.useContext(SidekickContext)
  if (!context) {
    throw new Error('useSidekick must be used within a SidekickProvider')
  }
  return context
}

export { SidekickContext }`,
    },

    // Enhanced chat component with code features
    {
      path: "src/components/sidekick/sidekick-chat.tsx",
      content: `"use client"

import * as React from 'react'
import { Send, Mic, Paperclip, Code, Copy, Check, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useSidekick, Message } from '@/hooks/use-sidekick'
import { cn } from '@/lib/utils'

export interface SidekickChatProps {
  placeholder?: string
  showSuggestions?: boolean
  suggestions?: string[]
  showModelSelector?: boolean
  showWorkflows?: boolean
  className?: string
}

export function SidekickChat({
  placeholder = "Ask me about code, debugging, or development...",
  showSuggestions = true,
  suggestions = [
    "Explain this code",
    "Debug this error",
    "Optimize performance",
    "Write unit tests",
    "Add documentation"
  ],
  showModelSelector = true,
  showWorkflows = true,
  className,
}: SidekickChatProps) {
  const {
    messages,
    sendPrompt,
    isLoading,
    addMessage,
    workflows,
    triggerWorkflow,
    config
  } = useSidekick()
  const [input, setInput] = React.useState('')
  const [selectedModel, setSelectedModel] = React.useState(config.model)
  const [copiedMessageId, setCopiedMessageId] = React.useState<string | null>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    })

    try {
      const response = await sendPrompt(userMessage, { model: selectedModel })

      // Add AI response
      addMessage({
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      })
    }
  }

  const handleWorkflowClick = async (workflowId: string) => {
    try {
      const result = await triggerWorkflow(workflowId, { code: input })
      addMessage({
        role: 'assistant',
        content: result,
        timestamp: new Date(),
      })
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: \`Workflow failed: \${error.message}\`,
        timestamp: new Date(),
      })
    }
  }

  const handleCopyMessage = async (content: string, messageId: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          <span className="font-semibold">Coding Assistant</span>
        </div>
        {showModelSelector && (
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            {config.modelConfig?.allowedModels?.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        )}
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-lg px-4 py-3 relative group',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted border'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedModel}
                    </Badge>
                    {message.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                )}

                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {message.content.split('\\n').map((line, i) => (
                    <div key={i}>{line || <br />}</div>
                  ))}
                </div>

                {message.role === 'assistant' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    onClick={() => handleCopyMessage(message.content, message.id)}
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted border rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">AI</Badge>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Workflows */}
      {showWorkflows && workflows.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 mb-3">
            <Workflow className="h-4 w-4" />
            <span className="text-sm font-medium">Workflows</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {workflows.map((workflow) => (
              <Button
                key={workflow.id}
                variant="outline"
                size="sm"
                onClick={() => handleWorkflowClick(workflow.id)}
                disabled={isLoading}
                className="text-xs"
              >
                {workflow.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-10 w-10 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}`,
    },

    // Enhanced provider
    {
      path: "src/components/sidekick/sidekick-provider.tsx",
      content: `"use client"

import * as React from 'react'
import { SidekickContext, createSidekickContext } from '@/hooks/use-sidekick'
import {
  SidekickConfig,
  DEFAULT_SIDEKICK_CONFIG,
  DEFAULT_WORKFLOWS,
  WorkflowDefinition,
} from '@/lib/sidekick-config'

export interface SidekickProviderProps {
  children: React.ReactNode
  config?: Partial<SidekickConfig>
  workflows?: WorkflowDefinition[]
}

export function SidekickProvider({
  children,
  config = {},
  workflows = DEFAULT_WORKFLOWS,
}: SidekickProviderProps) {
  const mergedConfig: SidekickConfig = React.useMemo(
    () => ({
      ...DEFAULT_SIDEKICK_CONFIG,
      ...config,
    }),
    [config],
  )

  const contextValue = createSidekickContext(mergedConfig, workflows)

  return (
    <SidekickContext.Provider value={contextValue}>
      {children}
    </SidekickContext.Provider>
  )
}`,
    },

    // Enhanced UI with panels
    {
      path: "src/components/sidekick/sidekick-ui.tsx",
      content: `"use client"

import * as React from 'react'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable'
import { SidekickChat } from './sidekick-chat'
import { cn } from '@/lib/utils'

export interface SidekickUIProps {
  layout?: 'default' | 'panel' | 'minimal' | 'fullscreen'
  className?: string
  children?: React.ReactNode
}

export function SidekickUI({
  layout = 'default',
  className,
  children,
}: SidekickUIProps) {
  const layoutClasses = {
    default: 'rounded-lg border bg-card shadow-sm',
    panel: 'rounded-lg border bg-card',
    minimal: 'bg-background',
    fullscreen: 'h-screen w-screen',
  }

  if (layout === 'fullscreen') {
    return (
      <div className={cn('flex h-screen', layoutClasses[layout], className)}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={70} minSize={50}>
            {children}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={25}>
            <SidekickChat />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )
  }

  return (
    <div className={cn('h-full', layoutClasses[layout], className)}>
      <SidekickChat />
    </div>
  )
}`,
    },

    // Update index
    {
      path: "src/components/sidekick/index.ts",
      content: `export { SidekickProvider, useSidekick } from './sidekick-provider'
export { SidekickChat } from './sidekick-chat'
export { SidekickUI } from './sidekick-ui'`,
    },

    // Create a coding-focused demo page
    {
      path: "src/app/page.tsx",
      content: `import { SidekickProvider } from '@/components/sidekick'
import { SidekickUI } from '@/components/sidekick'

export default function CodingAssistant() {
  return (
    <SidekickProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">AI Coding Assistant</h1>
              <p className="text-xl text-muted-foreground">
                Get help with coding, debugging, optimization, and best practices
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Code review and debugging assistance</li>
                  <li>• Performance optimization suggestions</li>
                  <li>• Unit test generation</li>
                  <li>• Code refactoring help</li>
                  <li>• Documentation generation</li>
                  <li>• Multiple AI models (Claude, GPT-4)</li>
                </ul>
              </div>

              <div className="p-6 border rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Supported Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP', 'Ruby'].map(lang => (
                    <span key={lang} className="px-2 py-1 bg-muted rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Try These Prompts</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Write a React component for a todo list",
                  "Debug this JavaScript error: TypeError: Cannot read property 'map' of undefined",
                  "Optimize this SQL query for better performance",
                  "Create unit tests for a user authentication function",
                  "Refactor this code to use modern async/await patterns",
                  "Add TypeScript types to this JavaScript function"
                ].map((prompt, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <p className="text-sm">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <p className="text-center text-muted-foreground">
                The AI assistant panel is ready to help! Click on any of the workflows above
                or type your own coding questions in the chat.
              </p>
            </div>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <div className="fixed bottom-4 right-4 z-50">
          <SidekickUI layout="panel" className="w-96 h-[600px] shadow-2xl" />
        </div>
      </div>
    </SidekickProvider>
  )
}`,
    },

    // Add necessary UI components
    {
      path: "src/components/ui/resizable.tsx",
      content: `import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <div className="h-2.5 w-[1px] bg-muted-foreground" />
        <div className="h-2.5 w-[1px] bg-muted-foreground ml-[1px]" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }`,
    },
  ],
};
