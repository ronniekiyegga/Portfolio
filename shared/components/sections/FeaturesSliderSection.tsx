"use client";

import { Card } from "@/shared/components/ui/card";
import { DesignCardMarquee, DesignMarqueeSection } from "./DesignCardMarquee";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroCarouselImageSlide } from "@/lib/hero-carousel-types";

const HERO_SLIDE_VIDEO_EXT = /\.(webm|mp4)$/i;

/** The same purple→cyan gradient used on "Kiyegga" in the hero name */
const KIYEGGA_GRADIENT = "linear-gradient(77deg, #3a07f2 10.26%, #0cd1cf 98.05%)";

const projectCard = [
  { title: "EduFeedbackPro",  src: "/images/projects/edufeedbackpro/DMI.svg" },
  { title: "Ms Maryam's Maths",  src: "/images/projects/maths-tutoring/MATHS_TUTORING.svg" },
  { title: "Google Teachable", src: "/images/projects/knn-classifier/google-teachable/GOOGLE_TEACHABLE.svg" },
  { title: "AI-Pseudocode",   src: "/images/projects/algo-pseudo/AI_PSEUDOCODE.svg" },
  { title: "TrueFounders",    src: "/images/projects/truefounders/TrueFounders_hero.webp" },
  { title: "GitHub Data Platform",   src: "/images/projects/github-finder/GITHUB_FINDER.svg" },
];

interface FeaturesSliderSectionProps {
  backgroundImage?: string;
  backgroundColor?: string;
  direction?: "left" | "right" | "up" | "down";
  axis?: "x" | "y";
  dense?: boolean;
  speed?: number;
  showHeading?: boolean;
  sectionId?: string;
  className?: string;
  slides?: HeroCarouselImageSlide[];
  /** @deprecated captions now always render when caption data exists */
  showCaption?: boolean;
}

export default function FeaturesSliderSection({
  backgroundImage = "url(/images/backgrounds/BG_1.png)",
  backgroundColor = "bg-transparent",
  direction = "left",
  axis = "x",
  dense = false,
  speed = 40,
  showHeading = true,
  sectionId,
  className,
  slides,
}: FeaturesSliderSectionProps) {
  const resolvedId =
    sectionId ?? (direction === "right" ? "design-reverse" : "design");

  const slideSources: HeroCarouselImageSlide[] =
    slides && slides.length > 0
      ? slides
      : projectCard.map((c) => ({ src: c.src, title: c.title, alt: c.title }));

  const cards = slideSources.map((content, index) => (
    <div
      key={`${content.src}-${index}`}
      className={
        axis === "y"
          ? cn(
              "flex w-full shrink-0 flex-col gap-4",
              dense ? "my-2 max-w-[min(420px,100%)]" : "my-4 max-w-[400px]",
            )
          : dense
            ? "flex w-[min(220px,42vw)] min-w-[180px] max-w-[240px] shrink-0 flex-col gap-2 my-2"
            : "flex w-[min(480px,40vw)] min-w-[280px] my-4 max-w-[500px] shrink-0 flex-col gap-4"
      }
    >
      <div className="relative">
        <Card
          className={`ring-indigo-600 bg-${backgroundColor} border-white shadow-black/4 relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl shadow-lg ring-0`}
          style={{
            backgroundImage: `url(${backgroundImage.startsWith("/") ? backgroundImage : `/${backgroundImage}`})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {HERO_SLIDE_VIDEO_EXT.test(content.src) ? (
            <video
              src={content.src}
              className="absolute inset-0 size-full object-contain opacity-95 transition-opacity duration-500 hover:opacity-100"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-label={content.alt ?? content.title}
            />
          ) : (
            <Image
              src={content.src}
              alt={content.alt ?? content.title}
              width={axis === "y" ? (dense ? 420 : 320) : dense ? 240 : 380}
              height={axis === "y" ? (dense ? 420 : 320) : dense ? 240 : 380}
              sizes={
                axis === "y"
                  ? dense
                    ? "(max-width: 1024px) 360px, 420px"
                    : "(max-width: 1024px) 300px, 360px"
                  : dense
                    ? "(max-width: 640px) 42vw, 240px"
                    : "(max-width: 640px) 280px, 460px"
              }
              className="absolute inset-0 size-full object-contain opacity-95 transition-opacity duration-500 hover:opacity-100"
              unoptimized={content.src.endsWith(".svg")}
            />
          )}

          {content.caption && content.caption.length > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center rounded-full bg-white/80 px-2.5 py-1 backdrop-blur-sm dark:bg-black/60">

              {/* Mobile: project name only */}
              <span className="sm:hidden font-jetbrains text-[7px] tracking-[0.16em] uppercase leading-none text-neutral-700 dark:text-neutral-200">
                {content.caption[0]}
              </span>

              {/* sm+: all segments */}
              <span className="hidden sm:flex items-center">
                {content.caption.map((segment, i) => {
                  const isLast = i === content.caption!.length - 1;
                  return (
                    <span key={i} className="flex items-center">
                      {i > 0 && (
                        <span className="mx-1 font-jetbrains text-[7px] leading-none text-neutral-400 dark:text-neutral-500">
                          ·
                        </span>
                      )}
                      {isLast ? (
                        <span
                          className="font-jetbrains text-[7px] tracking-[0.16em] uppercase leading-none font-semibold"
                          style={{
                            background: KIYEGGA_GRADIENT,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                          }}
                        >
                          {segment}
                        </span>
                      ) : (
                        <span className="font-jetbrains text-[7px] tracking-[0.16em] uppercase leading-none text-neutral-700 dark:text-neutral-200">
                          {segment}
                        </span>
                      )}
                    </span>
                  );
                })}
              </span>

            </div>
          )}
        </Card>
      </div>
    </div>
  ));

  if (axis === "y" && !showHeading) {
    return (
      <div className={cn("w-full h-full min-h-0 overflow-hidden", className)}>
        <DesignCardMarquee
          itemCount={slideSources.length}
          direction={direction}
          axis="y"
          speed={speed}
          className="h-full min-h-0"
        >
          {cards}
        </DesignCardMarquee>
      </div>
    );
  }

  if (axis === "x" && !showHeading) {
    return (
      <div className={cn("w-full min-h-0 overflow-hidden", className)}>
        <DesignCardMarquee
          itemCount={slideSources.length}
          direction={direction}
          axis="x"
          speed={speed}
          className="w-full"
        >
          {cards}
        </DesignCardMarquee>
      </div>
    );
  }

  return (
    <DesignMarqueeSection
      id={resolvedId}
      itemCount={slideSources.length}
      direction={direction}
      axis={axis}
      speed={speed}
      showHeading={showHeading}
      className={cn("bg-transparent @container py-2", className)}
    >
      {cards}
    </DesignMarqueeSection>
  );
}
