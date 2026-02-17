"use client";
import React from "react";
import { LinkPreview } from "@/app/components/ui/link-preview";

export default function AnimatedText() {
  return (
    <div className="flex justify-center items-start h-[40rem] flex-col px-4">
      <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10">
        Visit{" "}
        <LinkPreview
          url="https://www.msmaryamsmaths.com"
          className="font-bold bg-clip-text text-transparent bg-linear-to-br from-purple-500 to-pink-500"
        >
          Aceternity UI
        </LinkPreview>{" "}
        and for amazing Tailwind and Framer Motion components.
      </div>

      <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left ">
        I listen to{" "}
        <LinkPreview
          url="https://www.msmaryamsmaths.com"
          imageSrc="/MATHS_TUTORING.svg"
          isStatic
          className="font-bold"
        >
          this guy
        </LinkPreview>{" "}
        and I watch{" "}
        <LinkPreview
          url="/templates"
          imageSrc="/NUMERIX_AI.svg"
          isStatic
          className="font-bold"
        >
          this movie
        </LinkPreview>{" "}
        twice a day
      </div>
    </div>
  );
}
