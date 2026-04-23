"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Rocket } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import SectionKicker from "@/shared/components/ui/section-kicker";
import { useProjectContext } from "@/app/contexts/ProjectContext";
import { ProjectModal } from "@/shared/components/sections/ProjectModal";
import {
  workItems,
  type WorkItem,
  PROJECT_CARD_SHOWCASE_FIGMA_HREF,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import LogoLoop from "@/shared/components/media/LogoLoop";
import type { LogoItem } from "@/shared/components/media/LogoLoop";
import { TracingBeam } from "@/shared/components/ui/tracing-beam";

const PROJECTS = [
  {
    workItemId: "edu-analytics-dashboard",
    badge: "ANALYTICS PLATFORM",
    subtitle: "User Repositories & Profiles",
    bigImage: "/images/projects/edufeedbackpro/Edufeedbackpro-1.webp",
    topImage: "/images/projects/edufeedbackpro/Edufeedbackpro-2.webp",
    bottomImage: "/images/projects/edufeedbackpro/Edufeedbackpro-3.webp",
    topLabel: "AI Study Assistant",
    topSublabel: "Voice-powered interaction for guided learning and feedback",
    bottomTitle: "Student Workspace",
    bottomSubtitle: "Manage student data, uploads, and learning records",
    heroLabels: [
      {
        title: "Student Analytics Dashboard",
        subtitle:
          "Performance, risk signals, and cohort-level insights",
      },
      {
        title: "Predictive Insights",
        subtitle: "Early pattern detection to support faster intervention",
      },
    ],
    /** Tighter padding on both stacked tiles so mockups read larger in the 390px column */
    stackedColumnImagePaddingClassName: "px-3 pt-3",
  },
  {
    workItemId: "subscription-api",
    badge: "API INFRASTRUCTURE",
    bigImage:
      "/images/projects/subscription-api/auth-middleware-1.webp?v=20260423",
    topImage: "/images/projects/subscription-api/router-boundary-2.webp",
    bottomImage: "/images/projects/subscription-api/structure-3.webp",
    topLabel: "API surface",
    topSublabel:
      "Protected billing routes split between read paths and write actions",
    bottomTitle: "Service layer",
    bottomSubtitle:
      "Subscription creation kept behind a small, stable business layer",
    heroLabels: [
      {
        title: "Auth boundary",
        subtitle:
          "JWT verification and request-level access control before handlers run",
      },
    ],
    stackedColumnImagePaddingClassName: "px-3 pt-3",
    ctaVariant: "code-only" as const,
  },
  {
    workItemId: "edtech-tutoring",
    badge: "EDTECH PLATFORM",
    subtitle: "Lessons, Tutor Profiles & Booking",
    bigImage: "/images/projects/maths-tutoring/Tutoring_hero.webp",
    topImage: "/images/projects/maths-tutoring/Tutoring-2.webp",
    bottomImage: "/images/projects/maths-tutoring/Tutoring-3.webp",
    topLabel: "Student Acquisition Funnel",
    topSublabel: "Conversion-focused landing pages for student acquisition",
    bottomTitle: "Lesson & Dashboard Experience",
    bottomSubtitle: "Core interface for lessons, dashboards, and student interaction",
    heroLabels: [
      {
        title: "Student Learning Dashboard",
        subtitle: "Track progress, performance, and engagement across subjects",
      },
      {
        title: "Course Experience",
        subtitle: "Structured lessons, navigation, and learning flow design",
      },
    ],
  },
  {
    workItemId: "true-founders",
    badge: "BRAND IDENTITY",
    subtitle: "Competitive Analysis & UX Design",
    bigImage: "/images/projects/truefounders/TrueFounders_hero.webp",
    topImage: "/images/projects/truefounders/truefounders-2.webp",
    bottomImage: "/images/projects/truefounders/truefounders-3.webp",
    topLabel: "Value Proposition Design",
    topSublabel: "Clarifying the offer for a high-trust, private audience",
    bottomTitle: "Enquiry Journey",
    bottomSubtitle: "End-to-end user journey from first visit to enquiry",
    heroLabels: [
      {
        title: "Conversion-Focused Landing Page",
        subtitle: "Designed to drive bookings and communicate trust clearly",
      },
      {
        title: "Brand Identity System",
        subtitle: "Visual direction, tone, and consistency across touchpoints",
      },
    ],
  },
];

const PROJECT_TECH_TAG_PILL_CLASS =
  "inline-flex shrink-0 rounded-sm border border-neutral-200/90 bg-neutral-50/90 px-1 py-px text-[9px] font-medium leading-tight text-neutral-600 dark:border-white/10 dark:bg-white/4 dark:text-white/50";

function workItemTagsToLogoItems(tags: readonly string[]): LogoItem[] {
  return tags.map((tag) => ({
    node: <span className={PROJECT_TECH_TAG_PILL_CLASS}>{tag}</span>,
    ariaLabel: tag,
  }));
}

const CTA_LINK_CLASS =
  "project-cta-link group relative z-10 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left no-underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e7bfa]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const CTA_LABEL_CLASS =
  "project-cta-link-label text-[11px] font-medium uppercase leading-[16.7px]";

const CTA_ARROW_CLASS =
  "size-3.5 shrink-0 text-[#9d9e9f] transition-colors group-hover:text-[#0cd1cf] dark:text-[#a3a3a3] dark:group-hover:text-[#0cd1cf]";

/** Soft long ease-out — reads smoother than short “snappy” curves at ~0.5s. */
const SCROLL_EASE = [0.33, 1, 0.36, 1] as const;

const SCROLL_VIEWPORT = {
  once: true,
  amount: 0.06,
  margin: "0px 0px -18% 0px",
} as const;

function projectRowVariants(
  mainImageOnRight: boolean,
  reduceMotion: boolean | null,
): {
  card: Variants;
  text: Variants;
  visual: Variants;
} {
  if (reduceMotion) {
    const idle: Variants = { hidden: {}, visible: {} };
    return { card: idle, text: idle, visual: idle };
  }

  const drift = mainImageOnRight ? 22 : -22;

  return {
    card: {
      hidden: { opacity: 0, y: 48, x: drift },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 1.2,
          ease: SCROLL_EASE,
          staggerChildren: 0.24,
          delayChildren: 0.2,
        },
      },
    },
    text: {
      hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1, ease: SCROLL_EASE },
      },
    },
    visual: {
      hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.1, ease: SCROLL_EASE },
      },
    },
  };
}

