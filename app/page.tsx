import FaceScanIllustration from "@/app/components/illustrations/face-scan";
import FeaturesSliderSection from "./components/FeaturesSliderSection";
import ExpandableFeatures from "./components/ExpandableFeatures";
import IntroductionText from "@/app/components/IntroductionText";
import ContactInfo from "@/app/components/patterns/ContactInfo";
import { AnimatedLinks } from "./components/AnimatedLinks";
import ProjectSection from "./components/ProjectSection";
import Marquee from "./components/Marquee";
import { ThemeToggle } from "./components/ThemeToggle";
import DynamicIsland from "./components/DynamicIsland";
import FooterSection from "./components/footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden font-sans bg-background">
      <main className="flex w-full min-w-0 flex-col items-center overflow-x-hidden">
        {/* <ThemeToggle /> */}
        <div
          id="contact-info-section"
          className="flex w-full max-w-6xl flex-col items-center justify-center px-8 py-32 md:px-16"
        >
          <FaceScanIllustration />
          <IntroductionText />
          <ContactInfo />
        </div>
        <ProjectSection />
        <FeaturesSliderSection />
        <ExpandableFeatures />
        <AnimatedLinks />
        <Marquee />
        <DynamicIsland />
        <FooterSection />
      </main>
    </div>
  );
}
