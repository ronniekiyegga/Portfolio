"use client";
import { ThreeDMarquee } from "@/app/components/ui/3d-marquee";

export default function Marquee() {
  const images = [
    "/Marquee_Folder.svg",
    // "https://assets.aceternity.com/animated-modal.png",
    "/Marquee_BIO.svg",
    // "https://assets.aceternity.com/animated-testimonials.webp",
    "/Marquee_Folder.svg",
    // "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    // "https://assets.aceternity.com/github-globe.png",
    // "https://assets.aceternity.com/glare-card.png",
    // "https://assets.aceternity.com/layout-grid.png",
    "/BESKPOKE_GARMENTS_LIGHT.svg",
    // "/Marquee_BIO.svg",
    "/MATHS_TUTORING.svg",
    "/Marquee_TrueFounders_Dark.svg",
    "/AI_PSEUDOCODE.svg",
    // "https://assets.aceternity.com/flip-text.png",
    "/BESKPOKE_GARMENTS_ABOUT_DARK.svg",
    "/Marquee_Folder.svg",
    "/Marquee_NumerixAI.svg",
    "/Marquee_Theme_Toggle.svg",
    // "https://assets.aceternity.com/hero-highlight.png",
    "/BESKPOKE_GARMENTS_LIGHT.svg",
    "/GITHUB_FINDER_PROFILES_1.svg",
    // "https://assets.aceternity.com/carousel.webp",
    // "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    // "/Marquee_BIO.svg",
    "/BESKPOKE_GARMENTS_ABOUT_DARK.svg",
    // "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "/Marquee_Folder.svg",
    // "https://assets.aceternity.com/signup-form.png",
    // "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    // "https://assets.aceternity.com/spotlight-new.webp",
    // "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    // "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    // "https://assets.aceternity.com/tabs.png",
    "/GITHUB_FINDER_PROFILES_MOBILE.svg",
    "/BESKPOKE_GARMENTS_ABOUT_LIGHT.svg",
    // "/Marquee_BIO.svg",
    // "/Marquee_BIO.svg",
    // "/Marquee_BIO.svg",
    "/Marquee_NumerixAI.svg",
    "/Marquee_Theme_Toggle.svg",
    "/Marquee_Theme_Toggle.svg",
    // "/Marquee_NumerixAI.svg",
    "/Marquee_NumerixAI.svg",
    "/Marquee_Folder.svg",
    "/Marquee_BIO.svg",
    "/BESKPOKE_GARMENTS_DARK.svg",
    "/Marquee_Theme_Toggle.svg",
    "/AI_PSEUDOCODE.svg",
    "/TRUE_FOUNDERS_TESTIMONIALS.svg",
    "/TRUE_FOUNDERS_TESTIMONIALS.svg",
    "/TRUE_FOUNDERS_TESTIMONIALS.svg",
    "/Marquee_TrueFounders_Dark.svg",
    "/Marquee_NumerixAI.svg",
    "/Marquee_GithubFinderProfiles.svg",
    "/Marquee_Folder.svg",
    // "/Marquee_BIO.svg",
    // "/Marquee_Theme_Toggle.svg",
    // "https://assets.aceternity.com/vortex.png",
    // "https://assets.aceternity.com/wobble-card.png",
    "/BESKPOKE_GARMENTS_DARK.svg",
    // "https://assets.aceternity.com/world-map.webp",
    "/Marquee_Theme_Toggle.svg",
  ];
  return (
    <div
      className="relative w-full min-w-0 overflow-x-hidden p-1 section-white-bg"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <ThreeDMarquee images={images} />
    </div>
  );
}
