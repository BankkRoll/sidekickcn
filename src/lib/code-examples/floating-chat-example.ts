import { ApiComponent } from "@/components/docs/code-preview";
import { baseNextJsProject } from "./base-project";

// Complete Floating Chat Widget Example (includes base project + specific additions)
export const floatingChatExample: ApiComponent = {
  name: "Floating Chat Widget",
  version: "1.0.0",
  files: [
    ...baseNextJsProject.files,
    // Environment variables
    {
      path: ".env.local",
      content: `# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Vercel AI Gateway URL
# AI_GATEWAY_URL=https://your-project.vercel.app/api/ai`,
    },

    // API Route for AI
    {
      path: "src/app/api/ai/route.ts",
      content: `import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages, model = 'gpt-4o-mini', temperature = 0.7 } = await request.json()

    const { text } = await generateText({
      model: openai(model),
      messages,
      temperature,
      system: \`You are a helpful AI assistant embedded in a website.
      Be friendly, concise, and helpful. If asked about technical topics,
      provide clear explanations with examples when appropriate.\`
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

    // sidekick/cn configuration
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

export const DEFAULT_SIDEKICK_CONFIG: SidekickConfig = {
  model: 'gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 2000,
  baseUrl: '/api/ai',

  modelConfig: {
    allowedModels: ['gpt-4o-mini', 'gpt-4o'],
    defaultModel: 'gpt-4o-mini',
    allowModelChange: false,
    groupByProvider: true,
    hideIfSingleModel: true,
  },

  featuresConfig: {
    enableBranching: false,
    showSources: true,
    showReasoning: false,
    enableSuggestions: true,
    enableWorkflows: false,
    enableAttachments: false,
    enableTools: false,
    enableVoiceInput: false,
    maxHistoryLength: 50,
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
    showTimestamps: false,
    showModelName: false,
    showTokenCounts: false,
    enableSyntaxHighlight: true,
    enableAutoScroll: true,
  },

  securityConfig: {
    maxMessageLength: 2000,
    rateLimitPerMinute: 20,
    enableContentFilter: false,
    allowedFileTypes: [],
    maxFileSizeMB: 0,
    enablePIIProtection: false,
  },
}

export const DEFAULT_WORKFLOWS = []`,
    },

    // AI Client
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

export class AIClient {
  private config: SidekickConfig

  constructor(config: SidekickConfig) {
    this.config = config
  }

  async sendMessage(message: string, context: Message[] = []): Promise<string> {
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
        }),
      })

      if (!response.ok) {
        throw new Error(\`API request failed: \${response.status}\`)
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('AI Client Error:', error)
      throw error
    }
  }

  async sendPrompt(prompt: string): Promise<string> {
    return this.sendMessage(prompt, [])
  }
}

export const createAIClient = (config: SidekickConfig) => {
  return new AIClient(config)
}`,
    },

    // sidekick/cn Context Hook
    {
      path: "src/hooks/use-sidekick.tsx",
      content: `"use client"

import * as React from 'react'
import { AIClient, Message, createAIClient } from '@/lib/ai-client'
import { SidekickConfig, DEFAULT_SIDEKICK_CONFIG, WorkflowDefinition } from '@/lib/sidekick-config'

export interface SidekickContextType {
  config: SidekickConfig
  messages: Message[]
  isLoading: boolean
  workflows: WorkflowDefinition[]

  // Actions
  sendPrompt: (prompt: string, options?: Partial<SidekickConfig>) => Promise<string>
  addMessage: (message: Omit<Message, 'id'>) => void
  clearMessages: () => void
  triggerWorkflow: (workflowId: string, input: any) => Promise<any>
  registerAIElement: (name: string, component: any) => void
  addWorkflow: (workflow: WorkflowDefinition) => void

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

  return {
    config: mergedConfig,
    messages: [],
    isLoading: false,
    workflows,
    registeredElements: {},

    sendPrompt: async (prompt: string, options?: Partial<SidekickConfig>) => {
      const finalConfig = { ...mergedConfig, ...options }
      return aiClient.sendMessage(prompt, [])
    },

    addMessage: (message: Omit<Message, 'id'>) => {
      // Implementation would go here
      console.log('Adding message:', message)
    },

    clearMessages: () => {
      // Implementation would go here
      console.log('Clearing messages')
    },

    triggerWorkflow: async (workflowId: string, input: any) => {
      const workflow = workflows.find(w => w.id === workflowId)
      if (!workflow) {
        throw new Error(\`Workflow \${workflowId} not found\`)
      }

      if (workflow.execute) {
        return await workflow.execute(input)
      }

      // Default implementation
      const prompt = \`\${workflow.systemPrompt || ''}

User Input: \${JSON.stringify(input)}

Please respond according to the workflow instructions.\`

      return await aiClient.sendMessage(prompt, [])
    },

    registerAIElement: (name: string, component: any) => {
      // Implementation would go here
      console.log(\`Registering AI element: \${name}\`)
    },

    addWorkflow: (workflow: WorkflowDefinition) => {
      workflows.push(workflow)
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

    // Floating Chat Component
    {
      path: "src/components/sidekick/sidekick-floating.tsx",
      content: `"use client"

import * as React from 'react'
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidekickProvider } from './sidekick-provider'
import { SidekickChat } from './sidekick-chat'
import { cn } from '@/lib/utils'

export interface SidekickFloatingProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  defaultOpen?: boolean
  trigger?: React.ReactNode
  className?: string
}

