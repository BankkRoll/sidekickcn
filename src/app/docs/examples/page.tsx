"use client";

import { Callout } from "@/components/docs/callout";
import { ScrollableHeading } from "@/components/docs/scrollable-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import Link from "next/link";

const examples = [
  {
    id: "v0-clone",
    title: "V0 UI Generator",
    description:
      "Complete AI-powered UI generator with prompt-based component creation, live preview, and production-ready code export.",
    href: "/docs/examples/v0-clone",
    tags: ["AI", "UI Generation", "Full-Stack"],
  },
  {
    id: "floating-chat",
    title: "Floating Chat Widget",
    description:
      "A clean, responsive floating chat widget with keyboard shortcuts and smooth animations for any website.",
    href: "/docs/examples/floating-chat",
    tags: ["Chat", "Widget", "Responsive"],
  },
  {
    id: "coding-assistant",
    title: "AI Coding Assistant",
    description:
      "Powerful coding assistant with multiple AI models, code review, debugging, and development tools.",
    href: "/docs/examples/coding-assistant",
    tags: ["AI", "Development", "Multi-Model"],
  },
  {
    id: "customer-support",
    title: "AI Customer Support",
    description:
      "Intelligent customer support chat with ticket escalation, business hours, and analytics dashboard.",
    href: "/docs/examples/customer-support",
    tags: ["Support", "Business", "Analytics"],
  },
];

export default function ExamplesPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">Examples & Use Cases</h1>
          <p className="text-lg text-muted-foreground">
            Complete project implementations with interactive previews and
            downloadable codebases for production deployment.
          </p>
        </div>
        <Callout type="info" title="Getting Started">
          Click on any example below to see live previews, download complete
          codebases, and get detailed setup instructions.
        </Callout>
      </div>

      {/* All Examples Grid */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-2xl font-bold">
            All Examples
          </ScrollableHeading>
          <p className="text-muted-foreground mt-2">
            Choose from our collection of complete, production-ready
            implementations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {examples.map((example) => (
            <Card
              key={example.id}
              className="h-full hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1 mb-4">
                  {example.description}
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    {example.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={example.href}>
                      View Example
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="space-y-6">
        <div>
          <ScrollableHeading className="text-2xl font-bold">
            Quick Start
          </ScrollableHeading>
          <p className="text-muted-foreground mt-2">
            Get any example running locally in minutes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Download from Code Viewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <div>
                    <strong>Choose an example</strong>
                    <p className="text-muted-foreground mt-1">
                      Click on any example above to view its details
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <div>
                    <strong>Download codebase</strong>
                    <p className="text-muted-foreground mt-1">
                      Use the "Complete Codebase" tab to download all files
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <div>
                    <strong>Configure API keys</strong>
                    <p className="text-muted-foreground mt-1">
                      Add your AI provider keys to .env.local
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <div>
                    <strong>Start developing</strong>
                    <p className="text-muted-foreground mt-1">
                      Run npm install && npm run dev
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Individual Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Prefer to add components to your existing project? Use our
                ShadCN CLI integration.
              </p>
              <div className="space-y-2">
                <code className="block p-2 bg-muted rounded text-xs border">
                  npx shadcn@latest add
                  https://sidekickcn.vercel.app/r/sidekick-full.json
                </code>
                <p className="text-xs text-muted-foreground">
                  Install the complete Sidekick/CN component library
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
