"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useReducedMotion,
  useMotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
  svgGradientId,
}: {
  children: React.ReactNode;
  className?: string;
  /** Stable unique id for SVG <linearGradient> (must differ per beam instance on the same page). */
  svgGradientId: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const gradientId = svgGradientId;
  const prefersReducedMotion = useReducedMotion();
  const staticProgress = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const updateHeight = () => setSvgHeight(el.offsetHeight);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  // Direct transform (no spring) for better scroll performance
  const progress = prefersReducedMotion ? staticProgress : scrollYProgress;
  const y1 = useTransform(progress, [0, 0.8], [50, svgHeight]);
  const y2 = useTransform(
    progress,
    [0, 1],
    [50, Math.max(50, svgHeight - 200)],
  );

  const dotBoxShadow = useTransform(progress, (v) =>
    v > 0 ? "none" : "rgba(0, 0, 0, 0.12) 0px 2px 8px",
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      {/* The beam indicator uses negative left offsets; hide it on small screens to avoid clipping/overflow. */}
      <div className="hidden md:block absolute top-3 -left-20 will-change-transform">
        <motion.div
          style={{ boxShadow: dotBoxShadow }}
          className="ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border-0 bg-white/95 shadow-[0_1px_4px_rgba(0,0,0,0.06)] dark:bg-white/10"
        >
          <div className="size-2 shrink-0 rounded-full border-0 bg-[linear-gradient(45deg,rgba(102,123,246,1)_0%,rgba(38,208,206,1)_100%)]" />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
          <motion.path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
