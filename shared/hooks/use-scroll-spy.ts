import { useCallback, useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], enabled = true) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const idsKey = ids.join("\n");

  useEffect(() => {
    if (!enabled) return;

    const nodes = idsKey
      .split("\n")
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | undefined;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (best) setActiveId(best.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [idsKey, enabled]);

  const scrollToId = useCallback((id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }, []);

  return { activeId, scrollToId };
}
