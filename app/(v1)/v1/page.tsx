import dynamic from "next/dynamic";
import HeroSection from "@/app/components/HeroSection";
import ScrollAnimations from "@/app/components/ScrollAnimations";
import DynamicIsland from "@/app/components/DynamicIsland";
import { DesignSection } from "@/app/components/v2/DesignSection";

const ProjectSection = dynamic(
  () => import("@/app/components/ProjectSection"),
  { loading: () => <section className="min-h-[400px]" aria-hidden /> },
);
const Experiences = dynamic(() => import("@/app/components/Experiences"), {
  loading: () => <section className="min-h-[400px]" aria-hidden />,
});
const FeaturesSliderSection = dynamic(
  () => import("@/app/components/FeaturesSliderSection"),
  { loading: () => <section className="min-h-[300px]" aria-hidden /> },
);
const ExpandableFeatures = dynamic(
  () => import("@/app/components/ExpandableFeatures"),
  { loading: () => <section className="min-h-[300px]" aria-hidden /> },
);
const AnimatedLinks = dynamic(
  () =>
    import("@/app/components/AnimatedLinks").then((m) => ({
      default: m.AnimatedLinks,
    })),
  { loading: () => <section className="min-h-screen" aria-hidden /> },
);
const Marquee = dynamic(() => import("@/app/components/Marquee"), {
  loading: () => <section className="min-h-[200px]" aria-hidden />,
});

export default function V1Home() {
  return (
    <div className="min-h-screen w-full min-w-0 font-sans bg-background dark:bg-neutral-950">
      <main className="flex w-full min-w-0 flex-col items-center">
        <ScrollAnimations className="flex w-full min-w-0 flex-col items-center gap-y-4 md:gap-y-6">
          <HeroSection />
          <ProjectSection />
          <Experiences />
          <DesignSection />
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