export function SidekickFloating({
  position = 'bottom-right',
  defaultOpen = false,
  trigger,
  className,
}: SidekickFloatingProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  }

  const defaultTrigger = (
    <Button
      size="lg"
      className="rounded-full shadow-lg h-14 w-14 p-0 bg-primary hover:bg-primary/90"
      onClick={() => setIsOpen(true)}
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )

  if (!isOpen) {
    return (
      <div className={cn('fixed z-50', positionClasses[position], className)}>
        {trigger || defaultTrigger}
      </div>
    )
  }

  return (
    <div className={cn('fixed z-50', positionClasses[position], className)}>
      <Card className="w-96 h-[600px] shadow-2xl border-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">AI Assistant</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <SidekickProvider>
            <SidekickChat />
          </SidekickProvider>
        </div>
      </Card>
    </div>
  )
}`,
    },

    // Chat Component
    {
      path: "src/components/sidekick/sidekick-chat.tsx",
      content: `"use client"

import * as React from 'react'
import { Send, Mic, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidekick, Message } from '@/hooks/use-sidekick'
import { cn } from '@/lib/utils'

export interface SidekickChatProps {
  placeholder?: string
  showSuggestions?: boolean
  suggestions?: string[]
  className?: string
}

export function SidekickChat({
  placeholder = "Ask me anything...",
  showSuggestions = true,
  suggestions = [],
  className,
}: SidekickChatProps) {
  const { messages, sendPrompt, isLoading, addMessage } = useSidekick()
  const [input, setInput] = React.useState('')
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
      const response = await sendPrompt(userMessage)

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

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {showSuggestions && suggestions.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[60px] resize-none"
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
              size="sm"
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

    // Provider Component
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

    // Index file
    {
      path: "src/components/sidekick/index.ts",
      content: `export { SidekickProvider, useSidekick } from './sidekick-provider'
export { SidekickChat } from './sidekick-chat'
export { SidekickFloating } from './sidekick-floating'`,
    },

    // Update main layout to include floating chat
    {
      path: "src/app/layout.tsx",
      content: `"use client"

import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { SidekickFloating } from "@/components/sidekick"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SidekickFloating
            position="bottom-right"
            defaultOpen={false}
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}`,
    },

    // Update main page with some content
    {
      path: "src/app/page.tsx",
      content: `export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Site</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-muted-foreground">
              Learn more about our company and what we do. We're here to help you
              with all your questions and provide the best service possible.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <p className="text-muted-foreground">
              Discover our wide range of services designed to meet your needs.
              From consulting to development, we've got you covered.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Get in touch with us anytime. Our AI assistant is available 24/7
              to help answer your questions and provide support.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Try Our AI Assistant</h3>
          <p className="text-muted-foreground mb-4">
            Click the chat bubble in the bottom right corner to start a conversation
            with our AI assistant. It can help answer questions about our services,
            provide information, and assist with various tasks.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Ask about our products and services</li>
            <li>Get help with common questions</li>
            <li>Receive personalized recommendations</li>
            <li>Available 24/7 for instant support</li>
          </ul>
        </div>
      </div>
    </main>
  )
}`,
    },

    // Additional UI components needed
    {
      path: "src/components/ui/textarea.tsx",
      content: `import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }`,
    },

    {
      path: "src/components/ui/scroll-area.tsx",
      content: `import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }`,
    },
  ],
};
