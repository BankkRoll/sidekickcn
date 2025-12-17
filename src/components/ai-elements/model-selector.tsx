"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  filterModels,
  getAvailableModels,
  getModelById,
  MODELS_BY_PROVIDER,
  PROVIDER_LABELS,
  type AIModel,
  type AIProvider,
} from "@/lib/ai-gateway-models";
import type { ModelConfig } from "@/lib/sidekick-config";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

// Helper function to resolve allowed models based on config
export function resolveAllowedModels(config?: ModelConfig): AIModel[] {
  const models = (config?.customModels as AIModel[]) || getAvailableModels();
  const allowedModels = config?.allowedModels;

  if (!allowedModels || allowedModels === "*") {
    // All models allowed
    return models;
  }

  if (allowedModels === "none") {
    // Only default model allowed
    const defaultModel = config?.defaultModel || "openai/gpt-4.1-mini";
    return models.filter((m) => m.id === defaultModel);
  }

  if (Array.isArray(allowedModels)) {
    // Specific list of models
    return models.filter((m) => allowedModels.includes(m.id));
  }

  // Fallback to all models
  return models;
}

// Helper function to check if a model is allowed
export function isModelAllowed(modelId: string, config?: ModelConfig): boolean {
  const allowedModels = resolveAllowedModels(config);
  return allowedModels.some((m) => m.id === modelId);
}

export type ModelOption = {
  id: string;
  name: string;
  provider: string;
};

type ModelSelectorContextValue = {
  selectedModel: string | null;
  onModelSelect: (modelId: string) => void;
  availableModels?: AIModel[];
  config?: ModelConfig;
};

const ModelSelectorContext =
  React.createContext<ModelSelectorContextValue | null>(null);

function useModelSelector() {
  const context = React.useContext(ModelSelectorContext);
  if (!context) {
    throw new Error("useModelSelector must be used within ModelSelector");
  }
  return context;
}

type ModelSelectorProps = {
  children: React.ReactNode;
  defaultModel?: string;
  onModelChange?: (modelId: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  config?: ModelConfig;
};

export function CompoundModelSelector({
  children,
  defaultModel,
  onModelChange,
  open,
  onOpenChange,
  config,
}: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = React.useState<string | null>(
    defaultModel || config?.defaultModel || null,
  );

  const handleModelSelect = React.useCallback(
    (modelId: string) => {
      setSelectedModel(modelId);
      onModelChange?.(modelId);
    },
    [onModelChange],
  );

  const availableModels = React.useMemo(
    () => resolveAllowedModels(config),
    [config],
  );

  const shouldHide = config?.hideIfSingleModel && availableModels.length === 1;

  if (shouldHide) {
    return null;
  }

  return (
    <ModelSelectorContext.Provider
      value={{
        selectedModel,
        onModelSelect: handleModelSelect,
        availableModels,
        config,
      }}
    >
      <Popover open={open} onOpenChange={onOpenChange}>
        {children}
      </Popover>
    </ModelSelectorContext.Provider>
  );
}

export const ModelSelectorTrigger = PopoverTrigger;

type ModelSelectorContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function ModelSelectorContent({
  children,
  className,
}: ModelSelectorContentProps) {
  return (
    <PopoverContent
      className={cn("w-full max-w-sm sm:w-80 p-0", className)}
      align="start"
    >
      {children}
    </PopoverContent>
  );
}

type ModelSelectorInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function ModelSelectorInput({
  placeholder = "Search models...",
  value,
  onChange,
}: ModelSelectorInputProps) {
  return (
    <div className="border-b p-2">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-8"
      />
    </div>
  );
}

type ModelSelectorListProps = {
  children: React.ReactNode;
};

export function ModelSelectorList({ children }: ModelSelectorListProps) {
  return <div className="max-h-[300px] overflow-y-auto p-1">{children}</div>;
}

type ModelSelectorGroupProps = {
  label: string;
  children: React.ReactNode;
};

export function ModelSelectorGroup({
  label,
  children,
}: ModelSelectorGroupProps) {
  return (
    <div className="py-1">
      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

type ModelSelectorItemProps = {
  model: ModelOption;
  children?: React.ReactNode;
};

export function ModelSelectorItem({ model, children }: ModelSelectorItemProps) {
  const { selectedModel, onModelSelect } = useModelSelector();

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted",
        selectedModel === model.id && "bg-muted",
      )}
      onClick={() => onModelSelect(model.id)}
    >
      {children}
      {selectedModel === model.id && (
        <CheckIcon className="ml-auto h-4 w-4 shrink-0" />
      )}
    </button>
  );
}

