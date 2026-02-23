import dynamic from "next/dynamic";
import HeroSection from "./components/HeroSection";
import ScrollAnimations from "./components/ScrollAnimations";
import DynamicIsland from "./components/DynamicIsland";

const ProjectSection = dynamic(() => import("./components/ProjectSection"), {
  loading: () => <section className="min-h-[400px]" aria-hidden />,
});
const Experiences = dynamic(() => import("./components/Experiences"), {
  loading: () => <section className="min-h-[400px]" aria-hidden />,
});
const FeaturesSliderSection = dynamic(
  () => import("./components/FeaturesSliderSection"),
  { loading: () => <section className="min-h-[300px]" aria-hidden /> },
);
const ExpandableFeatures = dynamic(
  () => import("./components/ExpandableFeatures"),
  { loading: () => <section className="min-h-[300px]" aria-hidden /> },
);
const AnimatedLinks = dynamic(
  () => import("./components/AnimatedLinks").then((m) => ({ default: m.AnimatedLinks })),
  { loading: () => <section className="min-h-screen" aria-hidden /> },
);
const Marquee = dynamic(() => import("./components/Marquee"), {
  loading: () => <section className="min-h-[200px]" aria-hidden />,
});

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
