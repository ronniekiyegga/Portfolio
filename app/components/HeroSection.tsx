"use client";

import FaceScanIllustration from "@/app/components/illustrations/face-scan";
import IntroductionText from "@/app/components/IntroductionText";

export default function HeroSection() {
  return (
    <section
      id="contact-info-section"
      className="flex w-full max-w-6xl flex-col items-center justify-center px-8 py-32 md:px-16"
    >
      <FaceScanIllustration />
      <IntroductionText />
    </section>
  );
}
