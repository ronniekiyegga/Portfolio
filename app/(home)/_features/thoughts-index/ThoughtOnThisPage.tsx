"use client";

import { type CSSProperties, useMemo, useRef } from "react";
import { AlignLeft } from "lucide-react";

import { useActiveItemCenter } from "@/shared/hooks/use-active-item-center";
import { usePinnedNavTop } from "@/shared/hooks/use-pinned-nav-top";
import { useScrollSpy } from "@/shared/hooks/use-scroll-spy";

export function ThoughtOnThisPage({
  headings,
}: {
  headings: readonly { text: string; slug: string }[];
}) {
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slugs = useMemo(() => headings.map((heading) => heading.slug), [headings]);
  const { activeId, scrollToId } = useScrollSpy(slugs);
  const markerY = useActiveItemCenter(
    trackRef,
    "[aria-current='location']",
    activeId,
  );

  usePinnedNavTop(navRef);

  if (headings.length === 0) return null;

  return (
    <nav ref={navRef} className="thoughtOnThisPage" aria-label="On this page">
      <p className="thoughtOnThisPageTitle">
        <AlignLeft aria-hidden size={14} strokeWidth={1.75} />
        On this page
      </p>
      <div
        ref={trackRef}
        className="thoughtOnThisPageTrack"
        style={
          markerY === null
            ? undefined
            : ({ "--toc-marker-y": `${markerY}px` } as CSSProperties)
        }
      >
        <span className="thoughtOnThisPageRail" aria-hidden />
        <span className="thoughtOnThisPageMarker" aria-hidden />
        <ul>
          {headings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                aria-current={activeId === heading.slug ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToId(heading.slug);
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
