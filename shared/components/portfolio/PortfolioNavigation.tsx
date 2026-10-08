"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useActiveItemCenter } from "@/shared/hooks/use-active-item-center";
import { usePinnedNavTop } from "@/shared/hooks/use-pinned-nav-top";
import { useScrollSpy } from "@/shared/hooks/use-scroll-spy";

const sectionItems = [
  { id: "exploration", label: "Engineering Notes" },
  { id: "selected-work", label: "Selected Work" },
  { id: "design", label: "Design" },
] as const;

const SECTION_IDS = sectionItems.map((item) => item.id);
const ACTIVE_MARK_SIZE = 7.1;

export function PortfolioNavigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const { activeId, scrollToId } = useScrollSpy(SECTION_IDS, isHome);
  const labelCenter = useActiveItemCenter(
    linksRef,
    "[aria-current='location'] .navLinkLabel",
    `${activeId}:${isHome}`,
  );
  const markTop = (labelCenter ?? ACTIVE_MARK_SIZE / 2) - ACTIVE_MARK_SIZE / 2;

  usePinnedNavTop(navRef, isHome);

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
                scrollToId(id);
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
