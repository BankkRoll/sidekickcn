import { AnimatedDemos } from "@/components/landing/animated-demos";
import { ContextTrainingSection } from "@/components/landing/context-training-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { SingleDemo } from "@/components/landing/single-demo";

// Reusable section decorations component
function SectionDecorations({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Horizontal Lines */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-border/50" />
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-border/50" />

      {/* Corner Dots */}
      <div className="absolute -top-2 left-1/4 transform -translate-x-1/2 w-4 h-4 bg-background border border-border rounded-full flex items-center justify-center">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          className="text-border"
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute -top-2 right-1/4 transform translate-x-1/2 w-4 h-4 bg-background border border-border rounded-full flex items-center justify-center">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          className="text-border"
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute -bottom-2 left-1/4 transform -translate-x-1/2 w-4 h-4 bg-background border border-border rounded-full flex items-center justify-center">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          className="text-border"
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute -bottom-2 right-1/4 transform translate-x-1/2 w-4 h-4 bg-background border border-border rounded-full flex items-center justify-center">
        <svg
          width="8"
          height="8"
          viewBox="0 0 24 24"
          fill="none"
          className="text-border"
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>

      {children}
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Vertical Side Lines - Hidden on Mobile */}
      <div className="hidden md:block fixed left-4 top-0 bottom-0 w-px bg-border z-0" />
      <div className="hidden md:block fixed right-4 top-0 bottom-0 w-px bg-border z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Demo Section */}
        <section className="border-t relative">
          <SectionDecorations>
            <div className="md:px-4">
              <AnimatedDemos />
            </div>
          </SectionDecorations>
        </section>

        {/* Single Demo Section */}
        <section className="border-t relative">
          <SectionDecorations>
            <SingleDemo />
          </SectionDecorations>
        </section>

        {/* Features Section */}
        <section className="border-t relative">
          <SectionDecorations>
            <div className="md:px-4">
              <FeaturesSection />
            </div>
          </SectionDecorations>
        </section>

        {/* Context & Training Section */}
        <section className="border-t relative">
          <SectionDecorations>
            <div className="md:px-4">
              <ContextTrainingSection />
            </div>
          </SectionDecorations>
        </section>
      </div>
    </div>
  );
}
