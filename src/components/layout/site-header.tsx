"use client";

import {
  BookOpen,
  Brain,
  Code,
  Github,
  Layers,
  Menu,
  Moon,
  Settings,
  Sparkles,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type LinkItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
};

const productLinks: LinkItem[] = [
  {
    title: "Components",
    href: "/docs/components",
    description: "AI-powered UI components",
    icon: Layers,
  },
  {
    title: "AI Elements",
    href: "/docs/components",
    description: "Sources, reasoning, and workflows",
    icon: Brain,
  },
  {
    title: "Examples",
    href: "/docs/examples",
    description: "Complete project implementations",
    icon: Code,
  },
  {
    title: "Configuration",
    href: "/docs/configuration",
    description: "Advanced setup and customization",
    icon: Settings,
  },
  {
    title: "Hooks",
    href: "/docs/hooks",
    description: "React hooks for AI integration",
    icon: Sparkles,
  },
];

const resourcesLinks: LinkItem[] = [
  {
    title: "Documentation",
    href: "/docs",
    description: "Complete API reference and guides",
    icon: BookOpen,
  },
  {
    title: "Demo",
    href: "/demo",
    description: "Try sidekick/cn live",
    icon: Sparkles,
  },
  {
    title: "GitHub",
    href: "https://github.com/BankkRoll/sidekickcn",
    description: "Open source repository",
    icon: Github,
  },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-9">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </motion.div>
    </Button>
  );
}

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        "w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2",
        className,
      )}
      {...props}
      asChild
    >
      <a href={href}>
        <div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm">
          <Icon className="text-foreground size-5" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium">{title}</span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

export function SiteHeader() {
  const scrolled = useScroll(10);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("sticky top-0 z-50 w-full border-b border-transparent", {
        "bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg":
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <Link href="/" className="hover:bg-accent rounded-md p-2">
            <p className="flex items-center gap-2">
              <img src="/icon.png" alt="sidekick/cn" className="h-6 w-6" />
              sidekick/cn
            </p>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5">
                  <ul className="bg-popover grid w-lg grid-cols-2 gap-2 rounded-md border p-2 shadow">
                    {productLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-muted-foreground text-sm">
                      Ready to build?{" "}
                      <a
                        href="/docs/getting-started"
                        className="text-foreground font-medium hover:underline"
                      >
                        Get started now
                      </a>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                  <div className="grid w-lg grid-cols-1 gap-2">
                    <ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
                      {resourcesLinks.map((item, i) => (
                        <li key={i}>
                          <ListItem {...item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuLink className="px-4" asChild>
                <a href="/docs" className="hover:bg-accent rounded-md p-2">
                  Docs
                </a>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button>Get Started</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:w-96 p-0 flex flex-col max-h-[100vh]"
          >
            {/* Sticky Header */}
            <div className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <SheetHeader className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src="/icon.png" alt="sidekick/cn" className="h-8 w-8" />
                  <div>
                    <SheetTitle className="text-left">sidekick/cn</SheetTitle>
                    <SheetDescription className="text-left">
                      AI Assistant Framework
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 px-6 min-h-0">
              <div className="pb-6 pt-4 space-y-8">
                {/* Product Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      Product
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {productLinks.map((link) => (
                      <SheetClose key={link.title} asChild>
                        <a
                          href={link.href}
                          className="group flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <div className="flex size-10 items-center justify-center rounded-md border bg-muted/50 group-hover:bg-background transition-colors">
                            <link.icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">
                              {link.title}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {link.description}
                            </div>
                          </div>
                        </a>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Resources Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-4 text-primary" />
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                      Resources
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {resourcesLinks.map((link) => (
                      <SheetClose key={link.title} asChild>
                        <a
                          href={link.href}
                          className="group flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          <div className="flex size-10 items-center justify-center rounded-md border bg-muted/50 group-hover:bg-background transition-colors">
                            <link.icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">
                              {link.title}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {link.description}
                            </div>
                          </div>
                        </a>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
                <Button className="w-full" size="lg">
                  <Sparkles className="mr-2 size-4" />
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
