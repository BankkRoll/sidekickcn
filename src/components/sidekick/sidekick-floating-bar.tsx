"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquareIcon } from "lucide-react";
import type * as React from "react";

type SidekickFloatingBarProps = {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  onClick?: () => void;
  as?: React.ComponentType<any>;
  className?: string;
};

export function SidekickFloatingBar({
  position = "bottom-right",
  onClick,
  as: CustomComponent,
  className,
}: SidekickFloatingBarProps) {
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  if (CustomComponent) {
    return <CustomComponent onClick={onClick} />;
  }

  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={onClick}
      >
        <MessageSquareIcon className="h-6 w-6" />
        <span className="sr-only">Open sidekick/cn</span>
      </Button>
    </div>
  );
}
