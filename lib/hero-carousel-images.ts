import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import type {
  HeroCarouselImageSlide,
  HeroCarouselSlidesProp,
} from "./hero-carousel-types";

const CAROUSEL_DIR = join(process.cwd(), "public", "images", "carousel");
const CAROUSEL_PUBLIC_PREFIX = "/images/carousel";

const EXT_PATTERN = /\.(webp|png|jpe?g)$/i;

function stripImageExtension(filename: string): string {
  return filename.replace(EXT_PATTERN, "");
}

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

/**
 * Hand-crafted captions per carousel filename (basename, no extension).
 * Format: [PRODUCT NAME, DOMAIN, DATE LABEL]
 * Last segment gets the KIYEGGA gradient treatment in the UI.
 * - "REDESIGN" = visual redesign only, no engineering build
 * - "DESIGN & CODE" = designed and engineered from scratch
 */
const CAPTION_MAP: Record<string, [string, string, string]> = {
  // ── Up column ──────────────────────────────────────────────────────────────
  Numerix__Theme_up:             ["NUMERIX AI",       "EDTECH",      "2026 DESIGN & CODE"],
  Numerix_up:                    ["NUMERIX AI",       "EDTECH",      "2026 DESIGN & CODE"],
  Spree_Clothing_up:             ["SPREE CLOTHING",   "ECOMMERCE",   "2023 DESIGN & CODE"],
  Student_Files_up:              ["EDUFEEDBACKPRO",   "EDTECH",      "2026 DESIGN & CODE"],
  TrueFounders_Choose_up:        ["TRUEFOUNDERS",     "BRAND",       "2026 REDESIGN"],
  TrueFounders_Possibilities_up: ["TRUEFOUNDERS",     "BRAND",       "2026 REDESIGN"],
  Tutoring_path_up:              ["MS MARYAM'S",      "EDTECH",      "2026 DESIGN & CODE"],

  // ── Down column ────────────────────────────────────────────────────────────
  Bespoke_garments_down:         ["BESPOKE GARMENTS", "ECOMMERCE",   "2022 DESIGN & CODE"],
  John_Canary_down:              ["JOHN CANARY",      "MEDIA",       "2021 DESIGN & CODE"],
  Tutoring_FAQ_down:             ["MS MARYAM'S",      "EDTECH",      "2026 DESIGN & CODE"],
  Tutoring_benefits_down:        ["MS MARYAM'S",      "EDTECH",      "2026 DESIGN & CODE"],
  Tutoring_lesson_down:          ["MS MARYAM'S",      "EDTECH",      "2026 DESIGN & CODE"],
  Tutoring_testimonials_down:    ["MS MARYAM'S",      "EDTECH",      "2026 DESIGN & CODE"],
};

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

  const upFiles = files.filter((f) => isUpCarouselFile(f)).sort(byNewestFirst);
  const downFiles = files.filter((f) => isDownCarouselFile(f)).sort(byNewestFirst);

  const toSlide = (f: string): HeroCarouselImageSlide => {
    const title = labelFromCarouselFilename(f);
    const base = stripImageExtension(f);
    const lBase = base.toLowerCase();
    const status: HeroCarouselImageSlide["status"] =
      lBase.includes("_soon") ? "coming-soon" : "live";

    const richCaption = CAPTION_MAP[base];
    const caption: [string, ...string[]] = richCaption ?? [
      base.split(/[-_]+/)[0]?.toUpperCase() ?? title.toUpperCase(),
      "DESIGN & CODE",
    ];

    return {
      src: `${CAROUSEL_PUBLIC_PREFIX}/${f}`,
      title,
      alt: `${title}, design preview`,
      caption,
      status,
    };
  };

  return {
    up: upFiles.map(toSlide),
    down: downFiles.map(toSlide),
  };
}

const HERO_TUTORIAL_VIDEO_SLIDE: HeroCarouselImageSlide = {
  src: "/images/projects/maths-tutoring/tutorial.webm",
  title: "Tutoring tutorial",
  alt: "Maths tutoring platform, tutorial preview",
  caption: ["MS MARYAM'S", "EDTECH", "2026 DESIGN & CODE"],
  status: "live",
};

export function getResolvedHeroCarouselSlides(): HeroCarouselSlidesProp {
  const fromDisk = getHeroCarouselSlidesFromPublic();
  return {
    up: [...fromDisk.up, HERO_TUTORIAL_VIDEO_SLIDE],
    down: fromDisk.down,
  };
}
