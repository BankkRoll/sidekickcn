"use client";

import { HashScrollHandler } from "@/components/docs/hash-scroll-handler";
import { PageNavigation } from "@/components/docs/page-navigation";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface DocsLayoutClientProps {
  children: React.ReactNode;
}

export function DocsLayoutClient({ children }: DocsLayoutClientProps) {
  const pathname = usePathname();

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    if (segments.includes("docs")) {
      breadcrumbs.push({ title: "Docs", href: "/docs" });
    }

    if (segments.includes("examples")) {
      breadcrumbs.push({ title: "Examples", href: "/docs/examples" });
    }

    // Add current page title
    const lastSegment = segments[segments.length - 1];
    if (lastSegment && lastSegment !== "docs") {
      const title = lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumbs.push({ title, href: pathname, isCurrentPage: true });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {crumb.isCurrentPage ? (
                        <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0 pb-16">
          <div className="container max-w-7xl mx-auto px-4 py-8 prose prose-slate dark:prose-invert">
            <HashScrollHandler />
            {children}
            <PageNavigation />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
