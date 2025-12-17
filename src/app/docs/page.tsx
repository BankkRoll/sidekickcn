import { CodePreview } from "@/components/docs/code-preview";
import { ScrollableHeading } from "@/components/docs/scrollable-heading";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function IntroductionPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-8">
        <div className="text-left space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              <img
                src="/icon.png"
                alt="sidekick/cn"
                className="h-12 w-12 inline-block mr-2"
              />
              sidekick/cn
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              A AI assistant framework for Next.js. Build sophisticated
              conversational AI applications with minimal setup and maximum
              customization. Fully composable, secure by default, and designed
              for scale.
            </p>
          </div>
        </div>
      </div>

      {/* What is sidekick/cn */}
      <section className="space-y-8">
        <div className="text-left">
          <ScrollableHeading className="text-3xl font-bold mb-4">
            What is sidekick/cn?
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            sidekick/cn is a{" "}
            <strong>comprehensive AI assistant framework</strong> built
            specifically for Next.js and Shadcn/ui. It provides production-ready
            components, hooks, and patterns for building sophisticated
            AI-powered applications with minimal setup and maximum flexibility.
          </p>
        </div>

        <div className="text-left mb-6">
          <h3 className="text-xl font-semibold mb-2">Get Started in Minutes</h3>
          <p className="text-muted-foreground">
            From installation to your first AI assistant
          </p>
        </div>
        <CodePreview
          title="Complete AI Chat in 5 Lines"
          code={`import { SidekickProvider, SidekickFloating } from "@/components/sidekick"

export default function App() {
  return (
    <SidekickProvider>
      <YourAppContent />
      <SidekickFloating position="bottom-right" />
    </SidekickProvider>
  )
}`}
        />
      </section>

      {/* What it's for */}
      <section className="space-y-8">
        <div className="text-left">
          <ScrollableHeading className="text-3xl font-bold mb-4">
            What Can You Build?
          </ScrollableHeading>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            sidekick/cn is designed for developers who want to{" "}
            <strong>build AI-powered applications quickly</strong>
            without reinventing the wheel. Whether you're building a customer
            support chatbot, a coding assistant, or a custom AI workflow tool,
            sidekick/cn provides the foundation.
          </p>
        </div>

        <Alert>
          <AlertDescription>
            <strong>Perfect for:</strong> SaaS applications, internal tools,
            developer platforms, customer support systems, content creation
            tools, educational platforms, and any application that needs
            conversational AI.
          </AlertDescription>
        </Alert>
      </section>
    </div>
  );
}
