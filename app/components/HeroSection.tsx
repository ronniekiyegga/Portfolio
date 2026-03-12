"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useLoading } from "@/app/contexts/LoadingContext";
import IntroductionText from "@/app/components/IntroductionText";
import ContactInfo from "./patterns/ContactInfo";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";
import { LogoLoop, type LogoItem } from "./LogoLoop";
import { FaAws } from "react-icons/fa";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });
/** Match V2 Hero exactly */
const LANYARD_DROP_HEIGHT = 2.2;
const LANYARD_DROP_TIME = 1.0;

const stats = [
  { num: "1.2k", label: "Students" },
  { num: "95%", label: "Test Coverage" },
  { num: "40%", label: "Cost Reduction" },
  { num: "3+", label: "Years Shipped" },
];

const LOGO_SIZE = 28;
const stackLogos: LogoItem[] = [
  { src: "/Typescript_Icon.svg", alt: "TypeScript" },
  { src: "/React_Icon.svg", alt: "React" },
  { src: "/Nextjs_Icon.svg", alt: "Next.js" },
  { src: "/Nodejs_Icon.svg", alt: "Node" },
  {
    node: (
      <FaAws
        className="shrink-0"
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
      />
    ),
    ariaLabel: "AWS",
  },
  { src: "/Docker_Icon.svg", alt: "Docker" },
  { src: "/Figma_Icon.svg", alt: "Figma" },
];

