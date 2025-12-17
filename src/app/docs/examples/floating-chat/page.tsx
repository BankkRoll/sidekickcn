import { Callout } from "@/components/docs/callout";
import ComponentFileViewer from "@/components/docs/code-preview";
import { FloatingChatPreview } from "@/components/docs/example-previews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { floatingChatExample } from "@/lib/code-examples/floating-chat-example";
import { ArrowLeft, CheckCircle, Code, Eye, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function FloatingChatPage() {
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
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Floating Chat Widget</h1>
            <p className="text-lg text-muted-foreground mt-2">
              A clean, responsive floating chat widget with keyboard shortcuts
              and smooth animations.
            </p>
          </div>
        </div>

        <Callout type="info" title="About This Example">
          Experience a production-ready floating chat interface that integrates
          seamlessly with any website or application.
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
                  Click the floating button to toggle the chat interface. Try
                  the keyboard shortcuts (Cmd/Ctrl+K).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FloatingChatPreview />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Implementation</CardTitle>
                <CardDescription>
                  Full codebase with all components, API routes, and
                  configuration files ready for deployment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentFileViewer component={floatingChatExample} />
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
              Download the complete floating chat widget implementation from the
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
                    Add your AI API key (OpenAI, Anthropic, etc.)
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
              Everything included in this floating chat implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  UI Components
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Floating button with smooth animations</li>
                  <li>• Expandable chat panel</li>
                  <li>• Message bubbles and input field</li>
                  <li>• Typing indicators and status</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Functionality
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Keyboard shortcuts (Cmd/Ctrl+K)</li>
                  <li>• AI-powered responses</li>
                  <li>• Message history and persistence</li>
                  <li>• Responsive design</li>
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
                Customize the chat widget to match your brand and requirements.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Change colors and styling</li>
                <li>• Add custom AI prompts</li>
                <li>• Integrate with your backend</li>
                <li>• Add user authentication</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Production Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Deploy your chat widget to production with enterprise features.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Vercel deployment</li>
                <li>• Analytics integration</li>
                <li>• Rate limiting and security</li>
                <li>• Multi-language support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
