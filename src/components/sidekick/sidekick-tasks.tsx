"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { WorkflowDefinition } from "@/lib/sidekick-config";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Play } from "lucide-react";
import * as React from "react";
import { useSidekick } from "./sidekick-provider";

export interface SidekickTasksProps {
  className?: string;
  workflows?: WorkflowDefinition[];
  as?: React.ComponentType<any>;
}

type TaskStatus = "pending" | "running" | "completed";

type Task = {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
};

export function SidekickTasks({
  className,
  workflows: customWorkflows,
  as: CustomComponent,
}: SidekickTasksProps) {
  const { triggerWorkflow, workflows } = useSidekick();
  const workflowList = customWorkflows || workflows;
  const [tasks, setTasks] = React.useState<Task[]>(
    workflowList.map((w) => ({
      id: w.id,
      name: w.name,
      description: w.description,
      status: "pending" as const,
    })),
  );

  const handleRunTask = React.useCallback(
    async (taskId: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: "running" as const } : task,
        ),
      );

      try {
        await triggerWorkflow(taskId, {});
        setTimeout(() => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === taskId ? { ...t, status: "completed" as const } : t,
            ),
          );
        }, 2000);
      } catch (error) {
        console.error("Task execution error:", error);
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, status: "pending" as const } : t,
          ),
        );
      }
    },
    [triggerWorkflow],
  );

  if (CustomComponent) {
    return <CustomComponent tasks={tasks} onRunTask={handleRunTask} />;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <h3 className="text-sm font-medium">Workflows</h3>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium">{task.name}</h4>
                <Badge
                  variant={
                    task.status === "completed"
                      ? "default"
                      : task.status === "running"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-xs"
                >
                  {task.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {task.description}
              </p>
            </div>
            {task.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : task.status === "running" ? (
              <Circle className="h-5 w-5 animate-pulse text-blue-500" />
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRunTask(task.id)}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
