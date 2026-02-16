"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { Style_Script } from "next/font/google";
import { motion } from "motion/react";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function IntroductionText() {
  return (
    <div className="flex flex-col w-full mb-12">
      <motion.div className="relative w-full my-4 flex items-center justify-start gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip text="FULL STACK" words={["DESIGNER", "ENGINEER"]} />
      </motion.div>
      <p className="mt-4 text-base text-left text-neutral-600 dark:text-neutral-400 max-w-xl">
        I turn{" "}
        <span
          className={`${styleScript.className} text-xl font-bold text-gradient-blue`}
        >
          ideas
        </span>{" "}
        into production. Design-focused engineer who ships full-stack products
        from concept to deployment.
      </p>
    </div>
  );
}
