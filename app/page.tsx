import FaceScanIllustration from "@/app/components/illustrations/face-scan";
import FeaturesSliderSection from "./components/FeaturesSliderSection";
import ExpandableFeatures from "./components/ExpandableFeatures";
import IntroductionText from "@/app/components/IntroductionText";
import ContactInfo from "@/app/components/patterns/ContactInfo";
import { AnimatedLinks } from "./components/AnimatedLinks";
import ProjectSection from "./components/ProjectSection";
import AnimatedText from "./components/AnimatedText";
import Marquee from "./components/Marquee";
export default function Home() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden font-sans dark:bg-black">
      <main className="flex w-full min-w-0 flex-col items-center overflow-x-hidden">
        <div className="flex w-full max-w-6xl flex-col items-center justify-center px-8 py-32 md:px-16">
          <FaceScanIllustration />
          <IntroductionText />
          <ContactInfo />
        </div>
        <ProjectSection />
        <FeaturesSliderSection />
        <ExpandableFeatures />
        <AnimatedText />
        <AnimatedLinks />
        <Marquee />
      </main>
    </div>
  );
}
