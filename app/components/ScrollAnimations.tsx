"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

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
    const container = containerRef.current;
    if (!container) return;

    let io: IntersectionObserver | null = null;

    const setupObserver = () => {
      if (io) io.disconnect();

      const sections = Array.from(container.children).filter(
        (el) => el instanceof HTMLElement
      ) as HTMLElement[];

      if (!sections.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const section = entry.target as HTMLElement;
            gsap.to(section, {
              opacity: 1,
              visibility: "visible",
              duration: 0.5,
              ease: "power2.out",
              delay: 0.02,
              force3D: true,
              overwrite: "auto",
            });
            observer.unobserve(section);
          });
        },
        {
          rootMargin: "0px 0px 100px 0px",
          threshold: 0,
        }
      );

      io = observer;
      sections.forEach((section, i) => {
        if (i === 0) return;
        observer.observe(section);
      });
    };

    setupObserver();

    const mo = new MutationObserver(() => {
      setupObserver();
    });
    mo.observe(container, { childList: true, subtree: false });

    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${className} [&>*:nth-child(n+2)]:invisible [&>*:nth-child(n+2)]:opacity-0`}
    >
      {children}
    </div>
  );
}
