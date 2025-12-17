"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BrainIcon, ClockIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type ReasoningProps = {
  duration?: number;
  children: React.ReactNode;
  className?: string;
};

export function Reasoning({ duration, children, className }: ReasoningProps) {
  return (
    <Collapsible className={cn("mb-2", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ duration?: number }>,
              {
                duration,
              },
            )
          : child,
      )}
    </Collapsible>
  );
}

type ReasoningTriggerProps = {
  duration?: number;
};

export function ReasoningTrigger({ duration }: ReasoningTriggerProps) {
  return (
    <CollapsibleTrigger asChild>
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <BrainIcon className="h-4 w-4" />
        <span>View reasoning</span>
        {duration && (
          <span className="flex items-center gap-1 text-xs">
            <ClockIcon className="h-3 w-3" />
            {duration}s
          </span>
        )}
      </button>
    </CollapsibleTrigger>
  );
}

type ReasoningContentProps = {
  children: React.ReactNode;
};

export function ReasoningContent({ children }: ReasoningContentProps) {
  return (
    <CollapsibleContent className="mt-2">
      <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
        {children}
      </div>
    </CollapsibleContent>
  );
}
