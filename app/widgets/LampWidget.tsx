"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/Lamp.module.css";
import SectionKicker from "@/shared/components/ui/section-kicker";
import AnimatedText from "@/shared/components/effects/AnimatedText";

const BAR_Y = 130;
const SQ = 422;
const SQ_HALF = 211;
const LIFT = SQ_HALF - BAR_Y;

const HEADLINE_WORDS: [string, boolean, number][] = [
  ["Intersection\u00a0of\u00a0", false, 2.3],
  ["Design,\u00a0", true, 2.38],
  ["Engineering\u00a0&\u00a0", false, 2.46],
  ["AI", true, 2.54],
];

export default function LampWidget() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        ${styles.hero}
        ${inView ? styles.inView : ""}
        relative md:w-full h-[400px] overflow-hidden md:mb-20 
      `}
    >
      {/* ── Light group ─────────────────────────────────────── */}
      <div
        className={`
          ${styles.lightWrap}
          absolute left-1/2 -translate-x-1/2 pointer-events-none 
        `}
        style={{
          top: `-${LIFT}px`,
          width: `${SQ * 2.1}px`,
          height: `${SQ + 500}px`,
        }}
      >
        {/* Left cone — rotate(-90deg), right edge slightly past centre to eliminate seam */}
        <div
          className={`${styles.cone} absolute top-0`}
          style={{
            right: "calc(50% - 0px)",
            width: `${SQ}px`,
            height: `${SQ}px`,
            transform: "rotate(-90deg)",
            transformOrigin: "center center",
          }}
        />

        {/* Right cone — scaleX(-1) rotate(-90deg), left edge slightly past centre to overlap */}
        <div
          className={`${styles.cone} absolute top-0`}
          style={{
            left: "calc(50% - 1px)",
            width: `${SQ}px`,
            height: `${SQ}px`,
            transform: "scaleX(-1) rotate(-90deg)",
            transformOrigin: "center center",
          }}
        />

        {/* Floor glow — Figma Ellipse 1: #001278, blur(188px) */}
        <div
          className={`
            ${styles.floorGlow}
            absolute left-1/2 -translate-x-1/2
            w-[539px] h-[280px] rounded-full
            bg-[#021165] pointer-events-none
          `}
          style={{
            top: `${SQ * 0.72}px`,
            filter: "blur(188px)",
            opacity: 0.55,
          }}
        />
      </div>

      {/* ── Exploration label (above bar) ───────────────────── */}
      <div
        className={`
          ${styles.labelWrap}
          absolute left-0 right-0
          flex items-center justify-center gap-[14px] whitespace-nowrap z-15
        `}
        style={{ top: `${BAR_Y - 48}px` }}
      >
        <SectionKicker>Things I&apos;ve Built</SectionKicker>
      </div>

      {/* ── Lamp bar ─────────────────────────────────────────── */}
      <div
        className={`
          ${styles.lampBarWrap}
          absolute left-1/2 -translate-x-1/2 w-[420px]
          pointer-events-none z-20
        `}
        style={{ top: `${BAR_Y}px` }}
      >
        <div
          className={`${styles.lampBar} relative w-full h-[3px] rounded-full`}
        />
      </div>

      {/* ── Hero text ────────────────────────────────────────── */}
      <div
        className="
          absolute bottom-0 left-0 right-0 pb-[50px]
          flex flex-col items-center text-center z-15 gap-5
        "
      >
        {/* <AnimatedText /> */}
      </div>
    </section>
  );
}
