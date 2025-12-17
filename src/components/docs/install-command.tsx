"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy, Package } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

interface InstallCommandProps {
  packages: string | string[];
  title?: string;
  description?: string;
  className?: string;
  defaultManager?: PackageManager;
  showGlobalOption?: boolean;
}

const packageManagers: Record<
  PackageManager,
  { name: string; install: string; global: string; dev?: string }
> = {
  pnpm: {
    name: "pnpm",
    install: "pnpm add",
    global: "pnpm add -g",
    dev: "pnpm add -D",
  },
  npm: {
    name: "npm",
    install: "npm install",
    global: "npm install -g",
    dev: "npm install --save-dev",
  },
  yarn: {
    name: "yarn",
    install: "yarn add",
    global: "yarn global add",
    dev: "yarn add -D",
  },
  bun: {
    name: "bun",
    install: "bun add",
    global: "bun add -g",
    dev: "bun add -d",
  },
};

function InstallCommand({
  packages,
  title,
  description,
  className,
  defaultManager = "pnpm",
  showGlobalOption = false,
}: InstallCommandProps) {
  const [packageManager, setPackageManager] =
    useState<PackageManager>(defaultManager);
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");
  const { resolvedTheme } = useTheme();

  const packageList = Array.isArray(packages) ? packages : [packages];
  const command = `${packageManagers[packageManager].install} ${packageList.join(" ")}`;

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const shikiTheme =
          resolvedTheme === "dark" ? "github-dark" : "github-light";
        const highlighted = await codeToHtml(command, {
          lang: "bash",
          theme: shikiTheme,
        });
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlightedCode(`<pre>${command}</pre>`);
      }
    }

    loadHighlightedCode();
  }, [command, resolvedTheme]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className={cn("rounded-lg border bg-muted/50", className)}>
      {(title || description) && (
        <>
          <div className="space-y-2 p-4">
            {title && (
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="border-b" />
        </>
      )}

      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="inline-flex overflow-hidden rounded-lg border border-border bg-background p-1">
          {Object.keys(packageManagers).map((pm, index) => (
            <div key={pm} className="flex items-center">
              {index > 0 && (
                <div className="h-4 w-px bg-border" aria-hidden="true" />
              )}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "relative rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  packageManager === pm
                    ? "bg-muted text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setPackageManager(pm as PackageManager)}
              >
                {pm}
                {packageManager === pm && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-primary/10"
                    layoutId="activeTab"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
            title="Copy command"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>

      <div className="code-block">
        {highlightedCode ? (
          <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        ) : (
          <pre className="text-sm">{command}</pre>
        )}
      </div>
    </div>
  );
}

export { InstallCommand };
export type { InstallCommandProps };
