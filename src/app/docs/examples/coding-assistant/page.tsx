import { Callout } from "@/components/docs/callout";
import ComponentFileViewer from "@/components/docs/code-preview";
import { CodingAssistantPreview } from "@/components/docs/example-previews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codingAssistantExample } from "@/lib/code-examples/coding-assistant-example";
import { ArrowLeft, CheckCircle, Code, Eye } from "lucide-react";
import Link from "next/link";

export default function CodingAssistantPage() {
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
            <Code className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">AI Coding Assistant</h1>
            <p className="text-lg text-muted-foreground mt-2">
              A powerful coding assistant with multiple AI models, code review,
              debugging, and development tools.
            </p>
          </div>
        </div>

        <Callout type="info" title="About This Example">
          Experience a comprehensive coding assistant that helps with code
          review, debugging, optimization, and development tasks using multiple
          AI models.
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
                  Try different AI models and coding tasks. The assistant can
                  help with code review, debugging, optimization, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodingAssistantPreview />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Implementation</CardTitle>
                <CardDescription>
                  Full codebase with multi-model AI integration, code analysis
                  tools, and development workflow features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentFileViewer component={codingAssistantExample} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
              Download the complete AI coding assistant implementation from the
              code viewer above
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
                    Add your AI API keys (OpenAI, Anthropic, xAI, etc.)
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
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Everything included in this AI coding assistant implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  AI Models
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• GPT-4 and GPT-3.5 Turbo</li>
                  <li>• Claude (Anthropic)</li>
                  <li>• Grok (xAI)</li>
                  <li>• Model switching</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Development Tools
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Code review and analysis</li>
                  <li>• Debugging assistance</li>
                  <li>• Unit test generation</li>
                  <li>• Documentation writing</li>
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
              <CardTitle>Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Integrate the coding assistant into your development workflow.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• VS Code extension</li>
                <li>• GitHub integration</li>
                <li>• CI/CD pipeline integration</li>
                <li>• Team collaboration features</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add advanced features for enterprise development teams.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Custom AI model training</li>
                <li>• Codebase analysis</li>
                <li>• Security scanning</li>
                <li>• Performance optimization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
