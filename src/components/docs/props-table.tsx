"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface PropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
  deprecated?: boolean;
}

interface PropsTableProps {
  props: PropDefinition[];
  title?: string;
  className?: string;
}

function PropsTable({ props, title = "Props", className }: PropsTableProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Prop</TableHead>
              <TableHead className="w-1/6">Type</TableHead>
              <TableHead className="w-1/6">Default</TableHead>
              <TableHead className="w-1/2">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.map((prop) => (
              <TableRow
                key={prop.name}
                className={cn(prop.deprecated && "opacity-60")}
              >
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <code>{prop.name}</code>
                    {prop.required && (
                      <Badge
                        variant="destructive"
                        className="text-xs px-1 py-0"
                      >
                        required
                      </Badge>
                    )}
                    {prop.deprecated && (
                      <Badge
                        variant="outline"
                        className="text-xs px-1 py-0 text-orange-600"
                      >
                        deprecated
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {prop.type}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {prop.defaultValue || "-"}
                </TableCell>
                <TableCell className="text-sm">{prop.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Alternative card-based layout
function PropsCards({ props, title = "Props", className }: PropsTableProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {props.map((prop) => (
          <div
            key={prop.name}
            className={cn(
              "p-4 border rounded-lg space-y-2",
              prop.deprecated && "opacity-60 border-orange-200",
            )}
          >
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm font-semibold">
                {prop.name}
              </code>
              {prop.required && (
                <Badge variant="destructive" className="text-xs">
                  required
                </Badge>
              )}
              {prop.deprecated && (
                <Badge variant="outline" className="text-xs text-orange-600">
                  deprecated
                </Badge>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">
                Type: <code className="font-mono">{prop.type}</code>
              </div>
              {prop.defaultValue && (
                <div className="text-xs text-muted-foreground">
                  Default:{" "}
                  <code className="font-mono">{prop.defaultValue}</code>
                </div>
              )}
            </div>

            <p className="text-sm">{prop.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple inline props list
interface PropsListProps {
  props: PropDefinition[];
  className?: string;
}

function PropsList({ props, className }: PropsListProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {props.map((prop) => (
        <div key={prop.name} className="flex items-start gap-3 text-sm">
          <div className="flex items-center gap-1 min-w-0 flex-shrink-0">
            <code className="font-mono font-semibold">{prop.name}</code>
            {prop.required && <span className="text-destructive">*</span>}
          </div>
          <span className="text-muted-foreground flex-shrink-0">—</span>
          <div className="flex-1 min-w-0">
            <span>{prop.description}</span>
            <div className="text-xs text-muted-foreground mt-1">
              <span>Type: </span>
              <code className="font-mono">{prop.type}</code>
              {prop.defaultValue && (
                <>
                  <span className="mx-2">•</span>
                  <span>Default: </span>
                  <code className="font-mono">{prop.defaultValue}</code>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { PropsCards, PropsList, PropsTable };
