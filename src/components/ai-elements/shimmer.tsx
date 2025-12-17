"use client";
import { cn } from "@/lib/utils";

type ShimmerProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export function Shimmer({
  className,
  width = "100%",
  height = 16,
}: ShimmerProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      style={{ width, height }}
    />
  );
}

type ShimmerLinesProps = {
  lines?: number;
  className?: string;
};

export function ShimmerLines({ lines = 3, className }: ShimmerLinesProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer key={i} width={i === lines - 1 ? "60%" : "100%"} />
      ))}
    </div>
  );
}
