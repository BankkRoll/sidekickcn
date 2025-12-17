"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { ShimmerLines } from "@/components/ai-elements/shimmer";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { cn } from "@/lib/utils";
import { GlobeIcon, MicIcon } from "lucide-react";
import * as React from "react";
import { useSidekick } from "./sidekick-provider";
import { ModelSelector } from "../ai-elements/model-selector";

// Models are now handled dynamically through the ModelSelector

type SidekickChatProps = {
  className?: string;
  showModelSelector?: boolean;
  showSources?: boolean;
  showReasoning?: boolean;
  showSuggestions?: boolean;
  showAttachments?: boolean;
  showWebSearch?: boolean;
  showMicrophone?: boolean;
  suggestions?: string[];
  as?: React.ComponentType<any>;
};

export function SidekickChat({
  className,
  showModelSelector = true,
  showSources = true,
  showReasoning = true,
  showSuggestions = true,
  showAttachments = true,
  showWebSearch = false,
  showMicrophone = false,
  suggestions: customSuggestions,
  as: CustomComponent,
}: SidekickChatProps) {
  const { messages, addMessage, sendPrompt, isLoading, config } = useSidekick();
  const [text, setText] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(
    config.model || "openai/gpt-4.1",
  );
  const [useWebSearch, setUseWebSearch] = React.useState(false);
  const [useMicrophone, setUseMicrophone] = React.useState(false);

  const suggestions = customSuggestions || [
    "Explain this concept simply",
    "Generate code for this feature",
    "Summarize the key points",
    "What are the best practices?",
  ];

  // Model selection is now handled by ModelSelector

  const handleSubmit = React.useCallback(
    async ({ text, attachments }: { text: string; attachments?: File[] }) => {
      if (!text.trim() || isLoading) return;

      addMessage({ role: "user", content: text });
      setText("");

      try {
        const response = await sendPrompt(text, { model: selectedModel });
        addMessage({
          role: "assistant",
          content: response,
          sources: showSources
            ? [
                {
                  title: "Documentation Reference",
                  href: "https://example.com/docs",
                },
                { title: "API Guide", href: "https://example.com/api" },
              ]
            : undefined,
          reasoning: showReasoning
            ? {
                content:
                  "I analyzed the user's request and determined the best approach is to provide a clear, structured response with examples.",
                duration: 2.5,
              }
            : undefined,
        });
      } catch (error) {
        addMessage({
          role: "assistant",
          content: "Sorry, I encountered an error processing your request.",
        });
      }
    },
    [
      isLoading,
      addMessage,
      sendPrompt,
      selectedModel,
      showSources,
      showReasoning,
    ],
  );

  const handleSuggestionClick = React.useCallback((suggestion: string) => {
    setText(suggestion);
  }, []);

  // Allow custom component override
  if (CustomComponent) {
    return (
      <CustomComponent
        {...{ messages, handleSubmit, isLoading, text, setText }}
      />
    );
  }

  return (
    <div
      className={cn("flex flex-1 flex-col min-h-0", className)}
      role="main"
      aria-label="AI chat conversation"
    >
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          {messages.map((message) => {
            const versions = message.versions || [
              { id: "1", content: message.content },
            ];

            return (
              <MessageBranch defaultBranch={0} key={message.id}>
                <MessageBranchContent>
                  {versions.map((version) => (
                    <Message
                      from={message.role}
                      key={`${message.id}-${version.id}`}
                    >
                      <div>
                        {message.sources?.length && showSources && (
                          <Sources>
                            <SourcesTrigger count={message.sources.length} />
                            <SourcesContent>
                              {message.sources.map((source) => (
                                <Source
                                  href={source.href}
                                  key={source.href}
                                  title={source.title}
                                />
                              ))}
                            </SourcesContent>
                          </Sources>
                        )}
                        {message.reasoning && showReasoning && (
                          <Reasoning duration={message.reasoning.duration}>
                            <ReasoningTrigger />
                            <ReasoningContent>
                              {message.reasoning.content}
                            </ReasoningContent>
                          </Reasoning>
                        )}
                        <MessageContent>
                          <MessageResponse>{version.content}</MessageResponse>
                        </MessageContent>
                      </div>
                    </Message>
                  ))}
                </MessageBranchContent>
                {versions.length > 1 && (
                  <MessageBranchSelector from={message.role}>
                    <MessageBranchPrevious />
                    <MessageBranchPage />
                    <MessageBranchNext />
                  </MessageBranchSelector>
                )}
              </MessageBranch>
            );
          })}
          {isLoading && (
            <Message from="assistant">
              <MessageContent>
                <ShimmerLines lines={3} />
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="shrink-0 space-y-4 pt-4">
        {showSuggestions && messages.length === 0 && (
          <Suggestions className="px-4">
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                suggestion={suggestion}
              />
            ))}
          </Suggestions>
        )}
        <div className="w-full px-4 pb-4">
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            {showAttachments && (
              <PromptInputHeader>
                <PromptInputAttachments>
                  {(attachment, index) => (
                    <PromptInputAttachment data={attachment} index={index} />
                  )}
                </PromptInputAttachments>
              </PromptInputHeader>
            )}
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(event) => setText(event.target.value)}
                value={text}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                {showAttachments && (
                  <PromptInputActionMenu>
                    <PromptInputActionMenuTrigger />
                    <PromptInputActionMenuContent>
                      <PromptInputActionAddAttachments />
                    </PromptInputActionMenuContent>
                  </PromptInputActionMenu>
                )}
                {showMicrophone && (
                  <PromptInputButton
                    onClick={() => setUseMicrophone(!useMicrophone)}
                    variant={useMicrophone ? "default" : "ghost"}
                  >
                    <MicIcon size={16} />
                    <span className="sr-only">Microphone</span>
                  </PromptInputButton>
                )}
                {showWebSearch && (
                  <PromptInputButton
                    onClick={() => setUseWebSearch(!useWebSearch)}
                    variant={useWebSearch ? "default" : "ghost"}
                  >
                    <GlobeIcon size={16} />
                    <span>Search</span>
                  </PromptInputButton>
                )}
                {showModelSelector && (
                  <ModelSelector
                    selectedModel={selectedModel}
                    onModelChange={setSelectedModel}
                    config={config.modelConfig}
                  />
                )}
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
