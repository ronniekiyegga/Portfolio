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

/**
 * Vertical fade bar — tall enough to dissolve 1–2 full cards.
 * Light:  cream  #FDFBF7  (matches HeroSection bg-[#FDFBF7])
 * Dark:   near-black #0a0a0a  (matches dark:bg-neutral-950)
 */
const FADE_V = "pointer-events-none absolute inset-x-0 z-10 h-[clamp(80px,18%,180px)]";
const FADE_H = "pointer-events-none absolute inset-y-0 z-10 w-[clamp(40px,12%,100px)]";
const FADE_H_RIGHT = "pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(32px,10%,80px)]";

function HeroCarouselColumnFade({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate h-[calc(100vh-12rem)] min-h-[520px] overflow-hidden">
      {/* ── Top fade ── */}
      {/* Light mode: cream */}
      <div
        aria-hidden
        className={cn(FADE_V, "top-0 block dark:hidden")}
        style={{ background: "linear-gradient(to bottom, #FDFBF7 0%, rgba(253,251,247,0) 70%)" }}
      />
      {/* Dark mode: near-black */}
      <div
        aria-hidden
        className={cn(FADE_V, "top-0 hidden dark:block")}
        style={{ background: "linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0) 70%)" }}
      />

      {/* ── Bottom fade ── */}
      {/* Light mode: cream */}
      <div
        aria-hidden
        className={cn(FADE_V, "bottom-0 block dark:hidden")}
        style={{ background: "linear-gradient(to top, #FDFBF7 0%, rgba(253,251,247,0) 85%)" }}
      />
      {/* Dark mode: near-black */}
      <div
        aria-hidden
        className={cn(FADE_V, "bottom-0 hidden dark:block")}
        style={{ background: "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0) 85%)" }}
      />

      {children}
    </div>
  );
}

function HeroCarouselMobileRowFade({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate w-full min-w-0 overflow-hidden py-1">
      {/* ── Left fade ── */}
      <div
        aria-hidden
        className={cn(FADE_H, "left-0 block dark:hidden")}
        style={{ background: "linear-gradient(to right, #FDFBF7 0%, rgba(253,251,247,0) 100%)" }}
      />
      <div
        aria-hidden
        className={cn(FADE_H, "left-0 hidden dark:block")}
        style={{ background: "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0) 100%)" }}
      />

      {/* ── Right fade ── */}
      <div
        aria-hidden
        className={cn(FADE_H_RIGHT, "block dark:hidden")}
        style={{ background: "linear-gradient(to left, #FDFBF7 0%, rgba(253,251,247,0) 100%)" }}
      />
      <div
        aria-hidden
        className={cn(FADE_H_RIGHT, "hidden dark:block")}
        style={{ background: "linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0) 100%)" }}
      />

      {children}
    </div>
  );
}

type HeroCarouselProps = {
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
      const res = await fetch(url, { cache: "no-store", signal });
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
    const initialId = window.setTimeout(() => void refresh(ac.signal), 0);
    const id = window.setInterval(() => void refresh(), POLL_MS);
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

  const slidesUp   = resolved?.up?.length   ? resolved.up   : undefined;
  const slidesDown = resolved?.down?.length  ? resolved.down : undefined;

  const upKey   = slidesUp?.map((s) => s.src).join("|")   ?? "default-up";
  const downKey = slidesDown?.map((s) => s.src).join("|") ?? "default-down";

  return (
    <div data-hero-carousel className="min-w-0 w-full self-stretch">
      {/* Mobile: horizontal rows */}
      <div className="mt-8 flex w-full min-w-0 flex-col gap-5 lg:mt-0 lg:hidden">
        <HeroCarouselMobileRowFade>
          <FeaturesSliderSection
            key={`m-up-${upKey}`}
            axis="x" direction="right" dense speed={18}
            showHeading={false} sectionId="hero-design-up-mobile"
            className="py-0" slides={slidesUp}
          />
        </HeroCarouselMobileRowFade>
        <HeroCarouselMobileRowFade>
          <FeaturesSliderSection
            key={`m-down-${downKey}`}
            axis="x" direction="left" dense speed={18}
            showHeading={false} sectionId="hero-design-down-mobile"
            className="py-0" slides={slidesDown}
          />
        </HeroCarouselMobileRowFade>
      </div>

      {/* Desktop: two vertical columns */}
      <div className="hidden min-h-0 min-w-0 w-full max-w-none grid-cols-2 items-stretch gap-6 lg:grid lg:gap-7">
        <HeroCarouselColumnFade>
          <FeaturesSliderSection
            key={`d-down-${downKey}`}
            axis="y" direction="down" dense speed={18}
            showHeading={false} sectionId="hero-design-down"
            className="py-0" slides={slidesDown}
          />
        </HeroCarouselColumnFade>
        <HeroCarouselColumnFade>
          <FeaturesSliderSection
            key={`d-up-${upKey}`}
            axis="y" direction="up" dense speed={18}
            showHeading={false} sectionId="hero-design-up"
            className="py-0" slides={slidesUp}
          />
        </HeroCarouselColumnFade>
      </div>
    </div>
  );
};

export default HeroCarousel;
