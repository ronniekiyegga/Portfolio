"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { workItems } from "@/lib/data";
import { useProjectContext } from "@/app/contexts/ProjectContext";
import { ProjectModal } from "@/shared/components/sections/ProjectModal";
import ProjectCardTextContent, {
  type ShowcaseProject,
  type TechTag,
} from "./ui/ProjectCardTextContent";

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

export type StackDef = {
  id: number;
  title?: string | null;
  icon: "purple" | "teal" | null;
  imageSrc: string;
  imageAlt: string;
  footerWords?: readonly string[];
  footerAccentLast?: boolean;
};

const STACK_ROW_1: StackDef[] = [
  {
    id: 1,
    icon: "teal",
    imageSrc: "/images/projects/edufeedbackpro/DMI_HERO.svg",
    imageAlt: "EduFeedbackPro hero preview",
    footerWords: ["Analytics", "Dashboard", "B2B"],
  },
  {
    id: 2,
    icon: "purple",
    imageSrc: "/images/projects/edufeedbackpro/DMI.svg",
    imageAlt: "EduFeedbackPro benefits preview",
    footerWords: ["Product", "SaaS", "Schools"],
  },
  {
    id: 3,
    icon: null,
    imageSrc: "/images/projects/edufeedbackpro/EDUFEEDBACKPRO.svg",
    imageAlt: "EduFeedbackPro support preview",
    footerWords: ["Learning", "Platform", "UX"],
  },
];

const STACK_ROW_2: StackDef[] = [
  {
    id: 1,
    icon: "teal",
    imageSrc: "/images/projects/maths-tutoring/Tutoring_hero.webp",
    imageAlt: "Mathematics Tutoring hero preview",
    footerWords: ["Tutoring", "Maths", "B2C"],
  },
  {
    id: 2,
    icon: "purple",
    imageSrc: "/images/projects/maths-tutoring/Tutoring_benefits.png",
    imageAlt: "Mathematics Tutoring benefits preview",
    footerWords: ["Product", "UX", "Growth"],
  },
  {
    id: 3,
    icon: null,
    imageSrc: "/images/projects/maths-tutoring/Tutoring_benefits.png",
    imageAlt: "Mathematics Tutoring support preview",
    footerWords: ["Support", "Parents", "Students"],
  },
];

const STACK_ROW_3: StackDef[] = [
  {
    id: 1,
    icon: "purple",
    imageSrc: "/images/projects/truefounders/TRUEFOUNDERS_HERO.svg",
    imageAlt: "TrueFounders hero preview",
    footerWords: ["Brand", "Landing", "UI"],
  },
  {
    id: 2,
    icon: "teal",
    imageSrc: "/images/projects/truefounders/TrueFounders_benefits.svg",
    imageAlt: "TrueFounders benefits preview",
    footerWords: ["Audit", "Personas", "UX"],
  },
  {
    id: 3,
    icon: null,
    imageSrc: "/images/projects/truefounders/TrueFounders_support.svg",
    imageAlt: "TrueFounders support preview",
    footerWords: ["Design", "Concept", "2024"],
  },
];

const TECH_ROW_TRUEFOUNDERS: TechTag[] = [
  "Figma",
  "UX Audit",
  "Competitive Analysis",
  "Personas",
  "Landing Page",
];

const TECH_ROW_1: TechTag[] = [
  "Next.js",
  "Node.js",
  "Typescript",
  "BigQuery",
  "NeonDB",
  "ElevenLabs",
];

const TECH_ROW_3: TechTag[] = [
  "TypeScript",
  "Next.js 16",
  "Postgres",
  "Clerk",
  "Nginx",
  "Digital Ocean",
];

const SHOWCASE_ROWS: {
  imageOnLeft: boolean;
  watermark: string;
  stack: StackDef[];
  project: ShowcaseProject;
  workItemTitle: string;
  techTags: TechTag[];
}[] = [
  {
    imageOnLeft: true,
    watermark: "PROJECT 1",
    stack: STACK_ROW_1,
    workItemTitle: "EduFeedbackPro",
    techTags: TECH_ROW_1,
    project: {
      category: "ENGINEERING",
      title: "Personalized Student Feedback Dashboard",
      tag: "School Analytics Platform",
      year: 2026,
      figmaHref: "#",
      caseStudy: "READ CASE STUDY",
      description:
        "A multi-tenant B2B SaaS platform that helps schools analyse KS4/5 exam performance and deliver AI-driven personalised feedback to students. Real-time analytics platform for surfacing student performance signals and enabling faster, data-driven intervention decisions",
    },
  },
  {
    imageOnLeft: false,
    watermark: "PROJECT 2",
    stack: STACK_ROW_2,
    workItemTitle: "Ms. Maryam's Maths",
    techTags: TECH_ROW_3,
    project: {
      category: "ENGINEERING",
      title: "Mathematics Tutoring",
      tag: "B2C SaaS Platform",
      year: 2026,
      figmaHref: "#",
      caseStudy: "READ CASE STUDY",
      description:
        "Professional tutoring platform for GCSE and A-Level mathematics. Full-stack application with modern design, student engagement features, and production deployment architecture.",
    },
  },
  {
    imageOnLeft: true,
    watermark: "PROJECT 3",
    stack: STACK_ROW_3,
    workItemTitle: "True Founders",
    techTags: TECH_ROW_TRUEFOUNDERS,
    project: {
      category: "DESIGN - BRAND IDENTITY",
      title: "True Founders",
      tag: "Women's Life Coaching",
      year: 2024,
      figmaHref: "#",
      caseStudy: "READ CASE STUDY",
      description:
        "Brand identity and landing page for a women's life coaching business in Dubai. Competitive analysis across 12 competitors, persona development for three audience segments, and a conversion-focused landing page design.",
    },
  },
];

