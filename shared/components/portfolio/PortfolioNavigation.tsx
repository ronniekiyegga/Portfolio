"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sectionItems = [
  { id: "exploration", label: "Exploration" },
  { id: "selected-work", label: "Selected Work" },
  { id: "design", label: "Design" },
] as const;

const SECTION_IDS = sectionItems.map((item) => item.id);

const NAV_REST_TOP = 220;
const NAV_PINNED_TOP = 48;

function useActiveSection(enabled: boolean) {
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0]);

  useEffect(() => {
    if (!enabled) return;

    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const nextId = visible[0]?.target.id;
        if (nextId) setActiveId(nextId);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [enabled]);

  return [activeId, setActiveId] as const;
}

export function PortfolioNavigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useActiveSection(isHome);
  const [markTop, setMarkTop] = useState(0);

  const scrollToSection = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  useLayoutEffect(() => {
    const root = linksRef.current;
    const active = root?.querySelector<HTMLElement>("[aria-current='location']");
    if (!root || !active) return;

    const iconSize = 7.1;
    const rootBox = root.getBoundingClientRect();
    const label =
      active.querySelector<HTMLElement>(".navLinkLabel") ?? active;
    const textBox = label.getBoundingClientRect();
    setMarkTop(textBox.top - rootBox.top + (textBox.height - iconSize) / 2);
  }, [activeId, isHome]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !isHome) return;

    const syncTop = () => {
      nav.style.top = `${Math.max(NAV_PINNED_TOP, NAV_REST_TOP - window.scrollY)}px`;
    };

    syncTop();
    window.addEventListener("scroll", syncTop, { passive: true });
    return () => window.removeEventListener("scroll", syncTop);
  }, [isHome]);

  if (!isHome) return null;

  return (
    <nav ref={navRef} className="sideNav reveal" aria-label="Page sections">
      <span className="navLogo" aria-hidden>
        <i />
        <i />
        <i />
        <i />
      </span>
      <div className="navLinks" ref={linksRef}>
        <span
          className="navActiveMark"
          aria-hidden
          style={{ top: markTop }}
        />
        {sectionItems.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active ? "location" : undefined}
              className={cn("navLink", active && "is-active")}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(id);
              }}
            >
              <span className="navLinkLabel">{label}</span>
            </a>
          );
        })}
      </div>
      <span className="navRule" aria-hidden />
      <span className="navWip">WIP</span>
    </nav>
  );
}
