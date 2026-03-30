"use client";
import { ThreeDMarquee } from "@/shared/components/ui/3d-marquee";

export default function Marquee() {
  const images = [
    "/images/marquee/Marquee_Folder.svg",
    "/images/marquee/Marquee_BIO.svg",
    "/images/marquee/Marquee_Folder.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_LIGHT.svg",
    "/images/projects/maths-tutoring/MATHS_TUTORING.svg",
    "/images/projects/truefounders/Marquee_TrueFounders_Dark.svg",
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
    "/images/projects/truefounders/TRUE_FOUNDERS_TESTIMONIALS.svg",
    "/images/projects/truefounders/TRUE_FOUNDERS_TESTIMONIALS.svg",
    "/images/projects/truefounders/TRUE_FOUNDERS_TESTIMONIALS.svg",
    "/images/projects/truefounders/Marquee_TrueFounders_Dark.svg",
    "/images/projects/edufeedbackpro/numerix-ai/Marquee_NumerixAI.svg",
    "/images/projects/github-finder/Marquee_GithubFinderProfiles.svg",
    "/images/marquee/Marquee_Folder.svg",
    "/images/branding/clients/BESKPOKE_GARMENTS_DARK.svg",
    "/images/marquee/Marquee_Theme_Toggle.svg",
  ];
  return (
    <div
      className="relative w-full min-w-0 overflow-x-hidden section-white-bg"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <ThreeDMarquee images={images} />
    </div>
  );
}
