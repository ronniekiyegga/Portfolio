"use client";
import { LayoutTextFlip } from "@/app/components/ui/layout-text-flip";
import { motion } from "motion/react";

export default function IntroductionText() {
  return (
    <div className="flex flex-col w-full mb-8">
      <motion.div className="relative w-full my-0 flex items-center justify-start gap-3 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip text="FRONTEND" words={["DESIGNER", "ENGINEER"]} />
      </motion.div>
      <div className="mt-6 text-sm md:text-base text-left text-neutral-600 dark:text-neutral-400 max-w-xl">
        I{" "}
        <strong className="font-medium text-neutral-900 dark:text-[var(--accent)]">
          design in Figma
        </strong>{" "}
        and{" "}
        <strong className="font-medium text-neutral-900 dark:text-[var(--accent)]">
          build in TypeScript
        </strong>{" "}
        — no handoff, no translation loss. From pixel-perfect interfaces to
        containerised systems, I own the full stack.
      </div>
    </div>
  );
}
