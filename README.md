# sidekick/cn - Modular AI Assistant for Next.js

<img width="2197" height="2815" alt="image" src="https://github.com/user-attachments/assets/cc44f900-323b-4b48-b991-842d42656310" />


A fully composable AI assistant built with ShadCN UI and the Vercel AI SDK. Drop it into any Next.js or React project with full customization.

## Features

- **Fully Composable** - Mix and match components with compound component pattern
- **100% Themeable** - Built with ShadCN UI and Tailwind CSS v4
- **AI Gateway Integration** - Secure server-side authentication with Vercel AI SDK v5
- **Multiple Layouts** - Floating widget, sliding sidebar, full panel, fullscreen
- **ShadCN CLI** - Install via `npx shadcn add`
- **Secure by Default** - Zero client-side API key exposure
- **Mobile-First** - Responsive design with proper ScrollArea usage
- **Dark Mode** - Full theme support
- **Keyboard Shortcuts** - Cmd/Ctrl+K navigation
- **AI Elements** - Message branching, sources, reasoning, suggestions, model selector

## Installation

### Quick Start (Everything)

```bash
npx shadcn add https://sidekickcn.vercel.app/r/sidekick-full.json
```

### Modular Installation

```bash
# Core provider (required)
npx shadcn add https://sidekickcn.vercel.app/r/sidekick-provider.json

# Components (pick what you need)
npx shadcn add https://sidekickcn.vercel.app/r/sidekick-chat.json
npx shadcn add https://sidekickcn.vercel.app/r/sidekick-floating.json
npx shadcn add https://sidekickcn.vercel.app/r/sidekick-sidebar.json

# AI elements (optional)
npx shadcn add https://sidekickcn.vercel.app/r/ai-elements-full.json

# API route (required)
npx shadcn add https://sidekickcn.vercel.app/r/sidekick-ai-route.json
```

## Usage Examples

### Floating Widget (50vh, Clean Design)

```tsx
import { SidekickProvider, SidekickFloating } from "@/components/sidekick"

export default function App() {
  return (
    <SidekickProvider>
      <YourAppContent />
      <SidekickFloating position="bottom-right" />
    </SidekickProvider>
  )
}
```

### Sliding Sidebar Panel

```tsx
import { SidekickProvider, SidekickSidebar } from "@/components/sidekick"

export default function App() {
  return (
    <SidekickProvider>
      <SidekickSidebar 
        position="right" 
        width={420}
        showSearchBar
        onSearch={(query) => console.log(query)}
      >
        <YourAppContent />
      </SidekickSidebar>
    </SidekickProvider>
  )
}
```

### Full Panel Chat

```tsx
import {
  SidekickProvider,
  SidekickUI,
  SidekickHeader,
  SidekickChat,
} from "@/components/sidekick"

export default function ChatPage() {
  return (
    <SidekickProvider config={{ model: "openai/gpt-4.1" }}>
      <SidekickUI layout="fullscreen">
        <SidekickHeader title="AI Assistant" />
        <SidekickChat
          showModelSelector
          showSources
          showReasoning
          showSuggestions
          showAttachments
        />
      </SidekickUI>
    </SidekickProvider>
  )
}
```

## Components

### Layout Components

#### `<SidekickFloating>`
50vh floating chat widget with keyboard shortcuts (Cmd/Ctrl+K).

**Props:**
- `position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"`
- `defaultOpen?: boolean`
- `trigger?: React.ReactNode`

#### `<SidekickSidebar>`
Sliding sidebar that wraps your content (Chrome extension style).

**Props:**
- `children: React.ReactNode` - Your app content
- `position?: "left" | "right"` - Slide direction
- `width?: string | number` - Sidebar width (default: 420)
- `showSearchBar?: boolean` - Show search input
- `onSearch?: (query: string) => void` - Search callback

#### `<SidekickUI>`
Root wrapper with layout options.

**Props:**
- `layout?: "default" | "panel" | "minimal" | "fullscreen"`
- `className?: string`

### Chat Components

#### `<SidekickChat>`
Simple chat interface with ScrollArea.

#### `<SidekickChat>`
Full-featured chat with all AI elements.

**Props:**
- `showModelSelector?: boolean` - Model selection dropdown
- `showSources?: boolean` - Source citations
- `showReasoning?: boolean` - Reasoning traces
- `showSuggestions?: boolean` - Suggestion chips
- `showAttachments?: boolean` - File attachments
- `showWebSearch?: boolean` - Web search toggle
- `showMicrophone?: boolean` - Microphone input
- `suggestions?: string[]` - Custom suggestions

### AI Elements

All AI elements are composable and can be used independently:

- `<Message>` - Message display with role-based styling
- `<Conversation>` - Scrollable conversation container
- `<Sources>` - Collapsible source citations
- `<Reasoning>` - AI reasoning trace display
- `<Suggestions>` - Clickable prompt suggestions
- `<PromptInput>` - Composable input with attachments
- `<ModelSelector>` - AI model selection dropdown
- `<ShimmerLines>` - Loading skeleton

### Other Components

- `<SidekickHeader>` - Header with title/subtitle
- `<SidekickTasks>` - Workflow execution
- `<SidekickInsights>` - Analytics dashboard container

## Hooks

### `useSidekick()`

```tsx
const {
  sendPrompt,        // Send AI prompt
  addMessage,        // Add message to conversation
  clearMessages,     // Clear conversation
  messages,          // Message history
  isLoading,         // Loading state
  config,            // Configuration
  triggerWorkflow,   // Execute workflow
  registerAIElement, // Register custom element
} = useSidekick()
```

