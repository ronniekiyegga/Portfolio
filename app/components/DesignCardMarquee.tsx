"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

const MARQUEE_SPEED = 40;
const SMOOTH_TAU = 0.25;

interface DesignCardMarqueeProps {
  children: React.ReactNode;
  /** Number of card items (for width calculation) */
  itemCount: number;
  /** Gap between items in px */
  gap?: number;
  /** When true, animation pauses */
  isPaused?: boolean;
  className?: string;
}

export function DesignCardMarquee({
  children,
  itemCount,
  gap = 16,
  isPaused = false,
  className,
}: DesignCardMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(MARQUEE_SPEED);
  const lastTimestampRef = useRef<number | null>(null);

  const updateDimensions = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.scrollWidth / 2;
    if (width > 0) setSeqWidth(width);
  }, []);

  useEffect(() => {
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [updateDimensions, children]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth <= 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const targetVelocity = isPaused ? 0 : MARQUEE_SPEED;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null)
        lastTimestampRef.current = timestamp;
      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const easing = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
      velocityRef.current += (targetVelocity - velocityRef.current) * easing;

      offsetRef.current =
        (offsetRef.current + velocityRef.current * deltaTime) % seqWidth;
      if (offsetRef.current < 0) offsetRef.current += seqWidth;

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [seqWidth, isPaused]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="overflow-x-hidden">
        <div
          ref={trackRef}
          className="flex will-change-transform motion-reduce:transform-none"
          style={{ gap: `${gap}px` }}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

interface DesignMarqueeSectionProps {
  id?: string;
  children: React.ReactNode;
  itemCount: number;
  className?: string;
}

export function DesignMarqueeSection({
  id,
  children,
  itemCount,
  className,
}: DesignMarqueeSectionProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id={id}
      className={cn(
        "w-full min-w-0 overflow-x-hidden py-24 max-lg:px-1 dark:bg-neutral-950",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 px-6 lg:mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                DESIGN WORK
              </p>
              <h2 className="font-cormorant text-2xl font-normal leading-tight text-foreground md:text-3xl">
                Figma first,{" "}
                <em className="italic text-gradient-blue-static">then code</em>
              </h2>
            </div>
            <p className="max-w-md text-right text-sm text-neutral-500 dark:text-neutral-400">
              Every project starts as a Figma file. Here&apos;s the thinking
              behind the interfaces.
            </p>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Resume animation" : "Pause animation"}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Resume animation" : "Pause animation"}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden pt-6">
          <DesignCardMarquee itemCount={itemCount} isPaused={isPaused}>
            {children}
          </DesignCardMarquee>
        </div>
      </div>
    </section>
  );
}
