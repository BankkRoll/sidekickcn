"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, Clock, MessageSquare, X } from "lucide-react";

// Import sidekick/cn components for previews
import {
  SidekickChat,
  SidekickFloating,
  SidekickProvider,
} from "@/components/sidekick";

// Import all AI elements for the demo
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { ModelSelector } from "@/components/ai-elements/model-selector";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { ShimmerLines } from "@/components/ai-elements/shimmer";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";

// V0 Clone Preview - Complete UI Generator
export function V0ClonePreview() {
  return (
    <MacWindow title="v0.app - Sidekick ShadCN Project">
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="h-14 border-b border-border bg-background flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  Sidekick ShadCN project
                </span>
                <svg
                  className="w-3 h-3 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground text-left">
                View Project
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium">
              Share
            </button>
            <button className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium">
              Publish
            </button>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium">U</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Chat/Timeline */}
          <div className="w-[440px] border-r border-border bg-background flex flex-col flex-shrink-0">
            {/* Full AI Elements Conversation Demo */}
            <div className="flex-1 min-h-0">
              <Conversation className="h-full">
                <ConversationContent>
                  {/* User Message */}
                  <MessageBranch defaultBranch={0}>
                    <MessageBranchContent>
                      <Message from="user">
                        <MessageContent>
                          <MessageResponse>
                            Build me a modern dashboard with charts and
                            analytics
                          </MessageResponse>
                        </MessageContent>
                      </Message>
                    </MessageBranchContent>
                  </MessageBranch>

                  {/* AI Response with Reasoning */}
                  <MessageBranch defaultBranch={0}>
                    <MessageBranchContent>
                      <Message from="assistant">
                        {/* Reasoning Component */}
                        <Reasoning duration={2.3}>
                          <ReasoningTrigger />
                          <ReasoningContent>
                            Analyzing the dashboard requirements. I need to
                            create a responsive layout with multiple chart
                            components, data visualization, and interactive
                            elements. This will require several components
                            working together.
                          </ReasoningContent>
                        </Reasoning>

                        {/* Sources Component */}
                        <Sources>
                          <SourcesTrigger count={3} />
                          <SourcesContent>
                            <Source
                              href="#"
                              title="Recharts Docs - Chart Components"
                            />
                            <Source
                              href="#"
                              title="Tailwind CSS - Responsive Design"
                            />
                            <Source
                              href="#"
                              title="ShadCN/UI - Component Library"
                            />
                          </SourcesContent>
                        </Sources>

                        {/* Main Response - V0 CodeProject Format */}
                        <MessageContent>
                          <MessageResponse>
                            <div className="mb-3">
                              <span className="text-xs font-medium text-chart-1 bg-chart-1/10 px-2 py-1 rounded">
                                taskNameActive: Creating dashboard
                              </span>
                            </div>

                            {/* CodeProject Block */}
                            <div className="bg-muted/30 rounded-lg p-4 border border-border">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                  <span className="text-xs font-bold text-primary-foreground">
                                    V0
                                  </span>
                                </div>
                                <span className="font-medium text-foreground">
                                  CodeProject
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  React + Next.js
                                </span>
                              </div>

                              <div className="space-y-4">
                                {/* Dashboard Component */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-foreground">
                                      📄 analytics-dashboard.tsx
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      Created
                                    </span>
                                  </div>
                                  <pre className="text-xs text-muted-foreground bg-muted/50 p-3 rounded overflow-x-auto">
                                    <code>{`export function AnalyticsDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Revenue Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>

      {/* Users Card */}
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,543</div>
          <p className="text-xs text-muted-foreground">+12.5% from last month</p>
        </CardContent>
      </Card>

      {/* Orders Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,429</div>
          <p className="text-xs text-muted-foreground">+8.2% from last month</p>
        </CardContent>
      </Card>

      {/* Conversion Card */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.24%</div>
          <p className="text-xs text-muted-foreground">+2.1% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}`}</code>
                                  </pre>
                                </div>

                                {/* Chart Component */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-foreground">
                                      📊 chart-section.tsx
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      Created
                                    </span>
                                  </div>
                                  <pre className="text-xs text-muted-foreground bg-muted/50 p-3 rounded overflow-x-auto">
                                    <code>{`export function ChartSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={revenueData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={userData} />
        </CardContent>
      </Card>
    </div>
  );
}`}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>

                            {/* Task Completion */}
                            <div className="mt-3">
                              <span className="text-xs font-medium text-chart-1 bg-chart-1/10 px-2 py-1 rounded">
                                taskNameComplete: Dashboard created
                              </span>
                            </div>

                            {/* Postamble */}
                            <div className="mt-3 text-xs text-muted-foreground">
                              I've created a comprehensive analytics dashboard
                              with KPI cards, interactive charts, and responsive
                              design. The components use shadcn/ui for
                              consistent styling and follow Next.js best
                              practices.
                            </div>
                          </MessageResponse>
                        </MessageContent>
                      </Message>
                    </MessageBranchContent>
                  </MessageBranch>

                  {/* Message Branching Example */}
                  <MessageBranch defaultBranch={0}>
                    <MessageBranchContent>
                      <Message from="assistant">
                        <MessageContent>
                          <MessageResponse>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium">
                                Alternative Designs
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="px-2 py-1 text-xs bg-muted rounded">
                                  1/3
                                </span>
                              </div>
                            </div>
                            Here's a minimal version with just the essential
                            charts and a clean layout:
                            <div className="bg-muted/50 rounded-lg p-3 mt-3">
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="bg-background rounded p-2">
                                  <div className="text-chart-1 font-medium">
                                    Revenue
                                  </div>
                                  <div className="text-lg font-bold">
                                    $24,543
                                  </div>
                                </div>
                                <div className="bg-background rounded p-2">
                                  <div className="text-chart-2 font-medium">
                                    Users
                                  </div>
                                  <div className="text-lg font-bold">1,234</div>
                                </div>
                              </div>
                            </div>
                          </MessageResponse>
                        </MessageContent>
                      </Message>
                    </MessageBranchContent>
                    <MessageBranchSelector from="assistant">
                      <MessageBranchPrevious />
                      <MessageBranchPage />
                      <MessageBranchNext />
                    </MessageBranchSelector>
                  </MessageBranch>

                  {/* Loading/Shimmer Message */}
                  <Message from="assistant">
                    <MessageContent>
                      <ShimmerLines lines={3} />
                    </MessageContent>
                  </Message>

                  {/* Suggestions */}
                  <Suggestions className="px-0">
                    <Suggestion suggestion="Add dark mode toggle" />
                    <Suggestion suggestion="Include data export" />
                    <Suggestion suggestion="Add real-time updates" />
                  </Suggestions>
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </div>

            {/* Prompt Input with all components */}
            <div className="shrink-0 border-t border-border p-4">
              <PromptInput
                globalDrop
                multiple
                onSubmit={(message) => console.log("Submitted:", message)}
              >
                <PromptInputHeader>
                  <PromptInputAttachments>
                    {(attachment, index) => (
                      <PromptInputAttachment data={attachment} index={index} />
                    )}
                  </PromptInputAttachments>
                </PromptInputHeader>
                <PromptInputBody>
                  <PromptInputTextarea placeholder="Ask a follow-up..." />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools>
                    <PromptInputActionMenu>
                      <PromptInputActionMenuTrigger />
                      <PromptInputActionMenuContent>
                        <PromptInputActionAddAttachments />
                      </PromptInputActionMenuContent>
                    </PromptInputActionMenu>
                    <PromptInputButton>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </PromptInputButton>
                    <ModelSelector
                      selectedModel="anthropic/claude-sonnet-4.5"
                      onModelChange={() => {}}
                      config={{}}
                    />
                  </PromptInputTools>
                  <PromptInputSubmit />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>

          {/* Right Side - Preview Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Preview Controls */}
            <div className="h-12 border-b border-border bg-background flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-muted rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-muted rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-muted rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </button>
                <div className="h-4 w-px bg-border mx-1"></div>
                <button className="px-3 py-1 text-xs bg-muted rounded">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-muted rounded text-muted-foreground">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </button>
                <span className="text-xs text-muted-foreground">/</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-muted rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-muted rounded">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <div className="h-4 w-px bg-border mx-1"></div>
                <select className="px-2 py-1 text-xs border border-border rounded bg-background">
                  <option>Latest</option>
                </select>
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M5 12h.01M5 12h.01M12 12h.01M12 12h.01M12 12h.01M19 12h.01M19 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Preview Content - Generated Dashboard */}
            <div className="flex-1 overflow-y-auto bg-background">
              <div className="min-h-full">
                {/* Generated Dashboard Header */}
                <div className="flex items-center justify-center pt-8 pb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span className="font-medium">Analytics Dashboard</span>
                    <span>• Generated with AI</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-8 py-8">
                  {/* Dashboard Header */}
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      Analytics Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                      Real-time insights and data visualization
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Card */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Total Revenue
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            $45,231.89
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-chart-1 font-medium">+20.1%</span>
                        <span className="text-muted-foreground ml-1">
                          from last month
                        </span>
                      </div>
                    </div>

                    {/* Users Card */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Active Users
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            2,543
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-chart-2 font-medium">+12.5%</span>
                        <span className="text-muted-foreground ml-1">
                          from last month
                        </span>
                      </div>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Total Orders
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            1,429
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="text-chart-3 font-medium">+8.2%</span>
                        <span className="text-muted-foreground ml-1">
                          from last month
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">
                          Revenue Trend
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Monthly revenue over time
                        </p>
                      </div>
                      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 text-muted-foreground mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Line Chart Placeholder
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Revenue data visualization
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Growth Chart */}
                    <div className="bg-card border border-border rounded-lg p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">
                          User Growth
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Active users by month
                        </p>
                      </div>
                      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 text-muted-foreground mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Bar Chart Placeholder
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            User growth visualization
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

// Base Project Preview
export function BaseProjectPreview() {
  return (
    <MacWindow title="Welcome to sidekick/cn AI">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-border bg-gradient-to-b from-background pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-muted lg:p-4 lg:dark:bg-zinc-800/30">
            Welcome to sidekick/cn AI
          </p>
        </div>
      </main>
    </MacWindow>
  );
}

// Mac-style window component
function MacWindow({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl overflow-hidden relative min-h-screen">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-6 py-3 bg-card/80 backdrop-blur-md border-b border-border/30">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer shadow-sm"></div>
          </div>
          <span className="text-sm font-medium text-foreground/80">
            {title}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-muted/50"
          >
            <div className="w-3 h-0.5 bg-muted-foreground rounded-full"></div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-muted/50"
          >
            <div className="w-3 h-3 border border-muted-foreground rounded-sm"></div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-destructive/20"
          >
            <div className="w-3 h-3 relative">
              <div className="absolute inset-0 rotate-45 bg-current rounded-sm"></div>
            </div>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background/95 backdrop-blur-sm min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// Floating Chat Preview
export function FloatingChatPreview() {
  return (
    <MacWindow title="Company Website - Floating Chat">
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Welcome to Our Site</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">About Us</h2>
              <p className="text-muted-foreground">
                Learn more about our company and what we do. We're here to help
                you with all your questions and provide the best service
                possible.
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
              Click the chat bubble in the bottom right corner to start a
              conversation with our AI assistant. It can help answer questions
              about our services, provide information, and assist with various
              tasks.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Ask about our products and services</li>
              <li>Get help with common questions</li>
              <li>Receive personalized recommendations</li>
              <li>Available 24/7 for instant support</li>
            </ul>
          </div>
        </div>

        {/* Floating Chat Widget */}
        <div className="fixed bottom-4 right-4 z-50">
          <SidekickProvider>
            <SidekickFloating position="bottom-right" defaultOpen={false} />
          </SidekickProvider>
        </div>
      </main>
    </MacWindow>
  );
}

// Coding Assistant Preview
export function CodingAssistantPreview() {
  return (
    <MacWindow title="AI Coding Assistant">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">AI Coding Assistant</h1>
              <p className="text-xl text-muted-foreground">
                Get help with coding, debugging, optimization, and best
                practices
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
                <h2 className="text-xl font-semibold mb-4">
                  Supported Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "Python",
                    "Java",
                    "C++",
                    "Go",
                    "Rust",
                    "PHP",
                    "Ruby",
                  ].map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-1 bg-muted rounded text-xs"
                    >
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
                  "Add TypeScript types to this JavaScript function",
                ].map((prompt, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <p className="text-sm">{prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <p className="text-center text-muted-foreground">
                The AI assistant panel is ready to help! Click on any of the
                workflows above or type your own coding questions in the chat.
              </p>
            </div>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <div className="fixed bottom-4 right-4 z-50">
          <SidekickProvider>
            <div className="relative">
              <Button
                size="lg"
                className="rounded-full shadow-lg h-14 w-14 p-0 bg-primary hover:bg-primary/90"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>

              <div className="absolute bottom-16 right-0 w-96 h-[600px] bg-background border border-border rounded-lg shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    AI Assistant
                  </h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <SidekickChat
                    showSuggestions={true}
                    suggestions={[
                      "Explain this code",
                      "Debug this error",
                      "Optimize performance",
                      "Write unit tests",
                      "Add documentation",
                    ]}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </SidekickProvider>
        </div>
      </div>
    </MacWindow>
  );
}

// Customer Support Preview
export function CustomerSupportPreview() {
  return (
    <MacWindow title="Customer Support Center">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">
                Customer Support Center
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-powered support with human escalation capabilities
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Chat Area */}
              <div className="lg:col-span-2">
                <div className="h-[700px] overflow-hidden border rounded-lg bg-background">
                  <SidekickProvider>
                    <SidekickChat
                      showSuggestions={true}
                      suggestions={[
                        "I need help with my account",
                        "Billing or payment question",
                        "Technical issue",
                        "Feature request",
                      ]}
                      className="h-full"
                    />
                  </SidekickProvider>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Support Stats */}
                <div className="p-6 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Support Metrics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Today's Queries
                      </span>
                      <Badge variant="secondary">47</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Resolved
                      </span>
                      <Badge
                        variant="default"
                        className="bg-primary/10 text-primary"
                      >
                        42
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Escalated
                      </span>
                      <Badge variant="destructive">5</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Avg Response
                      </span>
                      <span className="text-sm font-medium">2.3 min</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View All Tickets
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Team Dashboard
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="p-6 border rounded-lg bg-card">
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
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Currently Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 border rounded-lg bg-card">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">New ticket #1234 created</p>
                        <p className="text-xs text-muted-foreground">
                          2 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">Ticket #1233 resolved</p>
                        <p className="text-xs text-muted-foreground">
                          5 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">Ticket #1232 escalated</p>
                        <p className="text-xs text-muted-foreground">
                          8 minutes ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center text-muted-foreground">
              <p className="text-sm">
                Need immediate assistance? Call us at{" "}
                <strong>(555) 123-4567</strong> or email{" "}
                <strong>support@company.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MacWindow>
  );
}
