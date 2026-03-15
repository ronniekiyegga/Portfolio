"use client";

import { Style_Script } from "next/font/google";

import ImageBadgeFolder from "./ImageBadgeFolder";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function IntroductionText() {
  return (
    <div className="flex flex-col w-full mb-8">
      <div className="mt-6 text-sm md:text-base text-left text-neutral-600 dark:text-neutral-400 sm:min-w-[70%] lg:min-w-[50%]">
        I&apos;m a software engineer, passionate about{" "}
        <span className="whitespace-nowrap inline-flex items-baseline gap-1">
          <span
            className={`${styleScript.className} text-lg md:text-xl font-bold mr-1`}
          >
            crafting
          </span>
          <ImageBadgeFolder />
        </span>{" "}
        intuitive, pixel-perfect user interfaces and scalable systems - bridging
        creativity and code from concept to production.
      </div>
    </div>
  );
}
