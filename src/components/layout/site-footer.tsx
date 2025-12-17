"use client";

import { Code, Github, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const footerLinks = {
  product: [
    { name: "Getting Started", href: "/docs/getting-started" },
    { name: "Components", href: "/docs/components" },
    { name: "Examples", href: "/docs/examples" },
    { name: "Demo", href: "/demo" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Configuration", href: "/docs/configuration" },
    { name: "Hooks", href: "/docs/hooks" },
    { name: "API Reference", href: "/docs/components" },
  ],
  community: [
    {
      name: "GitHub",
      href: "https://github.com/BankkRoll/sidekickcn",
      external: true,
    },
    {
      name: "Contribute",
      href: "https://github.com/BankkRoll/sidekickcn",
      external: true,
    },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/BankkRoll/sidekickcn",
    icon: Github,
    color: "hover:text-gray-900 dark:hover:text-gray-100",
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/icon.png" alt="sidekick/cn" className="h-8 w-8" />
              </motion.div>
              <span className="text-xl font-bold">sidekick/cn</span>
            </Link>

            <p className="text-sm text-muted-foreground max-w-md">
              A modular, composable AI assistant built with ShadCN UI for
              Next.js projects. From simple chatbots to complex workflows with
              custom training data and real-time streaming.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    asChild
                    className={cn("h-9 w-9", social.color)}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-primary" />
                <span>5-min setup</span>
              </div>
              <div className="flex items-center gap-1">
                <Code className="h-4 w-4 text-primary" />
                <span>TypeScript ready</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {currentYear} sidekick/cn. Open source project.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Built with</span>
            <div className="flex items-center gap-1">
              <span className="font-medium text-primary">Next.js</span>
              <span>&</span>
              <span className="font-medium text-primary">ShadCN UI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
