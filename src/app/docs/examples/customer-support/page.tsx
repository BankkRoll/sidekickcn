import { Callout } from "@/components/docs/callout";
import ComponentFileViewer from "@/components/docs/code-preview";
import { CustomerSupportPreview } from "@/components/docs/example-previews";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { customerSupportExample } from "@/lib/code-examples/customer-support-example";
import { ArrowLeft, Briefcase, CheckCircle, Code, Eye } from "lucide-react";
import Link from "next/link";

export default function CustomerSupportPage() {
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
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">AI Customer Support</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Intelligent customer support chat with ticket escalation, business
              hours, and analytics dashboard.
            </p>
          </div>
        </div>

        <Callout type="info" title="About This Example">
          Experience a complete AI-powered customer support solution with
          automated ticket handling, business hours management, and
          comprehensive analytics.
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
                  Try the customer support chat interface. The AI can handle
                  common queries, escalate complex issues, and manage support
                  workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerSupportPreview />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Implementation</CardTitle>
                <CardDescription>
                  Full customer support system with chat interface, ticket
                  management, analytics, and business logic.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentFileViewer component={customerSupportExample} />
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
              Download the complete AI customer support implementation from the
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
                    Add your AI API key and configure support settings
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
              Everything included in this customer support implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Support Features
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• AI-powered chat responses</li>
                  <li>• Ticket escalation system</li>
                  <li>• Business hours management</li>
                  <li>• Knowledge base integration</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Analytics & Management
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                  <li>• Support metrics dashboard</li>
                  <li>• Conversation analytics</li>
                  <li>• Agent performance tracking</li>
                  <li>• Automated workflows</li>
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
                Connect the support system with your existing tools and
                infrastructure.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• CRM system integration</li>
                <li>• Help desk software</li>
                <li>• Customer database</li>
                <li>• Email integration</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Enhance your support system with enterprise-grade features.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multi-channel support</li>
                <li>• Advanced AI training</li>
                <li>• Real-time collaboration</li>
                <li>• Compliance and security</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
