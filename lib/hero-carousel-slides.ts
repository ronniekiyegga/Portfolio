import type { HeroCarouselSlidesProp } from "./hero-carousel-types";

/**
 * Manual hero carousel slides (optional).
 *
 * - If `up` or `down` has at least one item, that column uses this list.
 * - If a column is empty (`[]`), that column falls back to files in
 *   `public/carousel` named `*_up.webp` / `*_down.webp` (see
 *   `getHeroCarouselSlidesFromPublic`).
 * - If both manual and folder are empty for a column, that column shows the
 *   default project thumbnails (same list as before).
 *
 * `src` must be a URL path under `public/` (e.g. `/carousel/foo_up.webp`
 * or `/images/projects/.../file.svg`).
 */
export const HERO_CAROUSEL_SLIDES: HeroCarouselSlidesProp = {
  up: [],
  down: [],
};
