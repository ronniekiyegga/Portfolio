"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import FeaturesSliderSection from "@/shared/components/sections/FeaturesSliderSection";
import { cn } from "@/lib/utils";
import type { HeroCarouselSlidesProp } from "@/lib/hero-carousel-types";

const API_PATH = "/api/hero-carousel-slides";

/** Dev: pick up new files quickly. Prod: light polling (serverless FS rarely changes at runtime). */
const POLL_MS =
  process.env.NODE_ENV === "development" ? 1_500 : 30_000;

function slidesSignature(s: HeroCarouselSlidesProp | null | undefined): string {
  if (!s) return "";
  return JSON.stringify({ up: s.up, down: s.down });
}

const HERO_CAROUSEL_FADE_V =
  "pointer-events-none absolute inset-x-0 z-10 h-[clamp(20px,7%,80px)]";

const HERO_CAROUSEL_FADE_H =
  "pointer-events-none absolute inset-y-0 z-10 w-[clamp(20px,8%,72px)]";

/** Slightly narrower + shorter blend so less content washes out on the trailing edge */
const HERO_CAROUSEL_FADE_H_RIGHT =
  "pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(16px,6.5%,58px)]";

function HeroCarouselColumnFade({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate h-[calc(100vh-12rem)] min-h-[520px] overflow-hidden">
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE_V,
          "top-0",
          "bg-[linear-gradient(to_bottom,#FDFBF7_0%,rgba(253,251,247,0)_55%)]",
          "dark:bg-[linear-gradient(to_bottom,#0a0a0a_0%,rgba(10,10,10,0)_55%)]",
        )}
      />
      <div
        aria-hidden
        className={cn(
          HERO_CAROUSEL_FADE_V,
          "bottom-0",
          "bg-[linear-gradient(to_top,#FDFBF7_0%,rgba(253,251,247,0)_78%)]",
          "dark:bg-[linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0)_78%)]",
        )}
      />
      {children}
    </div>
  );
}

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
          HERO_CAROUSEL_FADE_H_RIGHT,
          "bg-[linear-gradient(to_left,#FDFBF7_0%,rgba(253,251,247,0)_72%)]",
          "dark:bg-[linear-gradient(to_left,#0a0a0a_0%,rgba(10,10,10,0)_72%)]",
        )}
      />
      {children}
    </div>
  );
}

type HeroCarouselProps = {
  /** SSR snapshot; client keeps polling `/api/hero-carousel-slides` to pick up new `public/carousel` files. */
  slides?: HeroCarouselSlidesProp | null;
};

const HeroCarousel = ({ slides: initialSlides }: HeroCarouselProps) => {
  const [resolved, setResolved] = useState<HeroCarouselSlidesProp | null>(
    () => initialSlides ?? null,
  );
  const sigRef = useRef(slidesSignature(initialSlides));

  const refresh = useCallback(async (signal?: AbortSignal) => {
    try {
      const url =
        typeof window !== "undefined"
          ? new URL(API_PATH, window.location.origin).toString()
          : API_PATH;
      const res = await fetch(url, {
        cache: "no-store",
        signal,
      });
      if (!res.ok) return;
      const next = (await res.json()) as HeroCarouselSlidesProp;
      if (!Array.isArray(next?.up) || !Array.isArray(next?.down)) return;
      const nextSig = slidesSignature(next);
      if (nextSig !== sigRef.current) {
        sigRef.current = nextSig;
        setResolved(next);
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const initialId = window.setTimeout(() => {
      void refresh(ac.signal);
    }, 0);

    const id = window.setInterval(() => {
      void refresh();
    }, POLL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(initialId);
      ac.abort();
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  const slidesUp =
    resolved?.up && resolved.up.length > 0 ? resolved.up : undefined;
  const slidesDown =
    resolved?.down && resolved.down.length > 0 ? resolved.down : undefined;

  const upKey = slidesUp?.map((s) => s.src).join("|") ?? "default-up";
  const downKey = slidesDown?.map((s) => s.src).join("|") ?? "default-down";

  return (
    <div data-hero-carousel className="min-w-0 w-full self-stretch">
      <div className="mt-8 flex w-full min-w-0 flex-col gap-5 lg:mt-0 lg:hidden">
        <HeroCarouselMobileRowFade>
          <FeaturesSliderSection
            key={`m-up-${upKey}`}
            axis="x"
            direction="right"
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
            key={`m-down-${downKey}`}
            axis="x"
            direction="left"
            dense
            speed={18}
            showHeading={false}
            sectionId="hero-design-down-mobile"
            className="py-0"
            slides={slidesDown}
          />
        </HeroCarouselMobileRowFade>
      </div>

      <div className="hidden min-h-0 min-w-0 w-full max-w-none grid-cols-2 items-stretch gap-6 lg:grid lg:gap-7">
        <HeroCarouselColumnFade>
          <FeaturesSliderSection
            key={`d-down-${downKey}`}
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
        <HeroCarouselColumnFade>
          <FeaturesSliderSection
            key={`d-up-${upKey}`}
            axis="y"
            direction="up"
            dense
            speed={18}
            showHeading={false}
            sectionId="hero-design-up"
            className="py-0"
            slides={slidesUp}
            showCaption
          />
        </HeroCarouselColumnFade>
      </div>
    </div>
  );
};

export default HeroCarousel;
