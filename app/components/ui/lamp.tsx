"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-linear-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Intersection Of Design & Engineering
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  kicker,
  className,
}: {
  children: React.ReactNode;
  /** Rendered at the top of the lamp (just above the cyan bar) */
  kicker?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-transparent w-full rounded-md z-0",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-95 items-center justify-center isolate z-0 min-w-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "38rem" }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-0 overflow-visible w-152 bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_90deg_at_center_top]"
        >
          <div className="absolute  w-full left-0 bg-transparent h-40 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bg-slate-950  w-28 h-full left-0 bottom-0 z-20 mask-[linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "38rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-60 w-152 bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_270deg_at_center_top]"
        >
          <div className="absolute w-24 h-full right-0 bg-transparent bottom-0 z-20 mask-[linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-slate-950 h-80 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-[2] bg-transparent blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-52 w-full bg-transparent opacity-100 backdrop-blur-3xl"></div>
        <div className="absolute inset-auto z-50 h-36 w-xl -translate-y-1/2 rounded-full bg-cyan-600 opacity-40 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-24 rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "38rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-38rem -translate-y-28 bg-cyan-400"
        ></motion.div>

        {/* Section kicker: at the top of the lamp, just above the cyan bar */}
        {kicker && (
          <div className="absolute inset-x-0 top-1/2 z-60 flex -translate-y-40 justify-center px-4">
            {kicker}
          </div>
        )}

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-50 bg-black "></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-12">
        {children}
      </div>
    </div>
  );
};
