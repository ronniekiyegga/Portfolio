"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import SectionKicker from "@/shared/components/ui/section-kicker";
import { cn } from "@/lib/utils";
import {
  getWorkItemById,
  PROJECT_CARD_SHOWCASE_FIGMA_HREF,
  PROJECT_CARD_SHOWCASE_ROWS,
  projectCardStackOffset,
  type ProjectCardStackDef,
  type ProjectCardStackFan,
} from "@/lib/data";
import { useProjectContext } from "@/app/contexts/ProjectContext";
import { ProjectModal } from "@/shared/components/sections/ProjectModal";
import { TracingBeam } from "@/shared/components/ui/tracing-beam";
import ProjectCardTextContent, {
  type TechTag,
} from "./ui/ProjectCardTextContent";

/** Set to `true` to resume auto-cycling the stacked mockup cards. */
const PROJECT_CARD_STACK_ROTATION_ENABLED = false;

const EDTECH_TUTORING_VIDEO_SRC =
  "/images/projects/maths-tutoring/tutorial.webm";

export const SparkIcon = ({
  className = "",
  variant = "purple",
}: {
  className?: string;
  variant?: "purple" | "teal";
}) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
    <path
      d="M12 2l1.2 6.3a2.5 2.5 0 0 0 2 2l6.3 1.2-6.3 1.2a2.5 2.5 0 0 0-2 2L12 22l-1.2-6.3a2.5 2.5 0 0 0-2-2L2.5 12l6.3-1.2a2.5 2.5 0 0 0 2-2L12 2Z"
      stroke={variant === "purple" ? "#3e7bfa" : "#26d0ce"}
      strokeWidth="1.8"
    />
  </svg>
);

function ProjectCardVisualStack({
  definitions,
  stackFan,
  frontVideoSrc,
}: {
  definitions: ProjectCardStackDef[];
  stackFan: ProjectCardStackFan;
  /** When set, the front (index 0) card shows this video instead of its stack image. */
  frontVideoSrc?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [cards, setCards] = useState(() => [...definitions]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!PROJECT_CARD_STACK_ROTATION_ENABLED) return;
    if (prefersReducedMotion) return;
    if (isPaused) return;
    const id = window.setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, 4800);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, isPaused]);

  const slideX = stackFan === "se" ? -44 : 44;

  return (
    <motion.div
      className={cn(
        "relative z-10 w-full max-w-[520px] lg:w-[520px] mx-auto lg:mx-0 ",
        stackFan === "sw" && "lg:ml-auto",
      )}
      initial={{ opacity: 0, x: slideX, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.88,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mt-4">
        <div
          className="relative min-h-[480px] w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {cards.map((def, index) => {
            const { left, top } = projectCardStackOffset(index, stackFan);
            return (
              <motion.div
                key={def.id}
                className="absolute inline-flex items-center gap-2 rounded-[7.63px] bg-white dark:bg-transparent will-change-transform"
                style={{
                  transformOrigin: stackFan === "se" ? "top left" : "top right",
                }}
                animate={{
                  left,
                  top,
                  scale: 1 - index * 0.05,
                  opacity: index === 2 ? 0.58 : 1,
                  zIndex: 30 - index,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="project-visual-card relative flex h-[432.39px] w-[401.92px] shrink-0 flex-col overflow-hidden rounded-[11.61px] bg-[linear-gradient(135deg,#FFF_54.8%,rgba(251,233,217,0.59)_69.69%,#DEDAF9_86.6%,rgba(240,172,247,0.26)_97.21%)] px-[15.15px] pb-0 pt-[5.05px] shadow-[9.41px_23.53px_47.06px_rgba(219,220,230,0.5)]">
                  <div className="relative grid min-h-0 flex-1 place-items-center">
                    <div className="relative z-0 aspect-4/3 w-[96%] max-w-[392px] min-h-0 shrink-0 self-center justify-self-center overflow-hidden rounded-[10px] bg-white/50 dark:bg-neutral-950/20">
                      {index === 0 && frontVideoSrc ? (
                        <video
                          src={frontVideoSrc}
                          className="absolute inset-0 size-full object-cover object-center"
                          muted
                          loop
                          playsInline
                          autoPlay
                          preload="metadata"
                          aria-label={def.imageAlt}
                        />
                      ) : (
                        <Image
                          src={def.imageSrc}
                          alt={def.imageAlt}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 1024px) 96vw, 392px"
                          unoptimized={def.imageSrc.endsWith(".svg")}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectCard() {
  const { modalOpen, setModalOpen, selectedItem } = useProjectContext();
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full min-w-0 border-0 py-20 md:py-40 bg-[#FDFBF7] dark:bg-neutral-950 dark:bg-[url('/images/backgrounds/BG_1.png')] dark:bg-cover dark:bg-center dark:bg-no-repeat">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <SectionKicker className="mb-10 md:mb-32">
          Things I&apos;ve Built
        </SectionKicker>
        {/* <LampWidget /> */}
        <TracingBeam
          className="max-w-none"
          svgGradientId="tb-home-project-card"
        >
          {/* Keep generous left inset for the beam; eases right padding so copy isn’t squeezed */}
          <div className="px-4 sm:px-6 lg:pl-20 lg:pr-6 xl:pr-8">
            <div className="flex w-full min-w-0 flex-col gap-24 md:gap-32 lg:gap-36">
              {PROJECT_CARD_SHOWCASE_ROWS.map((row) => {
                const workItem = getWorkItemById(row.workItemId);
                if (!workItem) {
                  if (process.env.NODE_ENV === "development") {
                    console.error(
                      `[ProjectCard] Unknown workItemId "${row.workItemId}" — check PROJECT_CARD_SHOWCASE_ROWS and workItems in lib/data.ts`,
                    );
                  }
                  return null;
                }
                return (
                  <div
                    key={row.watermark}
                    className="relative isolate w-full min-w-0 "
                  >
                    <div
                      className={cn(
                        "relative grid w-full min-w-0 grid-cols-1 items-start justify-center justify-items-stretch gap-10 lg:items-start lg:gap-12",
                        row.imageOnLeft
                          ? "lg:grid-cols-[520px_minmax(0,1fr)]"
                          : "lg:grid-cols-[minmax(0,1fr)_520px]",
                      )}
                    >
                      <div
                        className={cn(
                          "w-full min-w-0",
                          !row.imageOnLeft && "lg:order-2",
                        )}
                      >
                        <ProjectCardVisualStack
                          definitions={row.stack}
                          stackFan={row.imageOnLeft ? "se" : "sw"}
                          frontVideoSrc={
                            row.workItemId === "edtech-tutoring"
                              ? EDTECH_TUTORING_VIDEO_SRC
                              : undefined
                          }
                        />
                      </div>
                      <motion.div
                        className={cn(
                          "relative w-full min-w-0 lg:pt-6",
                          !row.imageOnLeft && "lg:order-1",
                        )}
                        initial={
                          reduceMotion
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: row.imageOnLeft ? 36 : -36 }
                        }
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                          margin: "0px 0px -8% 0px",
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.72,
                          ease: [0.22, 1, 0.36, 1],
                          delay: reduceMotion ? 0 : 0.06,
                        }}
                      >
                        <ProjectCardTextContent
                          project={{
                            figmaHref: PROJECT_CARD_SHOWCASE_FIGMA_HREF,
                            caseStudy: "read case study",
                          }}
                          workItem={workItem}
                          techTags={workItem.tags as readonly TechTag[]}
                        />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TracingBeam>
      </div>

      <ProjectModal
        item={selectedItem}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
