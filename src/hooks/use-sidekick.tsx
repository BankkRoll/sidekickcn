"use client";

import { isModelAllowed } from "@/components/ai-elements/model-selector";
import {
  getAvailableModels,
  registerGatewayModels,
} from "@/lib/ai-gateway-models";
import type {
  AIElementComponent,
  SidekickConfig,
  WorkflowDefinition,
} from "@/lib/sidekick-config";
import { gateway } from "ai";
import * as React from "react";
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; href: string }[];
  reasoning?: { content: string; duration: number };
  versions?: { id: string; content: string }[];
};

type SidekickContextValue = {
  config: SidekickConfig;
  messages: Message[];
  isLoading: boolean;
  sendPrompt: (
    prompt: string,
    options?: Partial<SidekickConfig>,
  ) => Promise<string>;
  triggerWorkflow: (workflowId: string, input: any) => Promise<any>;
  registerAIElement: (name: string, component: AIElementComponent) => void;
  registeredElements: Record<string, AIElementComponent>;
  workflows: WorkflowDefinition[];
  addWorkflow: (workflow: WorkflowDefinition) => void;
  clearMessages: () => void;
  addMessage: (message: Omit<Message, "id">) => void;
  discoverModels: () => Promise<void>;
  availableModels: () => any[];
};

const SidekickContext = React.createContext<SidekickContextValue | null>(null);

export function useSidekick() {
  const context = React.useContext(SidekickContext);
  if (!context) {
    throw new Error("useSidekick must be used within SidekickProvider");
  }
  return context;
}

export function createSidekickContext(
  config: SidekickConfig,
  workflows: WorkflowDefinition[],
): SidekickContextValue {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [registeredElements, setRegisteredElements] = React.useState<
    Record<string, AIElementComponent>
  >({});
  const [availableWorkflows, setAvailableWorkflows] =
    React.useState<WorkflowDefinition[]>(workflows);

  const sendPrompt = React.useCallback(
    async (
      prompt: string,
      options?: Partial<SidekickConfig>,
    ): Promise<string> => {
      setIsLoading(true);
      try {
        const modelToUse = options?.model || config.model;

        // Validate that the model is allowed according to config
        if (modelToUse && !isModelAllowed(modelToUse, config.modelConfig)) {
          throw new Error(
            `Model "${modelToUse}" is not allowed according to current configuration`,
          );
        }

        const response = await fetch(config.baseUrl || "/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt,
            model: modelToUse,
            temperature: options?.temperature || config.temperature,
            maxTokens: options?.maxTokens || config.maxTokens,
          }),
        });

        if (!response.ok) {
          throw new Error(`AI request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response || data.text || "No response received";
      } catch (error) {
        console.error("sidekick/cn sendPrompt error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [config],
  );

  const triggerWorkflow = React.useCallback(
    async (workflowId: string, input: any): Promise<any> => {
      const workflow = availableWorkflows.find((w) => w.id === workflowId);
      if (!workflow) {
        throw new Error(`Workflow "${workflowId}" not found`);
      }

      if (workflow.execute) {
        return await workflow.execute(input);
      }

      const prompt = `${workflow.systemPrompt || ""}\n\nInput: ${JSON.stringify(input)}`;
      return await sendPrompt(prompt);
    },
    [availableWorkflows, sendPrompt],
  );

  const registerAIElement = React.useCallback(
    (name: string, component: AIElementComponent) => {
      setRegisteredElements((prev) => ({ ...prev, [name]: component }));
    },
    [],
  );

  const addWorkflow = React.useCallback((workflow: WorkflowDefinition) => {
    setAvailableWorkflows((prev) => [...prev, workflow]);
  }, []);

  const clearMessages = React.useCallback(() => {
    setMessages([]);
  }, []);

  const addMessage = React.useCallback((message: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...message, id: Date.now().toString() }]);
  }, []);

  const discoverModels = React.useCallback(
    async (modelType?: "language" | "embedding"): Promise<void> => {
      try {
        const availableModels = await gateway.getAvailableModels();

        // Filter models by type if requested
        let models = availableModels.models;
        if (modelType) {
          models = models.filter((m: any) => m.modelType === modelType);
        }

        // Transform to our expected format
        const transformedModels = models.map((model: any) => ({
          id: model.id,
          name: model.name || model.id.split("/")[1] || model.id,
          provider: model.id.split("/")[0],
          description: model.description || "",
          contextWindow: model.contextWindow,
          capabilities: model.capabilities || [],
          modelType: model.modelType || "language",
          pricing: model.pricing,
        }));

        registerGatewayModels(transformedModels);
        console.log(
          `Discovered ${transformedModels.length} models from AI Gateway${modelType ? ` (${modelType})` : ""}`,
        );
      } catch (error) {
        // Silently fail - we'll use default models
        console.warn("Could not discover models from AI Gateway:", error);
      }
    },
    [],
  );

  const availableModels = React.useCallback(() => {
    return getAvailableModels();
  }, []);

  return {
    config,
    messages,
    isLoading,
    sendPrompt,
    triggerWorkflow,
    registerAIElement,
    registeredElements,
    workflows: availableWorkflows,
    addWorkflow,
    clearMessages,
    addMessage,
    discoverModels,
    availableModels,
  };
}

export { SidekickContext };
