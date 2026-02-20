import FeaturesSliderSection from "./components/FeaturesSliderSection";
import ExpandableFeatures from "./components/ExpandableFeatures";
import { AnimatedLinks } from "./components/AnimatedLinks";
import ProjectSection from "./components/ProjectSection";
import Marquee from "./components/Marquee";
import DynamicIsland from "./components/DynamicIsland";
import Experiences from "./components/Experiences";
import HeroSection from "./components/HeroSection";
import ScrollAnimations from "./components/ScrollAnimations";

export default function Home() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden font-sans bg-background dark:bg-neutral-950">
      <main className="flex w-full min-w-0 flex-col items-center overflow-x-hidden">
        <ScrollAnimations className="flex w-full min-w-0 flex-col items-center overflow-x-hidden">
          <HeroSection />
          <ProjectSection />
          <Experiences />
          <FeaturesSliderSection />
          <ExpandableFeatures />
          <AnimatedLinks />
          <Marquee />
        </ScrollAnimations>
        <DynamicIsland />
      </main>
    </div>
  );
}
