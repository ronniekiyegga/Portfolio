import type { ReactNode } from "react";
import FeaturesSliderSection from "@/shared/components/sections/FeaturesSliderSection";
import { cn } from "@/lib/utils";
import type { HeroCarouselSlidesProp } from "@/lib/hero-carousel-types";

const HERO_CAROUSEL_FADE_V =
  "pointer-events-none absolute inset-x-0 z-10 h-[clamp(32px,10%,100px)]";

const HERO_CAROUSEL_FADE_H =
  "pointer-events-none absolute inset-y-0 z-10 w-[clamp(20px,8%,72px)]";

function HeroCarouselColumnFade({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate h-[calc(100vh-12rem)] min-h-[520px] overflow-hidden">
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE_V,
          "top-0",
          "bg-[linear-gradient(to_bottom,#FDFBF7_0%,rgba(253,251,247,0)_70%)]",
          "dark:bg-[linear-gradient(to_bottom,#0a0a0a_0%,rgba(10,10,10,0)_70%)]",
        )}
      />
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE_V,
          "bottom-0",
          "bg-[linear-gradient(to_top,#FDFBF7_0%,rgba(253,251,247,0)_100%)]",
          "dark:bg-[linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0)_100%)]",
        )}
      />
      {children}
    </div>
  );
}

/** Left/right edge fade for horizontal hero rows (mobile). */
function HeroCarouselMobileRowFade({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate w-full min-w-0 overflow-hidden py-1">
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE_H,
          "left-0",
          "bg-[linear-gradient(to_right,#FDFBF7_0%,rgba(253,251,247,0)_100%)]",
          "dark:bg-[linear-gradient(to_right,#0a0a0a_0%,rgba(10,10,10,0)_100%)]",
        )}
      />
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE_H,
          "right-0",
          "bg-[linear-gradient(to_left,#FDFBF7_0%,rgba(253,251,247,0)_100%)]",
          "dark:bg-[linear-gradient(to_left,#0a0a0a_0%,rgba(10,10,10,0)_100%)]",
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
    <div data-hero-carousel className="min-w-0 w-full self-stretch">
      {/* Mobile / tablet: two horizontal marquees (matches up/down columns). */}
      <div className="mt-8 flex w-full min-w-0 flex-col gap-5 lg:mt-0 lg:hidden">
        <HeroCarouselMobileRowFade>
          <FeaturesSliderSection
            axis="x"
            direction="left"
            dense
            speed={18}
            showHeading={false}
            sectionId="hero-design-up-mobile"
            className="py-0"
            slides={slidesUp}
          />
        </HeroCarouselMobileRowFade>
        <HeroCarouselMobileRowFade>
          <FeaturesSliderSection
            axis="x"
            direction="right"
            dense
            speed={18}
            showHeading={false}
            sectionId="hero-design-down-mobile"
            className="py-0"
            slides={slidesDown}
          />
        </HeroCarouselMobileRowFade>
      </div>

      {/* Desktop: vertical columns */}
      <div className="hidden min-h-0 min-w-0 w-full max-w-none grid-cols-2 items-stretch gap-6 lg:grid lg:gap-7">
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
    </div>
  );
};

export default HeroCarousel;
