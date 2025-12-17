import { DocsLayoutClient } from "@/components/docs/docs-layout-client";
import type React from "react";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayoutClient>{children}</DocsLayoutClient>;
}
