"use client";

import { Callout } from "@/components/docs/callout";
import { CodePreview } from "@/components/docs/code-preview";
import { InstallCommand } from "@/components/docs/install-command";
import { PropsTable } from "@/components/docs/props-table";
import { ScrollableHeading } from "@/components/docs/scrollable-heading";

export default function HooksPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-left space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">useSidekick Hook</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Powerful React hook for accessing sidekick/cn's AI functionality,
            state management, and context. Build custom components and
            integrations with full TypeScript support.
          </p>
        </div>
      </div>

      {/* Prerequisites */}
      <Callout type="info" title="Requirements">
        The <code>useSidekick</code> hook must be used within a{" "}
        <code>SidekickProvider</code> component. It provides reactive access to
        AI state, configuration, and functionality through React's context
        system.
      </Callout>

      {/* Installation */}
      <section className="space-y-6">
        <ScrollableHeading className="text-3xl font-bold">
          Installation
        </ScrollableHeading>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-hooks.json"
          title="Install useSidekick Hook"
          description="React hooks for sidekick/cn AI functionality"
        />
      </section>

      {/* Basic Usage */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            useSidekick Hook
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            The main hook for AI chat functionality, message management, and
            workflow execution. Provides reactive access to chat state, sending
            messages, and managing conversations.
          </p>
        </div>

        <CodePreview
          code={`import { useSidekick } from "@/hooks/use-sidekick"

function ChatComponent() {
  const {
    messages,
    sendMessage,
    isLoading,
    error,
    model,
    setModel,
    temperature,
    setTemperature,
    streamingMessage,
    isStreaming
  } = useSidekick({
    model: "anthropic/claude-sonnet-4",
    temperature: 0.7,
    maxTokens: 2000,
    enableStreaming: true,
    onMessage: (message) => {
      console.log("New message:", message)
    },
    onError: (error) => {
      console.error("Chat error:", error)
    },
    onToken: (token) => {
      console.log("Token:", token)
    }
  })

  const handleSubmit = async (message: string) => {
    await sendMessage(message)
  }

  return (
    <div className="chat-container">
      {/* Model Selector */}
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="openai/gpt-5">GPT-5</option>
        <option value="anthropic/claude-sonnet-4">Claude Sonnet</option>
        <option value="groq/llama-3.1-70b">Llama 3.1</option>
      </select>

      {/* Temperature Control */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
      />

      {/* Messages */}
      {messages.map(message => (
        <div key={message.id} className="message">
          {message.content}
        </div>
      ))}

      {/* Streaming Message */}
      {isStreaming && streamingMessage && (
        <div className="message streaming">
          {streamingMessage.content}
          <span className="cursor">|</span>
        </div>
      )}

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <input
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(e.target.value)
            e.target.value = ''
          }
        }}
        placeholder="Type your message..."
      />
    </div>
  )
}`}
        />

        <ScrollableHeading className="text-2xl font-semibold mb-4">
          Hook Parameters
        </ScrollableHeading>

        <PropsTable
          props={[
            {
              name: "config",
              type: "SidekickConfig",
              description: "Current configuration object",
            },
            {
              name: "messages",
              type: "Message[]",
              description:
                "Array of chat messages with id, role, content, and timestamp",
            },
            {
              name: "isLoading",
              type: "boolean",
              description: "Whether a message is currently being sent",
            },
            {
              name: "sendPrompt",
              type: "(prompt: string, options?: Partial<SidekickConfig>, callbacks?: StreamingCallbacks) => Promise<string>",
              description:
                "Function to send a prompt to the AI and get a response",
            },
            {
              name: "triggerWorkflow",
              type: "(workflowId: string, input: any) => Promise<any>",
              description: "Execute a specific workflow with given input",
            },
            {
              name: "registerAIElement",
              type: "(name: string, component: AIElementComponent) => void",
              description: "Register a custom AI element component",
            },
            {
              name: "registeredElements",
              type: "Record<string, AIElementComponent>",
              description: "Map of registered AI element components",
            },
            {
              name: "workflows",
              type: "WorkflowDefinition[]",
              description: "Array of available workflow definitions",
            },
            {
              name: "addWorkflow",
              type: "(workflow: WorkflowDefinition) => void",
              description: "Add a new workflow definition",
            },
            {
              name: "clearMessages",
              type: "() => void",
              description: "Clear all messages from the conversation",
            },
            {
              name: "addMessage",
              type: "(message: Omit<Message, 'id'>) => void",
              description: "Add a message to the conversation",
            },
            {
              name: "discoverModels",
              type: "() => Promise<void>",
              description: "Discover available AI models from the gateway",
            },
            {
              name: "availableModels",
              type: "() => any[]",
              description: "Get list of available AI models",
            },
            {
              name: "setTemperature",
              type: "(temperature: number) => void",
              description: "Function to change temperature",
            },
            {
              name: "maxTokens",
              type: "number",
              description: "Maximum tokens per response",
            },
            {
              name: "setMaxTokens",
              type: "(tokens: number) => void",
              description: "Function to change max tokens",
            },
            {
              name: "streamingMessage",
              type: "Message | null",
              description: "Current streaming message being received",
            },
            {
              name: "isStreaming",
              type: "boolean",
              description: "Whether a response is currently streaming",
            },
            {
              name: "executeWorkflow",
              type: "(workflowId: string, params: any) => Promise<void>",
              description: "Execute a predefined workflow",
            },
            {
              name: "workflowStatus",
              type: "string | null",
              description: "Current workflow execution status",
            },
            {
              name: "currentStep",
              type: "string | null",
              description: "Current workflow step being executed",
            },
            {
              name: "clearMessages",
              type: "() => void",
              description: "Clear all messages from the chat",
            },
            {
              name: "retryLastMessage",
              type: "() => Promise<void>",
              description: "Retry the last failed message",
            },
          ]}
        />

        {/* Hook Parameters */}
        <h3 className="font-semibold mb-4">Hook Parameters</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Optional configuration object passed to useSidekick()
        </p>

        <PropsTable
          props={[
            {
              name: "model",
              type: "string",
              defaultValue: '"openai/gpt-4.1-mini"',
              description: "Default AI model for conversations",
            },
            {
              name: "temperature",
              type: "number",
              defaultValue: "0.7",
              description: "Controls randomness in AI responses",
            },
            {
              name: "maxTokens",
              type: "number",
              defaultValue: "2000",
              description: "Maximum tokens per response",
            },
            {
              name: "enableStreaming",
              type: "boolean",
              defaultValue: "true",
              description: "Enable real-time streaming responses",
            },
            {
              name: "onMessage",
              type: "(message: Message) => void",
              defaultValue: "undefined",
              description: "Callback fired when a new message is received",
            },
            {
              name: "onError",
              type: "(error: Error) => void",
              defaultValue: "undefined",
              description: "Callback fired when an error occurs",
            },
            {
              name: "onToken",
              type: "(token: string) => void",
              defaultValue: "undefined",
              description: "Callback fired for each streaming token",
            },
            {
              name: "onComplete",
              type: "() => void",
              defaultValue: "undefined",
              description: "Callback fired when response is complete",
            },
          ]}
        />
      </section>

      {/* useSidekickChat Hook */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            useSidekickChat Hook
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Specialized hook for chat functionality with message management and
            conversation handling.
          </p>
        </div>

        <CodePreview
          code={`import { useSidekickChat } from "@/hooks/use-sidekick-chat"

function ChatComponent() {
  const {
    messages,
    sendMessage,
    isLoading,
    clearMessages,
    conversationId
  } = useSidekickChat({
    model: "openai/gpt-4.1-mini",
    enableStreaming: true
  })

  return (
    <div className="chat-container">
      {messages.map(message => (
        <div key={message.id}>
          {message.content}
        </div>
      ))}
    </div>
  )
}`}
        />
      </section>

      {/* useSidekickConfig Hook */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            useSidekickConfig Hook
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Hook for managing sidekick configuration and settings.
          </p>
        </div>

        <CodePreview
          code={`import { useSidekickConfig } from "@/hooks/use-sidekick-config"

function ConfigComponent() {
  const {
    config,
    updateConfig,
    resetConfig,
    saveConfig
  } = useSidekickConfig()

  return (
    <div className="config-container">
      <button onClick={() => updateConfig({ temperature: 0.8 })}>
        Update Temperature
      </button>
    </div>
  )
}`}
        />
      </section>

      {/* useSidekickProvider Hook */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            useSidekickProvider Hook
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Hook for accessing the sidekick provider context directly.
          </p>
        </div>

        <CodePreview
          code={`import { useSidekickProvider } from "@/hooks/use-sidekick-provider"

function CustomComponent() {
  const {
    workflows,
    addWorkflow,
    executeWorkflow,
    aiElements
  } = useSidekickProvider()

  return (
    <div className="custom-container">
      <p>Available workflows: {workflows.length}</p>
    </div>
  )
}`}
        />
      </section>

      {/* useSidekickUI Hook */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            useSidekickUI Hook
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Hook for managing UI state and interactions within sidekick
            components.
          </p>
        </div>

        <CodePreview
          code={`import { useSidekickUI } from "@/hooks/use-sidekick-ui"

function UIComponent() {
  const {
    isOpen,
    toggle,
    theme,
    setTheme,
    layout
  } = useSidekickUI()

  return (
    <div className="ui-container">
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'} Chat
      </button>
    </div>
  )
}`}
        />
      </section>
    </div>
  );
}
