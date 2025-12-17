"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { BookOpenIcon, ExternalLinkIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type SourcesProps = {
  children: React.ReactNode;
  className?: string;
};

export function Sources({ children, className }: SourcesProps) {
  return (
    <Collapsible className={cn("mb-2", className)}>{children}</Collapsible>
  );
}

type SourcesTriggerProps = {
  count: number;
};

export function SourcesTrigger({ count }: SourcesTriggerProps) {
  return (
    <CollapsibleTrigger asChild>
      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <BookOpenIcon className="h-4 w-4" />
        <span>
          {count} {count === 1 ? "source" : "sources"}
        </span>
      </button>
    </CollapsibleTrigger>
  );
}

type SourcesContentProps = {
  children: React.ReactNode;
};

export function SourcesContent({ children }: SourcesContentProps) {
  return (
    <CollapsibleContent className="mt-2 space-y-2">
      {children}
    </CollapsibleContent>
  );
}

type SourceProps = {
  title: string;
  href: string;
};

export function Source({ title, href }: SourceProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-2 rounded-md border p-3 text-sm hover:bg-muted/50 transition-colors"
    >
      <ExternalLinkIcon className="h-4 w-4 shrink-0 mt-0.5" />
      <span className="flex-1 break-words">{title}</span>
    </a>
  );
}
