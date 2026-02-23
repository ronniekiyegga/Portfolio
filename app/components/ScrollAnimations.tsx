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
            duration: 0.6,
            ease: "power2.out",
            delay: 0.05,
            force3D: true,
            overwrite: "auto",
          });
          observer.unobserve(section);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section, i) => {
      if (i === 0) return;
      observer.observe(section);
    });

    return () => observer.disconnect();
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
