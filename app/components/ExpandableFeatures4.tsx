"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { type ReactNode, useState } from "react";
import Notes2Illustration from "@/app/components/ui/illustrations/notes-2-illustration";
import Calendar10Illustration from "@/app/components/ui/illustrations/calendar-10-illustration";
import { AnimatePresence, motion } from "motion/react";
import AgentTaskPlanningIllustration from "@/app/components/ui/illustrations/agent-task-planning-illustration";
import NativeStartNow from "./ui/NativeButton";
const features = [
  {
    title: "Design",
    description:
      "Access and switch between multiple AI models including GPT, Claude, and Gemini from a unified interface with seamless provider switching.",
    image:
      "https://images.unsplash.com/photo-1770490085047-1460359929e7?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Engineering",
    description:
      "Work with teammates across the globe with real-time presence indicators, seamless syncing, and automatic conflict resolution.",
    image:
      "https://images.unsplash.com/photo-1721111648084-5e4f18a8635c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Production",
    description:
      "Deploy intelligent agents that learn your workflow patterns and automate repetitive tasks with context-aware suggestions.",
    image:
      "https://images.unsplash.com/photo-1770106678115-ec9aa241cdf6?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const illustrations = [
  <Notes2Illustration key="m3" />,
  <Calendar10Illustration key="map" />,
  <AgentTaskPlanningIllustration key="m4" />,
];

interface ExpandableFeatures4Props {
  badge: string;
  title: string;
  description: ReactNode;
  /** When true, image appears on left, text on right (for alternating layout) */
  imageOnLeft?: boolean;
}

const BADGE: string = "Platform Features";
const TITLE: string = "Project Title";
const DESC: string =
  "Streamline your workflow with tools designed to enhance productivity at every step.";

export default function ExpandableFeatures4({
  badge = BADGE,
  title = TITLE,
  description = DESC,
  imageOnLeft = false,
}: ExpandableFeatures4Props) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const handleSelect = (index: number) => {
    if (index === expandedIndex) return;
    setExpandedIndex(index);
  };

  return (
    <section className="w-full min-w-0 bg-transparent @container overflow-hidden py-12 md:py-16">
      <div className="mx-auto w-full min-w-0 max-w-full px-2 sm:px-4">
        <div className="grid w-full min-w-0 grid-cols-1 gap-6 sm:grid-cols-7 sm:gap-4 md:gap-6">
          <div
            className={cn(
              "flex min-w-0 flex-col gap-6 pb-4 sm:col-span-3 md:py-6",
              imageOnLeft && "sm:order-2",
            )}
          >
            <div className="min-w-0 text-balance">
              <h4 className="mb-2 w-fit rounded-full text-[11px] font-bold uppercase tracking-wide text-gradient-blue">
                {badge}
              </h4>
              <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl text-white dark:text-white">
                {title}
              </h2>
              <p className="text-white/30 mt-3 text-sm sm:text-md dark:text-white/80">
                {description}
              </p>
            </div>
            <div data-project-cta className="opacity-0">
              <NativeStartNow
                variant="gradient"
                size="sm"
                onStart={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1500));
                }}
              />
            </div>

            <div className="mt-auto flex min-w-0 flex-col">
              {features.map((feature, index) => (
                <button
                  key={feature.title}
                  onClick={() => handleSelect(index)}
                  className={cn(
                    "active:scale-98 relative w-fit cursor-pointer px-4 pb-2 pt-1.5 text-left text-sm font-medium duration-200",
                    expandedIndex === index
                      ? "text-white dark:text-white"
                      : "text-white/40 hover:text-foreground/75 dark:text-white/70 dark:hover:text-white/90",
                  )}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>
          <div
            className={cn(
              "relative min-w-0 overflow-hidden sm:col-span-4",
              imageOnLeft && "sm:order-1",
            )}
          >
            <div
              aria-hidden
              className="mask-x-from-45% border-tracing-gradient pointer-events-none absolute -inset-x-1 -inset-y-6 rotate-45 border-y max-lg:hidden"
            />
            <div
              aria-hidden
              className="mask-y-from-75% border-tracing-gradient pointer-events-none absolute -inset-x-1 -inset-y-12 border-x"
            />

            <div className="corner-cut-tr-bl aspect-4/5 min-h-0 min-w-0 bg-muted relative overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={expandedIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative z-10 flex h-full min-h-0 min-w-0 items-center justify-center p-4"
                >
                  <div className="max-h-full min-w-0 scale-90 sm:scale-[0.85]">
                    {illustrations[expandedIndex]}
                  </div>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`bg-${expandedIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={features[expandedIndex].image}
                    alt=""
                    fill
                    className="size-full object-cover opacity-75 dark:opacity-50"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