## AI Gateway Configuration

**Security:** All API keys handled server-side via `/api/ai` route.

**Supported models:**
sidekick/cn supports **any and all AI SDK models** through dynamic model discovery. Default models include:

- **OpenAI**: `openai/gpt-5.2`, `openai/gpt-5`, `openai/gpt-5-mini`, `openai/gpt-5-nano`, `openai/gpt-4.1-mini`
- **Anthropic**: `anthropic/claude-opus-4.5`, `anthropic/claude-sonnet-4.5`, `anthropic/claude-sonnet-4`, `anthropic/claude-3.7-sonnet`, `anthropic/claude-haiku-4.5`, `anthropic/claude-3-haiku`
- **xAI**: `xai/grok-4.1-fast-non-reasoning`, `xai/grok-code-fast-1`
- **And 30+ providers**: Azure, Bedrock, Vertex AI, Groq, Fireworks, DeepSeek, Cerebras, and more

**Dynamic Model Discovery**: Use `discoverModels()` to load all available models from your AI Gateway configuration.

**Setup:**
- Works automatically on Vercel (no config needed)
- For self-hosted: Set `OPENAI_API_KEY` or provider keys in `.env`
- See SETUP.md for detailed configuration

## Keyboard Shortcuts

- `Cmd/Ctrl + K` - Toggle floating widget or sidebar
- `Escape` - Close sidebar

## Customization

### Theming

```css
/* globals.css */
:root {
  --primary: /* your color */;
  --background: /* your color */;
}
```

### Custom Styling

```tsx
<SidekickUI className="max-w-6xl mx-auto">
  <SidekickChat className="custom-chat" />
</SidekickUI>
```

### Custom AI Model Configuration

```tsx
<SidekickProvider config={{
  model: "anthropic/claude-sonnet-4.5",
  temperature: 0.9,
  maxTokens: 4000,
  modelConfig: {
    // Control which models are available
    allowedModels: "*", // "*" = all available models, "none" = only default model, ["model-id1", "model-id2"] = specific models
    defaultModel: "anthropic/claude-sonnet-4.5",
    allowModelChange: true,
    groupByProvider: true,
    // Optional: override with custom models
    customModels: [
      {
        id: "my-custom-model",
        name: "My Custom Model",
        provider: "custom",
        description: "A custom model I built",
        capabilities: ["text", "code"]
      }
    ]
  }
}}>
```

#### Dynamic Model Discovery

Discover available models programmatically using the AI SDK gateway:

```tsx
const { discoverModels, availableModels } = useSidekick()

// Discover all available models from AI Gateway
await discoverModels()

// Get the current list of available models
const models = availableModels()
console.log(`${models.length} models available`)
```

**Direct AI SDK Usage:**
```tsx
import { gateway, generateText } from 'ai'

const availableModels = await gateway.getAvailableModels()

// List all available models with pricing
availableModels.models.forEach(model => {
  console.log(`${model.id}: ${model.name}`)
  if (model.description) {
    console.log(`  Description: ${model.description}`)
  }
  if (model.pricing) {
    console.log(`  Input: $${model.pricing.input}/token`)
    console.log(`  Output: $${model.pricing.output}/token`)
    if (model.pricing.cachedInputTokens) {
      console.log(`  Cached input (read): $${model.pricing.cachedInputTokens}/token`)
    }
    if (model.pricing.cacheCreationInputTokens) {
      console.log(`  Cache creation (write): $${model.pricing.cacheCreationInputTokens}/token`)
    }
  }
})

// Use any discovered model with plain string
const { text } = await generateText({
  model: availableModels.models[0].id, // e.g., 'openai/gpt-4o'
  prompt: 'Hello world',
})
```

**Filtering by Model Type:**
```tsx
const { models } = await gateway.getAvailableModels()
const languageModels = models.filter(m => m.modelType === 'language')
const embeddingModels = models.filter(m => m.modelType === 'embedding')
```

#### Model Configuration Options

**`allowedModels`**:
- `"*"`: Allow all available AI SDK models (recommended for maximum flexibility)
- `"none"`: Only allow the default model (locked configuration)
- `["openai/gpt-5", "anthropic/claude-sonnet-4.5"]`: Specific list of allowed model IDs
- `undefined`: Same as `"*"`

**`customModels`**: Override or extend the default model list with your own models.

**Dynamic Discovery**: Models are discovered automatically via `discoverModels()` or can be registered manually with `registerModels()`.

## Architecture

- **Compound Components** - Full composability, use only what you need
- **Context-Based State** - Share state across components via React Context
- **Server-Side AI** - All AI calls proxied through Next.js API routes
- **ScrollArea Integration** - Proper height calculations and scroll management
- **Motion Animations** - Smooth transitions with motion/react

## Security

- Server-side API key management
- No client-side credential exposure
- CSRF protection
- Rate limiting via AI Gateway
- Request/response logging

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License

## Links

- [Demo](https://sidekickcn.vercel.app)
- [Documentation](https://sidekickcn.vercel.app/docs)
- [GitHub](https://github.com/BankkRoll/sidekickcn)
- [Issues](https://github.com/BankkRoll/sidekickcn/issues)

---

Built with [ShadCN UI](https://ui.shadcn.com), [Vercel AI SDK](https://sdk.vercel.ai), and [Next.js](https://nextjs.org)
