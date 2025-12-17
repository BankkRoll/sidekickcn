"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

// Message Branch Context
type MessageBranchContextValue = {
  currentBranch: number;
  totalBranches: number;
  onBranchChange: (branch: number) => void;
};

const MessageBranchContext =
  React.createContext<MessageBranchContextValue | null>(null);

function useMessageBranch() {
  const context = React.useContext(MessageBranchContext);
  if (!context) {
    throw new Error("useMessageBranch must be used within MessageBranch");
  }
  return context;
}

// Message Branch Root
type MessageBranchProps = {
  defaultBranch?: number;
  children: React.ReactNode;
};

export function MessageBranch({
  defaultBranch = 0,
  children,
}: MessageBranchProps) {
  const [currentBranch, setCurrentBranch] = React.useState(defaultBranch);
  const [totalBranches, setTotalBranches] = React.useState(1);

  React.useEffect(() => {
    const branchContent = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && child.type === MessageBranchContent,
    );
    if (React.isValidElement(branchContent)) {
      const element = branchContent as React.ReactElement<{
        children: React.ReactNode;
      }>;
      if (element.props.children) {
        setTotalBranches(React.Children.count(element.props.children));
      }
    }
  }, [children]);

  return (
    <MessageBranchContext.Provider
      value={{
        currentBranch,
        totalBranches,
        onBranchChange: setCurrentBranch,
      }}
    >
      <div className="relative">{children}</div>
    </MessageBranchContext.Provider>
  );
}

// Message Branch Content
type MessageBranchContentProps = {
  children: React.ReactNode;
};

export function MessageBranchContent({ children }: MessageBranchContentProps) {
  const { currentBranch } = useMessageBranch();
  const childArray = React.Children.toArray(children);

  return <>{childArray[currentBranch]}</>;
}

// Message Branch Selector
type MessageBranchSelectorProps = {
  from: "user" | "assistant";
  children?: React.ReactNode;
};

export function MessageBranchSelector({
  from,
  children,
}: MessageBranchSelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 py-1",
        from === "user" ? "justify-end" : "justify-start",
      )}
    >
      {children}
    </div>
  );
}

// Message Branch Navigation
export function MessageBranchPrevious() {
  const { currentBranch, onBranchChange } = useMessageBranch();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onBranchChange(Math.max(0, currentBranch - 1))}
      disabled={currentBranch === 0}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="sr-only">Previous version</span>
    </Button>
  );
}

export function MessageBranchNext() {
  const { currentBranch, totalBranches, onBranchChange } = useMessageBranch();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() =>
        onBranchChange(Math.min(totalBranches - 1, currentBranch + 1))
      }
      disabled={currentBranch === totalBranches - 1}
    >
      <ChevronRightIcon className="h-4 w-4" />
      <span className="sr-only">Next version</span>
    </Button>
  );
}

export function MessageBranchPage() {
  const { currentBranch, totalBranches } = useMessageBranch();

  return (
    <span className="text-sm text-muted-foreground">
      {currentBranch + 1} / {totalBranches}
    </span>
  );
}

// Message Component
type MessageProps = {
  from: "user" | "assistant";
  children: React.ReactNode;
  className?: string;
};

export function Message({ from, children, className }: MessageProps) {
  return (
    <div
      className={cn(
        "group relative mb-4 flex items-start gap-3 max-w-full",
        from === "user" ? "flex-row-reverse" : "flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full text-sm font-medium",
          from === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {from === "user" ? "U" : "A"}
      </div>
      <div
        className={cn(
          "flex-1 space-y-2 overflow-hidden rounded-lg px-3 py-2 max-w-[calc(100%-3rem)] sm:px-4",
          from === "user" ? "bg-primary/10" : "bg-muted/50",
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Message Content
type MessageContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function MessageContent({ children, className }: MessageContentProps) {
  return (
    <div
      className={cn("prose prose-sm max-w-none dark:prose-invert", className)}
    >
      {children}
    </div>
  );
}

// Message Response (for streaming/markdown)
type MessageResponseProps = {
  children: React.ReactNode;
};

export function MessageResponse({ children }: MessageResponseProps) {
  return <div className="whitespace-pre-wrap break-words">{children}</div>;
}
