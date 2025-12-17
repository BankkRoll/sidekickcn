"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownIcon } from "lucide-react";
import * as React from "react";

type ConversationProps = {
  children: React.ReactNode;
  className?: string;
};

export function Conversation({ children, className }: ConversationProps) {
  return (
    <div className={cn("relative flex flex-col", className)}>{children}</div>
  );
}

type ConversationContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function ConversationContent({
  children,
  className,
}: ConversationContentProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = React.useState(true);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const threshold = 100;
      const isBottom =
        element.scrollHeight - element.scrollTop - element.clientHeight <
        threshold;
      setIsAtBottom(isBottom);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (isAtBottom && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [children, isAtBottom]);

  // Store ref in data attribute for scroll button
  React.useEffect(() => {
    if (ref.current) {
      (ref.current as any)._conversationRef = ref;
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn("flex-1 space-y-4 overflow-y-auto p-4", className)}
      data-conversation-content
    >
      {children}
    </div>
  );
}

export function ConversationScrollButton() {
  const handleScroll = React.useCallback(() => {
    const element = document.querySelector(
      "[data-conversation-content]",
    ) as HTMLElement;
    if (element) {
      element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
    }
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-20 right-4 z-50 rounded-full shadow-lg bg-background hover:bg-muted"
      onClick={handleScroll}
    >
      <ArrowDownIcon className="h-4 w-4" />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
