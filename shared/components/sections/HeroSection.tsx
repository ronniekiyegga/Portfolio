"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { BackgroundBeams } from "@/shared/components/ui/background-beams";
import HeroCarousel from "@/app/components/HeroCarousel";
import HeroBio from "@/app/components/HeroBio";
import ContactInfo from "@/shared/components/media/patterns/ContactInfo";
import { cn } from "@/lib/utils";
import type { HeroCarouselSlidesProp } from "@/lib/hero-carousel-types";
const Lanyard = dynamic(() => import("@/shared/components/effects/Lanyard"), {
  ssr: false,
});
const LANYARD_DROP_HEIGHT = 2.2;
const ENTRANCE_DELAY = 0.28;
const LANYARD_DROP_TIME = 1.3; /* when els[5] finishes (0.7 + 0.6) */
const STRING_GLASS_DELAY_MS = 6000;
const STRING_GLASS_OPACITY = 1;

type ContactLiftRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export default function HeroSection({
  heroCarouselSlides,
}: {
  heroCarouselSlides?: HeroCarouselSlidesProp | null;
} = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [lanyardDrop, setLanyardDrop] = useState(false);
  const [animationsSettled, setAnimationsSettled] = useState(false);
  const [cardMoving, setCardMoving] = useState(true);
  const [cardHovered, setCardHovered] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [lanyardHitHover, setLanyardHitHover] = useState(false);
  const contactLiftTargetRef = useRef<HTMLDivElement>(null);
  const [contactLift, setContactLift] = useState<ContactLiftRect | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const target = contactLiftTargetRef.current;
    if (!section || !target) return;

    const update = (): void => {
      if (typeof window === "undefined" || window.innerWidth < 1024) {
        setContactLift(null);
        return;
      }
      const sr = section.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      setContactLift({
        top: tr.top - sr.top,
        left: tr.left - sr.left,
        width: tr.width,
        height: tr.height,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(section);
    ro.observe(target);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  React.useEffect(() => {
    if (hasAnimated.current) return;

    const root = sectionRef.current;
    if (!root) return;

    const els = root.querySelectorAll(
      "[data-hero-availability], [data-hero-name], [data-hero-intro], [data-hero-stack], [data-hero-contact], [data-hero-carousel]",
    );
    if (!els.length) return;

    hasAnimated.current = true;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setHeroReady(true);
      setLanyardDrop(true);
      els.forEach((el) => gsap.set(el, { opacity: 1, y: 0, x: 0 }));
      const liftEl = root.querySelector("[data-hero-contact-lift]");
      if (liftEl) gsap.set(liftEl, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const liftEl = root.querySelector("[data-hero-contact-lift]");

    gsap.set(els, { opacity: 0, y: 20, force3D: true });
    if (liftEl) gsap.set(liftEl, { opacity: 0, y: 20, force3D: true });
    const carouselEl = root.querySelector("[data-hero-carousel]");
    if (carouselEl) {
      gsap.set(carouselEl, {
        opacity: 0,
        y: -48,
        x: 0,
        force3D: true,
      });
    }
    queueMicrotask(() => setHeroReady(true));

    const fallbackTimer = setTimeout(() => {
      els.forEach((el) => gsap.set(el, { opacity: 1, y: 0, x: 0 }));
      if (liftEl) gsap.set(liftEl, { opacity: 1, y: 0, x: 0 });
      setLanyardDrop(true);
    }, 4000);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", force3D: true },
      delay: ENTRANCE_DELAY,
    });

    tl.to(els[0], { opacity: 1, y: 0, duration: 0.6 }, 0);
    tl.to(els[1], { opacity: 1, y: 0, duration: 0.6 }, 0.1);
    tl.to(els[2], { opacity: 1, y: 0, duration: 0.6 }, 0.2);
    tl.call(() => setLanyardDrop(true), undefined, LANYARD_DROP_TIME);
    tl.to(els[3], { opacity: 1, y: 0, duration: 0.6 }, 0.5);
    const contactTweenTargets = [els[4], liftEl].filter(Boolean);
    tl.to(contactTweenTargets, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
    if (carouselEl) {
      tl.to(
        carouselEl,
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.85,
          ease: "power2.out",
        },
        0.42,
      );
    }

    return () => {
      clearTimeout(fallbackTimer);
      void tl.kill();
    };
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setLanyardDrop(true), 4000);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (!lanyardDrop) {
      setAnimationsSettled(false);
      return;
    }
    if (cardMoving) {
      setAnimationsSettled(false);
      return;
    }
    const t = setTimeout(
      () => setAnimationsSettled(true),
      STRING_GLASS_DELAY_MS,
    );
    return () => clearTimeout(t);
  }, [lanyardDrop, cardMoving]);

  const stringOpacity =
    animationsSettled && !cardMoving && !cardHovered ? STRING_GLASS_OPACITY : 1;
  const lanyardInteractive = lanyardHitHover || cardHovered || cardMoving;

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-5 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 bg-[#fdfbf7bd] dark:bg-neutral-950 relative"
    >
      {/* Clip beams only — section overflow was clipping the lanyard canvas on the right */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundBeams
          className="pointer-events-none inset-0 min-h-full"
          beamCount={26}
          opacity={0.8}
        />
      </div>

      <div
        ref={containerRef}
        className={cn(
          "relative z-10 w-full max-w-7xl mx-auto transition-opacity duration-0",
          !heroReady && "opacity-0",
        )}
        suppressHydrationWarning
      >
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[minmax(0,600px)_1fr] lg:items-stretch lg:gap-8 ">
          {/* Left: hero text + contact */}
          <HeroBio contactLiftTargetRef={contactLiftTargetRef} />
          {/* Right: take full viewport height (within hero padding) */}
          <HeroCarousel slides={heroCarouselSlides} />
        </div>
      </div>

      {/* Lanyard */}
      <div
        ref={lanyardRef}
        data-hero-lanyard
        className="pointer-events-none absolute inset-y-0 left-1/2 z-25 hidden h-full w-screen max-w-[100vw] -translate-x-1/2 lg:block"
        style={{
          opacity: lanyardDrop ? 1 : 0,
          visibility: lanyardDrop ? "visible" : "hidden",
          transition: "none",
        }}
      >
        {/* Hit-area: enables lanyard interaction without blocking contact UI */}
        <div
          className="pointer-events-auto absolute left-1/2 top-[18%] h-[520px] w-[520px] -translate-x-1/2 rounded-[28px]"
          onMouseEnter={() => setLanyardHitHover(true)}
          onMouseLeave={() => setLanyardHitHover(false)}
          aria-hidden
        />
        <Lanyard
          key={lanyardDrop ? "drop" : "preload"}
          visible={lanyardDrop}
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          fov={22}
          scale={0.85}
          stringLineWidth={0.75}
          cardAttachmentY={0.85}
          cardScale={2.8}
          initialDropHeight={lanyardDrop ? LANYARD_DROP_HEIGHT : undefined}
          stringOpacity={stringOpacity}
          onCardHover={setCardHovered}
          onCardMotionChange={setCardMoving}
          interactive={lanyardInteractive}
          angularDamping={8}
          linearDamping={6}
          className="md:-translate-x-20 lg:-translate-x-32 md:-translate-y-2"
        />
      </div>

      {/* lg: duplicate ContactInfo positioned over the layout anchor, z above lanyard */}
      <div
        data-hero-contact-lift
        aria-hidden={!contactLift}
        className={cn(
          "pointer-events-auto absolute z-35 hidden max-w-sm transition-opacity duration-0 lg:block",
          !heroReady && "opacity-0",
          !contactLift && "pointer-events-none opacity-0",
        )}
        style={
          contactLift
            ? {
                top: contactLift.top,
                left: contactLift.left,
                width: contactLift.width,
                minHeight: contactLift.height,
              }
            : undefined
        }
      >
        <ContactInfo />
      </div>
    </section>
  );
}
