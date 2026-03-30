"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MARQUEE_SPEED = 40;
const SMOOTH_TAU = 0.25;

interface DesignCardMarqueeProps {
  children: React.ReactNode;
  itemCount: number;
  gap?: number;
  isPaused?: boolean;
  direction?: "left" | "right" | "up" | "down";
  axis?: "x" | "y";
  speed?: number;
  className?: string;
}

export function DesignCardMarquee({
  children,
  itemCount,
  gap = 16,
  isPaused = false,
  direction = "left",
  axis = "x",
  speed = MARQUEE_SPEED,
  className,
}: DesignCardMarqueeProps) {
  const effectiveSpeed = speed ?? MARQUEE_SPEED;
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [seqSize, setSeqSize] = useState(0);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(effectiveSpeed);
  const lastTimestampRef = useRef<number | null>(null);

  const updateDimensions = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const size = axis === "y" ? track.scrollHeight / 2 : track.scrollWidth / 2;
    if (size > 0) setSeqSize(size);
  }, [axis]);

  useEffect(() => {
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [updateDimensions, children]);

  /* Re-measure after layout / images so vertical seq length isn’t stuck at 0 */
  useLayoutEffect(() => {
    updateDimensions();
    const id = requestAnimationFrame(() => updateDimensions());
    return () => cancelAnimationFrame(id);
  }, [updateDimensions, children]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqSize <= 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const sign =
      direction === "right" || direction === "down"
        ? -1
        : 1;
    const targetVelocity = isPaused ? 0 : sign * effectiveSpeed;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null)
        lastTimestampRef.current = timestamp;
      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const easing = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
      velocityRef.current += (targetVelocity - velocityRef.current) * easing;

      offsetRef.current =
        (offsetRef.current + velocityRef.current * deltaTime) % seqSize;
      if (offsetRef.current < 0) offsetRef.current += seqSize;

      track.style.transform =
        axis === "y"
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [seqSize, isPaused, direction, axis, effectiveSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full",
        axis === "y" && "min-h-0 flex-1",
        className,
      )}
    >
      <div className={cn(axis === "y" && "h-full min-h-0", axis === "y" ? "overflow-y-hidden" : "overflow-x-hidden")}>
        <div
          ref={trackRef}
          className={cn(
            "will-change-transform motion-reduce:transform-none",
            axis === "y" ? "flex flex-col" : "flex",
          )}
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
  direction?: "left" | "right" | "up" | "down";
  axis?: "x" | "y";
  speed?: number;
  showHeading?: boolean;
  className?: string;
}

export function DesignMarqueeSection({
  id,
  children,
  itemCount,
  direction = "left",
  axis = "x",
  speed,
  showHeading = true,
  className,
}: DesignMarqueeSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        axis === "y"
          ? "w-full min-w-0 overflow-y-hidden py-24 dark:bg-neutral-950"
          : "w-full min-w-0 overflow-x-hidden py-24 dark:bg-neutral-950",
        className,
      )}
    >
      <div
        className={cn(
          axis === "y"
            ? "flex min-h-0 w-full flex-1 flex-col overflow-y-hidden"
            : "w-full overflow-x-hidden",
        )}
      >
        <div
          className={cn(
            "relative min-h-0 flex-1 overflow-hidden",
            showHeading ? "pt-6" : "pt-0",
          )}
        >
          {showHeading ? (
            <h2 className="mb-4 text-[12px] font-medium uppercase tracking-[0.13rem] text-neutral-400 dark:text-neutral-500 md:mb-8 ml-20 md:ml-24 lg:ml-44 xl:ml-80">
              THINGS I&apos;VE DESIGNED
            </h2>
          ) : null}
          <DesignCardMarquee
            itemCount={itemCount}
            direction={direction}
            axis={axis}
            speed={speed}
          >
            {children}
          </DesignCardMarquee>
        </div>
        {/* <h4>There&apos;s more</h4> */}
      </div>
    </section>
  );
}
