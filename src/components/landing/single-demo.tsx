"use client";

import { SidekickChat } from "@/components/sidekick/sidekick-chat";
import { SidekickHeader } from "@/components/sidekick/sidekick-header";
import { SidekickProvider } from "@/components/sidekick/sidekick-provider";
import { SidekickUI } from "@/components/sidekick/sidekick-ui";

export function SingleDemo() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Live Demo</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Try the full Sidekick experience - fully functional AI assistant with
          all features
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <SidekickProvider
          config={{
            model: "openai/gpt-4.1-mini",
            modelConfig: {
              allowedModels: "*",
              groupByProvider: true,
              allowModelChange: true,
            },
            featuresConfig: {
              enableBranching: true,
              showSources: true,
              showReasoning: true,
              enableSuggestions: true,
              enableAttachments: true,
              enableWorkflows: true,
              enableTools: true,
            },
          }}
        >
          <SidekickUI layout="default" className="min-h-[600px]">
            <SidekickHeader
              title="Sidekick AI Assistant"
              subtitle="Powered by Vercel AI Gateway"
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
                "Explain quantum physics simply",
                "Debug this React error",
                "Write a Python function",
                "Compare AI models",
                "Plan a project architecture",
              ]}
            />
          </SidekickUI>
        </SidekickProvider>
      </div>
    </div>
  );
}
