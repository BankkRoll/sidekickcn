"use client";

import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import type React from "react";

interface ScrollableHeadingProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function ScrollableHeading({
  children,
  id,
  className,
}: ScrollableHeadingProps) {
  const headingId =
    id ||
    children
      ?.toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  return (
    <h2 id={headingId} className={cn("group relative scroll-mt-24", className)}>
      <button
        onClick={(e) => {
          e.preventDefault();
          // Update URL without triggering navigation
          window.history.replaceState(null, "", `#${headingId}`);
          // Trigger smooth scroll
          const element = document.getElementById(headingId || "");
          if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded hover:bg-muted"
        aria-label={`Link to ${children}`}
      >
        <Link className="h-4 w-4" />
      </button>
      {children}
    </h2>
  );
}
