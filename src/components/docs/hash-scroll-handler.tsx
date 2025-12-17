"use client";

import { useEffect } from "react";

export function HashScrollHandler() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.slice(1);
        const element = document.getElementById(elementId);
        if (element) {
          // Wait for any DOM updates
          requestAnimationFrame(() => {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          });
        }
      }
    };

    // Handle initial hash on page load with longer delay for DOM readiness
    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(handleHashScroll, 200);
    }

    // Handle hash changes
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return null;
}
