"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { experiencesV1 } from "@/lib/data";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RESUME_PDF_HREF =
  "/documents/Ronnie_Kiyegga%20-%20SWE.pdf";

/** Small circular separator (interpunct), vertically centered with text — matches case-study link row */
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
        className="relative z-10 mx-auto w-full max-w-3xl cursor-default px-6 sm:px-8 lg:px-10"
        suppressHydrationWarning
      >
        <h2 className="mb-8 text-left text-base font-medium text-neutral-500 dark:text-neutral-400 md:mb-12">
          Work Experience
        </h2>

        <div className="flex flex-col gap-8 md:gap-10">
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
                <div className="grid grid-cols-1 items-start gap-x-6 gap-y-3 sm:grid-cols-[minmax(6rem,8rem)_minmax(0,1fr)] sm:gap-x-16 md:gap-x-20 lg:gap-x-24">
                  <span className="text-sm tabular-nums text-neutral-500 dark:text-neutral-500">
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
                      <div className="mt-3 flex gap-2 pb-1">
                        <CornerDownRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500 transition-all duration-300 group-hover/exp:translate-x-0.5 group-hover/exp:text-neutral-600 dark:text-neutral-400 dark:group-hover/exp:text-neutral-500" />
                        <p className="text-[13px] max-w-lg leading-relaxed text-neutral-600 lg:max-w-3xl dark:text-neutral-400">
                          {item.responsibilities}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <a
          href={RESUME_PDF_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 inline-flex items-center gap-1.5 text-left text-sm text-neutral-500/55 underline-offset-[5px] transition-colors hover:text-neutral-700 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 dark:text-neutral-400/50 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-500/40"
        >
          See full resume
          <ArrowRight
            className="size-3.5 shrink-0 opacity-80"
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
}
