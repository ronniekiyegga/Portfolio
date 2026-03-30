import type { ReactNode } from "react";
import FeaturesSliderSection from "@/shared/components/sections/FeaturesSliderSection";
import { cn } from "@/lib/utils";
import type { HeroCarouselSlidesProp } from "@/lib/hero-carousel-types";

const HERO_CAROUSEL_FADE =
  "pointer-events-none absolute inset-x-0 z-10 h-[clamp(32px,10%,100px)]";

function HeroCarouselColumnFade({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate h-[calc(100vh-12rem)] min-h-[520px] overflow-hidden">
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE,
          "top-0",
          "bg-[linear-gradient(to_bottom,#FDFBF7_0%,rgba(253,251,247,0)_70%)]",
          "dark:bg-[linear-gradient(to_bottom,#0a0a0a_0%,rgba(10,10,10,0)_70%)]",
        )}
      />
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE,
          "bottom-0",
          "bg-[linear-gradient(to_top,#FDFBF7_0%,rgba(253,251,247,0)_100%)]",
          "dark:bg-[linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0)_100%)]",
        )}
      />
      {children}
    </div>
  );
}

type HeroCarouselProps = {
  /** When omitted or a column has no slides, that column uses the default project thumbnails. */
  slides?: HeroCarouselSlidesProp | null;
};

const HeroCarousel = ({ slides }: HeroCarouselProps) => {
  const slidesUp =
    slides?.up && slides.up.length > 0 ? slides.up : undefined;
  const slidesDown =
    slides?.down && slides.down.length > 0 ? slides.down : undefined;

  return (
    <div className="hidden lg:grid min-h-0 min-w-0 w-full max-w-none grid-cols-2 gap-6 lg:gap-7 items-stretch">
      <HeroCarouselColumnFade>
        <FeaturesSliderSection
          axis="y"
          direction="up"
          dense
          speed={18}
          showHeading={false}
          sectionId="hero-design-up"
          className="py-0"
          slides={slidesUp}
        />
      </HeroCarouselColumnFade>
      <HeroCarouselColumnFade>
        <FeaturesSliderSection
          axis="y"
          direction="down"
          dense
          speed={18}
          showHeading={false}
          sectionId="hero-design-down"
          className="py-0"
          slides={slidesDown}
        />
      </HeroCarouselColumnFade>
    </div>
  );
};

export default HeroCarousel;
