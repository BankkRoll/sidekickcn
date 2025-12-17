"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PaperclipIcon, SendIcon, XIcon } from "lucide-react";
import * as React from "react";

export type PromptInputMessage = {
  text: string;
  attachments?: File[];
};

type PromptInputContextValue = {
  attachments: File[];
  addAttachments: (files: File[]) => void;
  removeAttachment: (index: number) => void;
  multiple?: boolean;
  globalDrop?: boolean;
};

const PromptInputContext = React.createContext<PromptInputContextValue | null>(
  null,
);

function usePromptInput() {
  const context = React.useContext(PromptInputContext);
  if (!context) {
    throw new Error("usePromptInput must be used within PromptInput");
  }
  return context;
}

type PromptInputProps = {
  children: React.ReactNode;
  onSubmit?: (message: PromptInputMessage) => void;
  multiple?: boolean;
  globalDrop?: boolean;
  className?: string;
};

export function PromptInput({
  children,
  onSubmit,
  multiple = false,
  globalDrop = false,
  className,
}: PromptInputProps) {
  const [attachments, setAttachments] = React.useState<File[]>([]);

  const addAttachments = React.useCallback(
    (files: File[]) => {
      if (multiple) {
        setAttachments((prev) => [...prev, ...files]);
      } else {
        setAttachments(files.slice(0, 1));
      }
    },
    [multiple],
  );

  const removeAttachment = React.useCallback((index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <PromptInputContext.Provider
      value={{
        attachments,
        addAttachments,
        removeAttachment,
        multiple,
        globalDrop,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const text = formData.get("prompt") as string;
          onSubmit?.({ text, attachments });
          setAttachments([]);
        }}
        className={cn("relative rounded-lg border bg-background", className)}
      >
        {children}
      </form>
    </PromptInputContext.Provider>
  );
}

type PromptInputHeaderProps = {
  children?: React.ReactNode;
};

export function PromptInputHeader({ children }: PromptInputHeaderProps) {
  return <div className="border-b p-2">{children}</div>;
}

type PromptInputBodyProps = {
  children: React.ReactNode;
};

export function PromptInputBody({ children }: PromptInputBodyProps) {
  return <div className="p-2">{children}</div>;
}

type PromptInputFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function PromptInputFooter({
  children,
  className,
}: PromptInputFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t p-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

type PromptInputTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function PromptInputTextarea({
  className,
  ...props
}: PromptInputTextareaProps) {
  return (
    <Textarea
      name="prompt"
      placeholder="Type your message..."
      className={cn(
        "min-h-[60px] resize-none border-0 p-0 focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  );
}

type PromptInputToolsProps = {
  children?: React.ReactNode;
};

export function PromptInputTools({ children }: PromptInputToolsProps) {
  return <div className="flex items-center gap-2">{children || null}</div>;
}

type PromptInputButtonProps = React.ComponentProps<typeof Button>;

export function PromptInputButton({
  children,
  ...props
}: PromptInputButtonProps) {
  return (
    <Button variant="ghost" size="sm" type="button" {...props}>
      {children}
    </Button>
  );
}

export function PromptInputSubmit() {
  return (
    <Button type="submit" size="sm" className="ml-auto">
      <SendIcon className="h-4 w-4" />
      <span className="sr-only">Send message</span>
    </Button>
  );
}

type PromptInputAttachmentsProps = {
  children: (attachment: File, index: number) => React.ReactNode;
};

export function PromptInputAttachments({
  children,
}: PromptInputAttachmentsProps) {
  const { attachments } = usePromptInput();

  if (attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((attachment, index) => children(attachment, index))}
    </div>
  );
}

type PromptInputAttachmentProps = {
  data: File;
  index?: number;
};

export function PromptInputAttachment({
  data,
  index = 0,
}: PromptInputAttachmentProps) {
  const { removeAttachment } = usePromptInput();

  return (
    <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-1 text-sm max-w-full">
      <PaperclipIcon className="h-3 w-3 shrink-0" />
      <span className="flex-1 min-w-0 truncate">{data.name}</span>
      <button
        type="button"
        onClick={() => removeAttachment(index)}
        className="ml-auto shrink-0 hover:text-destructive transition-colors"
        aria-label={`Remove ${data.name}`}
      >
        <XIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export function PromptInputActionMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DropdownMenu>{children}</DropdownMenu>;
}

export function PromptInputActionMenuTrigger() {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm" type="button">
        <PaperclipIcon className="h-4 w-4" />
        <span className="sr-only">Add attachments</span>
      </Button>
    </DropdownMenuTrigger>
  );
}

export function PromptInputActionMenuContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DropdownMenuContent>{children}</DropdownMenuContent>;
}

export function PromptInputActionAddAttachments() {
  const { addAttachments, multiple } = usePromptInput();
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
        onClick={() => inputRef.current?.click()}
      >
        <PaperclipIcon className="h-4 w-4" />
        <span>Add files</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            addAttachments(Array.from(e.target.files));
          }
        }}
      />
    </>
  );
}
