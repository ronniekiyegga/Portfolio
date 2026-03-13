"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { LayoutTextFlip } from "@/app/components/ui/layout-text-flip";
import { BackgroundBeams } from "@/components/ui/background-beams";
import ContactInfo from "@/app/components/patterns/ContactInfo";
import { useLoading } from "@/app/contexts/LoadingContext";

const Lanyard = dynamic(() => import("../Lanyard"), { ssr: false });

const stats = [
  { number: "1.2", suffix: "k", label: "Students Reached" },
  { number: "95", suffix: "%", label: "Test Coverage" },
  { number: "40", suffix: "%", label: "Cost Reduction" },
  { number: "3", suffix: "+", label: "Years Shipped" },
];

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "AWS",
  "Docker",
  "Figma",
];

const Y_OFFSET = 32;
const DURATION = 0.7;
const STAGGER = 0.08;
const ENTRANCE_DELAY = 0.35;
const LANYARD_DROP_HEIGHT = 2.2;
const STRING_GLASS_DELAY_MS = 10000;
const STRING_GLASS_OPACITY = 0;

export function Hero() {
  const pathname = usePathname();
  const { isAppReady } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [lanyardDrop, setLanyardDrop] = useState(false);
  const [animationsSettled, setAnimationsSettled] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);

  useEffect(() => {
    if (pathname === "/" || pathname === "/v2") hasAnimated.current = false;
  }, [pathname]);

  useEffect(() => {
    const isHome = pathname === "/" || pathname === "/v2";
    if (!isAppReady || hasAnimated.current || !isHome) return;

    const container = containerRef.current;
    if (!container) return;

    const badge = container.querySelector("[data-hero-badge]");
    const name = container.querySelector("[data-hero-name]");
    const role = container.querySelector("[data-hero-role]");
    const bio = container.querySelector("[data-hero-bio]");
    const contact = container.querySelector("[data-hero-contact]");
    const statsGrid = container.querySelector("[data-hero-stats]");
    const statCells = container.querySelectorAll("[data-hero-stat]");
    const stackRow = container.querySelector("[data-hero-stack]");
    const lanyard = container
      .closest("section")
      ?.querySelector("[data-hero-lanyard]");

    const leftEls = [badge, name, role, bio, contact].filter(Boolean);
    if (leftEls.length === 0) return;

    hasAnimated.current = true;

    gsap.set(leftEls, { opacity: 0, y: Y_OFFSET, force3D: true });
    gsap.set(statsGrid, { opacity: 0, y: Y_OFFSET * 0.8, force3D: true });
    gsap.set(statCells, { opacity: 0, y: 12, force3D: true });
    gsap.set(stackRow, { opacity: 0, y: Y_OFFSET * 0.5, force3D: true });
    if (lanyard) gsap.set(lanyard, { opacity: 0, force3D: true });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", force3D: true },
      delay: ENTRANCE_DELAY,
    });

    tl.to(badge, { opacity: 1, y: 0, duration: DURATION }, 0.1);
    tl.to(name, { opacity: 1, y: 0, duration: DURATION }, 0.1 + STAGGER);
    tl.to(role, { opacity: 1, y: 0, duration: DURATION }, 0.1 + STAGGER * 2);
    tl.to(bio, { opacity: 1, y: 0, duration: DURATION }, 0.1 + STAGGER * 3);
    tl.to(contact, { opacity: 1, y: 0, duration: DURATION }, 0.1 + STAGGER * 4);

    tl.to(
      statsGrid,
      { opacity: 1, y: 0, duration: DURATION * 0.9 },
      0.3 + STAGGER * 2,
    );
    tl.to(
      statCells,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      },
      0.35 + STAGGER * 3,
    );
    tl.to(
      stackRow,
      { opacity: 1, y: 0, duration: DURATION * 0.8 },
      0.45 + STAGGER * 4,
    );

    if (lanyard) {
      tl.call(() => setLanyardDrop(true), undefined, 1.0);
      tl.to(
        lanyard,
        { opacity: 1, duration: 0.6, ease: "power2.out", force3D: true },
        1.0,
      );
    }

    return () => {
      tl.kill();
    };
  }, [isAppReady, pathname]);

  useEffect(() => {
    if (!lanyardDrop) return;
    const t = setTimeout(() => setAnimationsSettled(true), STRING_GLASS_DELAY_MS);
    return () => clearTimeout(t);
  }, [lanyardDrop]);

  const stringOpacity =
    animationsSettled && !cardHovered ? STRING_GLASS_OPACITY : 1;

  return (
    <section
      id="hero-section"
      className="min-h-screen relative overflow-hidden section-white-bg"
    >
      <div className="absolute inset-0">
        <BackgroundBeams
          className="pointer-events-none inset-0 min-h-full"
          beamCount={20}
        />
      </div>

      <div
        ref={containerRef}
        className="max-w-[1440px] mx-auto min-h-screen grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 items-center pt-28 pb-12 md:pt-0 md:pb-0"
      >
        <div className="relative z-20 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20">
          <div
            data-hero-badge
            className="opacity-0 inline-flex items-center gap-2 px-3 pr-4 py-1.5 rounded-full border font-jetbrains text-[10px] tracking-widest uppercase mb-8 self-start"
            style={{
              borderColor: "var(--border)",
              background: "var(--pill-bg)",
              color: "var(--muted)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full pulse-dot"
              style={{
                background:
                  "linear-gradient(144deg, #00CFDE 3.63%, #05A660 94.05%)",
              }}
            />
            Available for roles · London, UK
          </div>

          <h1
            data-hero-name
            className="opacity-0 font-cormorant font-light leading-[0.9] tracking-tight mb-6"
            style={{
              fontSize: "clamp(52px, 6vw, 100px)",
              color: "var(--text)",
            }}
          >
            Ronnie
            <br />
            <em className="italic" style={{ color: "var(--accent)" }}>
              Kiyegga
            </em>
          </h1>

          <div data-hero-role className="opacity-0 mb-8">
            <LayoutTextFlip
              text="I'M A "
              words={["UI DESIGNER", "SOFTWARE ENGINEER", "FULL STACK DEV"]}
            />
          </div>

          <p
            data-hero-bio
            className="opacity-0 text-[15px] leading-[1.7] max-w-[400px] mb-10"
            style={{ color: "var(--muted)" }}
          >
            I{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              design in Figma
            </strong>{" "}
            and{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              build in TypeScript
            </strong>{" "}
            — no handoff, no translation loss. From pixel-perfect interfaces to
            containerised systems, I own the full stack.
          </p>

          <div data-hero-contact className="opacity-0">
            <ContactInfo />
          </div>
        </div>

        <div className="relative z-20 flex flex-col justify-center px-8 md:px-10 lg:px-16 py-20">
          <div
            data-hero-stats
            className="opacity-0 grid grid-cols-2 gap-[2px] rounded-2xl overflow-hidden mb-[2px]"
            style={{ background: "var(--gap)" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                data-hero-stat
                className="opacity-0 p-6 transition-colors duration-200"
                style={{ background: "var(--surface)" }}
              >
                <div
                  className="font-cormorant font-light leading-none mb-1"
                  style={{
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    color: "var(--text)",
                  }}
                >
                  {s.number}
                  <span style={{ color: "var(--stat-suffix)" }}>
                    {s.suffix}
                  </span>
                </div>
                <div
                  className="font-jetbrains text-[10px] tracking-[0.08em] uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div
            data-hero-stack
            className="opacity-0 rounded-xl px-5 py-4 flex gap-2 flex-wrap items-center"
            style={{ background: "var(--surface)" }}
          >
            <span
              className="font-jetbrains text-[9px] tracking-[0.12em] uppercase mr-1"
              style={{ color: "var(--muted)" }}
            >
              Stack
            </span>
            {stack.map((s) => (
              <span
                key={s}
                className="px-2 py-1 rounded font-jetbrains text-[10px]"
                style={{
                  background: "var(--tag-bg)",
                  color: "var(--tag-color)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div data-hero-lanyard className="opacity-0 absolute inset-0 z-25 pointer-events-none">
        <Lanyard
          key={lanyardDrop ? "drop" : "preload"}
          visible
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          fov={22}
          scale={1}
          initialDropHeight={lanyardDrop ? LANYARD_DROP_HEIGHT : undefined}
          stringOpacity={stringOpacity}
          onCardHover={setCardHovered}
          className="md:-translate-x-24"
        />
      </div>
    </section>
  );
}
