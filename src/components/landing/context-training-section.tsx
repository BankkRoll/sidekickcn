"use client";
import {
  BookOpen,
  Brain,
  CheckCircle,
  Code,
  Database,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";

const contextMethods = [
  {
    icon: FileText,
    title: "System Prompts",
    description: "Define AI personality, behavior, and domain expertise",
    example: `system: "You are an expert React developer specializing in TypeScript and modern web development. Always provide production-ready code with proper error handling."`,
    benefits: [
      "Immediate customization",
      "No training required",
      "Easy to update",
      "Version controllable",
    ],
  },
  {
    icon: Database,
    title: "Knowledge Base",
    description:
      "Connect to vector databases for semantic search and retrieval",
    example: `knowledgeBase: {
  vectorStore: "pinecone",
  documents: companyDocs,
  embeddingModel: "text-embedding-ada-002"
}`,
    benefits: [
      "Large document support",
      "Semantic understanding",
      "Real-time updates",
      "Scalable storage",
    ],
  },
  {
    icon: Brain,
    title: "Fine-tuning Data",
    description: "Train custom models on your specific domain and use cases",
    example: `trainingData: {
  model: "gpt-3.5-turbo",
  trainingSet: domainExamples,
  validationSet: testCases
}`,
    benefits: [
      "Domain specialization",
      "Custom behavior",
      "Improved accuracy",
      "Cost optimization",
    ],
  },
  {
    icon: Search,
    title: "API Integrations",
    description:
      "Connect to external data sources and APIs for real-time information",
    example: `integrations: {
  weather: { apiKey: "...", endpoint: "..." },
  crm: { baseUrl: "...", authToken: "..." },
  database: { connectionString: "..." }
}`,
    benefits: [
      "Live data access",
      "Dynamic responses",
      "Business integration",
      "Real-time updates",
    ],
  },
];

const useCases = [
  {
    title: "Customer Support",
    icon: BookOpen,
    description:
      "AI assistant with access to product documentation, FAQs, and support history",
    features: [
      "Product knowledge base",
      "FAQ integration",
      "Ticket escalation logic",
      "Customer history context",
    ],
  },
  {
    title: "Coding Assistant",
    icon: Code,
    description:
      "Specialized AI for code review, debugging, and development tasks",
    features: [
      "Codebase understanding",
      "Best practices knowledge",
      "Framework expertise",
      "Security guidelines",
    ],
  },
  {
    title: "Business Intelligence",
    icon: Database,
    description:
      "AI analyst with access to company data, reports, and business metrics",
    features: [
      "Data analysis skills",
      "Business terminology",
      "Report generation",
      "Trend analysis",
    ],
  },
  {
    title: "Healthcare Assistant",
    icon: Sparkles,
    description:
      "Medical AI with HIPAA-compliant knowledge and patient safety protocols",
    features: [
      "Medical terminology",
      "Treatment guidelines",
      "Privacy compliance",
      "Safety protocols",
    ],
  },
];

export function ContextTrainingSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Context & Training</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Make your AI assistant truly intelligent by providing the right
          context, training data, and domain knowledge.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
        {contextMethods.map((method, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <method.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{method.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            </div>

            <div className="bg-muted p-4 mb-4 rounded">
              <code className="text-sm whitespace-pre-line">
                {method.example}
              </code>
            </div>

            <div className="space-y-1">
              {method.benefits.map((benefit, benefitIndex) => (
                <div
                  key={benefitIndex}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-3 w-3" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
