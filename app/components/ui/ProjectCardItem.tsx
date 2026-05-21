"use client";

import { useState } from "react";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { WorkItem } from "@/lib/data";
import { projectCaseStudyHref } from "@/lib/project-routes";

const PC_VIEWPORT = {
  once: true,
  amount: 0.12 as const,
  margin: "0px 0px -15% 0px",
};
const PC_EASE = [0.33, 1, 0.36, 1] as const;

function SoonPillBadge() {
  return (
    <span
      className="inline-flex items-center rounded-full bg-[#FDF6E9] px-2.5 py-1 dark:bg-[#2a2118] dark:ring-1 dark:ring-[#7B4A12]/35"
      role="status"
      aria-label="Coming soon"
    >
      <span className="font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#7B4A12] dark:text-[#d4a574]">
        Soon
      </span>
    </span>
  );
}

interface ProjectCardItemProps {
  index: number;
  title: string;
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
  tag,
  figmaHref,
  caseStudy,
  description,
  workItem,
  openModal,
}: ProjectCardItemProps) => {
  const reduceMotion = useReducedMotion();
  const [ctaHovered, setCtaHovered] = useState(false);
  const showRockets = ctaHovered && !reduceMotion;
  const effectiveFigmaHref = figmaHref ?? "#";

  const hidden = reduceMotion
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 26, filter: "blur(8px)" };
  const visible = { opacity: 1, y: 0, filter: "blur(0px)" };
  const baseTransition = (delay: number) => ({
    duration: reduceMotion ? 0 : 0.95,
    ease: PC_EASE,
    delay: reduceMotion ? 0 : delay,
  });

  return (
    <div
      key={`${title}-${index}`}
      className="relative z-10 flex min-w-0 flex-1 flex-col items-stretch gap-2"
    >
      <motion.div
        className="flex self-start items-center gap-0.5"
        initial={hidden}
        whileInView={visible}
        viewport={PC_VIEWPORT}
        transition={baseTransition(0)}
      >
        <span className="inline-flex items-start rounded-full bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] p-[2.03px]">
          <span className="size-[2.69px] rounded-full bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] shadow-[0px_1.08px_8.62px_rgba(255,122,153,0.25)]" />
        </span>
        <span className="ml-1 bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)] bg-clip-text text-transparent  text-[10px] font-semibold leading-[22.9px]  uppercase">
          {tag}
        </span>
      </motion.div>

      <div className="flex w-full min-w-0 flex-col gap-2 lg:w-110">
        <motion.div
          className="text-[26px] mb-2 font-semibold leading-[31.5px] tracking-[-0.28px] text-[#000626] dark:text-white "
          initial={hidden}
          whileInView={visible}
          viewport={PC_VIEWPORT}
          transition={baseTransition(0.14)}
        >
          {title}
        </motion.div>

        <motion.div
          className="relative flex flex-wrap items-center gap-1"
          initial={hidden}
          whileInView={visible}
          viewport={PC_VIEWPORT}
          transition={baseTransition(0.28)}
        >
          <span className="inline-flex items-center gap-0.5">
            {/* Order: [CASE STUDY] | DESIGN FILE • LIVE WEBSITE */}
            {workItem.id !== "true-founders" ? (
              <>
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

                  <Link
                    href={projectCaseStudyHref(workItem.id)}
                    prefetch
                    scroll={false}
                    onClick={(e) => {
                      if (
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey ||
                        e.altKey ||
                        e.button !== 0
                      ) {
                        return;
                      }
                      e.preventDefault();
                      openModal(workItem);
                    }}
                    className="project-cta-link group relative z-10 inline-flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-left focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e7bfa]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="project-cta-link-label text-[11px] font-medium uppercase leading-[16.7px]">
                      {caseStudy}
                    </span>
                  </Link>
                </motion.div>

                <span className="mx-2 text-[rgba(186,188,205,1)]">•</span>
              </>
            ) : null}

            <a
              href={effectiveFigmaHref}
              target="_blank"
              rel="noreferrer"
              className="project-cta-link project-cta-link--underline inline-flex items-center justify-center gap-1 text-[11px] font-medium uppercase leading-[22.9px] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e7bfa]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="project-cta-link-label">Figma Link</span>
            </a>

            <span className="mx-2 text-[rgba(186,188,205,1)]">•</span>

            {workItem.id === "true-founders" ? (
              <SoonPillBadge />
            ) : (
              <a
                href={workItem.href}
                target="_blank"
                rel="noreferrer"
                className="project-cta-link project-cta-link--underline inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase leading-[16.7px] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e7bfa]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="project-cta-link-label">Link</span>
              </a>
            )}
          </span>
        </motion.div>
        <motion.p
          className="w-full max-w-full text-[14px] leading-[20px] text-[rgba(0,9,51,0.65)] dark:text-white/60 lg:text-[13.5px] lg:leading-5.5 lg:tracking-[-0.01em]"
          initial={hidden}
          whileInView={visible}
          viewport={PC_VIEWPORT}
          transition={baseTransition(0.42)}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};

export default ProjectCardItem;
