"use client";

import { useEffect, useRef, type ReactNode } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const LANDING_STAGGER_MS = 80;
const READING_LINE = 0.58;

function reveal(el: HTMLElement, delayMs = 0) {
  el.style.setProperty("--reveal-delay", `${delayMs}ms`);
  el.classList.add("visible");
}

function isOnScreen(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

/** Elements may opt into a lower trigger line via `data-reveal-line` (0–1). */
function readingLine(el: HTMLElement) {
  const line = Number(el.dataset.revealLine);
  return line > 0 && line <= 1 ? line : READING_LINE;
}

function isInReadingBand(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) return false;
  return rect.top <= window.innerHeight * readingLine(el);
}

export function PortfolioMain({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root =
      document.querySelector(".shell") ?? rootRef.current;
    if (!(root instanceof HTMLElement)) return;

    if (window.matchMedia(REDUCED_MOTION).matches) {
      root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        reveal(el);
      });
      return;
    }

    let frame = 0;
    let landingIndex = 0;

    const flush = (fromLanding: boolean) => {
      const pending = root.querySelectorAll<HTMLElement>(
        ".reveal:not(.visible)",
      );

      pending.forEach((el) => {
        const ready = fromLanding ? isOnScreen(el) : isInReadingBand(el);
        if (!ready) return;

        if (fromLanding) {
          reveal(el, Math.min(landingIndex, 4) * LANDING_STAGGER_MS);
          landingIndex += 1;
          return;
        }

        reveal(el, 0);
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        flush(false);
      });
    };

    const mo = new MutationObserver(onScroll);
    mo.observe(root, { childList: true, subtree: true });

    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScroll);

    flush(true);

    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="main" ref={rootRef}>
      {children}
    </main>
  );
}
