"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Check,
  Copy,
  Download,
  FileCode,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
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

// File type icon mapping function
function getFileIcon(filePath: string, isDark: boolean = false) {
  const extension = filePath.split(".").pop()?.toLowerCase();
  const fileName = filePath.split("/").pop()?.toLowerCase();

  // Special file names
  if (fileName === "package.json")
    return isDark
      ? "vscode-icons:file-type-json"
      : "vscode-icons:file-type-light-json";
  if (fileName === "tsconfig.json")
    return isDark
      ? "vscode-icons:file-type-json"
      : "vscode-icons:file-type-light-json";
  if (fileName === "next.config.js")
    return "vscode-icons:file-type-js-official";
  if (fileName === "next.config.mjs")
    return "vscode-icons:file-type-js-official";
  if (fileName === "tailwind.config.js")
    return "vscode-icons:file-type-js-official";
  if (fileName === "tailwind.config.ts")
    return "vscode-icons:file-type-typescript-official";

  // Extension-based mapping
  switch (extension) {
    case "tsx":
      return isDark
        ? "vscode-icons:file-type-reactts"
        : "vscode-icons:file-type-light-typescript";
    case "ts":
      return isDark
        ? "vscode-icons:file-type-typescript-official"
        : "vscode-icons:file-type-light-typescript";
    case "jsx":
      return isDark
        ? "vscode-icons:file-type-reactjs"
        : "vscode-icons:file-type-light-js";
    case "js":
    case "mjs":
    case "cjs":
      return isDark
        ? "vscode-icons:file-type-js-official"
        : "vscode-icons:file-type-light-js";
    case "json":
      return isDark
        ? "vscode-icons:file-type-json"
        : "vscode-icons:file-type-light-json";
    case "css":
      return isDark
        ? "vscode-icons:file-type-css"
        : "vscode-icons:file-type-light-css";
    case "scss":
    case "sass":
      return isDark
        ? "vscode-icons:file-type-scss"
        : "vscode-icons:file-type-light-scss";
    case "html":
      return isDark
        ? "vscode-icons:file-type-html"
        : "vscode-icons:file-type-light-html";
    case "md":
    case "markdown":
      return isDark
        ? "vscode-icons:file-type-markdown"
        : "vscode-icons:file-type-light-markdown";
    case "py":
      return isDark
        ? "vscode-icons:file-type-python"
        : "vscode-icons:file-type-light-python";
    default:
      return "vscode-icons:file-type-config"; // Default config icon for unknown files
  }
}

export interface ApiComponent {
  name: string;
  version: string;
  files: Array<{
    path: string;
    content?: string;
  }>;
}

interface TreeViewElement {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
}
interface TreeContextProps {
  selectedId: string | undefined;
  expandedItems: string[] | undefined;
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
  setExpandedItems?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  indicator: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  direction: "rtl" | "ltr";
}
const TreeContext = createContext<TreeContextProps | null>(null);
const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) throw new Error("useTree must be used within a TreeProvider");
  return context;
};

// --- Shiki Code Viewer ---
function ShikiViewer({
  code,
  lang = "tsx",
  showLineNumbers = true,
  className,
}: {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
  className?: string;
}) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    let mounted = true;
    async function highlight() {
      try {
        setIsLoading(true);
        const shikiTheme =
          resolvedTheme === "dark" ? "github-dark" : "github-light";
        const highlighter = await createHighlighter({
          langs: [
            "tsx",
            "typescript",
            "javascript",
            "jsx",
            "json",
            "css",
            "scss",
            "html",
            "markdown",
          ],
          themes: [shikiTheme],
        });
        const highlightedHtml = highlighter.codeToHtml(code, {
          lang: lang === "tsx" ? "typescript" : lang,
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
  }, [code, lang, resolvedTheme]);
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
    <div className={cn("code-block", className)}>
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-pulse text-muted-foreground">
            Loading code...
          </div>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: addLineNumbers(html) }} />
      )}
    </div>
  );
}

