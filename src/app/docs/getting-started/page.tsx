"use client";

import { CodePreview } from "@/components/docs/code-preview";
import { InstallCommand } from "@/components/docs/install-command";
import { ScrollableHeading } from "@/components/docs/scrollable-heading";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Key, Settings } from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-left space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Transform your Next.js application with AI capabilities in minutes.
            From installation to your first conversational AI assistant, we'll
            guide you through every step.
          </p>
        </div>
      </div>

      {/* Install and configure shadcn/ui */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold">
            Install and configure shadcn/ui
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Install and configure shadcn/ui for Next.js.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Run the init command to create a new Next.js project or to setup an
            existing one.
          </p>

          <InstallCommand
            packages="npx shadcn@latest init"
            title="shadcn/ui"
            description="Initialize shadcn/ui in your project."
          />

          <Alert>
            <AlertDescription>
              <strong>Already have a project?</strong> Run this command in your
              existing Next.js project.
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertDescription>
              <strong>Want to start with an example?</strong>{" "}
              <Link
                href="/docs/examples"
                className="underline hover:no-underline"
              >
                Browse our complete project examples →
              </Link>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Install sidekick/cn */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold">
            Install sidekick/cn
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Add sidekick/cn components and dependencies to your project.
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-muted-foreground">
            Choose your preferred installation method. We recommend the complete
            installation for the best experience.
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold mb-2 text-primary">
              Quick Start (Recommended)
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get everything working in one command
            </p>
            <InstallCommand
              packages="https://sidekickcn.vercel.app/r/sidekick-full.json"
              title="Complete sidekick/cn Installation"
              description="Installs all components, hooks, providers, and API routes"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">What gets installed:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• SidekickProvider (context & state management)</li>
              <li>• Chat components (floating widget, sidebar, full chat)</li>
              <li>• AI Elements (sources, reasoning, suggestions)</li>
              <li>• API routes (server-side AI handling)</li>
              <li>• React hooks (useAI, useChat, etc.)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Set up AI Gateway API Key */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold">
            Set up AI Gateway API Key
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Configure your AI Gateway API key for unified access to all AI
            providers.
          </p>
        </div>

        <div className="space-y-4">
          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              <strong>Unified API:</strong> AI Gateway provides access to
              hundreds of models through a single API key. No markup on tokens,
              automatic fallbacks, and spend monitoring included.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h4 className="font-medium mb-2">Vercel Dashboard (Recommended)</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Go to AI Gateway tab → API keys → Create key
            </p>
            <CodePreview
              code={`# Vercel Dashboard > AI Gateway > API Keys
AI_GATEWAY_API_KEY=your_ai_gateway_key_here`}
            />
          </div>
        </div>
      </section>

      {/* Set Up SidekickProvider */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold">
            Set Up SidekickProvider
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Wrap your application with SidekickProvider to enable AI
            functionality.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            The SidekickProvider manages AI state, configuration, and context
            throughout your app. It automatically connects to AI Gateway for
            unified model access.
          </p>

          <CodePreview
            title="app/layout.tsx"
            code={`import { SidekickProvider } from "@/components/sidekick"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SidekickProvider>
          {children}
        </SidekickProvider>
      </body>
    </html>
  )
}`}
          />

          <Alert>
            <Settings className="h-4 w-4" />
            <AlertDescription>
              <strong>AI Gateway Integration:</strong> SidekickProvider
              automatically uses your AI_GATEWAY_API_KEY for access to all
              supported models and providers with automatic fallbacks.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Add Your First Component */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold">
            Add Your First Component
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Drop a chat component into any page for instant AI functionality.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Choose from multiple layout options. Start with the floating widget
            for the quickest setup.
          </p>

          <div className="space-y-4">
            <h4 className="font-medium mb-2">Floating Widget (Simplest)</h4>
            <CodePreview
              code={`// app/page.tsx
import { SidekickFloating } from "@/components/sidekick"

export default function HomePage() {
  return (
    <div>
      <h1>My App</h1>
      <SidekickFloating
        position="bottom-right"
        model="anthropic/claude-sonnet-4"
      />
    </div>
  )
}`}
            />

            <h4 className="font-medium mb-2">Full Page Chat</h4>
            <CodePreview
              code={`// app/chat/page.tsx
import { SidekickUI, SidekickChat } from "@/components/sidekick"

export default function ChatPage() {
  return (
    <SidekickUI layout="fullscreen">
      <SidekickChat model="openai/gpt-5" />
    </SidekickUI>
  )
}`}
            />
          </div>
        </div>
      </section>

      {/* Test Your Assistant */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-3xl font-bold">
            Test Your Assistant
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground">
            Verify everything is working by sending your first message.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Once you've completed the setup, your AI assistant should be fully
            functional. Try sending a test message to verify the integration.
          </p>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <div>
                <h4 className="font-medium mb-2">You're All Set!</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your AI assistant is now ready. Try asking it questions,
                  requesting help with code, or exploring its various features.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Next Steps:</strong> Customize your assistant, add
                  more features, or explore advanced configuration options.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
