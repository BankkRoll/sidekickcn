"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { LightbulbIcon } from "lucide-react";

type SuggestionsProps = {
  children: React.ReactNode;
  className?: string;
};

export function Suggestions({ children, className }: SuggestionsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>
  );
}

type SuggestionProps = {
  suggestion: string;
  onClick?: (suggestion: string) => void;
  className?: string;
};

export function Suggestion({
  suggestion,
  onClick,
  className,
}: SuggestionProps) {
  return (
    <button
      onClick={() => onClick?.(suggestion)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm hover:bg-muted/50 transition-colors",
        className,
      )}
    >
      <LightbulbIcon className="h-3 w-3" />
      <span>{suggestion}</span>
    </button>
  );
}
