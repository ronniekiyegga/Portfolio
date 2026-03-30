import type { HeroCarouselSlidesProp } from "./hero-carousel-types";

/**
 * Manual hero carousel slides (optional).
 *
 * - If `up` or `down` has at least one item, that column uses this list.
 * - If a column is empty (`[]`), that column falls back to files in
 *   `public/images/carousel` named `*_up.webp` / `*_down.webp` (see
 *   `getHeroCarouselSlidesFromPublic`).
 * - If both manual and folder are empty for a column, that column shows the
 *   default project thumbnails (same list as before).
 *
 * `src` must be a URL path under `public/` (e.g. `/images/carousel/foo_up.webp`
 * or `/images/projects/.../file.svg`).
 */
export const HERO_CAROUSEL_SLIDES: HeroCarouselSlidesProp = {
  up: [
    {
      src: "/images/carousel/Numerix__Theme_up.webp",
      title: "Numerix Theme",
      alt: "Numerix Theme — design preview",
      caption: ["NUMERIX", "THEME"],
      status: "live",
    },
    {
      src: "/images/carousel/Numerix_up.webp",
      title: "Numerix AI",
      alt: "Numerix AI — design preview",
      caption: ["NUMERIX", "AI"],
      status: "live",
    },
    {
      src: "/images/carousel/Student_Files_up.webp",
      title: "Student Files",
      alt: "Student Files — design preview",
      caption: ["STUDENT", "FILES"],
      status: "live",
    },
    {
      src: "/images/carousel/TrueFounders_Choose_up.webp",
      title: "True Founders",
      alt: "True Founders — design preview",
      caption: ["TRUEFOUNDERS", "CHOOSE"],
      status: "live",
    },
    {
      src: "/images/carousel/Tutoring_pricing_up.webp",
      title: "Tutoring Pricing",
      alt: "Tutoring Pricing — design preview",
      caption: ["TUTORING", "PRICING"],
      status: "live",
    },
    {
      src: "/images/carousel/Tutoring_up.webp",
      title: "Tutoring Platform",
      alt: "Tutoring Platform — design preview",
      caption: ["TUTORING", "PLATFORM"],
      status: "live",
    },
  ],
  down: [
    {
      src: "/images/carousel/BESKPOKE_GARMENTS_LIGHT_down.webp",
      title: "Bespoke Garments Light",
      alt: "Bespoke Garments — design preview",
      caption: ["BESPOKE", "GARMENTS"],
      status: "coming-soon",
    },
    {
      src: "/images/carousel/BESKPOKE_GARMENTS_down.webp",
      title: "Bespoke Garments",
      alt: "Bespoke Garments — design preview",
      caption: ["BESPOKE", "GARMENTS"],
      status: "coming-soon",
    },
    {
      src: "/images/carousel/John_Canary_down.webp",
      title: "John Canary",
      alt: "John Canary — design preview",
      caption: ["JOHN", "CANARY"],
      status: "coming-soon",
    },
    {
      src: "/images/carousel/Tutoring_FAQ_down.webp",
      title: "Tutoring FAQ",
      alt: "Tutoring FAQ — design preview",
      caption: ["TUTORING", "FAQ"],
      status: "live",
    },
    {
      src: "/images/carousel/Tutoring_benefits_down.webp",
      title: "Tutoring Benefits",
      alt: "Tutoring Benefits — design preview",
      caption: ["TUTORING", "BENEFITS"],
      status: "live",
    },
    {
      src: "/images/carousel/Tutoring_lesson_down.webp",
      title: "Tutoring Lesson",
      alt: "Tutoring Lesson — design preview",
      caption: ["TUTORING", "LESSON"],
      status: "live",
    },
    {
      src: "/images/carousel/Tutoring_testimonials_down.webp",
      title: "Tutoring Testimonials",
      alt: "Tutoring Testimonials — design preview",
      caption: ["TUTORING", "REVIEWS"],
      status: "live",
    },
  ],
};
