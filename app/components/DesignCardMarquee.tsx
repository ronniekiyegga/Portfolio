"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MARQUEE_SPEED = 40;
const SMOOTH_TAU = 0.25;

interface DesignCardMarqueeProps {
  children: React.ReactNode;
  itemCount: number;
  gap?: number;
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
  return (
    <section
      id={id}
      className={cn(
        "w-full min-w-0 overflow-x-hidden py-24 dark:bg-neutral-950",
        className,
      )}
    >
      <div className="w-full overflow-x-hidden">
        <div className="relative overflow-hidden pt-6">
          <DesignCardMarquee itemCount={itemCount}>
            {children}
          </DesignCardMarquee>
        </div>
      </div>
    </section>
  );
}
