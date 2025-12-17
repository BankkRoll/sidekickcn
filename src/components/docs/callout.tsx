"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  XCircle,
  Zap,
} from "lucide-react";
import { ReactNode } from "react";

type CalloutType = "info" | "success" | "warning" | "error" | "tip" | "note";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const calloutConfigs = {
  info: {
    icon: Info,
    className:
      "border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10",
  },
  success: {
    icon: CheckCircle,
    className:
      "border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-orange-500/20 bg-orange-500/5 text-orange-600 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-400",
  },
  error: {
    icon: XCircle,
    className:
      "border-destructive/20 bg-destructive/5 text-destructive dark:border-destructive/30 dark:bg-destructive/10",
  },
  tip: {
    icon: Lightbulb,
    className:
      "border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10",
  },
  note: {
    icon: Info,
    className: "border-muted bg-muted/50 text-muted-foreground",
  },
};

function Callout({
  type = "info",
  title,
  children,
  className,
  icon,
}: CalloutProps) {
  const config = calloutConfigs[type];
  const IconComponent = config.icon;

  return (
    <Alert className={cn(config.className, className)}>
      {icon || <IconComponent className="h-4 w-4" />}
      <div className="space-y-1">
        {title && (
          <AlertTitle className="font-semibold text-sm">{title}</AlertTitle>
        )}
        <AlertDescription className="text-sm leading-relaxed">
          {children}
        </AlertDescription>
      </div>
    </Alert>
  );
}

// Specialized callouts for common use cases
function InfoCallout({
  title = "Info",
  children,
  className,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="info" title={title} className={className}>
      {children}
    </Callout>
  );
}

function SuccessCallout({
  title = "Success",
  children,
  className,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="success" title={title} className={className}>
      {children}
    </Callout>
  );
}

function WarningCallout({
  title = "Warning",
  children,
  className,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="warning" title={title} className={className}>
      {children}
    </Callout>
  );
}

function ErrorCallout({
  title = "Error",
  children,
  className,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="error" title={title} className={className}>
      {children}
    </Callout>
  );
}

function TipCallout({
  title = "Tip",
  children,
  className,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="tip" title={title} className={className}>
      {children}
    </Callout>
  );
}

function NoteCallout({
  title = "Note",
  children,
  className,
}: Omit<CalloutProps, "type">) {
  return (
    <Callout type="note" title={title} className={className}>
      {children}
    </Callout>
  );
}

// Version compatibility callout
interface VersionCalloutProps {
  version: string;
  children: ReactNode;
  className?: string;
}

function VersionCallout({ version, children, className }: VersionCalloutProps) {
  return (
    <Callout
      type="info"
      title={`Version ${version}`}
      className={cn("border-dashed", className)}
      icon={
        <Badge variant="outline" className="text-xs">
          v{version}
        </Badge>
      }
    >
      {children}
    </Callout>
  );
}

// Breaking change callout
function BreakingChangeCallout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Callout
      type="error"
      title="Breaking Change"
      className={className}
      icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
    >
      {children}
    </Callout>
  );
}

// Experimental feature callout
function ExperimentalCallout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Callout
      type="warning"
      title="Experimental"
      className={className}
      icon={<Zap className="h-4 w-4 text-orange-500 dark:text-orange-400" />}
    >
      {children}
    </Callout>
  );
}

export {
  BreakingChangeCallout,
  Callout,
  ErrorCallout,
  ExperimentalCallout,
  InfoCallout,
  NoteCallout,
  SuccessCallout,
  TipCallout,
  VersionCallout,
  WarningCallout,
};
export type { CalloutType };