function workItemByTitle(title: string) {
  return workItems.find((w) => w.title === title) ?? workItems[0];
}

/** Offset between stacked layers (tighter than the wide fan, looser than the original). */
const FAN_DX = 32;
const FAN_DY = 28;

/** se: front top-left, layers step down-right. sw: front top-right, layers step down-left (for visual-on-right rows). */
type StackFan = "se" | "sw";

function stackOffset(
  index: number,
  fan: StackFan,
): { left: number; top: number } {
  if (fan === "se") {
    return { left: index * FAN_DX, top: index * FAN_DY };
  }
  return { left: (2 - index) * FAN_DX, top: index * FAN_DY };
}

function ProjectCardVisualStack({
  definitions,
  stackFan,
}: {
  definitions: StackDef[];
  stackFan: StackFan;
}) {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [cards, setCards] = useState(() => [...definitions]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
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
        "relative z-10 w-full max-w-[520px] lg:w-[520px]",
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
            const { left, top } = stackOffset(index, stackFan);
            const footerWords = (def.footerWords ?? [])
              .map((w) => w.trim())
              .filter(Boolean)
              .slice(0, 3);
            return (
              <motion.div
                key={def.id}
                className="absolute inline-flex items-center gap-2 rounded-[7.63px] bg-white will-change-transform"
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
                <div className="relative flex h-[432.39px] w-[401.92px] shrink-0 flex-col overflow-hidden rounded-[11.61px] bg-[linear-gradient(135deg,#FFF_54.8%,rgba(251,233,217,0.59)_69.69%,#DEDAF9_86.6%,rgba(240,172,247,0.26)_97.21%)] px-[15.15px] pb-0 pt-[5.05px] shadow-[9.41px_23.53px_47.06px_rgba(219,220,230,0.5)]">
                  <div className="relative grid min-h-0 flex-1 place-items-center">
                    <div className="relative z-0 aspect-4/3 w-[96%] max-w-[392px] min-h-0 shrink-0 self-center justify-self-center overflow-hidden rounded-[10px]">
                      <Image
                        src={def.imageSrc}
                        alt={def.imageAlt}
                        fill
                        className={cn(
                          "object-center",
                          def.imageSrc.endsWith(".svg")
                            ? "object-contain"
                            : "object-cover",
                        )}
                        sizes="(max-width: 1024px) 96vw, 392px"
                        unoptimized={def.imageSrc.endsWith(".svg")}
                      />
                    </div>
                  </div>
                  {footerWords.length > 0 ? (
                    <p className="pointer-events-none relative z-10 m-0 flex w-full shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-0.5 border-t border-neutral-900/7 px-0.5 pb-2.5 pt-2 font-jetbrains text-[9px] font-medium uppercase tracking-[0.22em] text-neutral-500">
                      {footerWords.map((word, wi) => {
                        const isLast = wi === footerWords.length - 1;
                        return (
                          <Fragment key={`${def.id}-${wi}`}>
                            {wi > 0 ? (
                              <span className="text-neutral-400/90">·</span>
                            ) : null}
                            <span
                              className={cn(
                                isLast &&
                                  def.footerAccentLast &&
                                  "text-[#e85d4c]",
                              )}
                            >
                              {word}
                            </span>
                          </Fragment>
                        );
                      })}
                    </p>
                  ) : null}
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
    <section className="w-full min-w-0 py-20 md:py-40">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
        <div className="flex w-full min-w-0 flex-col gap-24 md:gap-32 lg:gap-40">
          {SHOWCASE_ROWS.map((row) => {
            const workItem = workItemByTitle(row.workItemTitle);
            return (
              <div
                key={row.watermark}
                className="relative isolate w-full min-w-0"
              >
                <div
                  className={cn(
                    "relative flex w-full min-w-0 flex-col items-stretch justify-center gap-10 lg:flex-row lg:items-center lg:gap-12",
                    !row.imageOnLeft && "lg:flex-row-reverse",
                  )}
                >
                  <ProjectCardVisualStack
                    definitions={row.stack}
                    stackFan={row.imageOnLeft ? "se" : "sw"}
                  />
                  <motion.div
                    className={cn(
                      "relative min-w-0 flex-1",
                      row.imageOnLeft ? "lg:pl-4" : "lg:pr-4",
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
                      project={row.project}
                      workItem={workItem}
                      techTags={row.techTags}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectModal
        item={selectedItem}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
