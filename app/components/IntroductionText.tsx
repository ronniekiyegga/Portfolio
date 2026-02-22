"use client";
import { LayoutTextFlip } from "@/app/components/ui/layout-text-flip";
import { Style_Script } from "next/font/google";
import { motion } from "motion/react";
import ImageBadgeFolder from "./ImageBadgeFolder";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function IntroductionText() {
  return (
    <div className="flex flex-col w-full mb-12">
      <motion.div className="relative w-full my-1 flex items-center justify-start gap-3 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip text="FULL STACK" words={["DESIGNER", "ENGINEER"]} />
      </motion.div>
      <div className="mt-6 text-sm md:text-lg text-left text-neutral-600 dark:text-neutral-400 max-w-2xl">
        I'm a design-focused software engineer, passionate about {" "}
        <span className="whitespace-nowrap inline-flex items-baseline gap-1">
          <span
            className={`${styleScript.className} text-lg md:text-2xl font-bold mr-1`}
          >
            crafting
          </span>
          <ImageBadgeFolder />
        </span>{" "}
        intuitive, pixel-perfect user interfaces and scalable systems & bridging
        creativity and code from concept to production -
        <span
          className={`${styleScript.className} text-lg md:text-2xl font-bold  mr-1`}
        >
          1 byte at a time
        </span>
        .
      </div>
    </div>
  );
}
