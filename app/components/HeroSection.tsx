"use client";

import FaceScanIllustration from "@/app/components/illustrations/face-scan";
import IntroductionText from "@/app/components/IntroductionText";

export default function HeroSection() {
  return (
    <section
      id="contact-info-section"
      className="flex w-full min-w-0 flex-col items-center justify-center px-6 py-32 md:px-16 sm:px-8 bg-[#FDFBF7] dark:bg-neutral-950"
    >
      <div className="max-w-6xl">
        <FaceScanIllustration />
        <IntroductionText />
      </div>
    </section>
  );
}
