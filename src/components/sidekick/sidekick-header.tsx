"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export interface SidekickHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SidekickHeader({
  title = "sidekick/cn AI",
  subtitle = "Your intelligent assistant",
  className,
}: SidekickHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-border pb-4",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
        <Sparkles className="size-5 text-primary" />
      </div>
      <div className="flex-1">
        <h2 className="text-balance text-lg font-semibold leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="size-2 animate-pulse rounded-full bg-primary" />
        <span className="text-xs text-muted-foreground">Active</span>
      </div>
    </div>
  );
}
