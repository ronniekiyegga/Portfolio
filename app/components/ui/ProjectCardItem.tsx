"use client";

import { useMemo, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { Rocket } from "lucide-react";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { WorkItem } from "@/lib/data";

const PC_VIEWPORT = { once: true, amount: 0.35 as const };
const PC_EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectCardItemProps {
  index: number;
  title: string;
  category?: string;
  tag: string;
  figmaHref?: string;
  caseStudy: string;
  description: string;
  workItem: WorkItem;
  openModal: (item: WorkItem) => void;
}

const ProjectCardItem = ({
  index,
  title,
  category,
  tag,
  figmaHref,
  caseStudy,
  description,
  workItem,
  openModal,
}: ProjectCardItemProps) => {
  const playGradientId = useMemo(() => {
    // Deterministic id to avoid SSR/client hydration mismatches.
    const slug = `${title}-${index}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `play-gradient-${slug || "default"}`;
  }, [title, index]);
  const reduceMotion = useReducedMotion();
  const [ctaHovered, setCtaHovered] = useState(false);
  const showRockets = ctaHovered && !reduceMotion;
  const effectiveFigmaHref = figmaHref ?? "#";

  const hidden = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 };
  const visible = { opacity: 1, y: 0 };
  const baseTransition = (delay: number) => ({
    duration: reduceMotion ? 0 : 0.52,
    ease: PC_EASE,
    delay: reduceMotion ? 0 : delay,
  });

  return (
    <div
      key={`${title}-${index}`}
      className="relative z-10 flex min-w-0 flex-1 flex-col items-start gap-4"
    >
      <motion.div
        className="flex items-center gap-0.5"
        initial={hidden}
        whileInView={visible}
        viewport={PC_VIEWPORT}
        transition={baseTransition(0)}
      >
        <span className="inline-flex items-start rounded-full bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] p-[2.03px]">
          <span className="size-[2.69px] rounded-full bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] shadow-[0px_1.08px_8.62px_rgba(255,122,153,0.25)]" />
        </span>
        <span className="ml-2 bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] bg-clip-text text-[10.9px] font-semibold leading-[16.3px] text-transparent">
          {category}
        </span>
      </motion.div>

      <div className="flex w-full min-w-0 flex-col gap-3">
        <motion.div
          className="text-[28px] font-semibold leading-[31.5px] tracking-[-0.28px] text-[#000626] dark:text-white"
          initial={hidden}
          whileInView={visible}
          viewport={PC_VIEWPORT}
          transition={baseTransition(0.08)}
        >
          {title}
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-2"
          initial={hidden}
          whileInView={visible}
          viewport={PC_VIEWPORT}
          transition={baseTransition(0.16)}
        >
          <span className="text-[11.5px] font-medium leading-[22.9px] text-[rgba(186,188,205,1)]">
            {tag}
          </span>
          <span className="size-[5.91px]">{/* <CircularDivider /> */}</span>
          <span className="inline-flex items-center gap-2">
            {/* Order: CASE STUDY | DESIGN FILE • LIVE WEBSITE */}
            <motion.div
              className="relative inline-flex"
              onHoverStart={() => setCtaHovered(true)}
              onHoverEnd={() => setCtaHovered(false)}
            >
              <AnimatePresence>
                {showRockets ? (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          scale: 0,
                          x: 0,
                          y: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: Math.cos((i * Math.PI) / 3) * 40,
                          y: Math.sin((i * Math.PI) / 3) * 40,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                          ease: "easeOut",
                        }}
                        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[#0CD1CF] [&_svg]:fill-[#0CD1CF] [&_svg]:stroke-[#0CD1CF]"
                      >
                        <Rocket className="h-3 w-3 -rotate-35 stroke-[#0CD1CF] fill-[#0CD1CF]" />
                      </motion.div>
                    ))}
                  </>
                ) : null}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => openModal(workItem)}
                className="group relative z-10 inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-left focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e7bfa]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] bg-clip-text text-[11px] font-semibold leading-[16.7px] text-transparent hover:opacity-80 transition-opacity">
                  {caseStudy}
                </span>
                <svg
                  aria-hidden
                  className="pointer-events-none absolute h-0 w-0 overflow-hidden"
                >
                  <defs>
                    <linearGradient
                      id={playGradientId}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgb(102, 123, 246)" />
                      <stop offset="100%" stopColor="rgb(38, 208, 206)" />
                    </linearGradient>
                  </defs>
                </svg>
                <IoPlay
                  aria-hidden
                  className="h-[10px] w-[10px] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  style={{ fill: `url(#${playGradientId})` }}
                />
              </button>
            </motion.div>

            <span className="mx-1.5 text-[rgba(186,188,205,1)]">|</span>

            <a
              href={effectiveFigmaHref}
              target="_blank"
              rel="noreferrer"
              className="bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] bg-clip-text text-[11.5px] font-semibold leading-[22.9px] text-transparent hover:opacity-80 transition-opacity"
            >
              DESIGN FILE
            </a>

            <span className="mx-2 text-[rgba(186,188,205,1)]">•</span>

            {title.trim().toLowerCase() === "true founders" ? (
              <span className="bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] bg-clip-text text-[11px] font-semibold leading-[16.7px] text-transparent">
                COMING SOON
              </span>
            ) : (
              <a
                href={workItem.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] bg-clip-text text-[11px] font-semibold leading-[16.7px] text-transparent hover:opacity-80 transition-opacity"
              >
                <span>LIVE WEBSITE</span>
                <HiArrowTopRightOnSquare className="h-4 w-4 text-[rgba(102,123,246,1)] dark:text-[rgba(38,208,206,1)]" />
              </a>
            )}
          </span>
        </motion.div>
        <motion.p
          className="text-sm leading-[20px] text-[rgba(0,9,51,0.65)] dark:text-white/60"
          initial={hidden}
          whileInView={visible}
          viewport={PC_VIEWPORT}
          transition={baseTransition(0.24)}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};

export default ProjectCardItem;
