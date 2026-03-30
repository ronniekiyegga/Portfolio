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
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Client-only ID to avoid useId hydration mismatch (React 19 + Next.js 16 inside Suspense)
  const [gradientId, setGradientId] = useState("");
  useEffect(() => {
    setGradientId(`tb-${crypto.randomUUID().replace(/-/g, "")}`);
  }, []);
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
  const y2 = useTransform(progress, [0, 1], [50, Math.max(50, svgHeight - 200)]);

  const dotBoxShadow = useTransform(progress, (v) =>
    v > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  );
  const dotBg = useTransform(progress, (v) => (v > 0 ? "white" : "#10b981"));
  const dotBorder = useTransform(progress, (v) => (v > 0 ? "white" : "#059669"));

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      <div className="absolute top-3 -left-4 md:-left-20 will-change-transform">
        <motion.div
          style={{ boxShadow: dotBoxShadow }}
          className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-sm"
        >
          <motion.div
            style={{ backgroundColor: dotBg, borderColor: dotBorder }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          {gradientId ? (
            <>
              <motion.path
                d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="1.25"
                className="motion-reduce:hidden"
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
            </>
          ) : (
            <path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="#18CCFC"
              strokeWidth="1.25"
              className="motion-reduce:hidden"
            />
          )}
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
