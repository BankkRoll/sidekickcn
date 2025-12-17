import { Callout } from "@/components/docs/callout";
import ComponentFileViewer from "@/components/docs/code-preview";
import { V0ClonePreview } from "@/components/docs/example-previews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v0CloneExample } from "@/lib/code-examples/v0-clone";
import { ArrowLeft, CheckCircle, Code, Eye, Palette } from "lucide-react";
import Link from "next/link";

export default function V0ClonePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/docs/examples"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Examples
        </Link>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Palette className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">V0 UI Generator</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Complete AI-powered UI generator with prompt-based component
              creation, live preview, and production-ready code export.
            </p>
          </div>
        </div>

        <Callout type="info" title="About This Example">
          Experience the power of AI-driven UI generation. Describe components
          in natural language and watch as production-ready React code is
          generated instantly.
        </Callout>
      </div>

      {/* Preview and Code */}
      <section className="space-y-6">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              Live Preview
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="w-4 h-4 mr-2" />
              Complete Codebase
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Demo</CardTitle>
                <CardDescription>
                  Try describing a UI component in the prompt input. The AI will
                  generate production-ready React code with proper TypeScript
                  types.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <V0ClonePreview />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Implementation</CardTitle>
                <CardDescription>
                  Full codebase with all components, types, API routes, and
                  configuration files ready for production deployment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentFileViewer component={v0CloneExample} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                AI Timeline + Commands
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Build journal with generation passes, status markers, and task
                completion tracking. Every step is logged and traceable.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Live App Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real, scrollable UI that will be shipped - not a mock or
                preview. See exactly what your users will experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Prompt-Based Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Describe UI in natural language - AI generates production-ready
                React components with proper TypeScript types.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Version Control & Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track changes, compare versions, export code, and deploy
                immediately. Full production workflow support.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Download & Setup */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Download & Setup</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting the Codebase</CardTitle>
            <CardDescription>
              Download the complete V0 UI Generator implementation from the code
              viewer above
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <div>
                  <strong>Download from code viewer:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use the "Complete Codebase" tab above to download all
                    necessary files
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <div>
                  <strong>Configure environment:</strong>
                  <code className="block mt-1 p-2 bg-muted rounded text-xs border">
                    cp .env.example .env.local
                  </code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add your AI API keys (OpenAI, Anthropic, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <div>
                  <strong>Install dependencies:</strong>
                  <code className="block mt-1 p-2 bg-muted rounded text-xs border">
                    npm install
                  </code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Install the required packages
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <div>
                  <strong>Start development:</strong>
                  <code className="block mt-1 p-2 bg-muted rounded text-xs border">
                    npm run dev
                  </code>
                  <p className="text-xs text-muted-foreground mt-1">
                    Launch the development server
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Architecture Overview</CardTitle>
            <CardDescription>
              Understanding the V0 clone architecture and data flow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Frontend Components</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>V0App</code> - Main application wrapper
                  </li>
                  <li>
                    • <code>V0TopBar</code> - Project controls and actions
                  </li>
                  <li>
                    • <code>V0LeftSidebar</code> - AI timeline and prompt input
                  </li>
                  <li>
                    • <code>V0MainCanvas</code> - Live preview and code panels
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">AI Integration</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>v0-ai-tools.ts</code> - UI generation tools and
                    prompts
                  </li>
                  <li>
                    • <code>api/v0/route.ts</code> - AI API endpoint with v0
                    system prompt
                  </li>
                  <li>
                    • Full AI SDK integration with streaming and tool support
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">State Management</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>v0-context.tsx</code> - Global state for project and
                    canvas
                  </li>
                  <li>
                    • <code>v0-types.ts</code> - TypeScript interfaces and types
                  </li>
                  <li>• Real-time updates and history tracking</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Extend the V0 clone with additional AI models, custom prompts,
                and new component types.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Add new AI model providers</li>
                <li>• Create custom UI templates</li>
                <li>• Integrate with design systems</li>
                <li>• Add export formats (Figma, Sketch)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Production Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Deploy your V0 clone to production with enterprise-grade
                features.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Vercel deployment configuration</li>
                <li>• Database integration for history</li>
                <li>• User authentication and teams</li>
                <li>• Analytics and usage tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
