"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check, Copy, Download } from "lucide-react";
import { useTheme } from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createHighlighter } from "shiki";
import { toast } from "sonner";

interface CodeBlockContextType {
  copyToClipboard: (text: string) => Promise<void>;
  downloadFile: (content: string, filename: string) => void;
}

const CodeBlockContext = createContext<CodeBlockContextType | null>(null);

const useCodeBlock = () => {
  const context = useContext(CodeBlockContext);
  if (!context) {
    throw new Error("useCodeBlock must be used within a CodeBlockProvider");
  }
  return context;
};

interface CodeBlockProviderProps {
  children: React.ReactNode;
}

function CodeBlockProvider({ children }: CodeBlockProviderProps) {
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  }, []);

  const downloadFile = useCallback((content: string, filename: string) => {
    try {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("File downloaded");
    } catch (err) {
      toast.error("Failed to download file");
    }
  }, []);

  const value = useMemo(
    () => ({
      copyToClipboard,
      downloadFile,
    }),
    [copyToClipboard, downloadFile],
  );

  return (
    <CodeBlockContext.Provider value={value}>
      {children}
    </CodeBlockContext.Provider>
  );
}

interface ShikiCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showDownloadButton?: boolean;
  className?: string;
  maxHeight?: string;
}

function ShikiCodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
  showCopyButton = true,
  showDownloadButton = false,
  className,
  maxHeight = "400px",
}: ShikiCodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const { copyToClipboard, downloadFile } = useCodeBlock();

  const shikiTheme = resolvedTheme === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    let mounted = true;

    async function highlight() {
      try {
        setIsLoading(true);
        const highlighter = await createHighlighter({
          langs: [
            "typescript",
            "tsx",
            "javascript",
            "jsx",
            "json",
            "css",
            "scss",
            "html",
            "markdown",
            "python",
            "ruby",
            "go",
            "rust",
            "java",
            "cpp",
            "c",
            "php",
            "swift",
            "kotlin",
            "dart",
            "scala",
            "perl",
            "lua",
            "bash",
            "shell",
            "powershell",
            "yaml",
            "xml",
            "sql",
            "graphql",
            "dockerfile",
            "nginx",
            "apache",
            "toml",
            "ini",
            "makefile",
            "diff",
            "log",
            "text",
          ],
          themes: [shikiTheme],
        });

        const highlightedHtml = highlighter.codeToHtml(code, {
          lang: language === "tsx" ? "typescript" : language,
          theme: shikiTheme,
        });

        if (mounted) {
          setHtml(highlightedHtml);
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setHtml(`<pre><code>${code}</code></pre>`);
          setIsLoading(false);
        }
      }
    }

    highlight();

    return () => {
      mounted = false;
    };
  }, [code, language, shikiTheme]);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const extension =
      language === "typescript"
        ? "ts"
        : language === "tsx"
          ? "tsx"
          : language === "javascript"
            ? "js"
            : language === "jsx"
              ? "jsx"
              : language;
    const fileName = filename || `code.${extension}`;
    downloadFile(code, fileName);
  };

  const addLineNumbers = (html: string) => {
    if (!showLineNumbers) return html;
    const lines = code.split("\n");
    const lineNumbers = lines.map((_, i) => `<span>${i + 1}</span>`).join("");

    return html.replace(
      /<pre[^>]*>([\s\S]*)<\/pre>/,
      `<pre class="line-numbers"><span class="line-numbers-rows">${lineNumbers}</span>$1</pre>`,
    );
  };

  return (
    <div className={cn("rounded-lg border bg-muted/50", className)}>
      {(filename || showCopyButton || showDownloadButton) && (
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            {filename && (
              <Badge variant="outline" className="text-xs font-mono">
                {filename}
              </Badge>
            )}
            {language && !filename && (
              <Badge variant="outline" className="text-xs">
                {language.toUpperCase()}
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            {showCopyButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 w-8 p-0"
                title="Copy code"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            )}
            {showDownloadButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="h-8 w-8 p-0"
                title="Download file"
              >
                <Download className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      )}
      <ScrollArea className="w-full" style={{ maxHeight }}>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-pulse text-muted-foreground">
              Loading code...
            </div>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: addLineNumbers(html) }} />
        )}
      </ScrollArea>
    </div>
  );
}

interface CodeBlockProps extends ShikiCodeBlockProps {}

export function CodeBlock(props: CodeBlockProps) {
  return (
    <CodeBlockProvider>
      <ShikiCodeBlock {...props} />
    </CodeBlockProvider>
  );
}

// Export individual components for more control
export { CodeBlockProvider, ShikiCodeBlock };
