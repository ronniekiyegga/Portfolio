"use client";

import { useEffect, useRef, useState } from "react";

const NAV_REST_TOP = 220;
const NAV_PINNED_TOP = 48;

export function ThoughtOnThisPage({
  headings,
}: {
  headings: readonly { text: string; slug: string }[];
}) {
  const navRef = useRef<HTMLElement>(null);
  const [activeSlug, setActiveSlug] = useState(headings[0]?.slug ?? null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const syncTop = () => {
      nav.style.top = `${Math.max(NAV_PINNED_TOP, NAV_REST_TOP - window.scrollY)}px`;
    };

    syncTop();
    window.addEventListener("scroll", syncTop, { passive: true });
    return () => window.removeEventListener("scroll", syncTop);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const nodes = headings
      .map((heading) => document.getElementById(heading.slug))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const nextId = visible[0]?.target.id;
        if (nextId) setActiveSlug(nextId);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (slug: string) => {
    const node = document.getElementById(slug);
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${slug}`);
    setActiveSlug(slug);
  };

  if (headings.length === 0) return null;

  return (
    <nav ref={navRef} className="thoughtOnThisPage" aria-label="On this page">
      <p className="thoughtOnThisPageTitle">On this page</p>
      <ul>
        {headings.map((heading) => {
          const active = activeSlug === heading.slug;
          return (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                aria-current={active ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToHeading(heading.slug);
                }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
