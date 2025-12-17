"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Introduction",
    url: "/docs",
    items: [
      { title: "What is sidekick/cn?", url: "/docs#what-is-sidekickcn" },
      { title: "What Can You Build?", url: "/docs#what-can-you-build" },
    ],
  },
  {
    title: "Getting Started",
    url: "/docs/getting-started",
    items: [
      {
        title: "Install and configure shadcn/ui",
        url: "/docs/getting-started#install-and-configure-shadcnui",
      },
      {
        title: "Install sidekick/cn",
        url: "/docs/getting-started#install-sidekickcn",
      },
      {
        title: "Set up AI Gateway API Key",
        url: "/docs/getting-started#set-up-ai-gateway-api-key",
      },
      {
        title: "Set Up SidekickProvider",
        url: "/docs/getting-started#set-up-sidekickprovider",
      },
      {
        title: "Add Your First Component",
        url: "/docs/getting-started#add-your-first-component",
      },
      {
        title: "Test Your Assistant",
        url: "/docs/getting-started#test-your-assistant",
      },
    ],
  },
  {
    title: "Components",
    url: "/docs/components",
    items: [
      { title: "SidekickProvider", url: "/docs/components#sidekickprovider" },
      { title: "SidekickFloating", url: "/docs/components#sidekickfloating" },
      { title: "SidekickChat", url: "/docs/components#sidekickchat" },
      { title: "SidekickSidebar", url: "/docs/components#sidekicksidebar" },
      { title: "AI Elements", url: "/docs/components#ai-elements" },
      { title: "AIModelSelector", url: "/docs/components#aimodelselector" },
      { title: "AISources", url: "/docs/components#aisources" },
      { title: "AIReasoning", url: "/docs/components#aireasoning" },
      { title: "AISuggestions", url: "/docs/components#aisuggestions" },
      { title: "SidekickUI", url: "/docs/components#sidekickui" },
      { title: "SidekickTasks", url: "/docs/components#sidekicktasks" },
      { title: "SidekickHeader", url: "/docs/components#sidekickheader" },
      {
        title: "SidekickFloatingBar",
        url: "/docs/components#sidekickfloatingbar",
      },
      {
        title: "SidekickConfigBuilder",
        url: "/docs/components#sidekickconfigbuilder",
      },
      { title: "SidekickInsights", url: "/docs/components#sidekickinsights" },
    ],
  },
  {
    title: "Hooks",
    url: "/docs/hooks",
    items: [
      { title: "Installation", url: "/docs/hooks#installation" },
      { title: "useSidekick Hook", url: "/docs/hooks#usesidekick-hook" },
      {
        title: "useSidekickChat Hook",
        url: "/docs/hooks#usesidekickchat-hook",
      },
      {
        title: "useSidekickConfig Hook",
        url: "/docs/hooks#usesidekickconfig-hook",
      },
      {
        title: "useSidekickProvider Hook",
        url: "/docs/hooks#usesidekickprovider-hook",
      },
      { title: "useSidekickUI Hook", url: "/docs/hooks#usesidekickui-hook" },
    ],
  },
  {
    title: "Configuration",
    url: "/docs/configuration",
    items: [
      {
        title: "Configuration Architecture",
        url: "/docs/configuration#configuration-architecture",
      },
      {
        title: "TypeScript Types",
        url: "/docs/configuration#typescript-types",
      },
      {
        title: "Configuration Categories",
        url: "/docs/configuration#configuration-categories",
      },
      {
        title: "Environment Configuration",
        url: "/docs/configuration#environment-configuration",
      },
      {
        title: "Detailed Configuration",
        url: "/docs/configuration#detailed-configuration",
      },
      {
        title: "Configuration Presets",
        url: "/docs/configuration#configuration-presets",
      },
      { title: "API Integration", url: "/docs/configuration#api-integration" },
      {
        title: "Security Settings",
        url: "/docs/configuration#security-settings",
      },
      {
        title: "Configuration Summary",
        url: "/docs/configuration#configuration-summary",
      },
      {
        title: "Runtime Configuration",
        url: "/docs/configuration#runtime-configuration",
      },
      {
        title: "Configuration Tips",
        url: "/docs/configuration#configuration-tips",
      },
    ],
  },
  {
    title: "Examples",
    url: "/docs/examples",
    items: [
      { title: "All Examples", url: "/docs/examples#all-examples" },
      { title: "Quick Start", url: "/docs/examples#quick-start" },
      { title: "V0 UI Generator", url: "/docs/examples/v0-clone" },
      { title: "Floating Chat", url: "/docs/examples/floating-chat" },
      { title: "Coding Assistant", url: "/docs/examples/coding-assistant" },
      { title: "Customer Support", url: "/docs/examples/customer-support" },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <img src="/icon.png" alt="sidekick/cn" className="h-10 w-10" />
            <span className="text-xl font-bold">sidekick/cn</span>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Documentation</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.items?.length > 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <span>{item.title}</span>
                      {item.items?.length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
