"use client";

import { SidekickContext, createSidekickContext } from "@/hooks/use-sidekick";
import {
  DEFAULT_SIDEKICK_CONFIG,
  DEFAULT_WORKFLOWS,
  type SidekickConfig,
  type WorkflowDefinition,
} from "@/lib/sidekick-config";
import * as React from "react";
import { SidekickSidebar } from "./sidekick-sidebar";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  sources?: { title: string; href: string }[];
  reasoning?: { content: string; duration: number };
  versions?: { id: string; content: string }[];
};

export interface SidekickProviderProps {
  children: React.ReactNode;
  config?: Partial<SidekickConfig>;
  workflows?: WorkflowDefinition[];
  enableSidebar?: boolean;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: number | string;
  sidebarDefaultOpen?: boolean;
}

export function SidekickProvider({
  children,
  config = {},
  workflows = DEFAULT_WORKFLOWS,
  enableSidebar = false,
  sidebarPosition = "right",
  sidebarWidth = 420,
  sidebarDefaultOpen = false,
}: SidekickProviderProps) {
  const mergedConfig: SidekickConfig = React.useMemo(
    () => ({
      ...DEFAULT_SIDEKICK_CONFIG,
      ...config,
    }),
    [config],
  );

  // Use the createSidekickContext function from the hook
  const contextValue = createSidekickContext(mergedConfig, workflows);

  if (enableSidebar) {
    return (
      <SidekickContext.Provider value={contextValue}>
        <SidekickSidebar
          defaultOpen={sidebarDefaultOpen}
          position={sidebarPosition}
          width={sidebarWidth}
        >
          {children}
        </SidekickSidebar>
      </SidekickContext.Provider>
    );
  }

  return (
    <SidekickContext.Provider value={contextValue}>
      {children}
    </SidekickContext.Provider>
  );
}

export { useSidekick } from "@/hooks/use-sidekick";
