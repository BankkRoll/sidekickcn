"use client";

import {
  BarChart3,
  Brain,
  CheckCircle,
  Code,
  Database,
  Globe,
  Layers,
  MessageSquare,
  Puzzle,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Fully Composable",
    description:
      "Every component accepts an as prop for complete customization. Build your own chat, override any element, or use defaults.",
    badge: "Advanced",
    details: [
      "Custom components",
      "Override elements",
      "Mix & match",
      "as prop pattern",
    ],
  },
  {
    icon: Puzzle,
    title: "AI Elements",
    description:
      "Built-in sources, reasoning traces, message branching, model selector, suggestions, and streaming support.",
    badge: "Complete",
    details: [
      "Source citations",
      "Reasoning traces",
      "Message branching",
      "Model selector",
      "Smart suggestions",
      "Real-time streaming",
    ],
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "All AI calls go through Vercel AI Gateway. No direct provider calls, automatic rate limiting, and monitoring included.",
    badge: "Enterprise",
    details: [
      "Server-side only",
      "AI Gateway proxy",
      "Rate limiting",
      "Request monitoring",
      "No API key exposure",
    ],
  },
  {
    icon: Code,
    title: "TypeScript + AI SDK v5",
    description:
      "Built with the latest AI SDK v5, full type safety, and modern React patterns including hooks and context.",
    badge: "Modern",
    details: [
      "Full TypeScript",
      "AI SDK v5",
      "React hooks",
      "Context API",
      "Type safety",
    ],
  },
  {
    icon: Database,
    title: "Context & Training Data",
    description:
      "Inject custom knowledge bases, documentation, and training data. Connect to vector databases and external APIs.",
    badge: "Powerful",
    details: [
      "Custom knowledge",
      "Vector databases",
      "API integration",
      "Document processing",
      "Semantic search",
    ],
  },
  {
    icon: Brain,
    title: "Intelligent Workflows",
    description:
      "Built-in workflow system with custom AI tasks, multi-step execution, progress tracking, and conditional logic.",
    badge: "Advanced",
    details: [
      "Custom workflows",
      "Multi-step tasks",
      "Progress tracking",
      "Conditional logic",
      "Error handling",
    ],
  },
  {
    icon: MessageSquare,
    title: "Conversation Management",
    description:
      "Persistent conversations, user sessions, conversation history, branching, and advanced message handling.",
    badge: "Complete",
    details: [
      "Session persistence",
      "Message history",
      "Conversation branching",
      "User management",
      "Export capabilities",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Built-in analytics for usage tracking, performance monitoring, user behavior analysis, and ROI measurement.",
    badge: "Business",
    details: [
      "Usage analytics",
      "Performance metrics",
      "User insights",
      "ROI tracking",
      "Custom dashboards",
    ],
  },
  {
    icon: Globe,
    title: "Multi-Platform Deployment",
    description:
      "Deploy anywhere - web apps, mobile, desktop, APIs, or embed in existing applications with minimal changes.",
    badge: "Flexible",
    details: [
      "Web deployment",
      "Mobile ready",
      "Desktop apps",
      "API integration",
      "Framework agnostic",
    ],
  },
];

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to build sophisticated AI assistants. From basic
          chatbots to enterprise-grade solutions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <div className="space-y-1">
                  {feature.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle className="h-3 w-3" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
