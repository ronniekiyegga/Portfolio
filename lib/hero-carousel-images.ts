import { existsSync, readdirSync } from "fs";
import { join } from "path";
import type { HeroCarouselImageSlide, HeroCarouselSlidesProp } from "./hero-carousel-types";
import { HERO_CAROUSEL_SLIDES } from "./hero-carousel-slides";

const CAROUSEL_DIR = join(process.cwd(), "public", "carousel");

const CAROUSEL_IMAGE_EXT = /\.(webp|png|jpe?g)$/i;
const UP_SUFFIX = /_up\.(webp|png|jpe?g)$/i;
const DOWN_SUFFIX = /_down\.(webp|png|jpe?g)$/i;

function labelFromCarouselFilename(filename: string): string {
  const base = filename
    .replace(UP_SUFFIX, "")
    .replace(DOWN_SUFFIX, "")
    .replace(/\.(webp|png|jpe?g)$/i, "");
  return base
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Lists `public/carousel` images: `*_up.{webp,png,jpg}` → `up`,
 * `*_down.{webp,png,jpg}` → `down` (sorted).
 */
export function getHeroCarouselSlidesFromPublic(): {
  up: HeroCarouselImageSlide[];
  down: HeroCarouselImageSlide[];
} {
  if (!existsSync(CAROUSEL_DIR)) {
    return { up: [], down: [] };
  }

  const files = readdirSync(CAROUSEL_DIR).filter(
    (f) => CAROUSEL_IMAGE_EXT.test(f) && !f.startsWith("."),
  );

  const upFiles = files
    .filter((f) => UP_SUFFIX.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const downFiles = files
    .filter((f) => DOWN_SUFFIX.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const toSlide = (f: string): HeroCarouselImageSlide => {
    const title = labelFromCarouselFilename(f);
    return {
      src: `/carousel/${f}`,
      title,
      alt: `${title} — design preview`,
    };
  };

  return {
    up: upFiles.map(toSlide),
    down: downFiles.map(toSlide),
  };
}

/**
 * Resolves slides for `<HeroSection heroCarouselSlides={...} />`.
 * Per column: uses `HERO_CAROUSEL_SLIDES` in `lib/hero-carousel-slides.ts` when
 * that array is non-empty; otherwise uses files from `public/carousel`.
 */
export function getResolvedHeroCarouselSlides(): HeroCarouselSlidesProp {
  const fromDisk = getHeroCarouselSlidesFromPublic();
  const manual = HERO_CAROUSEL_SLIDES;

  return {
    up: manual.up.length > 0 ? manual.up : fromDisk.up,
    down: manual.down.length > 0 ? manual.down : fromDisk.down,
  };
}
