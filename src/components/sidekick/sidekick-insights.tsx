"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

export interface SidekickInsightsProps {
  children: React.ReactNode;
  className?: string;
}

export function SidekickInsights({
  children,
  className,
}: SidekickInsightsProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h3 className="text-sm font-medium">Insights</h3>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
