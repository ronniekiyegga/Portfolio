"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_SMOOTH = "power2.out";

interface ScrollAnimationsProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollAnimations({
  children,
  className = "",
}: ScrollAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let rafId: number;
    let cleanup: (() => void) | null = null;

    rafId = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(container.children, {
          opacity: 1,
          visibility: "visible",
          y: 0,
        });
        return;
      }

      const sections = Array.from(container.children).filter(
        (el) => el instanceof HTMLElement
      ) as HTMLElement[];

      if (!sections.length) return;

      ScrollTrigger.config({ limitCallbacks: true });

      const triggers: ScrollTrigger[] = [];

      sections.forEach((section, i) => {
        if (i === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        // to() reads initial state from CSS — no inline styles until trigger fires
        tl.to(section, {
          opacity: 1,
          visibility: "visible",
          y: 0,
          duration: 0.9,
          ease: EASE_SMOOTH,
          force3D: true,
        });

        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      });

      const refresh = () =>
        requestAnimationFrame(() => ScrollTrigger.refresh());
      refresh();
      const t = setTimeout(refresh, 600);

      cleanup = () => {
        clearTimeout(t);
        triggers.forEach((st) => st.kill());
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} ${mounted
          ? "[&>*:nth-child(n+2)]:invisible [&>*:nth-child(n+2)]:opacity-0 [&>*:nth-child(n+2)]:translate-y-3.5"
          : ""}`}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
