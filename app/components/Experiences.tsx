"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { CornerDownRight } from "lucide-react";
import Integrations, { type TechIconKey } from "./integrations-one";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });
const LANYARD_DROP_HEIGHT = 2.2;

const experiences: {
  id: string;
  organisation: string;
  role: string;
  dates: string;
  responsibilities: string;
  techStack?: TechIconKey[];
}[] = [
  {
    id: "SRS",
    organisation: "The School Of Research Science",
    role: "Software Engineer",
    dates: "2023 - 2026",
    responsibilities:
      "Built and shipped EdTech products used by 400+ students, including a browser-based Cambridge Pseudocode IDE, a KNN image classifier, and a real-time assessment dashboard - all tested to 95%+ coverage with zero critical regressions over 12 months.",
    techStack: [
      "Figma",
      "Nextjs",
      "Python",
      "TypeScript",
      "Docker",
      "Redis",
      "Nginx",
      "TensorFlow",
    ],
  },
  {
    id: "Freelance",
    organisation: "Freelance Consultant",
    role: "Design Engineer / Full Stack ",
    dates: "2020 - 2023",
    responsibilities:
      "Designed and built production-grade web products for clients, including a 30+ component design system across 8 storefronts, a microservices e-commerce platform with 99.9% uptime, and a video processing pipeline that cut media delivery costs by 40%.",
    techStack: ["Figma", "React", "Python", "TypeScript", "Nginx", "Nodejs"],
  },
  {
    id: "Internship",
    organisation: "Adaptive Financial Consulting ",
    role: "Software Engineer Intern ",
    dates: "2019 - 2019",
    responsibilities:
      "Built React dashboards and internal tools for financial systems, collaborating with engineers and designers to deliver production features supporting engineering and analytics workflows.",
    techStack: ["React", "TypeScript", "Figma", "Slack", "Nodejs"],
  },
  {
    id: "Fitness",
    organisation: "DW Fitness First Baker Street",
    role: "Senior Strength & Conditioning Consultant",
    dates: "2015 - 2019",
    responsibilities:
      "Led delivery of performance and conditioning programs across multi-club teams, including FGT and Team GB Pro Athlete initiatives. Designed individualised training and nutrition plans while managing onboarding and trainer allocation, improving client performance, recovery, and retention.",
    techStack: [], // No tech stack for this role
  },
];

export default function Experiences() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lanyardDrop, setLanyardDrop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const lanyardEl = lanyardRef.current;
    if (!section || !content) return;

    const heading = content.querySelector("h2");
    const items = content.querySelectorAll("[data-experience-item]");

    gsap.set([heading, ...items], { opacity: 0, y: 16, force3D: true });
    if (lanyardEl) gsap.set(lanyardEl, { opacity: 0, force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 88%",
        end: "top 45%",
        scrub: true,
      },
    });

    tl.call(() => setLanyardDrop(true), undefined, 0);
    if (lanyardEl) {
      tl.to(lanyardEl, { opacity: 1, duration: 0.6, ease: "power2.out", force3D: true }, 0);
    }
    tl.to(heading, { opacity: 1, y: 0, duration: 1, ease: "none" }).to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: "none",
      },
      "-=0.7",
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-w-0 min-h-screen overflow-visible py-16 md:py-32 dark:bg-neutral-950"
    >
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-5xl cursor-default px-4 lg:px-0"
      >
        <h2 className="mb-4 text-[12px] font-medium uppercase tracking-[0.15rem] text-neutral-400 dark:text-neutral-500 md:mb-8">
          EXPERIENCES
        </h2>

        <div className="flex flex-col gap-6 pl-4 md:pl-12">
          {experiences.map((item) => {
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
                        {item.organisation}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {item.role && (
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.role}
                          </span>
                        )}
                        {(item.techStack === undefined ||
                          item.techStack.length > 0) && (
                          <>
                            {item.role && (
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

      {/* Lanyard 3D overlay — drops when section enters viewport (ScrollTrigger) */}
      <div
        ref={lanyardRef}
        data-experiences-lanyard
        className="opacity-0 absolute inset-0 z-25 pointer-events-none"
      >
        <Lanyard
          key={lanyardDrop ? "drop" : "preload"}
          visible
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          fov={22}
          scale={0.85}
          stringLineWidth={0.75}
          ropeLength={1.0}
          initialDropHeight={lanyardDrop ? LANYARD_DROP_HEIGHT : undefined}
          className="md:translate-x-12 md:-translate-y-1"
        />
      </div>
    </section>
  );
}
