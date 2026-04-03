import nextDynamic from "next/dynamic";
import HeroSection from "@/shared/components/sections/HeroSection";
import { getResolvedHeroCarouselSlides } from "@/lib/hero-carousel-images";
import ScrollAnimations from "@/shared/components/effects/ScrollAnimations";
import DynamicIsland from "@/shared/components/navigation/DynamicIsland";

export const dynamic = "force-dynamic";

const ProjectSection = nextDynamic(
  () => import("@/shared/components/sections/ProjectSection"),
  { loading: () => <section className="min-h-[400px]" aria-hidden /> },
);
const Experiences = nextDynamic(
  () => import("@/shared/components/sections/Experiences"),
  {
    loading: () => <section className="min-h-[400px]" aria-hidden />,
  },
);
const FeaturesSliderSection = nextDynamic(
  () => import("@/shared/components/sections/FeaturesSliderSection"),
  { loading: () => <section className="min-h-[300px]" aria-hidden /> },
);
const ExpandableFeatures = nextDynamic(
  () => import("@/shared/components/sections/ExpandableFeatures"),
  { loading: () => <section className="min-h-[300px]" aria-hidden /> },
);
const AnimatedLinks = nextDynamic(
  () =>
    import("@/shared/components/sections/AnimatedBlogLinks").then((m) => ({
      default: m.AnimatedLinks,
    })),
  { loading: () => <section className="min-h-screen" aria-hidden /> },
);
const Marquee = nextDynamic(
  () => import("@/shared/components/sections/Marquee"),
  {
    loading: () => <section className="min-h-[200px]" aria-hidden />,
  },
);

export default async function V1Home() {
  const heroCarouselSlides = getResolvedHeroCarouselSlides();

  return (
    <div className="min-h-screen w-full min-w-0 font-sans bg-background dark:bg-neutral-950">
      <main className="flex w-full min-w-0 flex-col items-center">
        <ScrollAnimations className="flex w-full min-w-0 flex-col items-center gap-y-4 md:gap-y-6">
          <HeroSection heroCarouselSlides={heroCarouselSlides} />
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
