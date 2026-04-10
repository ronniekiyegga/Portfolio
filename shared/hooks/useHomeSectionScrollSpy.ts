"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  HOME_NAV_ITEMS,
  HOME_SECTION_HASH_EVENT,
  type HomeSectionId,
} from "@/lib/home-nav";

const SECTION_IDS = HOME_NAV_ITEMS.map((i) => i.id);

/** “Reading line” from viewport top — slightly lower = calmer handoffs while scrolling. */
const LINE_RATIO = 0.34;

/**
 * Pick one section using midpoints between consecutive section tops (viewport coords).
 */
function computeActiveSectionId(): HomeSectionId {
  const line = window.innerHeight * LINE_RATIO;
  const positions: { id: HomeSectionId; top: number }[] = [];

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    positions.push({ id, top: el.getBoundingClientRect().top });
  }

  if (positions.length === 0) return SECTION_IDS[0];

  if (line < positions[0].top) {
    return positions[0].id;
  }

  for (let i = 0; i < positions.length - 1; i++) {
    const a = positions[i]!;
    const b = positions[i + 1]!;
    const mid = (a.top + b.top) / 2;
    if (line < mid) {
      return a.id;
    }
  }

  return positions[positions.length - 1]!.id;
}

/**
 * While on `/`, updates the active home section (nav dot + hash) from scroll position.
 * Coalesces scroll to a double rAF so layout is settled before reading rects (less jitter).
 */
export function useHomeSectionScrollSpy() {
  const pathname = usePathname();
  const lastEmitted = useRef<string | null>(null);
  const rafOuter = useRef(0);
  const rafInner = useRef(0);

  useEffect(() => {
    if (pathname !== "/") {
      lastEmitted.current = null;
      return;
    }

    lastEmitted.current = null;

    const emit = (id: HomeSectionId) => {
      if (lastEmitted.current === id) return;
      lastEmitted.current = id;
      window.history.replaceState(null, "", `/#${id}`);
      window.dispatchEvent(
        new CustomEvent<HomeSectionId>(HOME_SECTION_HASH_EVENT, {
          detail: id,
        }),
      );
    };

    const run = () => {
      rafInner.current = 0;
      emit(computeActiveSectionId());
    };

    const schedule = () => {
      cancelAnimationFrame(rafOuter.current);
      cancelAnimationFrame(rafInner.current);
      rafOuter.current = requestAnimationFrame(() => {
        rafOuter.current = 0;
        rafInner.current = requestAnimationFrame(run);
      });
    };

    queueMicrotask(() => {
      cancelAnimationFrame(rafOuter.current);
      rafOuter.current = requestAnimationFrame(() => {
        rafOuter.current = 0;
        rafInner.current = requestAnimationFrame(run);
      });
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(rafOuter.current);
      cancelAnimationFrame(rafInner.current);
      rafOuter.current = 0;
      rafInner.current = 0;
    };
  }, [pathname]);
}
