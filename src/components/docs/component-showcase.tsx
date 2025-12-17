"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Code, Eye, Palette } from "lucide-react";
import { ReactNode } from "react";
import { CodeBlock } from "./code-block";

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  children: ReactNode;
  code?: string;
  language?: string;
  filename?: string;
  className?: string;
  showCode?: boolean;
  defaultTab?: "preview" | "code";
}

function ComponentShowcase({
  title,
  description,
  children,
  code,
  language = "tsx",
  filename,
  className,
  showCode = true,
  defaultTab = "preview",
}: ComponentShowcaseProps) {
  const hasCode = code || showCode;

  if (!hasCode) {
    return (
      <Card className={cn("", className)}>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            {children}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Palette className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="px-6 pb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="px-6 pb-6">
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/20">
              {children}
            </div>
          </TabsContent>

          <TabsContent value="code" className="px-6 pb-6">
            {code ? (
              <CodeBlock
                code={code}
                language={language}
                filename={filename}
                showLineNumbers={true}
              />
            ) : (
              <div className="flex items-center justify-center p-8 text-muted-foreground">
                No code provided
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Variant for multiple examples
interface ComponentExamplesProps {
  title: string;
  description?: string;
  examples: Array<{
    name: string;
    description?: string;
    component: ReactNode;
    code?: string;
    language?: string;
  }>;
  className?: string;
}

function ComponentExamples({
  title,
  description,
  examples,
  className,
}: ComponentExamplesProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>

      <div className="space-y-8">
        {examples.map((example, index) => (
          <div key={example.name} className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{example.name}</Badge>
              {example.description && (
                <span className="text-sm text-muted-foreground">
                  {example.description}
                </span>
              )}
            </div>

            <ComponentShowcase
              title=""
              children={example.component}
              code={example.code}
              language={example.language}
              showCode={!!example.code}
            />

            {index < examples.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}

export { ComponentExamples, ComponentShowcase };
