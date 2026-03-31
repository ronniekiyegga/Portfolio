import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import type { HeroCarouselImageSlide, HeroCarouselSlidesProp } from "./hero-carousel-types";

const CAROUSEL_DIR = join(process.cwd(), "public", "images", "carousel");
const CAROUSEL_PUBLIC_PREFIX = "/images/carousel";

const EXT_PATTERN = /\.(webp|png|jpe?g)$/i;

function stripImageExtension(filename: string): string {
  return filename.replace(EXT_PATTERN, "");
}

/** Basename (no ext) must end with `_up` or `-up`, e.g. `TrueFounders_Choose_up.webp`. */
function isUpCarouselFile(filename: string): boolean {
  const base = stripImageExtension(filename);
  const l = base.toLowerCase();
  return l.endsWith("_up") || l.endsWith("-up");
}

function isDownCarouselFile(filename: string): boolean {
  const base = stripImageExtension(filename);
  const l = base.toLowerCase();
  return l.endsWith("_down") || l.endsWith("-down");
}

function isCarouselImageFile(filename: string): boolean {
  if (filename.startsWith(".")) return false;
  const l = filename.toLowerCase();
  return (
    l.endsWith(".webp") ||
    l.endsWith(".png") ||
    l.endsWith(".jpg") ||
    l.endsWith(".jpeg")
  );
}

function labelFromCarouselFilename(filename: string): string {
  let base = stripImageExtension(filename);
  const l = base.toLowerCase();
  if (l.endsWith("_down")) base = base.slice(0, -5);
  else if (l.endsWith("-down")) base = base.slice(0, -5);
  else if (l.endsWith("_up")) base = base.slice(0, -3);
  else if (l.endsWith("-up")) base = base.slice(0, -3);
  return base
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Lists `public/images/carousel` images: `*_up.{webp,png,jpg}` → `up`,
 * `*_down.{webp,png,jpg}` → `down` (sorted).
 */
export function getHeroCarouselSlidesFromPublic(): {
  up: HeroCarouselImageSlide[];
  down: HeroCarouselImageSlide[];
} {
  if (!existsSync(CAROUSEL_DIR)) {
    return { up: [], down: [] };
  }

  const files = readdirSync(CAROUSEL_DIR).filter(isCarouselImageFile);

  const byNewestFirst = (a: string, b: string) => {
    const aTime = statSync(join(CAROUSEL_DIR, a)).mtimeMs;
    const bTime = statSync(join(CAROUSEL_DIR, b)).mtimeMs;
    if (bTime !== aTime) return bTime - aTime;
    return a.localeCompare(b, undefined, { numeric: true });
  };

  const upFiles = files
    .filter((f) => isUpCarouselFile(f))
    .sort(byNewestFirst);

  const downFiles = files
    .filter((f) => isDownCarouselFile(f))
    .sort(byNewestFirst);

  const toSlide = (f: string): HeroCarouselImageSlide => {
    const title = labelFromCarouselFilename(f);
    // Derive caption: strip suffix (_up/_down/_soon_up etc), split by _ or -, take first 2 words
    let base = stripImageExtension(f);
    // Detect status from filename convention: *_soon_up → coming-soon, else live
    const lBase = base.toLowerCase();
    const status: HeroCarouselImageSlide["status"] =
      lBase.includes("_soon") ? "coming-soon" : "live";
    // Strip direction/status suffixes
    base = base.replace(/_soon$/i, "").replace(/_live$/i, "");
    base = base.replace(/_up$/i, "").replace(/-up$/i, "");
    base = base.replace(/_down$/i, "").replace(/-down$/i, "");
    const parts = base
      .split(/[-_]+/)
      .map((w) => w.trim())
      .filter(Boolean)
      .map((w) => w.toUpperCase());
    const caption: [string, string] = [
      parts[0] ?? title.split(" ")[0]?.toUpperCase() ?? "PROJECT",
      parts[1] ?? parts[0] ?? "DESIGN",
    ];
    return {
      src: `${CAROUSEL_PUBLIC_PREFIX}/${f}`,
      title,
      alt: `${title} — design preview`,
      caption,
      status,
    };
  };

  return {
    up: upFiles.map(toSlide),
    down: downFiles.map(toSlide),
  };
}

/**
 * Resolves slides for `<HeroSection heroCarouselSlides={...} />`.
 * Sources slides from files in `public/images/carousel`.
 */
export function getResolvedHeroCarouselSlides(): HeroCarouselSlidesProp {
  return getHeroCarouselSlidesFromPublic();
}
