"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback, useRef } from "react";
import { useMedia } from "@/app/hooks/use-media";
import SectionKicker from "./ui/section-kicker";
import { Style_Script } from "next/font/google";

const AUTOPLAY_DURATION = 7000;

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const features = [
  {
    title: "Design File",
    description:
      "With AI-powered suggestions, templates, and seamless collaboration.",
    ariaLabel: "extend smart email composition feature",
    image: "/AI_PSEUDOCODE.svg",
    imageAlt: "bg c1",
    cardClassName: "h-96",
  },
  {
    title: "Live Project",
    description:
      "That learns your writing style and provides context-aware suggestions.",
    ariaLabel: "extend AI autocomplete feature",
    image: "/NUMERIX_AI.png",
    imageAlt: "bg c3",
    cardClassName: "h-96",
  },
];

export default function ExpandableFeatures() {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMd = useMedia("(min-width: 768px)");
  const activeIndex = isMd ? expandedIndex : 0;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return;
      setExpandedIndex((current) => (current + 1) % features.length);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_DURATION);
  }, []);

  useEffect(() => {
    if (!isMd) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer, isMd]);

  const handleSelect = (index: number) => {
    if (!isMd || index === activeIndex) return;
    setExpandedIndex(index);
    setProgressKey((k) => k + 1);
    resetTimer();
  };

  const handleMouseEnter = (index: number) => {
    if (!isMd) return;
    if (index === activeIndex) {
      pausedRef.current = true;
      setPaused(true);
    }
  };

  const handleMouseLeave = (index: number) => {
    if (!isMd) return;
    if (index === activeIndex) {
      pausedRef.current = false;
      setPaused(false);
    }
  };

  return (
    <section id="process" className="bg-background @container py-24 w-full max-lg:px-1 dark:bg-neutral-950">
      <style>{`
                @keyframes expandProgress {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
            `}</style>
      <div className="mx-auto max-w-5xl px-6">
        <SectionKicker>Thoughts</SectionKicker>
        <div className="mb-6 lg:mb-10">
          <h2
            className={`text-foreground max-w-xs text-balance text-xs uppercase tracking-[0.15rem] font-medium opacity-60`}
          >
            Currently Exploring
          </h2>
        </div>

        <div
          className={cn(
            "grid gap-8 md:grid-cols-[1fr_1fr] md:gap-3 md:transition-[grid-template-columns] md:duration-500 md:ease-in-out",
            expandedIndex === 0 && "md:grid-cols-[2fr_1fr]",
            expandedIndex === 1 && "md:grid-cols-[1fr_2fr]",
          )}
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-expanded={activeIndex === index}
              className="relative row-span-2 grid grid-rows-subgrid gap-4 text-left"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className={cn(
                  "bg-card shadow-black/2 before:border-foreground/7.5 relative flex items-center justify-center overflow-hidden rounded-2xl shadow-md before:absolute before:inset-0 before:rounded-2xl before:border",
                  feature.cardClassName,
                )}
              >
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  width={980}
                  height={980}
                  className="absolute inset-0 size-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 dark:opacity-25"
                />
              </div>
              <div>
                {isMd && (
                  <button
                    className="absolute inset-0 cursor-pointer"
                    aria-label={feature.ariaLabel}
                    onClick={() => handleSelect(index)}
                    aria-expanded={activeIndex === index}
                  />
                )}

                <h3 className="text-foreground font-medium">{feature.title}</h3>
                {isMd && (
                  <div className="bg-muted relative my-3 h-px">
                    {activeIndex === index && (
                      <div
                        key={progressKey}
                        className="absolute inset-0 h-full origin-left rounded-full"
                        style={{
                          background:
                            "linear-gradient(to right, #18CCFC, #6344F5, #AE48FF)",
                          animation: `expandProgress ${AUTOPLAY_DURATION}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </div>
                )}
                <p className="text-muted-foreground not-in-data-[expanded=true]:opacity-50 max-w-xs text-balance">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
