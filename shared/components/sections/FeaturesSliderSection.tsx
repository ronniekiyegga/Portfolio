"use client";

import { Card } from "@/shared/components/ui/card";
import { DesignCardMarquee, DesignMarqueeSection } from "./DesignCardMarquee";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroCarouselImageSlide } from "@/lib/hero-carousel-types";

const projectCard = [
  {
    title: "EduFeedbackPro",
    src: "/images/projects/edufeedbackpro/DMI.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            EduFeedback Pro
          </strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "Maths Tutoring",
    src: "/images/projects/maths-tutoring/MATHS_TUTORING.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            Ms.Maryam&apos;s Math
          </strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "Google Teachable",
    src: "/images/projects/knn-classifier/google-teachable/GOOGLE_TEACHABLE.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            Google Teachable Machine
          </strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "AI-Pseudocode",
    src: "/images/projects/algo-pseudo/AI_PSEUDOCODE.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">AI-Pseudocode</strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "TrueFounders",
    src: "/images/projects/truefounders/TRUE_FOUNDERS.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">TrueFounders</strong>{" "}
          with AI-powered suggestions, templates, and seamless collaboration for
          faster communication.
        </p>
      </>
    ),
  },
  {
    title: "Github Finder",
    src: "/images/projects/github-finder/GITHUB_FINDER.svg",
    description: (
      <>
        <p className="text-muted-foreground text-balance">
          <strong className="text-foreground font-medium">
            Github Finders
          </strong>{" "}
          Desktop and mobile User interface designed to display GitHub user
          profiles and repositories
        </p>
      </>
    ),
  },
];

interface FeaturesSliderSectionProps {
  backgroundImage?: string;
  backgroundColor?: string;
  direction?: "left" | "right" | "up" | "down";
  axis?: "x" | "y";
  dense?: boolean;
  speed?: number;
  showHeading?: boolean;
  /** Overrides root `id` (avoids duplicate ids when multiple sliders on one page) */
  sectionId?: string;
  className?: string;
  /**
   * When set and non-empty, replaces the default project card list with these slides
   * (e.g. hero webp assets under `/carousel`).
   */
  slides?: HeroCarouselImageSlide[];
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
      : projectCard.map((c) => ({
          src: c.src,
          title: c.title,
          alt: c.title,
        }));

  const cards = slideSources.map((content, index) => (
    <div
      key={`${content.src}-${index}`}
      className={
        axis === "y"
          ? cn(
              "flex w-full shrink-0 flex-col gap-4",
              dense ? "my-2 max-w-[min(420px,100%)]" : "my-4 max-w-[400px]",
            )
          : "flex w-[min(480px,40vw)] min-w-[280px] my-4 max-w-[500px] shrink-0 flex-col gap-4"
      }
    >
      <Card
        className={`ring-indigo-600 bg-${backgroundColor} border-white shadow-black/4 relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl shadow-lg ring-0`}
        style={{
          backgroundImage: `url(${backgroundImage.startsWith("/") ? backgroundImage : `/${backgroundImage}`})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image
          src={content.src}
          alt={content.alt ?? content.title}
          width={axis === "y" ? (dense ? 420 : 320) : 380}
          height={axis === "y" ? (dense ? 420 : 320) : 380}
          sizes={
            axis === "y"
              ? dense
                ? "(max-width: 1024px) 360px, 420px"
                : "(max-width: 1024px) 300px, 360px"
              : "(max-width: 640px) 280px, 460px"
          }
          className="absolute inset-0 size-full object-contain opacity-95 transition-opacity duration-500 hover:opacity-100"
        />
      </Card>
      {/* {content.description} */}
    </div>
  ));

  // Hero embeds this vertically inside a fixed-height, overflow-hidden container.
  // Using DesignMarqueeSection (py-24) can clip everything; so use a slim wrapper.
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

{
  /* <div className="scale-90">
  <AiAutocompleteIllustration />
</div> */
}

{
  /* <div className="scale-90">
    <TranslationInterfaceIllustration />
</div> */
}
