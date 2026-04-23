"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Code2 } from "lucide-react";

const WORDS = [
  { text: "DESIGN.", icon: "figma" },
  { text: "CODE.", icon: "code" },
  { text: "PRODUCTION.", icon: "deploy" },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

function SlotIcon({
  type,
  className,
}: {
  type: "figma" | "code" | "deploy";
  className?: string;
}) {
  if (type === "figma") {
    return (
      <Image
        src="/images/illustrations/Figma.svg"
        alt="Design"
        width={40}
        height={57}
        className={`${className ?? ""} w-8 h-auto md:w-10`}
      />
    );
  }
  if (type === "code") {
    return (
      <Code2
        className={`${className ?? ""} w-8 h-8 md:w-10 md:h-10 text-[#4a2d8a] dark:text-violet-400`}
        strokeWidth={2}
      />
    );
  }
  if (type === "deploy") {
    return (
      <span
        className={`${className ?? ""} flex items-center justify-center text-xl md:text-2xl`}
        role="img"
        aria-label="Deploy"
      >
        🚀
      </span>
    );
  }
  return null;
}

const ANIMATION_TIMEOUT_MS = 8000;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const completedRef = useRef(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Safety: dismiss loading screen if animation never completes (e.g. Turbopack/Strict Mode issues)
  useEffect(() => {
    const t = setTimeout(() => {
      if (!completedRef.current) onComplete();
    }, ANIMATION_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const slots = slotsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!overlay || slots.length !== 3) {
      // Refs not ready or DOM incomplete—skip animation to avoid getting stuck
      const t = setTimeout(onComplete, 300);
      return () => clearTimeout(t);
    }

    // Custom eases: expo.out = fast start, gentle landing (premium feel)
    const easeIn = "expo.out";
    const easeOut = "expo.in"; // gentle start, accelerates away
    const easeSoft = "power2.inOut"; // for overlay handoff

    const tl = gsap.timeline({
      defaults: { force3D: true, overwrite: "auto" },
      onComplete: () => {
        completedRef.current = true;
        onComplete();
      },
    });

    // Words: left-to-right
    const fromLeft = { opacity: 0, x: -12, y: 0, scale: 0.98 };
    const toVisible = { opacity: 1, x: 0, y: 0, scale: 1 };

    slots.forEach((slot) => {
      const word = slot.querySelector("[data-word]") as HTMLElement;
      const icon = slot.querySelector("[data-icon]") as HTMLElement;
      if (!word || !icon) return;
      gsap.set(word, fromLeft);
      gsap.set(icon, { opacity: 0, y: 6, scale: 0.97 });
    });

    // Words: left-to-right with staggered entrance (expo.out = snappy landing)
    const wordStagger = 0.038;
    slots.forEach((slot, i) => {
      const word = slot.querySelector("[data-word]") as HTMLElement;
      tl.to(
        word,
        {
          ...toVisible,
          duration: 0.4,
          ease: easeIn,
        },
        i * wordStagger,
      );
    });

    // Brief hold at peak, then words fade + subtle scale down (dissolve)
    tl.addLabel("wordsOut", "+=0.25");
    slots.forEach((slot, i) => {
      const word = slot.querySelector("[data-word]") as HTMLElement;
      tl.to(
        word,
        {
          opacity: 0,
          scale: 0.98,
          duration: 0.45,
          ease: easeOut,
        },
        `wordsOut+=${i * 0.02}`,
      );
    });

    // ~0.5s pause, then icons: subtle float-up + scale (landing feel)
    const iconStagger = 0.05;
    tl.addLabel("iconsIn", "wordsOut+=0.95");
    slots.forEach((slot, i) => {
      const icon = slot.querySelector("[data-icon]") as HTMLElement;
      tl.fromTo(
        icon,
        { opacity: 0, y: 8, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.1)", // micro overshoot = alive, not bouncy
        },
        `iconsIn+=${i * iconStagger}`,
      );
    });

    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.6,
        ease: easeSoft,
        onStart: () => {
          overlay.style.pointerEvents = "none";
        },
      },
      "iconsIn+=2.2",
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-white dark:bg-neutral-950 overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 sm:flex-row sm:gap-8 md:gap-10"
        style={{ minHeight: "100dvh" }}
      >
        {WORDS.map(({ text, icon }, index) => (
          <div
            key={text}
            ref={(el) => {
              slotsRef.current[index] = el;
            }}
            className="relative flex min-h-10 min-w-[150px] shrink-0 items-center justify-center overflow-visible sm:min-w-[150px] md:min-h-11 md:min-w-[200px]"
          >
            <span
              data-word
              className="absolute inset-0 flex items-center justify-center text-xl font-semibold tracking-tight md:text-2xl"
              style={{
                opacity: 0,
                background:
                  "linear-gradient(77deg, #3a07f2 10.26%, #0cd1cf 98.05%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {text}
            </span>
            <div
              data-icon
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 0 }}
            >
              <SlotIcon type={icon as "figma" | "code" | "deploy"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
