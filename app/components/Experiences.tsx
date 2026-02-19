"use client";

import { useState } from "react";
import { CornerDownRight } from "lucide-react";
import Integrations from "./integrations-one";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "SRS",
    organisation: "The School Of Research Science",
    role: "Design Engineer / CS Teacher",
    dates: "2023 - 2026",
    responsibilities:
      "Built and deployed internal analytics and ML platforms used by 300+ users with React, Next.js, and TypeScript. Architected full-stack systems and optimised data pipelines, reducing query costs by 95% and achieving sub-50ms load times.",
  },
  {
    id: "Freelance",
    organisation: "Freelance Consultant",
    role: "Design Engineer / CS Tutor",
    dates: "2020 - 2023",
    responsibilities:
      "Built and deployed internal analytics and ML platforms used by 300+ users with React, Next.js, and TypeScript. Architected full-stack systems and optimised data pipelines, reducing query costs by 95% and achieving sub-50ms load times.",
  },
  {
    id: "Internship",
    organisation: "Adaptive Financial Consulting ",
    role: "Software Engineer Intern ",
    dates: "2019 - 2019",
    responsibilities:
      "Built React dashboards and internal tools for financial systems, collaborating with engineers and designers to deliver production features supporting engineering and analytics workflows.",
  },
  {
    id: "Fitness",
    organisation: "DW Fitness First Baker Street",
    role: "Senior Strength & Conditioning Consultant",
    dates: "2015 - 2019",
    responsibilities:
      "Led delivery of performance and conditioning programs across multi-club teams, including FGT and Team GB Pro Athlete initiatives. Designed individualised training and nutrition plans while managing onboarding and trainer allocation, improving client performance, recovery, and retention.",
  },
];

export default function Experiences() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full py-16 md:py-32 dark:bg-neutral-950 ">
      <div className="mx-auto max-w-5xl px-4 lg:px-0">
        <h2 className="mb-4 text-[12px] font-medium uppercase tracking-[0.15rem] text-neutral-400 dark:text-neutral-500 md:mb-8">
          EXPERIENCES
        </h2>

        <div className="flex flex-col gap-6 pl-4 md:pl-12">
          {experiences.map((item) => {
            const isOpen = hoveredId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  "group/exp rounded-lg transition-all duration-300 ease-out",
                  isOpen && " ",
                )}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex cursor-default flex-col items-start gap-0 py-2">
                  <div className="flex w-full flex-row items-start justify-between gap-x-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                        {item.organisation}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {item.role && (
                          <>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                              {item.role}
                            </span>
                            <span className="text-neutral-400">•</span>
                          </>
                        )}
                        <Integrations variant="inline" />
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
