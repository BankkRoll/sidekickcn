"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Code, Database, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
            <img
              src="/icon.png"
              alt="sidekick/cn"
              className="h-12 w-12 md:h-20 md:w-20 inline-block mr-2"
            />
            sidekick/cn
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build AI assistants with modular components. Deploy in minutes,
            scale to millions.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Zap className="h-8 w-8" />
            </div>
            <div className="font-semibold">5-Minute Setup</div>
            <div className="text-sm text-muted-foreground">
              Install & deploy instantly
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Database className="h-8 w-8" />
            </div>
            <div className="font-semibold">Context Aware</div>
            <div className="text-sm text-muted-foreground">
              Train on your data & docs
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Code className="h-8 w-8" />
            </div>
            <div className="font-semibold">Fully Customizable</div>
            <div className="text-sm text-muted-foreground">
              Build exactly what you need
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="px-8">
            <Link href="/docs/getting-started">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="px-8">
            <Link href="/demo">View Demo</Link>
          </Button>
        </div>

        {/* Feature List */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-8 text-sm text-muted-foreground">
          {[
            "TypeScript Ready",
            "Mobile Responsive",
            "shadcn/ui Theme Support",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
