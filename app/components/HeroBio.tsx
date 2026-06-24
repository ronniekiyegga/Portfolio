"use client";

import type { RefObject } from "react";
import { motion } from "motion/react";
import IntroductionText from "@/shared/components/sections/IntroductionText";
import LogoLoopSection from "@/shared/components/sections/LogoLoop";
import ContactInfo from "@/shared/components/media/patterns/ContactInfo";

type HeroBioProps = {
  /** lg: measure this box so ContactInfo can be layered above the lanyard canvas */
  contactLiftTargetRef?: RefObject<HTMLDivElement | null>;
};

const HeroBio = ({ contactLiftTargetRef }: HeroBioProps = {}) => {
  return (
    <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left xl:mt-32">
      <div
        data-hero-availability
        className="inline-flex items-center gap-2 text-[10px] md:text-[11px] text-nowrap font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 rounded-full py-1.5 px-4 mb-8"
      >
        <span className="w-2.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <motion.div className="relative w-full my-0 flex items-center justify-start gap-3 sm:mx-0 sm:mb-0 sm:flex-row">
          <span className="text-[10px] md:text-[11px] font-medium drop-shadow-lg tracking-wide uppercase text-neutral-500 dark:text-neutral-400">AVAILABLE · FULL-STACK SOFTWARE ENGINEER</span>
        </motion.div>
        · London, UK
      </div>

      <h1
        data-hero-name
        className="font-cormorant text-foreground leading-[0.95] tracking-[-0.02em] mb-5 whitespace-nowrap font-medium hero-name"
        style={{
          fontSize: "clamp(2.35rem, 4.6vw, 4rem)",
        }}
      >
        Ronnie{" "}
        <em className="italic text-gradient-blue-static font-light">Kiyegga</em>
      </h1>

      <div
        data-hero-intro
        className="mb-12 w-full flex flex-col items-center justify-center lg:items-start lg:justify-start [&_.text-left]:mx-0! [&_.text-left]:max-w-[42ch] [&_.text-left]:text-[13px] md:[&_.text-left]:text-sm [&_.text-left]:leading-relaxed"
      >
        <IntroductionText />
      </div>

      <LogoLoopSection />

      {/* Contact: in-flow on mobile; lg uses layout anchor + duplicate layer in HeroSection */}
      <div
        ref={contactLiftTargetRef}
        data-hero-contact
        className="relative z-30 mt-10 w-full max-w-sm lg:mx-0 lg:min-h-14"
      >
        <div className="lg:hidden">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default HeroBio;
