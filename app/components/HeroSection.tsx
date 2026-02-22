"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoading } from "@/app/contexts/LoadingContext";
import FaceScanIllustration from "@/app/components/illustrations/face-scan";
import IntroductionText from "@/app/components/IntroductionText";
import ContactInfo from "./patterns/ContactInfo";

export default function HeroSection() {
  const { isAppReady } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isAppReady || hasAnimated.current) return;

    const container = containerRef.current;
    if (!container) return;

    const intro = container.querySelector("[data-hero-intro]");
    const contact = container.querySelector("[data-hero-contact]");

    if (!intro || !contact) return;

    hasAnimated.current = true;

    gsap.set([intro, contact], {
      opacity: 0,
      y: 24,
      force3D: true,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", force3D: true },
    });

    tl.to(intro, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "expo.out",
    }).to(
      contact,
      { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" },
      ">-0.2"
    );
  }, [isAppReady]);

  return (
    <section
      id="hero-section"
      className="flex w-full min-w-0 flex-col items-center justify-center px-6 py-32 md:px-16 sm:px-8 bg-[#FDFBF7] dark:bg-neutral-950"
    >
      <div ref={containerRef} className="max-w-6xl w-full">
        <div data-hero-illustration>
          <FaceScanIllustration />
        </div>
        <div data-hero-intro>
          <IntroductionText />
        </div>
        <div data-hero-contact>
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