function RocketsBurst({ show }: { show: boolean }) {
  const reduceMotion = useReducedMotion();
  const showRockets = show && !reduceMotion;

  if (!showRockets) return null;

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
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
    </div>
  );
}

/** Matches `ProjectCardItem` case-study control: rockets on hover + `.project-cta-link` label styles */
function ViewCaseStudyCta({
  workItem,
  openModal,
}: {
  workItem: WorkItem;
  openModal: (item: WorkItem) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative inline-flex">
      <RocketsBurst key={hovered ? "on" : "off"} show={hovered} />
      <button
        type="button"
        onClick={() => openModal(workItem)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={CTA_LINK_CLASS}
      >
        <span className={CTA_LABEL_CLASS}>View Case Study</span>
        <ArrowUpRight className={CTA_ARROW_CLASS} aria-hidden />
      </button>
    </div>
  );
}

function LiveDemoCta({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative inline-flex">
      <RocketsBurst key={hovered ? "on" : "off"} show={hovered} />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={CTA_LINK_CLASS}
      >
        <span className={CTA_LABEL_CLASS}>Live Demo</span>
        <ArrowUpRight className={CTA_ARROW_CLASS} aria-hidden />
      </a>
    </div>
  );
}

function FigmaCta({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative inline-flex">
      <RocketsBurst key={hovered ? "on" : "off"} show={hovered} />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={CTA_LINK_CLASS}
      >
        <span className={CTA_LABEL_CLASS}>Figma</span>
        <ArrowUpRight className={CTA_ARROW_CLASS} aria-hidden />
      </a>
    </div>
  );
}

function ViewCodeCta({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative inline-flex">
      <RocketsBurst key={hovered ? "on" : "off"} show={hovered} />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={CTA_LINK_CLASS}
      >
        <span className={CTA_LABEL_CLASS}>View Code</span>
        <ArrowUpRight className={CTA_ARROW_CLASS} aria-hidden />
      </a>
    </div>
  );
}

export default function ProjectCard() {
  const { openModal, modalOpen, setModalOpen, selectedItem } =
    useProjectContext();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-32  dark:bg-transparent"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 32, filter: "blur(8px)" }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.25, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.95, ease: SCROLL_EASE }}
        >
          <SectionKicker className="mb-16 md:mb-24">
            Things I&apos;ve Built
          </SectionKicker>
        </motion.div>

        <TracingBeam className="w-full pl-4" svgGradientId="tb-project-card">
          <div className="flex flex-col gap-28 md:gap-32 lg:w-[calc(100%+7rem)] lg:-mr-12">
            {PROJECTS.map((p, index) => {
              const workItem = workItems.find((w) => w.id === p.workItemId);
              if (!workItem) return null;

              const stackedImagePad =
                "stackedColumnImagePaddingClassName" in p &&
                p.stackedColumnImagePaddingClassName
                  ? p.stackedColumnImagePaddingClassName
                  : "px-6 pt-6";

              /** Odd index: main hero right, stacked pair left (alternating layout) */
              const mainImageOnRight = index % 2 === 1;
              const v = projectRowVariants(mainImageOnRight, reduceMotion);

              return (
                <motion.div
                  key={p.workItemId}
                  className="flex flex-col gap-8"
                  variants={v.card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={SCROLL_VIEWPORT}
                >
                  {/* ── TEXT (top) ─────────────────────────────────────── */}
                  <motion.div className="flex flex-col gap-5" variants={v.text}>
                    {/* Badge */}
                    <div className="flex items-center gap-1.5">
                      <span className="size-[5px] rounded-full bg-[linear-gradient(45deg,#667bf6,#26d0ce)]" />
                      <span className="bg-[linear-gradient(45deg,#667bf6,#26d0ce)] bg-clip-text text-[10px] font-semibold uppercase tracking-[0.15em] text-transparent">
                        {p.badge}
                      </span>
                    </div>

                    {/* Title + subtitle */}
                    <div>
                      <h2 className="text-[24px] font-bold leading-[1.15] tracking-[-0.025em] text-neutral-900 dark:text-white lg:text-[28px]">
                        {workItem.title}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="max-w-[52ch] text-[13px] leading-relaxed text-gray-500 dark:text-white/50">
                      {workItem.desc}
                    </p>

                    {workItem.tags.length > 0 ? (
                      <div className="max-w-[38ch] w-full overflow-hidden">
                        <LogoLoop
                          logos={workItemTagsToLogoItems(workItem.tags)}
                          speed={20}
                          direction="left"
                          width="100%"
                          logoHeight={18}
                          gap={8}
                          pauseOnHover
                          fadeOut
                          ariaLabel="Technologies used in this project"
                          className="[--logoloop-fadeColor:var(--background)]"
                        />
                      </div>
                    ) : null}

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3">
                      {"ctaVariant" in p &&
                      p.ctaVariant === "code-only" &&
                      workItem.githubHref ? (
                        <ViewCodeCta href={workItem.githubHref} />
                      ) : (
                        <>
                          <ViewCaseStudyCta
                            workItem={workItem}
                            openModal={openModal}
                          />
                          <FigmaCta href={PROJECT_CARD_SHOWCASE_FIGMA_HREF} />
                          {workItem.href && workItem.href !== "#" ? (
                            <LiveDemoCta href={workItem.href} />
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                              Soon
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>

                  {/* ── IMAGE CONTAINER (bottom) — alternate wide column L/R per project ─ */}
                  <motion.div
                    className={cn(
                      "grid grid-cols-1 gap-3",
                      mainImageOnRight
                        ? "lg:grid-cols-[390px_minmax(0,1fr)]"
                        : "lg:grid-cols-[minmax(0,1fr)_390px]",
                    )}
                    style={{ height: "600px" }}
                    variants={v.visual}
                  >
                    {/* Big image */}
                    <div
                      className={cn(
                        "relative h-full overflow-hidden rounded-sm bg-[#f9f9f9] dark:border-white/[0.08] dark:bg-white/[0.02]",
                        mainImageOnRight && "lg:col-start-2 lg:row-start-1",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute inset-x-6 top-6 bottom-24 overflow-hidden rounded-sm dark:bg-white/[0.02]",
                          
                        )}
                      >
                        <Image
                          src={p.bigImage}
                          alt={workItem.title}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width:1000px) 95vw, 620px"
                          unoptimized={
                            p.bigImage.split("?")[0]?.endsWith(".svg") ?? false
                          }
                          priority
                        />
                      </div>
                      {/* Labels at bottom */}
                      <div className="absolute bottom-0 inset-x-0 z-10 flex items-end gap-8 p-5 bg-gradient-to-t from-[#fbfbfb] via-[#fbfbfb]/60 to-transparent dark:from-black/80 dark:via-black/20">
                        {p.heroLabels.map((lbl) => (
                          <div
                            key={lbl.title}
                            className="flex flex-col gap-0.5"
                          >
                            <span className="text-[11px] font-semibold text-[#1f202d] dark:text-white/90">
                              {lbl.title}
                            </span>
                            <span className="text-[10px] text-[#636584] dark:text-white/40">
                              {lbl.subtitle}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Two stacked images (desktop only; main image alone on small screens) */}
                    <div
                      className={cn(
                        "hidden h-full min-h-0 flex-col gap-3 lg:flex",
                        mainImageOnRight && "lg:col-start-1 lg:row-start-1",
                      )}
                    >
                      {/* Top image (caption bottom, same pattern as tile below) */}
                      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-[#f9f9f9] dark:bg-white/[0.04]">
                        <div
                          className={cn(
                            "relative min-h-0 flex-1",
                            stackedImagePad,
                          )}
                        >
                          <div className="relative h-full min-h-px overflow-hidden rounded-sm">
                            <Image
                              src={p.topImage}
                              alt={p.topLabel}
                              fill
                              className="object-contain object-top"
                              sizes="350px"
                              unoptimized={p.topImage.endsWith(".svg")}
                            />
                          </div>
                        </div>
                        <div className="shrink-0 px-3 pb-3 pt-1">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-semibold text-[#1f202d] dark:text-white/90">
                              {p.topLabel}
                            </span>
                            <span className="text-[10px] text-[#8d8fae] dark:text-white/40">
                              {p.topSublabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom image — in-flow caption so the flex panel keeps a non-zero main size for fill+contain */}
                      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-[#f9f9f9] dark:bg-white/[0.04]">
                        <div
                          className={cn("relative min-h-0 flex-1", stackedImagePad)}
                        >
                          <div className="relative h-full min-h-[1px] overflow-hidden rounded-sm">
                            <Image
                              src={p.bottomImage}
                              alt={p.bottomTitle}
                              fill
                              className="object-contain object-top"
                              sizes="340px"
                              unoptimized={p.bottomImage.endsWith(".svg")}
                            />
                          </div>
                        </div>
                        <div className="shrink-0 px-3 pb-3 pt-1">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] font-semibold text-[#1f202d] dark:text-white/90">
                              {p.bottomTitle}
                            </span>
                            <span className="text-[10px] text-[#8d8fae] dark:text-white/40">
                              {p.bottomSubtitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
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