// --- File Header ---
function FileHeader({
  file,
  component,
  onCopy,
  copied,
  onDownload,
}: {
  file: { path: string; content?: string };
  component: ApiComponent;
  onCopy: () => void;
  copied: boolean;
  onDownload: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const fileIcon = getFileIcon(file.path, isDark);

  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b">
      <div className="flex items-center gap-2 min-w-0">
        <Icon icon={fileIcon} className="h-4 w-4 flex-shrink-0" />
        <span className="text-xs text-muted-foreground truncate">
          {file.path}
        </span>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="cursor-pointer h-8 w-8 p-0"
          title="Copy file content"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDownload}
          className="cursor-pointer h-8 w-8 p-0"
          title="Download entire component"
        >
          <Download className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

// --- File Tree ---
function TreeIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { direction } = useTree();
  return (
    <div
      className={cn(
        "absolute left-1.5 h-full w-px rounded-md bg-muted py-3 transition-colors hover:bg-slate-300 rtl:right-1.5",
        className,
      )}
      {...props}
    />
  );
}
function Folder({
  element,
  value,
  isSelectable = true,
  isSelect,
  children,
  className,
}: {
  element: string;
  value: string;
  isSelectable?: boolean;
  isSelect?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const {
    direction,
    handleExpand,
    expandedItems,
    indicator,
    openIcon,
    closeIcon,
  } = useTree();
  return (
    <AccordionPrimitive.Item
      value={value}
      className="relative h-full overflow-hidden"
    >
      <AccordionPrimitive.Trigger
        className={cn(
          "flex items-center gap-1 rounded-md text-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground cursor-pointer",
          isSelect && isSelectable && "bg-muted",
          !isSelectable && "opacity-50 cursor-not-allowed",
          className,
        )}
        disabled={!isSelectable}
        onClick={() => handleExpand(value)}
      >
        {expandedItems?.includes(value)
          ? openIcon ?? <FolderOpenIcon className="h-4 w-4" />
          : closeIcon ?? <FolderIcon className="h-4 w-4" />}
        <span className="truncate">{element}</span>
      </AccordionPrimitive.Trigger>
      <AccordionPrimitive.Content className="relative h-full overflow-hidden text-sm">
        {indicator && <TreeIndicator />}
        <AccordionPrimitive.Root
          type="multiple"
          className={cn(
            "ml-5 flex flex-col gap-1 py-1",
            direction === "rtl" && "mr-5",
          )}
          value={expandedItems}
        >
          {children}
        </AccordionPrimitive.Root>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
function File({
  value,
  isSelectable = true,
  isSelect,
  fileIcon,
  children,
  className,
  onClick,
  filePath,
}: {
  value: string;
  isSelectable?: boolean;
  isSelect?: boolean;
  fileIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  filePath?: string;
}) {
  const { selectedId, selectItem } = useTree();
  const { resolvedTheme } = useTheme();
  const isSelected = isSelect ?? selectedId === value;
  const isDark = resolvedTheme === "dark";
  const defaultFileIcon = filePath ? (
    <Icon
      icon={getFileIcon(filePath, isDark)}
      className="h-4 w-4 flex-shrink-0"
    />
  ) : (
    <FileIcon className="h-4 w-4" />
  );

  return (
    <button
      disabled={!isSelectable}
      className={cn(
        "flex w-fit items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors cursor-pointer",
        isSelected && isSelectable && "bg-muted",
        !isSelectable
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-accent hover:text-accent-foreground",
        className,
      )}
      onClick={() => {
        selectItem(value);
        onClick?.();
      }}
    >
      {fileIcon ?? defaultFileIcon}
      <span className="truncate">{children}</span>
    </button>
  );
}
function Tree({
  elements,
  initialSelectedId,
  initialExpandedItems,
  children,
  className,
  indicator = true,
  openIcon,
  closeIcon,
  dir = "ltr",
}: {
  elements?: TreeViewElement[];
  initialSelectedId?: string;
  initialExpandedItems?: string[];
  children: React.ReactNode;
  className?: string;
  indicator?: boolean;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  dir?: "rtl" | "ltr";
}) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId,
  );
  const [expandedItems, setExpandedItems] = useState<string[] | undefined>(
    initialExpandedItems,
  );
  const getAllExpandableItems = useCallback(
    (elements?: TreeViewElement[]): string[] => {
      const expandableItems: string[] = [];
      const traverse = (items: TreeViewElement[]) => {
        items.forEach((item) => {
          if (item.children?.length) {
            expandableItems.push(item.id);
            traverse(item.children);
          }
        });
      };
      if (elements) traverse(elements);
      return expandableItems;
    },
    [],
  );
  const selectItem = useCallback((id: string) => setSelectedId(id), []);
  const handleExpand = useCallback((id: string) => {
    setExpandedItems((prev) => {
      if (prev?.includes(id)) return prev.filter((item) => item !== id);
      return [...(prev ?? []), id];
    });
  }, []);
  useEffect(() => {
    if (elements) setExpandedItems(getAllExpandableItems(elements));
  }, [elements, getAllExpandableItems]);
  return (
    <TreeContext.Provider
      value={{
        selectedId,
        expandedItems,
        handleExpand,
        selectItem,
        setExpandedItems,
        indicator,
        openIcon,
        closeIcon,
        direction: dir,
      }}
    >
      <div className={cn("size-full", className)}>
        <div className="relative h-full px-2">
          <AccordionPrimitive.Root
            type="multiple"
            value={expandedItems}
            className="flex flex-col gap-1"
          >
            {children}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </TreeContext.Provider>
  );
}
function TreeItem({
  item,
  selectedFile,
  onFileSelect,
}: {
  item: TreeViewElement;
  selectedFile?: string;
  onFileSelect: (file: string) => void;
}) {
  if (item.children?.length) {
    return (
      <Folder
        key={item.id}
        element={item.name}
        value={item.id}
        className="truncate"
      >
        {item.children.map((child) => (
          <TreeItem
            key={child.id}
            item={child}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        ))}
      </Folder>
    );
  }
  return (
    <File
      key={item.id}
      value={item.id}
      onClick={() => onFileSelect(item.id)}
      isSelectable={true}
      isSelect={selectedFile === item.id}
      className="truncate whitespace-nowrap"
      filePath={item.id}
    >
      {item.name}
    </File>
  );
}
function FileTree({
  tree,
  selectedFile,
  onFileSelect,
  component,
}: {
  tree: TreeViewElement[];
  selectedFile?: string;
  onFileSelect: (file: string) => void;
  component: ApiComponent;
}) {
  const allExpandableItems = useMemo(() => {
    const expandableItems: string[] = [];
    const traverse = (elements: TreeViewElement[]) => {
      elements.forEach((element) => {
        if (element.children?.length) {
          expandableItems.push(element.id);
          traverse(element.children);
        }
      });
    };
    traverse(tree);
    return expandableItems;
  }, [tree]);
  return (
    <div className="w-full h-full border-r">
      <div className="p-3 border-b flex items-center gap-2">
        <FileCode className="h-4 w-4" />
        <span className="text-sm font-medium">
          {component.name} {component.version}
        </span>
      </div>
      <ScrollArea className="h-96 lg:h-[calc(100vh-300px)]">
        <div className="p-2">
          <Tree
            elements={tree}
            initialExpandedItems={allExpandableItems}
            initialSelectedId={selectedFile}
            indicator
          >
            {tree.map((item) => (
              <TreeItem
                key={item.id}
                item={item}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
              />
            ))}
          </Tree>
        </div>
      </ScrollArea>
    </div>
  );
}

// --- Main Component ---
export default function ComponentFileViewer({
  component,
}: {
  component: ApiComponent;
}) {
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined,
  );
  const [copied, setCopied] = useState(false);
  const files = component.files.filter((f) => f.content);
  // Build tree structure
  const tree = useMemo(() => {
    const root: Record<string, any> = {};
    for (const file of files) {
      const parts = file.path.split("/");
      let current = root;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] =
            i === parts.length - 1
              ? { ...file, id: file.path, name: part, isSelectable: true }
              : {
                  id: parts.slice(0, i + 1).join("/"),
                  name: part,
                  children: {},
                  isSelectable: false,
                };
        }
        current = current[part].children || current[part];
      }
    }
    const toArray = (obj: Record<string, any>): TreeViewElement[] =>
      Object.values(obj)
        .map((item: any) =>
          item.children ? { ...item, children: toArray(item.children) } : item,
        )
        .sort((a, b) => {
          // Folders always come first
          const aIsFolder = !!a.children;
          const bIsFolder = !!b.children;

          if (aIsFolder && !bIsFolder) return -1;
          if (!aIsFolder && bIsFolder) return 1;

          // Within folders and files, sort alphabetically
          return a.name.localeCompare(b.name);
        });
    return toArray(root);
  }, [files]);
  const selected = files.find((f) => f.path === selectedFile) || files[0];
  useEffect(() => {
    if (!selectedFile && files.length > 0) {
      setSelectedFile(files[0].path);
    }
  }, [files, selectedFile]);
  const handleCopy = () => {
    if (selected?.content) {
      navigator.clipboard.writeText(selected.content);
      setCopied(true);
      toast.success("File content copied");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    // Download all component files
    files.forEach((file) => {
      if (file.content) {
        const blob = new Blob([file.content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.path.split("/").pop() || "file.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
    toast.success(`Downloaded ${files.length} files`);
  };
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[600px] rounded-lg border overflow-hidden"
    >
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <FileTree
          tree={tree}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          component={component}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} minSize={40}>
        {selected && (
          <div className="h-full flex flex-col">
            <FileHeader
              file={selected}
              component={component}
              onCopy={handleCopy}
              copied={copied}
              onDownload={handleDownload}
            />
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="w-full h-[calc(100vh-20rem)]">
                <ShikiViewer
                  code={selected.content || ""}
                  lang={selected.path.split(".").pop() || "txt"}
                  className="min-h-full"
                />
              </ScrollArea>
            </div>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

// --- Backward Compatibility ---
interface CodePreviewProps {
  code: string;
  title?: string;
}

export function CodePreview({ code, title = "Code" }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-muted/50">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <span className="text-sm font-medium">{title}</span>
        <div className="flex gap-1">
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
        </div>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  );
}
