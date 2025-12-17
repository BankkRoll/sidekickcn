"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Zap } from "lucide-react";
import { ReactNode } from "react";

interface Step {
  title: string;
  description?: string;
  content?: ReactNode;
  code?: string;
  language?: string;
  optional?: boolean;
  estimatedTime?: string;
}

interface StepsGuideProps {
  title?: string;
  description?: string;
  steps: Step[];
  className?: string;
  showStepNumbers?: boolean;
  variant?: "default" | "compact" | "timeline";
}

function StepsGuide({
  title,
  description,
  steps,
  className,
  showStepNumbers = true,
  variant = "default",
}: StepsGuideProps) {
  if (variant === "timeline") {
    return (
      <div className={cn("space-y-6", className)}>
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6">
                {/* Timeline dot */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
                  {step.optional ? (
                    <span className="text-sm font-semibold opacity-60">
                      {index + 1}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2 pb-8">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    {step.optional && (
                      <Badge variant="secondary" className="text-xs">
                        Optional
                      </Badge>
                    )}
                    {step.estimatedTime && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Clock className="h-3 w-3" />
                        {step.estimatedTime}
                      </Badge>
                    )}
                  </div>

                  {step.description && (
                    <p className="text-muted-foreground">{step.description}</p>
                  )}

                  {step.content && <div className="mt-4">{step.content}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-4", className)}>
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {description && <p className="text-muted-foreground">{description}</p>}

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-background text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  {step.optional && (
                    <Badge variant="secondary" className="text-xs">
                      Optional
                    </Badge>
                  )}
                </div>
                {step.description && (
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                )}
                {step.content && <div className="mt-2">{step.content}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default variant with cards
  return (
    <div className={cn("space-y-6", className)}>
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {description && <p className="text-muted-foreground">{description}</p>}

      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card key={index} className={cn(step.optional && "opacity-75")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {step.title}
                    {step.optional && (
                      <Badge variant="secondary" className="text-xs">
                        Optional
                      </Badge>
                    )}
                    {step.estimatedTime && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Clock className="h-3 w-3" />
                        {step.estimatedTime}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardTitle>
              {step.description && (
                <CardDescription>{step.description}</CardDescription>
              )}
            </CardHeader>

            {step.content && <CardContent>{step.content}</CardContent>}
          </Card>
        ))}
      </div>
    </div>
  );
}

// Quick start guide variant
interface QuickStartProps {
  title: string;
  description?: string;
  steps: Omit<Step, "optional" | "estimatedTime">[];
  className?: string;
}

function QuickStart({ title, description, steps, className }: QuickStartProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">{step.title}</h4>
              {step.description && (
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
              {step.content && <div className="mt-2">{step.content}</div>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export { QuickStart, StepsGuide };
export type { Step };
