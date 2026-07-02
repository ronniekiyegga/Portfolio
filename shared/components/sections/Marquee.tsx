"use client";

import { ThreeDMarquee } from "@/shared/components/ui/3d-marquee";

const KICKER_GRADIENT = "linear-gradient(45deg, #667bf6, #26d0ce)";
const TITLE_GRADIENT = "linear-gradient(90deg, #4353ff 0%, #8b5cf6 100%)";

export default function Marquee() {
  const images = [
    "/images/marquee/Marquee_Folder.svg",
    "/images/marquee/Marquee_BIO.svg",
    "/images/marquee/Marquee_Folder.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_LIGHT.svg",
    "/images/projects/maths-tutoring/tutorial.webm",
    "/images/projects/truefounders/TrueFounders_hero.webp",
    "/images/projects/algo-pseudo/AI_PSEUDOCODE.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_ABOUT_DARK.svg",
    "/images/marquee/Marquee_Folder.svg",
    "/images/projects/edufeedbackpro/numerix-ai/Marquee_NumerixAI.svg",
    "/images/marquee/Marquee_Theme_Toggle.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_LIGHT.svg",
    "/images/projects/github-finder/GITHUB_FINDER_PROFILES_1.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_ABOUT_DARK.svg",
    "/images/marquee/Marquee_Folder.svg",
    "/images/projects/github-finder/GITHUB_FINDER_PROFILES_MOBILE.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_ABOUT_LIGHT.svg",
    "/images/projects/edufeedbackpro/numerix-ai/Marquee_NumerixAI.svg",
    "/images/marquee/Marquee_Theme_Toggle.svg",
    "/images/marquee/Marquee_Theme_Toggle.svg",
    "/images/projects/edufeedbackpro/numerix-ai/Marquee_NumerixAI.svg",
    "/images/marquee/Marquee_Folder.svg",
    "/images/marquee/Marquee_BIO.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_DARK.svg",
    "/images/marquee/Marquee_Theme_Toggle.svg",
    "/images/projects/algo-pseudo/AI_PSEUDOCODE.svg",
    "/images/projects/truefounders/truefounders-3.webp",
    "/images/projects/truefounders/truefounders-3.webp",
    "/images/projects/truefounders/TrueFounders_hero.webp",
    "/images/projects/edufeedbackpro/numerix-ai/Marquee_NumerixAI.svg",
    "/images/projects/github-finder/Marquee_GithubFinderProfiles.svg",
    "/images/marquee/Marquee_Folder.svg",
    "/images/marquee/Marquee_Theme_Toggle.svg",
  ];
  return (
    <section
      id="design"
      className="relative w-full min-w-0 overflow-x-hidden bg-white pt-10 md:pt-16 dark:bg-neutral-950"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <header className="mb-6 flex min-w-0 flex-col gap-4 md:mb-4">
          <div className="flex items-center gap-1.5">
            <span
              className="size-[5px] shrink-0 rounded-full"
              style={{ background: KICKER_GRADIENT }}
              aria-hidden
            />
            <span
              className="bg-clip-text text-[10px] font-semibold uppercase tracking-[0.15em] text-transparent"
              style={{
                background: KICKER_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              UX/UI
            </span>
          </div>

          <h2 className="font-cormorant text-[clamp(2.125rem,4.5vw,2.875rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[#1a1a2e] dark:text-white">
            Design{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: TITLE_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Work
            </span>
          </h2>
        </header>
      </div>

      <ThreeDMarquee images={images} />
    </section>
  );
}
