"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["work", "design", "process", "experience"] as const;
export type ActiveSectionId = (typeof SECTION_IDS)[number] | null;

export function useActiveSection(): ActiveSectionId {
  const [active, setActive] = useState<ActiveSectionId>(null);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => ({ id, el: document.getElementById(id) })).filter(
      (s): s is { id: (typeof SECTION_IDS)[number]; el: HTMLElement } => !!s.el
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.filter((e) => e.isIntersecting);
        if (inView.length === 0) return;
        // Prefer the one with highest intersection ratio
        const best = inView.reduce((a, b) =>
          (a.intersectionRatio ?? 0) >= (b.intersectionRatio ?? 0) ? a : b
        );
        const id = best.target.id as ActiveSectionId;
        if (SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) {
          setActive(id as ActiveSectionId);
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
