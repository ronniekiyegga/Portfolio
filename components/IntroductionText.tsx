"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { Style_Script } from "next/font/google";
import { motion } from "motion/react";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function IntroductionText() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="Helloo "
          words={["Design", "Frontend", "Backend", "AI", "Full Stack"]}
        />
      </motion.div>
      <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
        I turn{" "}
        <span className={`${styleScript.className} text-xl font-bold text-gray-950`}>
          ideas
        </span>{" "}
        into production. Design-focused engineer who ships full-stack products
        from concept to deployment.
      </p>
    </div>
  );
}
