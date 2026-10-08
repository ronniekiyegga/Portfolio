import { type RefObject, useEffect } from "react";

const NAV_REST_TOP = 220;
const NAV_PINNED_TOP = 48;

export function usePinnedNavTop(
  navRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !enabled) return;

    const syncTop = () => {
      nav.style.top = `${Math.max(NAV_PINNED_TOP, NAV_REST_TOP - window.scrollY)}px`;
    };

    syncTop();
    window.addEventListener("scroll", syncTop, { passive: true });
    return () => window.removeEventListener("scroll", syncTop);
  }, [navRef, enabled]);
}
