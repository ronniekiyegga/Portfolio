"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["work", "design", "process", "experience"] as const;
export type ActiveSectionId = (typeof SECTION_IDS)[number] | null;

/** V1 uses id="projects", V2 uses id="work" - map both to "work" */
const SECTION_ID_MAP: Record<string, ActiveSectionId> = {
  work: "work",
  projects: "work",
  design: "design",
  process: "process",
  experience: "experience",
};

const OBSERVE_IDS = ["work", "projects", "design", "process", "experience"] as const;

export function useActiveSection(): ActiveSectionId {
  const [active, setActive] = useState<ActiveSectionId>(null);

  useEffect(() => {
    const sections = OBSERVE_IDS.map((id) => ({
      id,
      el: document.getElementById(id),
    })).filter(
      (s): s is { id: (typeof OBSERVE_IDS)[number]; el: HTMLElement } => !!s.el
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.filter((e) => e.isIntersecting);
        if (inView.length === 0) return;
        const best = inView.reduce((a, b) =>
          (a.intersectionRatio ?? 0) >= (b.intersectionRatio ?? 0) ? a : b
        );
        const mapped = SECTION_ID_MAP[best.target.id];
        if (mapped) setActive(mapped);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
