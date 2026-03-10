"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
  containerRef,
}: {
  children: React.ReactNode;
  className?: string;
  /** Optional scroll container ref — use when inside a modal or scrollable div */
  containerRef?: React.RefObject<HTMLElement | null>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    ...(containerRef && { container: containerRef }),
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

  const y1 = useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative mx-auto h-full w-full max-w-5xl overflow-hidden pl-4",
        className,
      )}
    >
      <div className="absolute top-3 -left-5">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            background:
              scrollYProgress.get() > 0
                ? "transparent"
                : "linear-gradient(35deg, #7C14B8 11.9%, #6AE5E6 85.98%)",
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "0 0 0 1px rgba(124, 20, 184, 0.15)",
          }}
          className="ml-[27px] h-2 w-2 shrink-0 rounded-full"
        />
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className="ml-3 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set y1 for gradient
              y2={y2} // set y2 for gradient
            >
              <stop stopColor="#7C14B8" stopOpacity="0"></stop>
              <stop offset="0.119" stopColor="#7C14B8"></stop>
              <stop offset="0.8598" stopColor="#6AE5E6"></stop>
              <stop offset="1" stopColor="#6AE5E6" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
