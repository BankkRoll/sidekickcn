import { ApiComponent } from "@/components/docs/code-preview";
import { baseNextJsProject } from "./base-project";

// Complete v0 Clone - UI Generator + Editor
// Based on the mental model: Prompt → Generate UI → Inspect → Edit → Regenerate → Export
export const v0CloneExample: ApiComponent = {
  name: "v0 Clone - UI Generator",
  version: "1.0.0",
  files: [
    ...baseNextJsProject.files,

    // Environment variables
    {
      path: ".env.local",
      content: `# AI SDK Gateway API Key
AI_GATEWAY_API_KEY=your_gateway_api_key_here

# OpenAI API Key (fallback)
OPENAI_API_KEY=your_openai_api_key_here`,
    },

    // Core v0 Types and Context
    {
      path: "src/lib/v0-types.ts",
      content: `export interface V0Project {
  id: string;
  name: string;
  framework: 'nextjs' | 'react' | 'remix';
  components: V0Component[];
  history: V0Generation[];
  currentGeneration?: V0Generation;
}

export interface V0Component {
  id: string;
  name: string;
  code: string;
  preview: string;
  props?: Record<string, any>;
  dependencies?: string[];
}

export interface V0Generation {
  id: string;
  timestamp: Date;
  prompt: string;
  components: V0Component[];
  code: string;
  preview: string;
}

export interface V0CanvasState {
  splitRatio: number; // 0-1, percentage of preview width
  showPreview: boolean;
  showCode: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface V0ContextValue {
  project: V0Project;
  canvasState: V0CanvasState;
  isGenerating: boolean;

  // Actions
  updateProject: (updates: Partial<V0Project>) => void;
  updateCanvasState: (updates: Partial<V0CanvasState>) => void;
  generateUI: (prompt: string) => Promise<void>;
  exportCode: (format: 'copy' | 'download' | 'stackblitz') => void;
  loadGeneration: (generationId: string) => void;
  addToHistory: (generation: V0Generation) => void;
}`,
    },

    // v0 Context and Provider
    {
      path: "src/lib/v0-context.tsx",
      content: `"use client";

import * as React from 'react';
import { V0ContextValue, V0Project, V0CanvasState, V0Generation } from './v0-types';

const V0Context = React.createContext<V0ContextValue | null>(null);

export function useV0(): V0ContextValue {
  const context = React.useContext(V0Context);
  if (!context) {
    throw new Error('useV0 must be used within V0Provider');
  }
  return context;
}

interface V0ProviderProps {
  children: React.ReactNode;
  initialProject?: Partial<V0Project>;
}

export function V0Provider({ children, initialProject }: V0ProviderProps) {
  const [project, setProject] = React.useState<V0Project>({
    id: 'default',
    name: 'My V0 Project',
    framework: 'nextjs',
    components: [],
    history: [],
    ...initialProject,
  });

  const [canvasState, setCanvasState] = React.useState<V0CanvasState>({
    splitRatio: 0.5,
    showPreview: true,
    showCode: true,
    theme: 'system',
  });

  const [isGenerating, setIsGenerating] = React.useState(false);

  const updateProject = React.useCallback((updates: Partial<V0Project>) => {
    setProject(prev => ({ ...prev, ...updates }));
  }, []);

  const updateCanvasState = React.useCallback((updates: Partial<V0CanvasState>) => {
    setCanvasState(prev => ({ ...prev, ...updates }));
  }, []);

  const generateUI = React.useCallback(async (prompt: string) => {
    setIsGenerating(true);
    try {
      // This will be implemented with actual AI SDK integration
      console.log('Generating UI for prompt:', prompt);

      // Simulate generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockGeneration: V0Generation = {
        id: Date.now().toString(),
        timestamp: new Date(),
        prompt,
        components: [
          {
            id: '1',
            name: 'GeneratedComponent',
            code: \`export function GeneratedComponent() {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-2">\${description}</h2>
      <p className="text-gray-600">Generated component</p>
    </div>
  );
}\`,
            preview: '<div>Preview content</div>',
          }
        ],
        code: \`// Generated code from prompt: \${prompt}\`,
        preview: '<div>Generated preview</div>',
      };

      updateProject({
        currentGeneration: mockGeneration,
        components: mockGeneration.components,
      });

      // Add to history
      setProject(prev => ({
        ...prev,
        history: [mockGeneration, ...prev.history],
      }));

    } finally {
      setIsGenerating(false);
    }
  }, [updateProject]);

  const exportCode = React.useCallback((format: 'copy' | 'download' | 'stackblitz') => {
    const code = project.currentGeneration?.code || '// No code generated yet';
    console.log(\`Exporting code as \${format}:\`, code);

    switch (format) {
      case 'copy':
        navigator.clipboard.writeText(code);
        break;
      case 'download':
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-component.tsx';
        a.click();
        URL.revokeObjectURL(url);
        break;
      case 'stackblitz':
        // In a real implementation, this would open StackBlitz with the code
        console.log('Opening in StackBlitz...');
        break;
    }
  }, [project.currentGeneration?.code]);

  const loadGeneration = React.useCallback((generationId: string) => {
    const generation = project.history.find(g => g.id === generationId);
    if (generation) {
      updateProject({ currentGeneration: generation, components: generation.components });
    }
  }, [project.history, updateProject]);

  const addToHistory = React.useCallback((generation: V0Generation) => {
    setProject(prev => ({
      ...prev,
      history: [generation, ...prev.history],
    }));
  }, []);

  const contextValue: V0ContextValue = {
    project,
    canvasState,
    isGenerating,
    updateProject,
    updateCanvasState,
    generateUI,
    exportCode,
    loadGeneration,
    addToHistory,
  };

  return (
    <V0Context.Provider value={contextValue}>
      {children}
    </V0Context.Provider>
  );
}`,
    },

    // Top Bar Component
    {
      path: "src/components/v0/v0-top-bar.tsx",
      content: `"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Copy,
  RefreshCw,
  ExternalLink,
  Moon,
  Sun,
  Monitor,
  Settings,
} from 'lucide-react';
import { useV0 } from '@/lib/v0-context';
import { cn } from '@/lib/utils';

export function V0TopBar() {
  const { project, canvasState, updateProject, updateCanvasState, exportCode, isGenerating, generateUI } = useV0();

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    updateCanvasState({ theme });
  };

  const handleRegenerate = () => {
    if (project.currentGeneration) {
      generateUI(project.currentGeneration.prompt);
    }
  };

  return (
    <div className="flex h-14 items-center justify-between border-b bg-background px-4">
      {/* Left: Project Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{project.name}</h1>
          <Badge variant="secondary" className="capitalize">
            {project.framework}
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <Select
          value={project.framework}
          onValueChange={(framework: any) => updateProject({ framework })}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nextjs">Next.js</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="remix">Remix</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Center: Status */}
      <div className="flex items-center gap-2">
        {isGenerating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generating UI...
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <div className="flex items-center border rounded-md">
          <Button
            variant={canvasState.theme === 'light' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => handleThemeChange('light')}
            className="rounded-r-none"
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant={canvasState.theme === 'dark' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => handleThemeChange('dark')}
            className="rounded-none border-x"
          >
            <Moon className="h-4 w-4" />
          </Button>
          <Button
            variant={canvasState.theme === 'system' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => handleThemeChange('system')}
            className="rounded-l-none"
          >
            <Monitor className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Regenerate */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={!project.currentGeneration || isGenerating}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>

        {/* Export Options */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCode('copy')}
            disabled={!project.currentGeneration}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCode('download')}
            disabled={!project.currentGeneration}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCode('stackblitz')}
            disabled={!project.currentGeneration}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            StackBlitz
          </Button>
        </div>

        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}`,
    },

    // Left Sidebar Component
    {
      path: "src/components/v0/v0-left-sidebar.tsx",
      content: `"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Clock, History, Code, Eye } from 'lucide-react';
import { useV0 } from '@/lib/v0-context';
import { cn } from '@/lib/utils';
import {
  PromptInput,
  PromptInputHeader,
  PromptInputBody,
  PromptInputFooter,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements';

export function V0LeftSidebar() {
  const { project, generateUI, loadGeneration, isGenerating } = useV0();
  const [activeTab, setActiveTab] = React.useState<'prompt' | 'history'>('prompt');

  const handleSubmit = async ({ text }: { text: string }) => {
    if (text.trim()) {
      await generateUI(text.trim());
    }
  };

  return (
    <div className="w-80 border-r bg-background flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <Button
          variant={activeTab === 'prompt' ? 'secondary' : 'ghost'}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActiveTab('prompt')}
        >
          <Code className="h-4 w-4 mr-2" />
          Generate
        </Button>
        <Button
          variant={activeTab === 'history' ? 'secondary' : 'ghost'}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActiveTab('history')}
        >
          <History className="h-4 w-4 mr-2" />
          History ({project.history.length})
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'prompt' && (
          <div className="p-4">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputHeader>
                <h3 className="text-sm font-medium">Describe your UI</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Be specific about layout, components, and styling
                </p>
              </PromptInputHeader>
              <PromptInputBody>
                <PromptInputTextarea
                  placeholder="A modern landing page with hero section, features grid, and CTA button..."
                  disabled={isGenerating}
                  className="min-h-[120px]"
                />
              </PromptInputBody>
              <PromptInputFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="text-xs text-muted-foreground">
                    {project.components.length} components
                  </div>
                  <PromptInputSubmit disabled={isGenerating} />
                </div>
              </PromptInputFooter>
            </PromptInput>
          </div>
        )}

        {activeTab === 'history' && (
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {project.history.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No generations yet</p>
                  <p className="text-xs">Create your first UI above</p>
                </div>
              ) : (
                project.history.map((generation) => (
                  <div
                    key={generation.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                      project.currentGeneration?.id === generation.id && "border-primary bg-primary/5"
                    )}
                    onClick={() => loadGeneration(generation.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {generation.prompt}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {generation.components.length} components
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {generation.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          loadGeneration(generation.id);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}`,
    },

    // Main Canvas Component
    {
      path: "src/components/v0/v0-main-canvas.tsx",
      content: `"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Code, EyeOff, Code2 } from 'lucide-react';
import { useV0 } from '@/lib/v0-context';
import { cn } from '@/lib/utils';

export function V0MainCanvas() {
  const { project, canvasState, updateCanvasState } = useV0();
  const [activeTab, setActiveTab] = React.useState<'preview' | 'code'>('preview');

  const togglePreview = () => {
    updateCanvasState({ showPreview: !canvasState.showPreview });
  };

  const toggleCode = () => {
    updateCanvasState({ showCode: !canvasState.showCode });
  };

  // If neither is shown, show preview by default
  React.useEffect(() => {
    if (!canvasState.showPreview && !canvasState.showCode) {
      updateCanvasState({ showPreview: true });
    }
  }, [canvasState.showPreview, canvasState.showCode, updateCanvasState]);

  const renderPreview = () => {
    if (!canvasState.showPreview) return null;

    return (
      <div className="h-full bg-white border rounded-lg overflow-hidden">
        <div className="h-full flex items-center justify-center bg-gray-50">
          <div className="max-w-4xl w-full h-full p-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold mb-4">Generated UI Preview</h2>
              <div className="space-y-4">
                {project.components.map((component) => (
                  <div key={component.id} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{component.name}</h3>
                    <div
                      className="bg-gray-50 rounded p-3 text-sm font-mono"
                      dangerouslySetInnerHTML={{ __html: component.preview }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCode = () => {
    if (!canvasState.showCode) return null;

    return (
      <div className="h-full bg-gray-900 text-gray-100 overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
          <div className="border-b bg-gray-800 px-4">
            <TabsList className="bg-transparent border-0 h-10">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                <Code2 className="h-4 w-4 mr-2" />
                Code
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="m-0 h-full">
            {renderPreview()}
          </TabsContent>

          <TabsContent value="code" className="m-0 h-full">
            <div className="h-full overflow-auto">
              {project.currentGeneration ? (
                <pre className="p-4 text-sm leading-relaxed">
                  <code>{project.currentGeneration.code}</code>
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No Code Generated</h3>
                    <p className="text-sm">
                      Generate a UI to see the code here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  // Single panel view
  if (!canvasState.showPreview || !canvasState.showCode) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Controls */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-2">
            <Button
              variant={canvasState.showPreview ? "secondary" : "outline"}
              size="sm"
              onClick={togglePreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant={canvasState.showCode ? "secondary" : "outline"}
              size="sm"
              onClick={toggleCode}
            >
              <Code className="h-4 w-4 mr-2" />
              Code
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {canvasState.showPreview ? renderPreview() : renderCode()}
        </div>
      </div>
    );
  }

  // Split view
  return (
    <div className="flex-1">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          maxSize={70}
          className="min-w-0"
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-2 border-b bg-background">
              <h3 className="text-sm font-medium">Live Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePreview}
              >
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              {renderPreview()}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-2 border-b bg-background">
              <h3 className="text-sm font-medium">Generated Code</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCode}
              >
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 bg-gray-900 text-gray-100 overflow-hidden">
              <div className="h-full overflow-auto">
                {project.currentGeneration ? (
                  <pre className="p-4 text-sm leading-relaxed">
                    <code>{project.currentGeneration.code}</code>
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">No Code Generated</h3>
                      <p className="text-sm">
                        Generate a UI to see the code here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}`,
    },

    // Main V0 App Component
    {
      path: "src/components/v0/v0-app.tsx",
      content: `"use client";

import * as React from 'react';
import { V0Provider } from '@/lib/v0-context';
import { V0TopBar } from './v0-top-bar';
import { V0LeftSidebar } from './v0-left-sidebar';
import { V0MainCanvas } from './v0-main-canvas';
import { cn } from '@/lib/utils';

interface V0AppProps {
  className?: string;
}

export function V0App({ className }: V0AppProps) {
  return (
    <V0Provider>
      <div className={cn("h-screen flex flex-col bg-background", className)}>
        {/* Top Bar */}
        <V0TopBar />

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <V0LeftSidebar />

          {/* Main Canvas */}
          <V0MainCanvas />
        </div>
      </div>
    </V0Provider>
  );
}`,
    },

    // AI SDK Integration - UI Generation Tools
    {
      path: "src/lib/v0-ai-tools.ts",
      content: `import { tool } from 'ai';
import { z } from 'zod';

// UI Generation Tools for v0
export const uiGenerationTools = {
  // Component generation tool
  generateComponent: tool({
    description: 'Generate a React component based on description',
    inputSchema: z.object({
      description: z.string().describe('Description of the component to generate'),
      framework: z.enum(['nextjs', 'react']).describe('Target framework'),
      styling: z.enum(['tailwind', 'styled-components', 'css-modules']).describe('Styling approach'),
    }),
    execute: async ({ description, framework, styling }) => {
      // In a real implementation, this would use AI to generate the component
      const componentName = description.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('');

      let code = '';

      switch (styling) {
        case 'tailwind':
          code = \`export function \${componentName}() {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-2">\${description}</h2>
      <p className="text-gray-600">Generated component</p>
    </div>
  );
}\`;
          break;

        case 'styled-components':
          code = \`import styled from 'styled-components';

const Container = styled.div\`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
\`;

export function \${componentName}() {
  return (
    <Container>
      <h2>\${description}</h2>
      <p>Generated component</p>
    </Container>
  );
}\`;
          break;

        case 'css-modules':
          code = \`import styles from './\${componentName}.module.css';

export function \${componentName}() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>\${description}</h2>
      <p className={styles.description}>Generated component</p>
    </div>
  );
}\`;
          break;
      }

      return {
        name: componentName,
        code,
        framework,
        styling,
        preview: \`<div>\${description} - Generated Component</div>\`,
      };
    },
  }),

  // Layout generation tool
  generateLayout: tool({
    description: 'Generate a layout structure for the UI',
    inputSchema: z.object({
      layout: z.string().describe('Layout description (e.g., "hero section with navbar")'),
      responsive: z.boolean().describe('Whether to make it responsive'),
      sections: z.array(z.string()).describe('List of sections to include'),
    }),
    execute: async ({ layout, responsive, sections }) => {
      // Generate layout code based on description
      let code = \`export function Layout() {
  return (
    <div className="min-h-screen \${responsive ? 'flex flex-col' : ''}">\`;

      sections.forEach(section => {
        code += \`
      <section className="p-4 border-b">
        <h2 className="text-lg font-semibold">\${section}</h2>
        <p>Content for \${section}</p>
      </section>\`;
      });

      code += \`
    </div>
  );
}\`;

      return {
        layout,
        responsive,
        sections,
        code,
        preview: \`<div>Layout with \${sections.length} sections</div>\`,
      };
    },
  }),

  // Styling optimization tool
  optimizeStyling: tool({
    description: 'Optimize and improve component styling',
    inputSchema: z.object({
      component: z.string().describe('Component code to optimize'),
      improvements: z.array(z.string()).describe('Specific improvements to make'),
    }),
    execute: async ({ component, improvements }) => {
      // In a real implementation, this would analyze and optimize the styling
      let optimizedCode = component;

      // Simple optimizations
      if (improvements.includes('accessibility')) {
        optimizedCode = optimizedCode.replace(
          /<button/g,
          '<button aria-label="Button"'
        );
      }

      if (improvements.includes('performance')) {
        optimizedCode = optimizedCode.replace(
          /className="/g,
          'className="will-change-auto '
        );
      }

      return {
        originalCode: component,
        optimizedCode,
        improvements,
        changes: 'Applied accessibility and performance optimizations',
      };
    },
  }),
};

// Main UI generation function
export async function generateUIFromPrompt(prompt: string, framework: string = 'nextjs') {
  // This would integrate with the AI SDK to generate UI
  // For now, return mock data

  const components = [
    {
      id: '1',
      name: 'HeroSection',
      code: \`export function HeroSection() {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Generated from: \${prompt}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          This component was generated using AI
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
}\`,
      preview: '<section>Hero Section Preview</section>',
    }
  ];

  const fullCode = components.map(c => c.code).join('\\n\\n');

  return {
    components,
    code: fullCode,
    prompt,
    timestamp: new Date(),
  };
}`,
    },

    // AI SDK API Route - V0 System Prompt
    {
      path: "src/app/api/v0/route.ts",
      content: `import { streamText, convertToModelMessages, UIMessage, tool, stepCountIs } from 'ai';
import { uiGenerationTools, generateUIFromPrompt } from '@/lib/v0-ai-tools';
import { z } from 'zod';

export async function POST(request: Request) {
  const { messages, prompt, framework = 'nextjs' }: {
    messages?: UIMessage[];
    prompt?: string;
    framework?: string;
  } = await request.json();

  if (prompt) {
    // Direct UI generation from prompt
    try {
      const result = await generateUIFromPrompt(prompt, framework);
      return Response.json(result);
    } catch (error) {
      console.error('UI Generation Error:', error);
      return Response.json(
        { error: 'Failed to generate UI' },
        { status: 500 }
      );
    }
  }

  if (messages) {
    // Conversational UI generation with full V0 system prompt
    const result = streamText({
      model: "anthropic/claude-sonnet-4.5",
      system: \`You are v0, Vercel's highly skilled AI-powered assistant that always follows best practices.

====

## CodeProject

Description: Use the Code Project block to group files and render React and full-stack Next.js apps . You MUST group React Component code blocks inside of a Code Project.

Usage:

#### Write To File

- You must use the \\\`\\\`\\\`lang file="path/to/file" syntax to write to a file in the Code Project. This can be used both for creating or editing files.
- You prefer kebab-case for file names, ex: \\\`login-form.tsx\\\`.
- Only write to files that are relevant to the user's request. You do not need to write every file each time.
- Editing files
  - The user can see the entire file, so they prefer to only read the updates to the code.
  - Often this will mean that the start/end of the file will be skipped, but that's okay! Rewrite the entire file only if specifically requested.
  - Indicate the parts to keep using the \\\`// ... existing code ...\\\` comment, AKA my ability to quickly edit.
  - You do not modify my ability to quickly edit, it must always match \\\`// ... existing code ...\\\`.
  - The system will merge together the original code block with the specified edits.
  - Only write to the files that need to be edited.
  - You should only write the parts of the file that need to be changed. The more you write duplicate code, the longer the user has to wait.
  - Include the Change Comment ("<CHANGE>") in the code about what you are editing, especially if it is not obvious.
    - For example : // <CHANGE> removing the header
    - Keep it brief and to the point, no need for long explanations.
Additional Required Attributes:
- taskNameActive: 2-5 words describing the code changes when they are happening. Will be shown in the UI.
- taskNameComplete: 2-5 words describing the code changes when they are complete. Will be shown in the UI.

For example:

Prompt: Add a login page to my sports website

*Launches Search Repo to read the files first*

Added login page

Prompt: Edit the blog posts page to make the header blue and footer red

*Launches Search Repo to read the files first*

Edited blog posts page

Prompt: Edit the blog posts page to make the header blue and footer red

*Launches Search Repo to read the files first*

Read page.tsx

Thought for 3s

I understand - you want the complete, unabridged system prompt with absolutely no omissions. Here it is in full:

IMPORTANT:

- You may only write/edit a file after trying to read it first. This way, you can ensure you are not overwriting any important code.
- If you do not read the file first, you risk breaking the user's code. ALWAYS use Search Repo to read the files first.
- Write a postamble (explaining your code or summarizing your changes) of 2-4 sentences. You NEVER write more than a paragraph unless explicitly asked to.

====

# Coding Guidelines

- Unless you can infer otherwise from the conversation or other context, default to the Next.js App Router; other frameworks may not work in the v0 preview.
- Only create one Code Project per response, and it MUST include all the necessary React Components or edits (see below) in that project.
- Set crossOrigin to "anonymous" for \\\`new Image()\\\` when rendering images on \\\`\\\`<canvas>\\\`\\\` to avoid CORS issues.
- When the JSX content contains characters like \\\`\\\`< >\\\`\\\`    \\\`, you always put them in a string to escape them properly:

- DON'T write: \\\`\\\`<div>\\\`1 + 1 \\\`\\\`< 3\\\`\\\`</div>\\\`
- DO write: \\\`\\\`<div>\\\`\\\`'1 + 1 < 3'\\\`\\\`</div>\\\`

- All Code Projects come with a default set of files and folders. Therefore, you never generate these unless explicitly requested by the user:

- app/layout.tsx
- components/ui/* (including accordion, alert, avatar, button, card, dropdown-menu, etc.)
- hooks/use-mobile.tsx
- hooks/use-mobile.ts
- hooks/use-toast.ts
- lib/utils.ts (includes cn function to conditionally join class names)
- app/globals.css (default shadcn styles with Tailwind CSS v4 configuration)
- next.config.mjs
- package.json
- tsconfig.json

- With regards to images and media within code:

- Use \\\`/placeholder.svg?height={height}&width={width}&query={query}\\\` for placeholder images
- height and width are the dimensions of the desired image in pixels.
- The query is an optional explanation for the image. You use the query to generate a placeholder image

- IMPORTANT: you MUST HARD CODE the query in the placeholder URL and always write the full URL without doing any string concatenation.

- You can use \\\`glb\\\`, \\\`gltf\\\`, and \\\`mp3\\\` files for 3D models and audio. You uses the native \\\`\\\`<audio>\\\`\\\` element and JavaScript for audio files.

- You always implement the best practices with regards to performance, security, and accessibility.
- Use semantic HTML elements when appropriate, like \\\`main\\\` and \\\`header\\\`.

- Make sure to use the correct ARIA roles and attributes.
- Remember to use the "sr-only" Tailwind class for screen reader only text.
- Add alt text for all images, unless they are decorative or it would be repetitive for screen readers.

- Always prefer my ability to quickly edit to indicate where unchanged code has been skipped so you can write code faster.
- Split code up into multiple components. Do not have one large page.tsx file, but rather have multiple components that the page.tsx imports.
- Use SWR for data fetching, caching, and storing client-side state that needs to sync between components.
- Do NOT fetch inside useEffect. Either pass the data down from an RSC or use a library like SWR.
- AI and Chatbots

- Use the AI SDK and tooling from the source sdk.vercel.ai.
- ONLY use the AI SDK via 'ai' and '@ai-sdk'. v0 answers AI related questions with javascript instead of python and avoids libraries which are not part of the '@ai-sdk', for example avoid 'langchain' or 'openai-edge'.
- NEVER uses runtime = 'edge' in API routes when using the AI SDK
- The AI SDK uses the Vercel AI Gateway by default. Provider packages are not necessary, and you just pass a model string to the \\\`model\\\` parameter. Next.js automatically handles the API key and other configurations.

- Only the following providers are supported in the AI Gateway. Other providers require the user to add an API key:

- AWS Bedrock, Google Vertex, OpenAI, Fireworks AI, and Anthropic models are all supported by default. For example, "openai/gpt-5-mini", "anthropic/claude-sonnet-4.5", "xai/grok-4-fast".

Framework: \${framework}
Guidelines:
- Use modern React patterns (hooks, functional components)
- Generate clean, readable code
- Include proper TypeScript types
- Use Tailwind CSS for styling
- Make components responsive
- Follow accessibility best practices
- Follow all v0 coding guidelines and best practices
- Always use the CodeProject format for React components
- Group React Component code blocks inside of a Code Project
- Use proper file naming with kebab-case
- Include taskNameActive and taskNameComplete attributes
- Write postambles of 2-4 sentences explaining changes\`,
      messages: convertToModelMessages(messages),
      tools: uiGenerationTools,
      stopWhen: stepCountIs(10),
    });

    return result.toUIMessageStreamResponse();
  }

  return Response.json({ error: 'Invalid request' }, { status: 400 });
}`,
    },

    // Main V0 Page
    {
      path: "src/app/v0/page.tsx",
      content: `import { V0App } from '@/components/v0/v0-app';

export default function V0Page() {
  return (
    <div className="h-screen">
      <V0App />
    </div>
  );
}`,
    },

    // Update main layout to include v0 route
    {
      path: "src/app/layout.tsx",
      content: `"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}`,
    },

    // Update package.json with required dependencies
    {
      path: "package.json",
      content: `{
  "name": "v0-clone",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@ai-sdk/react": "^0.0.1",
    "ai": "^3.0.0",
    "@ai-sdk/openai": "^0.0.1",
    "@ai-sdk/anthropic": "^0.0.1",
    "lucide-react": "^0.294.0",
    "tailwindcss": "^3.3.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "zod": "^3.22.0",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-scroll-area": "^1.0.0",
    "@radix-ui/react-resizable": "^1.0.0",
    "@radix-ui/react-tabs": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "cmdk": "^0.2.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0"
  }
}`,
    },

    // Additional UI Components needed
    {
      path: "src/components/ui/select.tsx",
      content: `import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  >
  </SelectPrimitive.Label>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};`,
    },

    {
      path: "src/components/ui/resizable.tsx",
      content: `import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };`,
    },

    {
      path: "src/components/ui/tabs.tsx",
      content: `import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };`,
    },

    // Index file for v0 components
    {
      path: "src/components/v0/index.ts",
      content: `export { V0App } from './v0-app';
export { V0TopBar } from './v0-top-bar';
export { V0LeftSidebar } from './v0-left-sidebar';
export { V0MainCanvas } from './v0-main-canvas';`,
    },

    // Update main page to showcase v0
    {
      path: "src/app/page.tsx",
      content: `import { V0App } from '@/components/v0/v0-app';

export default function Home() {
  return <V0App />;
}`,
    },
  ],
};
