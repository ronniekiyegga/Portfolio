"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { experiencesV1 } from "@/lib/data";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KICKER_GRADIENT = "linear-gradient(45deg, #667bf6, #26d0ce)";
const TITLE_GRADIENT = "linear-gradient(90deg, #4353ff 0%, #8b5cf6 100%)";

/** Small circular separator (interpunct), vertically centered with text */
function ExperienceMidDot() {
  return (
    <span
      className="mx-2 inline-flex h-[1em] shrink-0 items-center justify-center select-none"
      aria-hidden
    >
      <span className="size-[3px] rounded-full bg-neutral-400 dark:bg-neutral-500" />
    </span>
  );
}

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

      gsap.set(els, { opacity: 0, y: 20, force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "top 36%",
          scrub: 1.35,
        },
      });

      tl.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }).to(
        items,
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.65",
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
      className="relative w-full min-w-0 overflow-visible py-16 md:py-32 dark:bg-transparent"
      suppressHydrationWarning
    >
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8"
        suppressHydrationWarning
      >
        <header className="mb-10 flex min-w-0 flex-col gap-4 md:mb-12">
          <div className="flex items-center gap-1.5">
            <span
              className="size-[5px] shrink-0 rounded-full"
              style={{ background: KICKER_GRADIENT }}
              aria-hidden
            />
            <span
              className="bg-clip-text text-[10px] font-semibold uppercase tracking-[0.15em] text-transparent"
              style={{
                background: KICKER_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Career
            </span>
          </div>

          <h2 className="font-cormorant text-[clamp(2.125rem,4.5vw,2.875rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[#1a1a2e] dark:text-white">
            Work{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Experience
            </span>
          </h2>
        </header>

        <div className="flex max-w-3xl flex-col gap-8 md:gap-10">
          {experiencesV1.map((item) => {
            const isOpen = hoveredId === item.id;

            return (
              <div
                key={item.id}
                data-experience-id={item.id}
                data-experience-item
                className="group/exp cursor-pointer rounded-lg transition-all duration-300 ease-out"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="grid grid-cols-1 items-start gap-x-6 gap-y-2 sm:grid-cols-[12.5rem_minmax(0,1fr)] sm:gap-x-10 md:gap-x-14">
                  <span className="shrink-0 whitespace-nowrap text-sm tabular-nums text-neutral-500 dark:text-neutral-500">
                    {item.dates}
                  </span>
                  <div className="min-w-0">
                    <p className="flex min-w-0 flex-wrap items-center text-sm leading-snug text-neutral-900 dark:text-neutral-50">
                      <span className="font-medium">{item.role.trim()}</span>
                      {item.organisation?.trim() ? (
                        <>
                          <ExperienceMidDot />
                          <span className="font-medium">
                            {item.organisation.trim()}
                          </span>
                        </>
                      ) : null}
                      {item.suffix?.trim() ? (
                        <span className="ml-1 font-normal text-neutral-500 dark:text-neutral-400">
                          {item.suffix.trim()}
                        </span>
                      ) : null}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "col-span-full grid transition-all duration-500 ease-out sm:col-span-1 sm:col-start-2 sm:row-start-2",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-3 pb-1">
                        <div className="min-w-0 max-w-lg text-[13px] leading-relaxed text-neutral-600 lg:max-w-3xl dark:text-neutral-400">
                          {Array.isArray(item.responsibilities) ? (
                            <ul className="list-none space-y-2 pl-0">
                              {item.responsibilities.map((line, i) => (
                                <li key={`${item.id}-${i}`}>{line}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{item.responsibilities}</p>
                          )}
                        </div>
                      </div>
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