export default function HeroSection() {
  const { isAppReady } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [lanyardDrop, setLanyardDrop] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    if (!isAppReady || hasAnimated.current) return;

    const container = containerRef.current;
    if (!container) return;

    const els = container.querySelectorAll(
      "[data-hero-availability], [data-hero-name], [data-hero-intro], [data-hero-stats], [data-hero-stack], [data-hero-contact]",
    );
    if (!els.length) return;

    const lanyard = container
      .closest("section")
      ?.querySelector("[data-hero-lanyard]");

    hasAnimated.current = true;
    // Set initial state before revealing — prevents flash
    gsap.set(els, { opacity: 0, y: 20, force3D: true });
    if (lanyard) gsap.set(lanyard, { opacity: 0, force3D: true });
    setHeroReady(true);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", force3D: true },
    });

    // availability: fadeUp 0.6s @ 0
    tl.to(els[0], { opacity: 1, y: 0, duration: 0.6 }, 0);
    // name: fadeUp 0.6s @ 0.1s
    tl.to(els[1], { opacity: 1, y: 0, duration: 0.6 }, 0.1);
    // intro: fadeUp 0.6s @ 0.2s
    tl.to(els[2], { opacity: 1, y: 0, duration: 0.6 }, 0.2);
    // lanyard: trigger drop + fade in at 1.0s (match V2 exactly)
    if (lanyard) {
      tl.call(() => setLanyardDrop(true), undefined, LANYARD_DROP_TIME);
      tl.to(
        lanyard,
        { opacity: 1, duration: 0.6, ease: "power2.out", force3D: true },
        LANYARD_DROP_TIME,
      );
    }
    // stats: fadeUp 0.6s @ 0.5s
    tl.to(els[3], { opacity: 1, y: 0, duration: 0.6 }, 0.5);
    // stack: fadeUp 0.6s @ 0.6s
    tl.to(els[4], { opacity: 1, y: 0, duration: 0.6 }, 0.6);
    // contact: fadeUp 0.6s @ 0.7s
    tl.to(els[5], { opacity: 1, y: 0, duration: 0.6 }, 0.7);

    return () => {
      void tl.kill();
    };
  }, [isAppReady]);

  // Fallback: show lanyard after delay if animation didn't run (e.g. isAppReady was already true)
  useEffect(() => {
    const t = setTimeout(() => setLanyardDrop(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero-section"
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 pt-24 pb-24 md:pt-32 md:pb-32 bg-[#F4EFE6] dark:bg-neutral-950 relative overflow-hidden"
    >
      {/* Background beams — same as V2 Hero */}
      <div className="absolute inset-0">
        <BackgroundBeams
          className="pointer-events-none inset-0 min-h-full"
          beamCount={20}
        />
      </div>

      <div
        ref={containerRef}
        className={`relative z-10 flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto transition-opacity duration-0 ${!heroReady ? "opacity-0" : ""}`}
      >
        {/* Availability badge */}
        <div
          data-hero-availability
          className="inline-flex items-center gap-2 text-[11.5px] font-medium tracking-[0.1em] uppercase text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full py-1.5 px-3.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for roles · London, UK
        </div>

        {/* Name — Ronnie Kiyegga (single line, matches portfolio_redesign_2) */}
        <h1
          data-hero-name
          className="font-cormorant font-light leading-[0.95] tracking-[-0.02em] text-center mb-5 whitespace-nowrap"
          style={{
            fontSize: "clamp(4rem, 9vw, 8.5rem)",
            color: "var(--text)",
          }}
        >
          Ronnie{" "}
          <em className="italic text-blue-600 dark:text-blue-400 font-light">
            Kiyegga
          </em>
        </h1>

        {/* V1 text — IntroductionText (job title + bio with crafting) */}
        <div
          data-hero-intro
          className="mb-14 w-full flex flex-col items-center justify-center text-center [&_.flex]:justify-center! [&_.text-left]:text-center! [&_.text-left]:mx-auto! [&_.text-left]:max-w-[38ch]"
        >
          <IntroductionText />
        </div>

        {/* Spacer for layout — lanyard overlays full section below */}
        <div className="mb-12 min-h-[280px] w-full" aria-hidden />

        {/* Stats strip — centered, even distribution */}
        <div
          data-hero-stats
          className="w-full max-w-2xl mx-auto flex items-stretch border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden mb-8"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex-1 py-3.5 px-4 text-center ${
                i < stats.length - 1
                  ? "border-r border-neutral-200 dark:border-neutral-700"
                  : ""
              }`}
            >
              <div className="font-cormorant font-semibold text-2xl md:text-3xl leading-none text-neutral-900 dark:text-neutral-100">
                {s.num}
              </div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-neutral-500 dark:text-neutral-400 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack logos — LogoLoop (matches stats width) */}
        <div
          data-hero-stack
          className="w-full max-w-2xl mx-auto mb-10 overflow-hidden [&_.flex]:justify-center!"
        >
          <LogoLoop
            logos={stackLogos}
            speed={40}
            direction="left"
            width="100%"
            logoHeight={LOGO_SIZE}
            gap={48}
            pauseOnHover
            fadeOut
            renderItem={(item) => {
              const isNode = "node" in item;
              return (
                <span
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    width: LOGO_SIZE,
                    height: LOGO_SIZE,
                  }}
                >
                  {isNode ? (
                    (item as { node: ReactNode }).node
                  ) : (
                    <Image
                      src={(item as { src: string }).src}
                      alt={(item as { alt?: string }).alt ?? ""}
                      width={LOGO_SIZE}
                      height={LOGO_SIZE}
                      className="h-full w-full object-contain"
                    />
                  )}
                </span>
              );
            }}
            ariaLabel="Technology stack"
            className="mx-auto [--logoloop-fadeColor:#F4EFE6] dark:[--logoloop-fadeColor:#0a0a0a]"
          />
        </div>

        {/* V1 contact card — centered */}
        <div data-hero-contact className="flex justify-center w-full">
          <div className="w-full max-w-sm mx-auto">
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Lanyard overlay — hidden until 1.0s, then GSAP fades in and drops (like V2) */}
      <div data-hero-lanyard className="opacity-0 absolute inset-0 z-25">
        <Lanyard
          key={lanyardDrop ? "drop" : "preload"}
          visible
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          fov={22}
          scale={0.85}
          stringLineWidth={0.75}
          ropeLength={1.6}
          cardAttachmentY={0.85}
          cardScale={2.8}
          initialDropHeight={lanyardDrop ? LANYARD_DROP_HEIGHT : undefined}
          className="md:translate-x-12 md:-translate-y-1"
        />
      </div>
    </section>
  );
}
