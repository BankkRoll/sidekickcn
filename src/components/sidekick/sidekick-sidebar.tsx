"use client";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { ShimmerLines } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PanelRightIcon, SearchIcon, X } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";
import { useSidekick } from "./sidekick-provider";

type SidekickSidebarProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  width?: string | number;
  position?: "left" | "right";
  className?: string;
  showSearchBar?: boolean;
  onSearch?: (query: string) => void;
};

export function SidekickSidebar({
  children,
  defaultOpen = false,
  width = 420,
  position = "right",
  className,
  showSearchBar = true,
  onSearch,
}: SidekickSidebarProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { messages, addMessage, sendPrompt, isLoading } = useSidekick();
  const [text, setText] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const widthValue = typeof width === "number" ? `${width}px` : width;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        if (!isOpen) {
          setTimeout(() => searchInputRef.current?.focus(), 100);
        }
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = React.useCallback(
    async ({ text }: { text: string; attachments?: File[] }) => {
      if (!text.trim() || isLoading) return;

      addMessage({ role: "user", content: text });
      setText("");

      try {
        const response = await sendPrompt(text);
        addMessage({ role: "assistant", content: response });
      } catch (error) {
        addMessage({
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        });
      }
    },
    [isLoading, addMessage, sendPrompt],
  );

  const handleSearchSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearch?.(searchQuery);
        setText(searchQuery);
        setSearchQuery("");
      }
    },
    [searchQuery, onSearch],
  );

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <motion.div
        className="flex-1 h-screen overflow-auto bg-background"
        animate={{
          width: isOpen ? `calc(100% - ${widthValue})` : "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>

      <motion.div
        className={cn(
          "fixed top-0 h-screen bg-background border-l shadow-2xl flex flex-col z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          position === "right" ? "right-0" : "left-0 border-r border-l-0",
          "w-full sm:w-auto", // Full width on mobile, auto on larger screens
          className,
        )}
        style={{ width: widthValue }}
        animate={{
          x: isOpen ? 0 : position === "right" ? "100%" : "-100%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: window?.matchMedia?.("(prefers-reduced-motion: reduce)")
            ?.matches
            ? 0
            : undefined,
        }}
        role="complementary"
        aria-label="AI assistant sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <PanelRightIcon
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <span className="text-base font-semibold">sidekick/cn</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Search Bar */}
        {showSearchBar && (
          <div className="shrink-0 border-b p-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative"
              role="search"
            >
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search or ask... ⌘K"
                className="pl-9 pr-4 focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Search conversations"
              />
            </form>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 px-4">
          <div className="flex flex-col gap-3 py-4">
            {messages.length === 0 && (
              <Message from="assistant">
                <MessageContent>
                  <MessageResponse>
                    Hi! I'm sidekick/cn, your AI assistant. Use the search bar
                    above or type below to get started.
                  </MessageResponse>
                </MessageContent>
              </Message>
            )}
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  <MessageResponse>{message.content}</MessageResponse>
                </MessageContent>
              </Message>
            ))}
            {isLoading && (
              <Message from="assistant">
                <MessageContent>
                  <ShimmerLines lines={3} />
                </MessageContent>
              </Message>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="shrink-0 p-4 border-t">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="Ask me anything..."
                onChange={(event) => setText(event.target.value)}
                value={text}
                className="min-h-[80px] max-h-[200px]"
              />
            </PromptInputBody>
            <PromptInputFooter className="pt-2">
              <PromptInputTools />
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </motion.div>

      {!isOpen && (
        <Button
          size="lg"
          className={cn(
            "fixed top-4 z-40 h-10 px-4 shadow-lg hover:shadow-xl transition-all",
            position === "right" ? "right-4" : "left-4",
          )}
          onClick={() => setIsOpen(true)}
        >
          <PanelRightIcon className="h-4 w-4 mr-2" />
          sidekick/cn
          <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      )}
    </div>
  );
}
