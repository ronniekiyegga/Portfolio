"use client";
import { ThreeDMarquee } from "@/shared/components/ui/3d-marquee";

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
      className="relative w-full min-w-0 overflow-x-hidden bg-white dark:bg-neutral-950"
    >
      <ThreeDMarquee images={images} />
    </section>
  );
}
