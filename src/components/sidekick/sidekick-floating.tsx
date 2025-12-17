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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MessageSquareIcon, MinusIcon, X } from "lucide-react";
import * as React from "react";
import { useSidekick } from "./sidekick-provider";

type SidekickFloatingProps = {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  defaultOpen?: boolean;
  trigger?: React.ReactNode;
  className?: string;
};

export function SidekickFloating({
  position = "bottom-right",
  defaultOpen = false,
  trigger,
  className,
}: SidekickFloatingProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const { messages, addMessage, sendPrompt, isLoading } = useSidekick();
  const [text, setText] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
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

  return (
    <>
      {!isOpen && (
        <div className={cn("fixed z-50", positionClasses[position])}>
          {trigger || (
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation -webkit-tap-highlight-color-transparent"
              onClick={() => setIsOpen(true)}
              aria-label="Open sidekick/cn (⌘K)"
            >
              <MessageSquareIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open sidekick/cn (⌘K)</span>
            </Button>
          )}
        </div>
      )}

      {isOpen && (
        <div
          className={cn(
            "fixed z-50 flex flex-col rounded-xl border bg-background shadow-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
            isMinimized ? "h-12" : "h-[50vh] sm:h-[60vh]",
            "w-[95vw] sm:w-[90vw] max-w-[420px]",
            positionClasses[position],
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sidekick-title"
          aria-describedby="sidekick-description"
        >
          <div className="flex items-center justify-between border-b px-4 py-2.5 bg-muted/30 backdrop-blur-sm rounded-t-xl">
            <div className="flex items-center gap-2">
              <MessageSquareIcon
                className="h-4 w-4 text-primary"
                aria-hidden="true"
              />
              <span id="sidekick-title" className="text-sm font-semibold">
                sidekick/cn
              </span>
              <span id="sidekick-description" className="sr-only">
                AI assistant chat interface
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                <MinusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex flex-col flex-1 min-h-0">
              <ScrollArea className="flex-1 px-4" ref={scrollRef}>
                <div className="flex flex-col gap-3 py-4">
                  {messages.length === 0 && (
                    <Message from="assistant">
                      <MessageContent>
                        <MessageResponse>
                          Hi! I'm sidekick/cn. How can I help you today?
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
                        <ShimmerLines lines={2} />
                      </MessageContent>
                    </Message>
                  )}
                </div>
              </ScrollArea>

              <div className="shrink-0 p-3 border-t bg-muted/20">
                <PromptInput onSubmit={handleSubmit}>
                  <PromptInputBody>
                    <PromptInputTextarea
                      placeholder="Ask me anything..."
                      onChange={(event) => setText(event.target.value)}
                      value={text}
                      className="min-h-[44px] max-h-[80px]"
                    />
                  </PromptInputBody>
                  <PromptInputFooter className="pt-2">
                    <PromptInputTools />
                    <PromptInputSubmit />
                  </PromptInputFooter>
                </PromptInput>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
