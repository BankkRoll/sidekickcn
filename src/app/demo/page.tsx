"use client";

import {
  SidekickChat,
  SidekickFloating,
  SidekickHeader,
  SidekickProvider,
  SidekickSidebar,
  SidekickUI,
} from "@/components/sidekick";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mx-auto max-w-7xl space-y-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold">
              sidekick/cn Comprehensive Demo
            </h1>
            <p className="mt-2 text-pretty text-muted-foreground">
              Experience all layouts, AI elements, and composable features
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This demo uses the Vercel AI Gateway with server-side
              authentication. All AI requests are handled securely through the{" "}
              <code className="rounded bg-muted px-1 py-0.5">/api/ai</code>{" "}
              route.
            </AlertDescription>
          </Alert>

          <SidekickProvider
            config={{
              model: "openai/gpt-4.1",
              temperature: 0.7,
              maxTokens: 2000,
            }}
          >
            <Tabs defaultValue="full" className="w-full">
              <TabsList className="grid w-full grid-cols-5 lg:grid-cols-7">
                <TabsTrigger value="full">Full Panel</TabsTrigger>
                <TabsTrigger value="chat">Chat Only</TabsTrigger>
                <TabsTrigger value="simple">Simple</TabsTrigger>
                <TabsTrigger value="floating">Floating</TabsTrigger>
                <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
                <TabsTrigger value="minimal" className="hidden lg:inline-flex">
                  Minimal
                </TabsTrigger>
                <TabsTrigger
                  value="fullscreen"
                  className="hidden lg:inline-flex"
                >
                  Fullscreen
                </TabsTrigger>
              </TabsList>

              <TabsContent value="full" className="mt-6">
                <SidekickUI layout="default" className="h-[calc(100vh-16rem)]">
                  <SidekickHeader
                    title="sidekick/cn"
                    subtitle="Full-featured AI assistant with all elements"
                  />
                  <SidekickChat
                    showModelSelector
                    showSources
                    showReasoning
                    showSuggestions
                    showAttachments
                    showWebSearch
                    showMicrophone
                    suggestions={[
                      "Explain how the AI Gateway works",
                      "Show me advanced AI patterns",
                      "Generate TypeScript code",
                      "Analyze this codebase structure",
                    ]}
                  />
                </SidekickUI>
              </TabsContent>

              <TabsContent value="chat" className="mt-6">
                <SidekickUI layout="default" className="h-[calc(100vh-16rem)]">
                  <SidekickHeader
                    title="Chat"
                    subtitle="All AI elements enabled"
                  />
                  <SidekickChat
                    showModelSelector
                    showSources
                    showReasoning
                    showSuggestions
                    showAttachments
                  />
                </SidekickUI>
              </TabsContent>

              <TabsContent value="simple" className="mt-6">
                <SidekickUI layout="default" className="h-[calc(100vh-16rem)]">
                  <SidekickHeader
                    title="Simple Chat"
                    subtitle="Basic chat interface"
                  />
                  <SidekickChat />
                </SidekickUI>
              </TabsContent>

              <TabsContent value="floating" className="mt-6">
                <div className="rounded-lg border bg-muted/30 p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                  <h3 className="text-lg font-medium">Floating Widget Demo</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md">
                    The floating chat widget appears in the bottom-right corner.
                    Click the button or press{" "}
                    <kbd className="rounded bg-muted px-2 py-1 text-xs">⌘K</kbd>{" "}
                    to open it.
                  </p>
                  <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                    <p>
                      Features: 25vh height, clean design, ScrollArea, keyboard
                      shortcuts
                    </p>
                  </div>
                </div>
                <SidekickFloating position="bottom-right" />
              </TabsContent>

              <TabsContent value="sidebar" className="mt-6">
                <SidekickSidebar
                  defaultOpen={false}
                  position="right"
                  width={420}
                  showSearchBar
                  onSearch={(query) => console.log("Search:", query)}
                >
                  <div className="min-h-screen bg-muted/20 p-8">
                    <div className="mx-auto max-w-4xl space-y-8">
                      <div className="rounded-lg border bg-card p-8">
                        <h2 className="text-2xl font-bold">
                          Sidebar Panel Demo
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                          Click the floating button or press{" "}
                          <kbd className="rounded bg-muted px-2 py-1">⌘K</kbd>{" "}
                          to open the sidebar. It slides in and pushes your
                          content.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-card p-8">
                        <h3 className="text-xl font-semibold">
                          Your App Content
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          This represents your application content. When the
                          sidebar opens, this content smoothly shifts to the
                          left, similar to Chrome extensions.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="rounded-lg border bg-card p-6"
                          >
                            <h4 className="font-medium">Feature {i}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                              The sidebar includes a search bar for quick access
                              and keyboard navigation.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SidekickSidebar>
              </TabsContent>

              <TabsContent value="minimal" className="mt-6">
                <SidekickUI layout="minimal" className="h-[calc(100vh-16rem)]">
                  <SidekickChat
                    showModelSelector={false}
                    showSources={false}
                    showReasoning={false}
                    showSuggestions={false}
                    showAttachments={false}
                  />
                </SidekickUI>
              </TabsContent>

              <TabsContent value="fullscreen" className="mt-6">
                <SidekickUI layout="fullscreen" className="fixed inset-0 z-50">
                  <SidekickHeader
                    title="Fullscreen Mode"
                    subtitle="Immersive AI experience"
                  />
                  <SidekickChat
                    showModelSelector
                    showSources
                    showReasoning
                    showSuggestions
                    showAttachments
                  />
                </SidekickUI>
              </TabsContent>
            </Tabs>
          </SidekickProvider>

          <div className="mt-16 rounded-lg border bg-card p-8">
            <h2 className="text-2xl font-bold">Component Features</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold">AI Elements</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Message branching</li>
                  <li>Sources & citations</li>
                  <li>Reasoning traces</li>
                  <li>Model selector</li>
                  <li>Suggestions</li>
                  <li>Attachments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Layouts</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Full panel</li>
                  <li>Floating widget (25vh)</li>
                  <li>Sliding sidebar</li>
                  <li>Fullscreen</li>
                  <li>Minimal</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Interactions</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>Keyboard shortcuts (⌘K)</li>
                  <li>Search bar</li>
                  <li>ScrollArea support</li>
                  <li>Auto-scroll</li>
                  <li>Responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
