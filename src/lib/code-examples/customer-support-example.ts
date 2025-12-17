import { ApiComponent } from "@/components/docs/code-preview";
import { baseNextJsProject } from "./base-project";

// Complete Customer Support Example (includes base project + specific additions)
export const customerSupportExample: ApiComponent = {
  name: "Customer Support AI",
  version: "1.0.0",
  files: [
    ...baseNextJsProject.files,
    // Enhanced API route with support features
    {
      path: "src/app/api/ai/route.ts",
      content: `import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

// Knowledge base (in production, this would come from a database)
const KNOWLEDGE_BASE = {
  pricing: {
    basic: "$9.99/month - 100 conversations",
    pro: "$29.99/month - 1000 conversations + analytics",
    enterprise: "Custom pricing - unlimited conversations"
  },
  features: [
    "AI-powered responses",
    "Multi-language support",
    "Integration with existing systems",
    "Analytics dashboard",
    "Custom workflows"
  ],
  commonIssues: {
    "api-key": "Check your API key in environment variables",
    "rate-limit": "You've exceeded the rate limit. Upgrade your plan.",
    "integration": "Ensure all required fields are filled in the integration settings."
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model = 'gpt-4o-mini', temperature = 0.3, context } = await request.json()

    // Add knowledge base context
    const systemPrompt = \`You are a professional customer support AI assistant. Be helpful, polite, and efficient.

Knowledge Base:
- Pricing: Basic $\${KNOWLEDGE_BASE.pricing.basic}, Pro $\${KNOWLEDGE_BASE.pricing.pro}, Enterprise $\${KNOWLEDGE_BASE.pricing.enterprise}
- Features: \${KNOWLEDGE_BASE.features.join(', ')}
- Common Issues: \${Object.entries(KNOWLEDGE_BASE.commonIssues).map(([k, v]) => \`\${k}: \${v}\`).join('; ')}

Guidelines:
1. Always be professional and empathetic
2. Escalate to human support for complex issues
3. Offer specific solutions when possible
4. Ask clarifying questions when needed
5. Suggest upgrading plans for advanced features
6. Keep responses concise but complete

If this is a technical issue that requires human intervention, suggest escalating the ticket.\`

    const messagesWithContext = [
      { role: 'system', content: systemPrompt },
      ...messages
    ]

    const { text } = await generateText({
      model: openai(model),
      messages: messagesWithContext,
      temperature,
      maxTokens: 1000,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Support AI Error:', error)
    return NextResponse.json(
      { error: 'Support service temporarily unavailable' },
      { status: 500 }
    )
  }
}`,
    },

    // Support-specific configuration
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
  supportConfig?: SupportConfig
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

export interface SupportConfig {
  enableEscalation?: boolean
  escalationKeywords?: string[]
  autoEscalateAfter?: number
  businessHours?: {
    start: string
    end: string
    timezone: string
  }
  supportEmail?: string
  enableAnalytics?: boolean
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
  model: 'gpt-4o-mini',
  temperature: 0.3,
  maxTokens: 1000,
  baseUrl: '/api/ai',

  modelConfig: {
    allowedModels: ['gpt-4o-mini'],
    defaultModel: 'gpt-4o-mini',
    allowModelChange: false,
    groupByProvider: false,
    hideIfSingleModel: true,
  },

  featuresConfig: {
    enableBranching: false,
    showSources: false,
    showReasoning: false,
    enableSuggestions: true,
    enableWorkflows: true,
    enableAttachments: true,
    enableTools: false,
    enableVoiceInput: false,
    maxHistoryLength: 50,
    enableEditing: false,
    enableCopy: true,
  },

  uiConfig: {
    theme: 'light',
    compactMode: false,
    enableAnimations: true,
    messageAnimation: 'slide',
    enableShimmer: true,
    enableMarkdown: true,
    showTimestamps: true,
    showModelName: false,
    showTokenCounts: false,
    enableSyntaxHighlight: false,
    enableAutoScroll: true,
  },

  securityConfig: {
    maxMessageLength: 2000,
    rateLimitPerMinute: 10,
    enableContentFilter: true,
    allowedFileTypes: ['.txt', '.pdf', '.jpg', '.png'],
    maxFileSizeMB: 5,
    enablePIIProtection: true,
  },

  supportConfig: {
    enableEscalation: true,
    escalationKeywords: ['urgent', 'escalate', 'human', 'manager', 'supervisor'],
    autoEscalateAfter: 5,
    businessHours: {
      start: '09:00',
      end: '17:00',
      timezone: 'America/New_York'
    },
    supportEmail: 'support@company.com',
    enableAnalytics: true,
  },
}

export const DEFAULT_WORKFLOWS: WorkflowDefinition[] = [
  {
    id: 'troubleshoot-account',
    name: 'Account Issues',
    description: 'Help with login, password, or account access problems',
    systemPrompt: \`Help the user troubleshoot account-related issues:
1. Ask for specific error messages
2. Guide through password reset if needed
3. Check for common login issues
4. Escalate to human support if unable to resolve\`,
    icon: 'User',
    category: 'Account',
  },
  {
    id: 'billing-support',
    name: 'Billing Help',
    description: 'Assistance with payments, invoices, and plan changes',
    systemPrompt: \`Provide billing support:
1. Explain current pricing plans
2. Help with payment issues
3. Guide through plan upgrades/downgrades
4. Provide invoice information
5. Escalate complex billing disputes\`,
    icon: 'CreditCard',
    category: 'Billing',
  },
  {
    id: 'escalate-ticket',
    name: 'Escalate to Human',
    description: 'Create a support ticket for human assistance',
    execute: async (input) => {
      // In production, this would integrate with a ticketing system
      const ticketId = 'TICKET-' + Date.now()
      return \`Your support ticket \${ticketId} has been created. A human agent will contact you within 2 hours during business hours (9 AM - 5 PM EST). You can reference this ticket number in future communications.\`
    },
    icon: 'UserPlus',
    category: 'Escalation',
  },
  {
    id: 'check-status',
    name: 'Check Ticket Status',
    description: 'Check the status of an existing support ticket',
    execute: async (input) => {
      // In production, this would query the ticketing system
      const ticketId = input.ticketId || 'unknown'
      return \`I'm checking the status of ticket \${ticketId}... For security reasons, I cannot access specific ticket details. Please check your email for status updates or contact us directly at support@company.com.\`
    },
    icon: 'Search',
    category: 'Status',
  }
]`,
    },

    // Support-focused chat component
    {
      path: "src/components/sidekick/sidekick-chat.tsx",
      content: `"use client"

import * as React from 'react'
import { Send, Paperclip, User, Clock, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSidekick, Message } from '@/hooks/use-sidekick'
import { cn } from '@/lib/utils'

export interface SidekickChatProps {
  placeholder?: string
  showSuggestions?: boolean
  suggestions?: string[]
  supportConfig?: {
    enableEscalation: boolean
    businessHours: { start: string; end: string; timezone: string }
  }
  className?: string
}

export function SidekickChat({
  placeholder = "How can we help you today?",
  showSuggestions = true,
  suggestions = [
    "I need help with my account",
    "Billing or payment question",
    "Technical issue",
    "Feature request"
  ],
  supportConfig = {
    enableEscalation: true,
    businessHours: { start: '09:00', end: '17:00', timezone: 'America/New_York' }
  },
  className,
}: SidekickChatProps) {
  const { messages, sendPrompt, isLoading, addMessage, workflows, triggerWorkflow, config } = useSidekick()
  const [input, setInput] = React.useState('')
  const [messageCount, setMessageCount] = React.useState(0)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const isBusinessHours = () => {
    const now = new Date()
    const est = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}))
    const currentTime = est.getHours() * 100 + est.getMinutes()
    const startTime = parseInt(supportConfig.businessHours.start.replace(':', ''))
    const endTime = parseInt(supportConfig.businessHours.end.replace(':', ''))

    return currentTime >= startTime && currentTime <= endTime
  }

  const shouldEscalate = () => {
    return messageCount >= (config.supportConfig?.autoEscalateAfter || 5)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessageCount(prev => prev + 1)

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    })

    // Check for escalation keywords
    const escalationKeywords = config.supportConfig?.escalationKeywords || []
    const needsEscalation = escalationKeywords.some(keyword =>
      userMessage.toLowerCase().includes(keyword.toLowerCase())
    ) || shouldEscalate()

    if (needsEscalation && supportConfig.enableEscalation) {
      // Auto-escalate
      try {
        const escalationResult = await triggerWorkflow('escalate-ticket', { message: userMessage })
        addMessage({
          role: 'assistant',
          content: escalationResult,
          timestamp: new Date(),
        })
      } catch (error) {
        addMessage({
          role: 'assistant',
          content: 'I apologize, but I need to escalate this to our human support team. Please hold while I create a ticket for you.',
          timestamp: new Date(),
        })
      }
      return
    }

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
        content: 'I apologize, but I encountered an error. Please try again or contact our support team directly.',
        timestamp: new Date(),
      })
    }
  }

  const handleWorkflowClick = async (workflowId: string) => {
    try {
      const result = await triggerWorkflow(workflowId, { message: input })
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

  const businessHoursMessage = !isBusinessHours() ? (
    <Alert className="mb-4">
      <Clock className="h-4 w-4" />
      <AlertDescription>
        Our support team is currently offline. You can still submit questions and we'll respond during business hours (9 AM - 5 PM EST).
      </AlertDescription>
    </Alert>
  ) : null

  return (
    <div className={cn('flex flex-col h-full bg-white', className)}>
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Support Assistant</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {isBusinessHours() ? 'Online' : 'Away'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Alert */}
      {businessHoursMessage}

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Welcome to Support</h3>
              <p className="text-gray-600 mb-4">
                How can we help you today? I'm here to assist with your questions and concerns.
              </p>
              <div className="text-sm text-gray-500">
                <p>Business Hours: 9 AM - 5 PM EST</p>
                <p>Response time: Usually within 2 hours</p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[85%] rounded-lg px-4 py-3 text-sm',
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.timestamp && (
                  <div className={cn(
                    'text-xs mt-2',
                    message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                  )}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Quick Actions */}
      {showSuggestions && suggestions.length > 0 && messages.length === 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="text-sm font-medium mb-3 text-gray-700">Quick Help:</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInput(suggestion)}
                className="text-xs bg-white hover:bg-gray-50"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Workflows */}
      {workflows.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <div className="text-sm font-medium mb-3 text-gray-700">Support Options:</div>
          <div className="flex flex-wrap gap-2">
            {workflows.map((workflow) => (
              <Button
                key={workflow.id}
                variant="outline"
                size="sm"
                onClick={() => handleWorkflowClick(workflow.id)}
                disabled={isLoading}
                className="text-xs bg-white hover:bg-gray-50"
              >
                {workflow.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Escalation Warning */}
      {shouldEscalate() && supportConfig.enableEscalation && (
        <div className="p-4 border-t bg-yellow-50">
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              For complex issues, I recommend escalating to our human support team.
              They can provide more detailed assistance.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[60px] resize-none border-gray-300 focus:border-blue-500"
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
              className="h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </form>
    </div>
  )
}`,
    },

    // Support-focused provider
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

    // Support dashboard page
    {
      path: "src/app/page.tsx",
      content: `import { SidekickProvider } from '@/components/sidekick'
import { SidekickChat } from '@/components/sidekick'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function SupportDashboard() {
  return (
    <SidekickProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Customer Support Center</h1>
              <p className="text-xl text-gray-600">
                AI-powered support with human escalation capabilities
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Chat Area */}
              <div className="lg:col-span-2">
                <Card className="h-[700px] overflow-hidden">
                  <SidekickChat />
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Support Stats */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Support Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Today's Queries</span>
                      <Badge variant="secondary">47</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Resolved</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">42</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Escalated</span>
                      <Badge variant="destructive">5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Response</span>
                      <span className="text-sm font-medium">2.3 min</span>
                    </div>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View All Tickets
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Team Dashboard
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </Card>

                {/* Business Hours */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Support Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Currently Online</span>
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">New ticket #1234 created</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">Ticket #1233 resolved</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">Ticket #1232 escalated</p>
                        <p className="text-xs text-gray-500">8 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-gray-600">
              <p className="text-sm">
                Need immediate assistance? Call us at <strong>(555) 123-4567</strong> or
                email <strong>support@company.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </SidekickProvider>
  )
}`,
    },

    // Index file
    {
      path: "src/components/sidekick/index.ts",
      content: `export { SidekickProvider, useSidekick } from './sidekick-provider'
export { SidekickChat } from './sidekick-chat'`,
    },
  ],
};
