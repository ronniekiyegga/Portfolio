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
        src="/Figma.svg"
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
        className={`${className ?? ""} w-8 h-8 md:w-10 md:h-10 text-[#6B46C1] dark:text-violet-400`}
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

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const slots = slotsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!overlay || slots.length !== 3) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", force3D: true },
      onComplete: onComplete,
    });

    const fromLeft = { opacity: 0, x: -24, y: 0 };
    const toVisible = { opacity: 1, x: 0, y: 0 };

    slots.forEach((slot) => {
      const word = slot.querySelector("[data-word]") as HTMLElement;
      const icon = slot.querySelector("[data-icon]") as HTMLElement;
      if (!word || !icon) return;
      gsap.set(word, fromLeft);
      gsap.set(icon, fromLeft);
    });

    // DESIGN in
    tl.to(slots[0].querySelector("[data-word]"), {
      ...toVisible,
      duration: 0.45,
      ease: "expo.out",
    });

    // GSAP position parameter: "+=X" = gap, ">-X" = overlap (start before previous ends)
    for (let i = 1; i < 3; i++) {
      const prevWord = slots[i - 1].querySelector("[data-word]") as HTMLElement;
      const prevIcon = slots[i - 1].querySelector("[data-icon]") as HTMLElement;
      const currWord = slots[i].querySelector("[data-word]") as HTMLElement;

      // Gap between steps - let previous settle
      tl.addLabel(`step${i}`, "+=0.2");

      // Word fades out
      tl.to(
        prevWord,
        { opacity: 0, duration: 0.2, ease: "power2.in" },
        `step${i}`,
      );

      // Icon slides in - overlaps: starts 0.15s before word fully exits (crossfade)
      tl.to(
        prevIcon,
        { ...toVisible, duration: 0.3, ease: "expo.out" },
        `step${i}>-0.25`,
      );

      // Next word - overlaps: starts 0.2s before icon lands (fluid handoff)
      tl.fromTo(
        currWord,
        fromLeft,
        { ...toVisible, duration: 0.3, ease: "expo.out" },
        `step${i}>-0.2`,
      );
    }

    // Hold, then replace last word with icon
    tl.addLabel("replaceLast", "+=0.2");

    tl.to(
      slots[2].querySelector("[data-word]"),
      { opacity: 0, duration: 0.4, ease: "power2.in" },
      "replaceLast",
    );

    tl.to(
      slots[2].querySelector("[data-icon]"),
      { ...toVisible, duration: 0.4, ease: "expo.out" },
      "replaceLast>-0.25",
    );

    // Hold with icons, then exit
    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onStart: () => {
          overlay.style.pointerEvents = "none";
        },
      },
      "+=0.5",
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#FDFBF7] dark:bg-neutral-950"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      <div
        className="flex flex-col items-center justify-center gap-3 px-6 sm:flex-row sm:gap-8 md:gap-10"
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
              className="absolute inset-0 flex items-center justify-center text-xl font-semibold tracking-tight text-gradient-blue md:text-2xl"
              style={{ opacity: 0 }}
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
