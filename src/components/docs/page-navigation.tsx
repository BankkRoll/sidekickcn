"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Introduction", href: "/docs" },
  { title: "Getting Started", href: "/docs/getting-started" },
  { title: "Components", href: "/docs/components" },
  { title: "Hooks", href: "/docs/hooks" },
  { title: "Configuration", href: "/docs/configuration" },
  { title: "Examples", href: "/docs/examples" },
];

export function PageNavigation() {
  const pathname = usePathname();

  // Find current page index
  const currentIndex = navItems.findIndex((item) => item.href === pathname);

  // If current page not found in nav, don't render navigation
  if (currentIndex === -1) return null;

  const previousPage = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const nextPage =
    currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t">
      <div>
        {previousPage && (
          <Link href={previousPage.href}>
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>
          </Link>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        {currentIndex + 1} of {navItems.length}
      </div>

      <div>
        {nextPage && (
          <Link href={nextPage.href}>
            <Button variant="outline" className="gap-2">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
