"use client";

import { cn } from "@/lib/utils";
import type * as React from "react";

export interface SidekickUIProps {
  children: React.ReactNode;
  className?: string;
  layout?: "default" | "panel" | "minimal" | "fullscreen";
}

export function SidekickUI({
  children,
  className,
  layout = "default",
}: SidekickUIProps) {
  const layoutClasses = {
    default:
      "flex min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex-col gap-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm",
    panel: "flex min-h-screen flex-col gap-4 border-l bg-card p-4",
    minimal:
      "flex min-h-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)] flex-col gap-2 rounded-md border bg-card p-3",
    fullscreen: "flex min-h-screen flex-col gap-4 bg-card p-4 sm:p-6",
  };

  return <div className={cn(layoutClasses[layout], className)}>{children}</div>;
}
