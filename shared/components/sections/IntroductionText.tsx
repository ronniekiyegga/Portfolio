"use client";

import { Style_Script } from "next/font/google";
import ImageBadgeFolder from "@/shared/components/media/ImageBadgeFolder";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

export default function IntroductionText() {
  return (
    <div className="flex flex-col w-full mb-8">
      <div className="mt-6 text-sm md:text-base text-center md:text-left lg:text-sm text-neutral-600 dark:text-neutral-400 sm:min-w-[70%] lg:max-w-[80%] lg:leading-6">
        I’m a product-focused full-stack engineer, who enjoys{" "}
        <span className="whitespace-nowrap inline-flex items-baseline gap-1">
          <span
            className={`${styleScript.className} text-lg md:text-xl font-bold mr-1`}
          >
            bridging
          </span>
          <ImageBadgeFolder />
        </span>{" "}
        design and engineering to turn complex ideas into scalable systems and
        intuitive user experiences from concept to production.
      </div>
    </div>
  );
}
