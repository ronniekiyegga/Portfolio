"use client";

import { useState, useEffect, useRef } from "react";
import { CornerDownRight } from "lucide-react";
import Integrations from "./integrations-one";
import { cn } from "@/lib/utils";
import { experiencesV1 } from "@/lib/data";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experiences() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const heading = content.querySelector("h2");
      const items = content.querySelectorAll("[data-experience-item]");
      const els = [heading, ...items].filter(Boolean) as HTMLElement[];

      if (prefersReducedMotion) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(els, { opacity: 0, y: 12, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "top 42%",
          scrub: 0.85,
        },
      });

      tl.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }).to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.5",
      );

      cleanupRef.current = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupRef.current?.();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full min-w-0 overflow-visible py-12 md:py-40 bg-[#FDFBF7] dark:bg-transparent"
      suppressHydrationWarning
    >
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-5xl cursor-default px-4 lg:px-0"
        suppressHydrationWarning
      >
        <h2 className="mb-4 text-[12px] font-medium uppercase tracking-[0.13rem] text-neutral-400 dark:text-neutral-500 md:mb-8">
          EXPERIENCES
        </h2>

        <div className="flex flex-col gap-6 pl-4 md:pl-12">
          {experiencesV1.map((item) => {
            const isOpen = hoveredId === item.id;
            return (
              <div
                key={item.id}
                data-experience-id={item.id}
                data-experience-item
                className={cn(
                  "group/exp cursor-pointer rounded-lg transition-all duration-300 ease-out",
                  isOpen && " ",
                )}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex flex-col items-start gap-0 py-2">
                  <div className="flex w-full flex-row items-start justify-between gap-x-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                        {item.role}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {item.organisation && (
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.organisation}
                          </span>
                        )}
                        {(item.techStack === undefined ||
                          item.techStack.length > 0) && (
                          <>
                            {item.organisation && (
                              <span className="text-neutral-400">•</span>
                            )}
                            <Integrations
                              variant="inline"
                              icons={item.techStack}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-500">
                      {item.dates}
                    </span>
                  </div>
                </div>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex gap-2 pb-4 pl-0 pt-2">
                      <CornerDownRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500 transition-all duration-300 group-hover/exp:translate-x-0.5 group-hover/exp:text-neutral-600 dark:text-neutral-400 dark:group-hover/exp:text-neutral-500" />
                      <p className="text-[13px] max-w-lg lg:max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.responsibilities}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
