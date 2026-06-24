"use client";

import { useState, type MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
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
import {
  PROJECT_CARD_LISTINGS,
  SHOW_PROJECT_IMAGE_GRID,
  type ProjectArchitecturalDecision,
  type ProjectCardListing,
  type ProjectMetricPill,
} from "@/lib/project-listings";
import { projectCaseStudyHref } from "@/lib/project-routes";
import { cn } from "@/lib/utils";
import { TracingBeam } from "@/shared/components/ui/tracing-beam";
import { ArchitecturalDecisionIcon } from "@/shared/components/icons/ArchitecturalDecisionIcons";

const PROJECT_TECH_TAG_PILL_CLASS =
  "inline-flex h-[25px] shrink-0 items-center justify-center gap-[5px] rounded-[1.10181rem] bg-white px-[10px] text-[10px] font-normal leading-none text-[#6b7280] [background-image:linear-gradient(114deg,rgba(62,123,250,0.02)_20.34%,rgba(102,0,204,0.04)_36.8%,rgba(102,0,204,0)_56.12%,rgba(62,123,250,0.02)_76.52%)] dark:bg-white/6 dark:text-white/50";

const METRIC_PILL_CLASS =
  "inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-[11px] leading-none shadow-[0_4px_14px_rgba(0,0,0,0.06)] dark:bg-white/8 dark:shadow-none";

const METRIC_PILL_LABEL_CLASS = "font-normal text-[#a3a3a3] dark:text-white/40";

const METRIC_PILL_VALUE_CLASS =
  "font-medium text-[#3e7bfa] dark:text-[#6b7cff]";

const LISTING_BADGE_GRADIENT = "linear-gradient(45deg, #667bf6, #26d0ce)";

const CTA_LINK_CLASS =
  "project-cta-link group relative z-10 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-left no-underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e7bfa]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const CTA_LABEL_CLASS =
  "project-cta-link-label text-[11px] font-medium uppercase leading-[16.7px] text-[#4a4a4a] dark:text-white/70";

const CTA_ARROW_CLASS =
  "size-3.5 shrink-0 text-[#9d9e9f] transition-colors group-hover:text-[#0cd1cf] dark:text-[#a3a3a3] dark:group-hover:text-[#0cd1cf]";

const SCROLL_EASE = [0.33, 1, 0.36, 1] as const;

const SCROLL_VIEWPORT = {
  once: true,
  amount: 0.06,
  margin: "0px 0px -18% 0px",
} as const;

function projectRowVariants(reduceMotion: boolean | null): {
  card: Variants;
  text: Variants;
  body: Variants;
} {
  if (reduceMotion) {
    const idle: Variants = { hidden: {}, visible: {} };
    return { card: idle, text: idle, body: idle };
  }

  return {
    card: {
      hidden: { opacity: 0, y: 48 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.2,
          ease: SCROLL_EASE,
          staggerChildren: 0.2,
          delayChildren: 0.15,
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
    body: {
      hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.05, ease: SCROLL_EASE },
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

function ExternalCta({ href, label }: { href: string; label: string }) {
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
        <span className={CTA_LABEL_CLASS}>{label}</span>
        <ArrowUpRight className={CTA_ARROW_CLASS} aria-hidden />
      </a>
    </div>
  );
}

function CaseStudyCta({
  workItem,
  openModal,
}: {
  workItem: WorkItem;
  openModal: (item: WorkItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const href = projectCaseStudyHref(workItem.id);

  const handleNavigateClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    openModal(workItem);
  };

  return (
    <div className="relative inline-flex">
      <RocketsBurst key={hovered ? "on" : "off"} show={hovered} />
      <Link
        href={href}
        prefetch
        scroll={false}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleNavigateClick}
        className={CTA_LINK_CLASS}
      >
        <span className={CTA_LABEL_CLASS}>Case Study</span>
        <ArrowUpRight className={CTA_ARROW_CLASS} aria-hidden />
      </Link>
    </div>
  );
}

function ProjectListingTags({ tags }: { tags: readonly string[] }) {
  const uniqueTags = [...new Set(tags)];
  if (uniqueTags.length === 0) return null;

  return (
    <ul
      className="flex flex-wrap gap-2"
      aria-label="Technologies used in this project"
    >
      {uniqueTags.map((tag) => (
        <li key={tag}>
          <span className={PROJECT_TECH_TAG_PILL_CLASS}>{tag}</span>
        </li>
      ))}
    </ul>
  );
}

function MetricPills({ pills }: { pills: readonly ProjectMetricPill[] }) {
  if (pills.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {pills.map((pill) => {
        const key = `${pill.prefix ?? ""}${pill.value}${pill.suffix ?? ""}`;

        return (
          <li key={key}>
            <span className={METRIC_PILL_CLASS}>
              {pill.prefix ? (
                <span className={METRIC_PILL_LABEL_CLASS}>{pill.prefix}</span>
              ) : null}
              <span className={METRIC_PILL_VALUE_CLASS}>{pill.value}</span>
              {pill.suffix ? (
                <span className={METRIC_PILL_LABEL_CLASS}>{pill.suffix}</span>
              ) : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function ArchitecturalDecisionRow({
  decision,
  index,
  featured = false,
}: {
  decision: ProjectArchitecturalDecision;
  index: number;
  featured?: boolean;
}) {
  return (
    <div className="flex min-w-0 gap-9 sm:gap-10">
      <ArchitecturalDecisionIcon index={index} featured={featured} />
      <div className="flex min-w-0 flex-col gap-1.5">
        <h4
          className={cn(
            "leading-[1.35]",
            featured
              ? "text-[14px] font-semibold text-[#4353ff] dark:text-[#6b7cff]"
              : "text-[13px] font-semibold text-[#444444] dark:text-white/85",
          )}
        >
          {decision.title}
        </h4>
        <p className="text-[12px] font-normal leading-[1.65] text-black/90 dark:text-white/65">
          {decision.description}
        </p>
      </div>
    </div>
  );
}

function ArchitecturalDecisionsPanel({
  decisions,
}: {
  decisions: readonly ProjectArchitecturalDecision[];
}) {
  const [featured, ...rest] = decisions;

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 lg:max-w-none">
      <div className="flex items-center self-stretch py-0.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#595f7a] dark:text-white/45 sm:text-[10px]">
          Architectural Decisions
        </span>
      </div>

      <div className="flex flex-col">
        {featured ? (
          <div className="relative z-[1] isolate bg-white px-6 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] dark:bg-white/5 dark:shadow-none sm:px-7 sm:py-7">
            <ArchitecturalDecisionRow decision={featured} index={0} featured />
          </div>
        ) : null}

        {rest.length > 0 ? (
          <ul className="relative z-0 flex flex-col pt-1">
            {rest.map((decision, index) => (
              <li
                key={decision.title}
                className={cn(
                  "px-6 py-4 sm:px-7 sm:py-5",
                  index > 0 && "border-t border-[#e4e4e4] dark:border-white/10",
                )}
              >
                <ArchitecturalDecisionRow
                  decision={decision}
                  index={index + 1}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function ProjectListingHeroImage({
  listing,
  workItem,
}: {
  listing: ProjectCardListing;
  workItem: WorkItem;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-[#f9f9f9] aspect-[5/4] min-h-[300px] sm:min-h-[360px] lg:min-h-[480px] dark:border dark:border-white/8 dark:bg-white/2">
      <div className="absolute inset-x-2 top-2 bottom-10 overflow-hidden rounded-sm sm:inset-x-3 sm:top-3 sm:bottom-11 lg:inset-x-1 lg:top-1 lg:bottom-9 dark:bg-white/2">
        <Image
          src={listing.bigImage}
          alt={workItem.title}
          fill
          className="object-contain object-center"
          sizes="(max-width: 1024px) 95vw, 720px"
          unoptimized={
            listing.bigImage.split("?")[0]?.endsWith(".svg") ?? false
          }
          priority
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-[#fbfbfb] via-[#fbfbfb]/60 to-transparent p-3 sm:p-4 dark:from-black/80 dark:via-black/20">
        {listing.heroLabels[0] ? (
          <div className="flex min-w-0 max-w-md flex-col gap-0.5">
            <span className="text-[10px] font-semibold leading-snug text-[#1f202d] sm:text-[11px] dark:text-white/90">
              {listing.heroLabels[0].title}
            </span>
            <span className="text-[10px] leading-snug text-[#636584] dark:text-white/40">
              {listing.heroLabels[0].subtitle}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProjectImageGrid({
  listing,
  workItem,
  mainImageOnRight,
}: {
  listing: ProjectCardListing;
  workItem: WorkItem;
  mainImageOnRight: boolean;
}) {
  const stackedImagePad =
    listing.stackedColumnImagePaddingClassName ?? "px-6 pt-6";

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3",
        mainImageOnRight
          ? "lg:grid-cols-[390px_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_390px]",
        "h-[300px] sm:h-[380px] md:h-[480px] lg:h-[600px]",
      )}
      aria-hidden={!SHOW_PROJECT_IMAGE_GRID}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-sm bg-[#f9f9f9] dark:border-white/[0.08] dark:bg-white/[0.02]",
          mainImageOnRight && "lg:col-start-2 lg:row-start-1",
        )}
      >
        <div
          className={cn(
            "absolute inset-x-6 top-6 overflow-hidden rounded-sm dark:bg-white/[0.02]",
            "bottom-14 md:bottom-24",
          )}
        >
          <Image
            src={listing.bigImage}
            alt={workItem.title}
            fill
            className="object-contain object-center"
            sizes="(max-width:1000px) 95vw, 620px"
            unoptimized={
              listing.bigImage.split("?")[0]?.endsWith(".svg") ?? false
            }
            priority
          />
        </div>
        <div className="absolute bottom-0 inset-x-0 z-10 flex items-end gap-6 bg-gradient-to-t from-[#fbfbfb] via-[#fbfbfb]/60 to-transparent p-3 sm:gap-8 md:p-5 dark:from-black/80 dark:via-black/20">
          {listing.heroLabels.map((lbl) => (
            <div key={lbl.title} className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[10px] font-semibold leading-snug text-[#1f202d] sm:text-[11px] dark:text-white/90">
                {lbl.title}
              </span>
              <span className="sr-only text-[10px] text-[#636584] md:not-sr-only md:inline dark:text-white/40">
                {lbl.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "hidden h-full min-h-0 flex-col gap-3 lg:flex",
          mainImageOnRight && "lg:col-start-1 lg:row-start-1",
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-[#f9f9f9] dark:bg-white/[0.04]">
          <div className={cn("relative min-h-0 flex-1", stackedImagePad)}>
            <div className="relative h-full min-h-px overflow-hidden rounded-sm">
              <Image
                src={listing.topImage}
                alt={listing.topLabel}
                fill
                className="object-contain object-top"
                sizes="350px"
                unoptimized={listing.topImage.endsWith(".svg")}
              />
            </div>
          </div>
          <div className="shrink-0 px-3 pb-3 pt-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-semibold text-[#1f202d] dark:text-white/90">
                {listing.topLabel}
              </span>
              <span className="text-[10px] text-[#8d8fae] dark:text-white/40">
                {listing.topSublabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-sm bg-[#f9f9f9] dark:bg-white/[0.04]">
          <div className={cn("relative min-h-0 flex-1", stackedImagePad)}>
            <div className="relative h-full min-h-[1px] overflow-hidden rounded-sm">
              <Image
                src={listing.bottomImage}
                alt={listing.bottomTitle}
                fill
                className="object-contain object-top"
                sizes="340px"
                unoptimized={listing.bottomImage.endsWith(".svg")}
              />
            </div>
          </div>
          <div className="shrink-0 px-3 pb-3 pt-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-semibold text-[#1f202d] dark:text-white/90">
                {listing.bottomTitle}
              </span>
              <span className="text-[10px] text-[#8d8fae] dark:text-white/40">
                {listing.bottomSubtitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectListingCtas({
  listing,
  workItem,
  openModal,
}: {
  listing: ProjectCardListing;
  workItem: WorkItem;
  openModal: (item: WorkItem) => void;
}) {
  const liveHref =
    workItem.href && workItem.href !== "#" ? workItem.href : null;

  if (listing.ctaVariant === "code-only" && workItem.githubHref) {
    return <ExternalCta href={workItem.githubHref} label="View Code" />;
  }

  if (listing.workItemId === "true-founders") {
    return (
      <>
        <ExternalCta href={PROJECT_CARD_SHOWCASE_FIGMA_HREF} label="Figma" />
        {liveHref ? (
          <ExternalCta href={liveHref} label="Live" />
        ) : (
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
            Soon
          </span>
        )}
      </>
    );
  }

  return (
    <>
      <CaseStudyCta workItem={workItem} openModal={openModal} />
      <ExternalCta href={PROJECT_CARD_SHOWCASE_FIGMA_HREF} label="Figma" />
      {liveHref ? (
        <ExternalCta href={liveHref} label="Live" />
      ) : (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
          Soon
        </span>
      )}
    </>
  );
}

export default function ProjectCard() {
  const { openModal, modalOpen, setModalOpen, selectedItem } =
    useProjectContext();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-32 dark:bg-transparent"
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
          <SectionKicker className="mb-16 md:mb-24" variant="muted">
            Things I&apos;ve Built
          </SectionKicker>
        </motion.div>

        <TracingBeam className="w-full pl-4" svgGradientId="tb-project-card">
          <div className="flex flex-col gap-28 md:gap-32 lg:w-[calc(100%+7rem)] lg:-mr-12">
            {PROJECT_CARD_LISTINGS.map((listing) => {
              const workItem = workItems.find(
                (w) => w.id === listing.workItemId,
              );
              if (!workItem) return null;

              const tags = listing.listingTags ?? workItem.tags;
              const description = listing.listingDesc ?? workItem.desc;
              const v = projectRowVariants(reduceMotion);

              return (
                <motion.article
                  key={listing.workItemId}
                  className="relative flex flex-col gap-8"
                  variants={v.card}
                  initial="hidden"
                  whileInView="visible"
                  viewport={SCROLL_VIEWPORT}
                >
                  <motion.header
                    className="relative z-[1] flex flex-col gap-2.5 md:gap-3"
                    variants={v.text}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="size-[5px] shrink-0 rounded-full"
                        style={{ background: LISTING_BADGE_GRADIENT }}
                      />
                      <span
                        className="bg-clip-text text-[10px] font-semibold uppercase tracking-[0.15em] text-transparent"
                        style={{
                          background: LISTING_BADGE_GRADIENT,
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                        }}
                      >
                        {listing.badge}
                      </span>
                    </div>

                    <h2 className="font-cormorant text-[clamp(2.125rem,4.5vw,2.875rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[#1a1a2e] dark:text-white">
                      {listing.listingTitle ?? workItem.title}
                    </h2>

                    <p className="max-w-[80ch] text-[13px] leading-[1.65] text-[#666666] dark:text-white/55">
                      {description}
                    </p>

                    <div className="flex flex-col gap-2 md:gap-2.5">
                      {listing.metricPills?.length ? (
                        <MetricPills pills={listing.metricPills} />
                      ) : null}

                      <ProjectListingTags tags={tags} />

                      <div className="flex flex-wrap items-center gap-4">
                        <ProjectListingCtas
                          listing={listing}
                          workItem={workItem}
                          openModal={openModal}
                        />
                      </div>
                    </div>
                  </motion.header>

                  <motion.div
                    className="relative z-1 flex flex-col gap-8 lg:flex-row lg:items-start "
                    variants={v.body}
                  >
                    <div className="min-w-0 w-full lg:flex-[7]">
                      <ProjectListingHeroImage
                        listing={listing}
                        workItem={workItem}
                      />
                      <div className={cn(!SHOW_PROJECT_IMAGE_GRID && "hidden")}>
                        <ProjectImageGrid
                          listing={listing}
                          workItem={workItem}
                          mainImageOnRight={false}
                        />
                      </div>
                    </div>

                    <div className="min-w-0 w-full lg:flex-6 lg:max-w-[480px]">
                      <ArchitecturalDecisionsPanel
                        decisions={listing.architecturalDecisions}
                      />
                    </div>
                  </motion.div>
                </motion.article>
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
