"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Heading } from "@/types/post";

/** Clearance below the fixed site header when the TOC is pinned. */
const STICKY_TOP_PX = 96;

/**
 * In-flow TOC aligned with breadcrumbs; pins below the header once scrolled.
 * Uses fixed positioning on scroll because overflow-x-hidden on html breaks sticky.
 */
export function BlogOnThisPage({ headings }: { headings: readonly Heading[] }) {
  const pathname = usePathname();
  const columnRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [activeSlug, setActiveSlug] = useState<string | null>(
    headings[0]?.slug ?? null,
  );

  useEffect(() => {
    const column = columnRef.current;
    const nav = navRef.current;
    if (!column || !nav) return;

    const syncLayout = () => {
      setNavHeight(nav.offsetHeight);
      setIsPinned(column.getBoundingClientRect().top <= STICKY_TOP_PX);
    };

    syncLayout();
    window.addEventListener("scroll", syncLayout, { passive: true });
    window.addEventListener("resize", syncLayout, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncLayout);
      window.removeEventListener("resize", syncLayout);
    };
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const updateActive = () => {
      const marker = window.scrollY + STICKY_TOP_PX + 48;
      let current = headings[0]?.slug ?? null;

      for (const heading of headings) {
        const el = document.getElementById(heading.slug);
        if (el && el.getBoundingClientRect().top + window.scrollY <= marker) {
          current = heading.slug;
        }
      }

      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 48;
      if (nearBottom && headings.length > 0) {
        current = headings[headings.length - 1].slug;
      }

      if (current) setActiveSlug(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [headings]);

  const scrollToHeading = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - STICKY_TOP_PX;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
  };

  if (headings.length === 0) return null;

  return (
    <div
      ref={columnRef}
      className="hidden w-56 shrink-0 lg:block"
      style={{ minHeight: isPinned ? navHeight : undefined }}
    >
      <aside
        ref={navRef}
        className={cn("z-20 w-56", isPinned && "fixed")}
        style={
          isPinned
            ? {
                top: STICKY_TOP_PX,
                right:
                  "max(1.5rem, calc((100vw - min(100vw, 64rem)) / 2 + 1.5rem))",
              }
            : undefined
        }
      >
        <nav aria-label="On this page">
          <h4 className="text-foreground mb-4 text-sm font-semibold">
            On this page
          </h4>
          <ul className="space-y-3 text-sm">
            {headings.map((heading) => {
              const isActive = activeSlug === heading.slug;
              return (
                <li key={heading.slug}>
                  <a
                    href={`#${heading.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToHeading(heading.slug);
                    }}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "block leading-snug transition-opacity duration-200",
                      heading.level === 3 && "pl-4",
                      isActive
                        ? "text-gradient-blue-static font-semibold opacity-100"
                        : "text-foreground opacity-60 hover:opacity-80",
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

/** Scroll to top when opening a blog article (unless URL has a section hash). */
export function BlogArticleScrollTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) {
          const top =
            el.getBoundingClientRect().top + window.scrollY - STICKY_TOP_PX;
          window.scrollTo({ top, behavior: "auto" });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
