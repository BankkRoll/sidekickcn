"use client";
import { CodePreview } from "@/components/docs/code-preview";
import { InstallCommand } from "@/components/docs/install-command";
import { PropsTable } from "@/components/docs/props-table";
import { ScrollableHeading } from "@/components/docs/scrollable-heading";
import { Separator } from "@/components/ui/separator";

export default function ComponentsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-left space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Components Reference</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Complete API documentation for all sidekick/cn components. From
            basic building blocks to complex layouts, learn how to compose and
            customize every component.
          </p>
        </div>
      </div>

      {/* SidekickProvider */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickProvider
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            The root provider that manages AI state, configuration, and context
            throughout your application.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-provider.json"
          title="SidekickProvider"
          description="Context provider and core functionality"
        />

        <CodePreview
          code={`import { SidekickProvider } from "@/components/sidekick"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidekickProvider
          config={{
            model: "openai/gpt-4.1-mini",
            temperature: 0.7,
            maxTokens: 2000,
            modelConfig: {
              allowedModels: ["openai/gpt-4.1-mini", "anthropic/claude-sonnet-4"],
              defaultModel: "openai/gpt-4.1-mini"
            },
            featuresConfig: {
              showSources: true,
              showReasoning: true,
              enableSuggestions: true
            }
          }}
        >
          {children}
        </SidekickProvider>
      </body>
    </html>
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "config",
              type: "SidekickConfig",
              defaultValue: "undefined",
              description:
                "Configuration object for AI models, features, and UI settings",
            },
            {
              name: "workflows",
              type: "WorkflowDefinition[]",
              defaultValue: "DEFAULT_WORKFLOWS",
              description:
                "Array of workflow definitions available to the chat",
            },
            {
              name: "enableSidebar",
              type: "boolean",
              defaultValue: "false",
              description:
                "Enable sidebar layout mode instead of standard provider",
            },
            {
              name: "sidebarPosition",
              type: '"left" | "right"',
              defaultValue: '"right"',
              description: "Position of the sidebar when enabled",
            },
            {
              name: "sidebarWidth",
              type: "number | string",
              defaultValue: "420",
              description: "Width of the sidebar in pixels or CSS value",
            },
            {
              name: "sidebarDefaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Whether the sidebar should be open by default",
            },
            {
              name: "children",
              type: "ReactNode",
              defaultValue: "undefined",
              description: "Child components to render within the provider",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickFloating */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickFloating
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Floating chat widget that overlays your application with a 50vh
            expandable interface.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-floating.json"
          title="SidekickFloating"
          description="Floating chat widget component"
        />

        <CodePreview
          code={`import { SidekickFloating } from "@/components/sidekick"

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <SidekickFloating
        position="bottom-right"
        model="openai/gpt-5"
        showModelSelector={true}
        showSources={true}
        showReasoning={true}
        enableSuggestions={true}
        suggestions={[
          "Explain this code",
          "Add error handling",
          "Optimize performance"
        ]}
      />
    </div>
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "position",
              type: '"bottom-right" | "bottom-left" | "top-right" | "top-left"',
              defaultValue: '"bottom-right"',
              description: "Position of the floating widget on screen",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description:
                "Whether the floating chat should be open by default",
            },
            {
              name: "trigger",
              type: "React.ReactNode",
              defaultValue: "undefined",
              description: "Custom trigger element to open the floating chat",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "undefined",
              description:
                "Additional CSS classes to apply to the floating widget",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickChat */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickChat
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Full-page chat interface with advanced AI conversation features and
            customization options.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-chat.json"
          title="SidekickChat"
          description="Full-page chat interface component"
        />

        <CodePreview
          code={`import { SidekickChat } from "@/components/sidekick"

export default function ChatPage() {
  return (
    <div className="h-screen">
      <SidekickChat
        model="openai/gpt-5"
        temperature={0.7}
        maxTokens={4000}
        showModelSelector={true}
        showSources={true}
        showReasoning={true}
        showSuggestions={true}
        enableAttachments={true}
        maxHistoryLength={50}
        uiConfig={{
          theme: "dark",
          enableAnimations: true,
          enableMarkdown: true
        }}
      />
    </div>
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "className",
              type: "string",
              defaultValue: "undefined",
              description: "Additional CSS classes for the chat component",
            },
            {
              name: "showModelSelector",
              type: "boolean",
              defaultValue: "false",
              description: "Display model selection interface",
            },
            {
              name: "showSources",
              type: "boolean",
              defaultValue: "false",
              description: "Show source citations in responses",
            },
            {
              name: "showReasoning",
              type: "boolean",
              defaultValue: "false",
              description: "Display AI reasoning process",
            },
            {
              name: "showSuggestions",
              type: "boolean",
              defaultValue: "true",
              description: "Show conversation suggestions",
            },
            {
              name: "showAttachments",
              type: "boolean",
              defaultValue: "false",
              description: "Show attachment upload interface",
            },
            {
              name: "showWebSearch",
              type: "boolean",
              defaultValue: "false",
              description: "Enable web search functionality",
            },
            {
              name: "showMicrophone",
              type: "boolean",
              defaultValue: "false",
              description: "Show voice input button",
            },
            {
              name: "suggestions",
              type: "string[]",
              defaultValue: "[]",
              description: "Array of suggestion prompts",
            },
            {
              name: "as",
              type: "React.ComponentType<any>",
              defaultValue: "undefined",
              description: "Custom component to render as",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickSidebar */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickSidebar
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Sliding sidebar chat interface that integrates seamlessly with your
            existing layout.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-sidebar.json"
          title="SidekickSidebar"
          description="Sliding sidebar chat component"
        />

        <CodePreview
          code={`import { SidekickSidebar } from "@/components/sidekick"

export default function App() {
  return (
    <div className="flex h-screen">
      <main className="flex-1">
        {/* Your app content */}
      </main>
      <SidekickSidebar
        position="right"
        width="360px"
        model="groq/llama-3.1-70b"
        defaultOpen={false}
        showCloseButton={true}
      />
    </div>
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "position",
              type: '"right" | "left"',
              defaultValue: '"right"',
              description: "Which side of the screen to position the sidebar",
            },
            {
              name: "width",
              type: "string",
              defaultValue: '"360px"',
              description: "Width of the sidebar when expanded",
            },
            {
              name: "model",
              type: "string",
              defaultValue: '"openai/gpt-4.1-mini"',
              description: "AI model to use for conversations",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Whether the sidebar starts open",
            },
            {
              name: "showCloseButton",
              type: "boolean",
              defaultValue: "true",
              description: "Display close button in header",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* AI Elements */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            AI Elements
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Individual AI interface components for custom implementations.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/ai-elements-full.json"
          title="AI Elements"
          description="All AI interface components"
        />

        {/* AIModelSelector */}
        <div className="space-y-6">
          <ScrollableHeading className="text-2xl font-semibold">
            AIModelSelector
          </ScrollableHeading>
          <CodePreview
            code={`<AIModelSelector
  models={[
    "openai/gpt-5",
    "anthropic/claude-sonnet-4",
    "groq/llama-3.1-70b"
  ]}
  selectedModel="openai/gpt-5"
  onModelChange={(model) => setSelectedModel(model)}
/>`}
          />
          <PropsTable
            props={[
              {
                name: "models",
                type: "string[]",
                defaultValue: "[]",
                description: "Array of available model identifiers",
              },
              {
                name: "selectedModel",
                type: "string",
                defaultValue: "undefined",
                description: "Currently selected model",
              },
              {
                name: "onModelChange",
                type: "(model: string) => void",
                defaultValue: "undefined",
                description: "Callback when model selection changes",
              },
            ]}
          />
        </div>

        <Separator className="my-8" />

        {/* AISources */}
        <div className="space-y-6">
          <ScrollableHeading className="text-2xl font-semibold">
            AISources
          </ScrollableHeading>
          <CodePreview
            code={`<AISources
  sources={[
    {
      title: "Getting Started Guide",
      url: "/docs/getting-started",
      snippet: "Complete setup instructions..."
    },
    {
      title: "API Reference",
      url: "/docs/api",
      snippet: "Detailed API documentation..."
    }
  ]}
  onSourceClick={(source) => window.open(source.url)}
/>`}
          />
          <PropsTable
            props={[
              {
                name: "sources",
                type: "Source[]",
                defaultValue: "[]",
                description:
                  "Array of source objects with title, url, and snippet",
              },
              {
                name: "maxSources",
                type: "number",
                defaultValue: "5",
                description: "Maximum number of sources to display",
              },
              {
                name: "onSourceClick",
                type: "(source: Source) => void",
                defaultValue: "undefined",
                description: "Callback when a source is clicked",
              },
            ]}
          />
        </div>

        <Separator className="my-8" />

        {/* AIReasoning */}
        <div className="space-y-6">
          <ScrollableHeading className="text-2xl font-semibold">
            AIReasoning
          </ScrollableHeading>
          <CodePreview
            code={`<AIReasoning
  reasoning="Analyzing user request and gathering context..."
  isActive={true}
  progress={75}
  steps={[
    "Understanding user intent",
    "Searching knowledge base",
    "Formulating response"
  ]}
/>`}
          />
          <PropsTable
            props={[
              {
                name: "reasoning",
                type: "string",
                defaultValue: '""',
                description: "Current reasoning text to display",
              },
              {
                name: "isActive",
                type: "boolean",
                defaultValue: "false",
                description: "Whether reasoning is currently active",
              },
              {
                name: "progress",
                type: "number",
                defaultValue: "undefined",
                description: "Progress percentage (0-100)",
              },
              {
                name: "steps",
                type: "string[]",
                defaultValue: "[]",
                description: "Array of reasoning steps to display",
              },
            ]}
          />
        </div>

        <Separator className="my-8" />

        {/* AISuggestions */}
        <div className="space-y-6">
          <ScrollableHeading className="text-2xl font-semibold">
            AISuggestions
          </ScrollableHeading>
          <CodePreview
            code={`<AISuggestions
  suggestions={[
    "Explain this code in detail",
    "Add error handling",
    "Optimize for performance",
    "Add unit tests"
  ]}
  onSuggestionClick={(suggestion) => {
    sendMessage(suggestion)
  }}
  maxSuggestions={4}
/>`}
          />
          <PropsTable
            props={[
              {
                name: "suggestions",
                type: "string[]",
                defaultValue: "[]",
                description: "Array of suggestion strings",
              },
              {
                name: "onSuggestionClick",
                type: "(suggestion: string) => void",
                defaultValue: "undefined",
                description: "Callback when suggestion is clicked",
              },
              {
                name: "maxSuggestions",
                type: "number",
                defaultValue: "5",
                description: "Maximum suggestions to display",
              },
            ]}
          />
        </div>
      </section>

      {/* SidekickUI */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickUI
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Layout wrapper component for creating custom chat experiences and
            full-screen interfaces.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-ui.json"
          title="SidekickUI"
          description="Layout wrapper component"
        />

        <h3 className="font-semibold mb-4">Fullscreen Layout</h3>
        <CodePreview
          code={`import { SidekickUI, SidekickChat } from "@/components/sidekick"

export default function ChatPage() {
  return (
    <SidekickUI layout="fullscreen">
      <SidekickChat />
    </SidekickUI>
  )
}`}
        />

        <h3 className="font-semibold mb-4">Custom Layout</h3>
        <CodePreview
          code={`<SidekickUI
  layout="custom"
  className="h-screen flex"
>
  <div className="w-1/3 border-r">
    <ConversationList />
  </div>
  <div className="flex-1">
    <SidekickChat />
  </div>
</SidekickUI>`}
        />

        <PropsTable
          props={[
            {
              name: "layout",
              type: '"fullscreen" | "inline" | "custom"',
              defaultValue: '"inline"',
              description: "Layout preset to use",
            },
            {
              name: "className",
              type: "string",
              defaultValue: '""',
              description: "Additional CSS classes to apply",
            },
            {
              name: "children",
              type: "ReactNode",
              defaultValue: "undefined",
              description: "Child components to render",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickTasks */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickTasks
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Interactive task/workflow runner with progress tracking and
            execution controls.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-tasks.json"
          title="SidekickTasks"
          description="Task execution and workflow management"
        />

        <CodePreview
          code={`import { SidekickTasks } from "@/components/sidekick"

export default function TaskManager() {
  return (
    <SidekickProvider>
      <SidekickTasks
        workflows={customWorkflows}
        className="max-w-md"
      />
    </SidekickProvider>
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "className",
              type: "string",
              defaultValue: "undefined",
              description: "Additional CSS classes for styling",
            },
            {
              name: "workflows",
              type: "WorkflowDefinition[]",
              defaultValue: "undefined",
              description:
                "Custom workflows to display (uses provider workflows if not provided)",
            },
            {
              name: "as",
              type: "React.ComponentType<any>",
              defaultValue: "undefined",
              description: "Custom component to render as",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickHeader */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickHeader
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Branded header component with title, subtitle, and consistent
            styling.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-header.json"
          title="SidekickHeader"
          description="Consistent header component"
        />

        <CodePreview
          code={`import { SidekickHeader } from "@/components/sidekick"

export default function AppHeader() {
  return (
    <SidekickHeader
      title="AI Assistant"
      subtitle="Powered by sidekick/cn"
    />
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "title",
              type: "string",
              defaultValue: '"sidekick/cn AI"',
              description: "Main header title",
            },
            {
              name: "subtitle",
              type: "string",
              defaultValue: '"Your intelligent assistant"',
              description: "Subtitle text below the title",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "undefined",
              description: "Additional CSS classes for styling",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickFloatingBar */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickFloatingBar
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Minimal floating trigger button that opens the chat interface.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-floating-bar.json"
          title="SidekickFloatingBar"
          description="Minimal floating chat trigger"
        />

        <CodePreview
          code={`import { SidekickFloatingBar } from "@/components/sidekick"

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <SidekickFloatingBar
        position="bottom-right"
        onClick={() => console.log('Open chat')}
      />
    </div>
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "position",
              type: '"bottom-right" | "bottom-left" | "top-right" | "top-left"',
              defaultValue: '"bottom-right"',
              description: "Position of the floating bar",
            },
            {
              name: "onClick",
              type: "() => void",
              defaultValue: "undefined",
              description: "Click handler for the floating bar",
            },
            {
              name: "as",
              type: "React.ComponentType<any>",
              defaultValue: "undefined",
              description: "Custom component to render as the trigger",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "undefined",
              description: "Additional CSS classes for styling",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickConfigBuilder */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickConfigBuilder
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Interactive configuration builder with preset management and live
            preview.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-config-builder.json"
          title="SidekickConfigBuilder"
          description="Configuration builder interface"
        />

        <CodePreview
          code={`import { SidekickConfigBuilder } from "@/components/sidekick"

export default function ConfigPage() {
  const [config, setConfig] = useState(defaultConfig)

  return (
    <SidekickConfigBuilder
      config={config}
      onChange={setConfig}
    />
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "config",
              type: "SidekickConfig",
              defaultValue: "undefined",
              description: "Current configuration object",
            },
            {
              name: "onChange",
              type: "(config: SidekickConfig) => void",
              defaultValue: "undefined",
              description: "Callback when configuration changes",
            },
          ]}
        />
      </section>

      <Separator className="my-12" />

      {/* SidekickInsights */}
      <section className="space-y-8">
        <div>
          <ScrollableHeading className="text-3xl font-bold mb-4">
            SidekickInsights
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Analytics and insights display component for chat metrics and usage
            data.
          </p>
        </div>

        <InstallCommand
          packages="https://sidekickcn.vercel.app/r/sidekick-insights.json"
          title="SidekickInsights"
          description="Analytics and insights display"
        />

        <CodePreview
          code={`import { SidekickInsights } from "@/components/sidekick"

export default function Dashboard() {
  return (
    <SidekickInsights>
      <InsightCard title="Total Conversations" value="1,234" />
      <InsightCard title="Avg Response Time" value="2.3s" />
      <InsightCard title="User Satisfaction" value="4.8/5" />
    </SidekickInsights>
  )
}`}
        />

        <PropsTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              defaultValue: "undefined",
              description: "Insight components to display",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "undefined",
              description: "Additional CSS classes for styling",
            },
          ]}
        />
      </section>
    </div>
  );
}
