"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Long deceleration — closer to premium marketing sites (e.g. smooth section reveals). */
const EASE_SECTION = "power3.out";
const SECTION_DURATION = 1.45;

interface ScrollAnimationsProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollAnimations({
  children,
  className = "",
}: ScrollAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let cleanup: (() => void) | null = null;

    const forceVisible = () => {
      const c = containerRef.current;
      if (!c) return;
      Array.from(c.children).forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = "1";
          el.style.visibility = "visible";
          el.style.transform = "translateY(0)";
        }
      });
    };

    const fallbackTimer = setTimeout(forceVisible, 4000);

    rafId = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        clearTimeout(fallbackTimer);
        forceVisible();
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
            start: "top 92%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        tl.to(section, {
          opacity: 1,
          visibility: "visible",
          y: 0,
          duration: SECTION_DURATION,
          ease: EASE_SECTION,
          force3D: true,
        });

        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      });

      const refresh = () =>
        requestAnimationFrame(() => ScrollTrigger.refresh());
      refresh();
      const t = setTimeout(refresh, 600);

      cleanup = () => {
        clearTimeout(fallbackTimer);
        clearTimeout(t);
        triggers.forEach((st) => st.kill());
      };
    });

    return () => {
      clearTimeout(fallbackTimer);
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} [&>*:nth-child(n+2)]:invisible [&>*:nth-child(n+2)]:opacity-0 [&>*:nth-child(n+2)]:translate-y-8 motion-reduce:[&>*:nth-child(n+2)]:visible motion-reduce:[&>*:nth-child(n+2)]:opacity-100 motion-reduce:[&>*:nth-child(n+2)]:translate-y-0`}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
