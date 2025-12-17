"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import {
  type SidekickConfig,
  DEFAULT_SIDEKICK_CONFIG,
  mergeConfigs,
  SIDEKICK_PRESETS,
} from "@/lib/sidekick-config";
import { AI_GATEWAY_MODELS } from "@/lib/ai-gateway-models";

type ConfigBuilderProps = {
  config: SidekickConfig;
  onChange: (config: SidekickConfig) => void;
};

export function SidekickConfigBuilder({
  config,
  onChange,
}: ConfigBuilderProps) {
  const updateConfig = (updates: Partial<SidekickConfig>) => {
    onChange(mergeConfigs(config, updates));
  };

  const loadPreset = (presetName: keyof typeof SIDEKICK_PRESETS) => {
    onChange(
      mergeConfigs(DEFAULT_SIDEKICK_CONFIG, SIDEKICK_PRESETS[presetName]),
    );
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sidekick-config.json";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Presets</CardTitle>
          <CardDescription>
            Start with a preset and customize from there
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => loadPreset("minimal")}>
            Minimal
          </Button>
          <Button variant="outline" onClick={() => loadPreset("standard")}>
            Standard
          </Button>
          <Button variant="outline" onClick={() => loadPreset("advanced")}>
            Advanced
          </Button>
          <Button variant="outline" onClick={() => loadPreset("secure")}>
            Secure
          </Button>
          <Button
            variant="outline"
            onClick={() => loadPreset("codingAssistant")}
          >
            Coding Assistant
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="ui">UI</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Model</Label>
                <Select
                  value={config.modelConfig?.defaultModel}
                  onValueChange={(value) =>
                    updateConfig({
                      modelConfig: {
                        ...config.modelConfig,
                        defaultModel: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_GATEWAY_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name} ({model.provider})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Allow Model Change</Label>
                <Switch
                  checked={config.modelConfig?.allowModelChange}
                  onCheckedChange={(checked) =>
                    updateConfig({
                      modelConfig: {
                        ...config.modelConfig,
                        allowModelChange: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Group by Provider</Label>
                <Switch
                  checked={config.modelConfig?.groupByProvider}
                  onCheckedChange={(checked) =>
                    updateConfig({
                      modelConfig: {
                        ...config.modelConfig,
                        groupByProvider: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Hide if Single Model</Label>
                <Switch
                  checked={config.modelConfig?.hideIfSingleModel}
                  onCheckedChange={(checked) =>
                    updateConfig({
                      modelConfig: {
                        ...config.modelConfig,
                        hideIfSingleModel: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Temperature: {config.temperature}</Label>
                <Slider
                  value={[config.temperature || 0.7]}
                  onValueChange={([value]) =>
                    updateConfig({ temperature: value })
                  }
                  min={0}
                  max={2}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <Label>Max Tokens</Label>
                <Input
                  type="number"
                  value={config.maxTokens}
                  onChange={(e) =>
                    updateConfig({ maxTokens: Number.parseInt(e.target.value) })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Features Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Message Branching</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable message version history
                    </p>
                  </div>
                  <Switch
                    checked={config.featuresConfig?.enableBranching}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        featuresConfig: {
                          ...config.featuresConfig,
                          enableBranching: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Sources</Label>
                    <p className="text-sm text-muted-foreground">
                      Display citations and references
                    </p>
                  </div>
                  <Switch
                    checked={config.featuresConfig?.showSources}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        featuresConfig: {
                          ...config.featuresConfig,
                          showSources: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Reasoning</Label>
                    <p className="text-sm text-muted-foreground">
                      Display AI reasoning traces
                    </p>
                  </div>
                  <Switch
                    checked={config.featuresConfig?.showReasoning}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        featuresConfig: {
                          ...config.featuresConfig,
                          showReasoning: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Suggestions</Label>
                    <p className="text-sm text-muted-foreground">
                      Show quick prompt suggestions
                    </p>
                  </div>
                  <Switch
                    checked={config.featuresConfig?.enableSuggestions}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        featuresConfig: {
                          ...config.featuresConfig,
                          enableSuggestions: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Workflows</Label>
                    <p className="text-sm text-muted-foreground">
                      Show workflow system
                    </p>
                  </div>
                  <Switch
                    checked={config.featuresConfig?.enableWorkflows}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        featuresConfig: {
                          ...config.featuresConfig,
                          enableWorkflows: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Attachments</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow file uploads
                    </p>
                  </div>
                  <Switch
                    checked={config.featuresConfig?.enableAttachments}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        featuresConfig: {
                          ...config.featuresConfig,
                          enableAttachments: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Tools</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to use tools
                    </p>
                  </div>
                  <Switch
                    checked={config.featuresConfig?.enableTools}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        featuresConfig: {
                          ...config.featuresConfig,
                          enableTools: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UI Tab */}
        <TabsContent value="ui" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>UI Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Show Timestamps</Label>
                  <Switch
                    checked={config.uiConfig?.showTimestamps}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        uiConfig: {
                          ...config.uiConfig,
                          showTimestamps: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show Model Name</Label>
                  <Switch
                    checked={config.uiConfig?.showModelName}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        uiConfig: {
                          ...config.uiConfig,
                          showModelName: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Enable Animations</Label>
                  <Switch
                    checked={config.uiConfig?.enableAnimations}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        uiConfig: {
                          ...config.uiConfig,
                          enableAnimations: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Enable Shimmer Loading</Label>
                  <Switch
                    checked={config.uiConfig?.enableShimmer}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        uiConfig: {
                          ...config.uiConfig,
                          enableShimmer: checked,
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Compact Mode</Label>
                  <Switch
                    checked={config.uiConfig?.compactMode}
                    onCheckedChange={(checked) =>
                      updateConfig({
                        uiConfig: { ...config.uiConfig, compactMode: checked },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Message Animation</Label>
                  <Select
                    value={config.uiConfig?.messageAnimation}
                    onValueChange={(value: "fade" | "slide" | "none") =>
                      updateConfig({
                        uiConfig: {
                          ...config.uiConfig,
                          messageAnimation: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="fade">Fade</SelectItem>
                      <SelectItem value="slide">Slide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Max Message Length</Label>
                <Input
                  type="number"
                  value={config.securityConfig?.maxMessageLength}
                  onChange={(e) =>
                    updateConfig({
                      securityConfig: {
                        ...config.securityConfig,
                        maxMessageLength: Number.parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Rate Limit (messages/minute)</Label>
                <Input
                  type="number"
                  value={config.securityConfig?.rateLimitPerMinute}
                  onChange={(e) =>
                    updateConfig({
                      securityConfig: {
                        ...config.securityConfig,
                        rateLimitPerMinute: Number.parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Content Filter</Label>
                <Switch
                  checked={config.securityConfig?.enableContentFilter}
                  onCheckedChange={(checked) =>
                    updateConfig({
                      securityConfig: {
                        ...config.securityConfig,
                        enableContentFilter: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable PII Protection</Label>
                <Switch
                  checked={config.securityConfig?.enablePIIProtection}
                  onCheckedChange={(checked) =>
                    updateConfig({
                      securityConfig: {
                        ...config.securityConfig,
                        enablePIIProtection: checked,
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={config.securityConfig?.maxFileSizeMB}
                  onChange={(e) =>
                    updateConfig({
                      securityConfig: {
                        ...config.securityConfig,
                        maxFileSizeMB: Number.parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export Tab */}
        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Configuration</CardTitle>
              <CardDescription>
                Copy or download your configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={copyConfig} className="gap-2">
                  <Copy className="h-4 w-4" />
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={exportConfig}
                  variant="outline"
                  className="gap-2 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                  Download JSON
                </Button>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <pre className="overflow-x-auto text-xs">
                  {JSON.stringify(config, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
