"use client";

import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

export function AnimatedDemos() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Components Powering sidekick/cn
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Interactive components that power modern AI assistants
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MessageBranchingDemo />
        <SourcesDemo />
        <ReasoningDemo />
        <ModelSelectorDemo />
        <SuggestionsDemo />
        <PromptInputDemo />
      </div>
    </div>
  );
}

function MessageBranchingDemo() {
  const [version, setVersion] = useState(1);
  const versions = [
    "Why is the sky blue?",
    "Can you explain why the sky is blue?",
    "What makes the sky appear blue?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVersion((v) => (v >= 3 ? 1 : v + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border rounded-lg p-4 min-h-56">
      <h4 className="font-semibold mb-3 text-sm">Message Branching</h4>
      <div className="space-y-2">
        <div className="bg-muted p-3 rounded">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Version {version}/3
            </span>
          </div>
          <p className="text-sm">{versions[version - 1]}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          Navigate between message versions
        </p>
      </div>
    </div>
  );
}

function SourcesDemo() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpanded((e) => !e);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border rounded-lg p-4 min-h-56">
      <h4 className="font-semibold mb-3 text-sm">Sources</h4>
      <div className="space-y-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-2 border p-3 text-left rounded"
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <FileText className="h-4 w-4" />
          <span className="text-sm">3 Sources</span>
        </button>
        {expanded && (
          <div className="space-y-2 pl-4 mt-2">
            <div className="bg-muted p-2 rounded text-xs">
              <p className="font-medium">Wikipedia - Sky</p>
              <p className="text-muted-foreground">
                Light scattering explanation...
              </p>
            </div>
            <div className="bg-muted p-2 rounded text-xs">
              <p className="font-medium">NASA - Atmosphere</p>
              <p className="text-muted-foreground">
                Rayleigh scattering details...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReasoningDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    "Analyzing the question...",
    "Searching relevant sources...",
    "Synthesizing information...",
    "Generating response...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s >= 3 ? 0 : s + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border rounded-lg p-4 min-h-56">
      <h4 className="font-semibold mb-3 text-sm">Reasoning</h4>
      <div className="space-y-2">
        {steps.map((text, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            {i < step ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : i === step ? (
              <div className="h-4 w-4 rounded-full border-2 border-current animate-pulse" />
            ) : (
              <div className="h-4 w-4 rounded-full border" />
            )}
            <span
              className={
                i <= step ? "text-foreground" : "text-muted-foreground"
              }
            >
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelSelectorDemo() {
  const [model, setModel] = useState(0);
  const models = ["GPT-5 Mini", "Claude Opus 4.5", "Grok 4.1 Fast"];

  useEffect(() => {
    const interval = setInterval(() => {
      setModel((m) => (m >= 2 ? 0 : m + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border rounded-lg p-4 min-h-56">
      <h4 className="font-semibold mb-3 text-sm">Model Selector</h4>
      <Button variant="outline" className="w-full justify-between">
        <span>{models[model]}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">
        Switch between 16 AI models
      </p>
    </div>
  );
}

function SuggestionsDemo() {
  const [active, setActive] = useState(0);
  const suggestions = [
    "Summarize this",
    "Explain in detail",
    "Generate code",
    "Find errors",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a >= 3 ? 0 : a + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border rounded-lg p-4 min-h-56">
      <h4 className="font-semibold mb-3 text-sm">Suggestions</h4>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((text, i) => (
          <Button
            key={i}
            variant={i === active ? "default" : "outline"}
            size="sm"
            className="text-xs"
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
}

function PromptInputDemo() {
  const [text, setText] = useState("");
  const fullText = "Help me debug this code...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border rounded-lg p-4 min-h-56">
      <h4 className="font-semibold mb-3 text-sm">Prompt Input</h4>
      <div className="border bg-background p-3 rounded">
        <p className="text-sm">
          {text}
          <span className="animate-pulse">|</span>
        </p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Rich input with attachments & actions
      </p>
    </div>
  );
}