type ModelSelectorLogoGroupProps = {
  children: React.ReactNode;
};

export function ModelSelectorLogoGroup({
  children,
}: ModelSelectorLogoGroupProps) {
  return <div className="flex items-center gap-2">{children}</div>;
}

type ModelSelectorLogoProps = {
  src?: string;
  alt: string;
};

export function ModelSelectorLogo({ src, alt }: ModelSelectorLogoProps) {
  if (!src) return null;

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      className="h-5 w-5 rounded object-cover"
    />
  );
}

type ModelSelectorNameProps = {
  children: React.ReactNode;
};

export function ModelSelectorName({ children }: ModelSelectorNameProps) {
  return <span className="flex-1 truncate text-left">{children}</span>;
}

export function ModelSelectorEmpty() {
  return (
    <div className="py-6 text-center text-sm text-muted-foreground">
      No models found
    </div>
  );
}

type EnhancedModelSelectorProps = {
  selectedModel?: string;
  onModelChange?: (modelId: string) => void;
  config?: ModelConfig;
  className?: string;
};

export function ModelSelector({
  selectedModel,
  onModelChange,
  config,
  className,
}: EnhancedModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const availableModels = React.useMemo(() => {
    const models = resolveAllowedModels(config);
    return search ? filterModels(models, search) : models;
  }, [config, search]);

  const currentModel = getModelById(
    selectedModel || config?.defaultModel || "openai/gpt-4.1-mini",
  );

  if (config?.hideIfSingleModel && availableModels.length === 1) {
    return null;
  }

  const groupedModels = config?.groupByProvider
    ? Object.entries(MODELS_BY_PROVIDER).reduce(
        (acc, [provider, models]) => {
          const filtered = models.filter((m) => availableModels.includes(m));
          if (filtered.length > 0) {
            acc[provider as AIProvider] = filtered;
          }
          return acc;
        },
        {} as Record<AIProvider, AIModel[]>,
      )
    : { all: availableModels };

  return (
    <CompoundModelSelector
      defaultModel={selectedModel}
      onModelChange={onModelChange}
      open={open}
      onOpenChange={setOpen}
      config={config}
    >
      <ModelSelectorTrigger asChild>
        <Button
          variant="outline"
          className={cn("justify-between gap-2", className)}
        >
          <span className="flex items-center gap-2">
            {currentModel?.logo && (
              <img
                src={currentModel.logo || "/placeholder.svg"}
                alt={currentModel.provider}
                className="h-4 w-4"
              />
            )}
            <span>{currentModel?.name || "Select Model"}</span>
          </span>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput
          placeholder="Search models..."
          value={search}
          onChange={setSearch}
        />
        <ModelSelectorList>
          {Object.entries(groupedModels).map(([provider, models]) => (
            <ModelSelectorGroup
              key={provider}
              label={
                config?.groupByProvider
                  ? PROVIDER_LABELS[provider as AIProvider]
                  : "Models"
              }
            >
              {models.map((model: AIModel) => (
                <ModelSelectorItem key={model.id} model={model}>
                  <ModelSelectorLogoGroup>
                    {model.logo && (
                      <ModelSelectorLogo
                        src={model.logo}
                        alt={model.provider}
                      />
                    )}
                    <div className="flex flex-1 flex-col items-start gap-0.5">
                      <ModelSelectorName>{model.name}</ModelSelectorName>
                      <span className="text-xs text-muted-foreground">
                        {model.description}
                      </span>
                      <div className="flex gap-1">
                        {model.capabilities?.map((cap) => (
                          <Badge
                            key={cap}
                            variant="secondary"
                            className="h-4 text-[10px]"
                          >
                            {cap}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </ModelSelectorLogoGroup>
                </ModelSelectorItem>
              ))}
            </ModelSelectorGroup>
          ))}
          {availableModels.length === 0 && <ModelSelectorEmpty />}
        </ModelSelectorList>
      </ModelSelectorContent>
    </CompoundModelSelector>
  );
}
