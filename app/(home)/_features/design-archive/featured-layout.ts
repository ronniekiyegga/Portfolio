import type { CSSProperties } from "react";

import type { DesignWork } from "./design-work";

/** Pixel rectangle measured from the 1200px-wide Figma grid export. */
type FeaturedRect = { x: number; y: number; width: number; height: number };

export type FeaturedDesignWork = {
  item: DesignWork;
  style: CSSProperties;
  sizes: string;
  eager: boolean;
};

export const FEATURED_FRAME = { width: 1200, height: 2347 } as const;

/*
 * `sizes` breakpoints mirror the gallery CSS: the grid is capped at 1200px
 * from a 1232px viewport, pinned above 56rem, then 2 and 1 masonry columns.
 */
const PINNED_MIN_VIEWPORT = "(min-width: 897px)";
const CAPPED_MIN_VIEWPORT = "(min-width: 1232px)";
const MOBILE_SIZES = "(min-width: 673px) 50vw, 100vw";

export const MASONRY_IMAGE_SIZES = `${CAPPED_MIN_VIEWPORT} 394px, ${PINNED_MIN_VIEWPORT} 33vw, ${MOBILE_SIZES}`;

const REVEAL_STAGGER_MS = 60;
const REVEAL_STAGGER_COLUMN_PX = 300;
const ABOVE_THE_FOLD_Y = 10;

/*
 * Positions are kept absolute rather than snapped to a grid because the
 * design's gutters vary between 1px and 4px. Insertion order is reading
 * order, which drives lightbox navigation.
 */
const featuredRects = new Map<DesignWork["id"], FeaturedRect>([
  ["curriculum-teacher", { x: 0, y: 1, width: 462, height: 311 }],
  ["folder-curriculum", { x: 465, y: 1, width: 287, height: 311 }],
  ["footer", { x: 754, y: 0, width: 446, height: 345 }],
  ["bio-cards", { x: 0, y: 313, width: 262, height: 314 }],
  ["curriculum-selection", { x: 266, y: 313, width: 487, height: 314 }],
  ["prompt-interface", { x: 754, y: 347, width: 446, height: 203 }],
  ["professional-support", { x: 754, y: 552, width: 446, height: 350 }],
  ["pricing-card", { x: 0, y: 630, width: 517, height: 380 }],
  ["lesson-pill", { x: 520, y: 630, width: 231, height: 133 }],
  ["lesson-pill-dropdown", { x: 520, y: 765, width: 231, height: 245 }],
  ["notification", { x: 754, y: 905, width: 231, height: 172 }],
  ["stat-card", { x: 986, y: 905, width: 211, height: 172 }],
  ["online-lesson", { x: 0, y: 1011, width: 278, height: 276 }],
  ["student-ranking", { x: 279, y: 1011, width: 472, height: 396 }],
  ["dropdown-performance", { x: 754, y: 1079, width: 442, height: 328 }],
  ["navigation", { x: 0, y: 1289, width: 278, height: 250 }],
  ["update-card", { x: 279, y: 1410, width: 206, height: 297 }],
  ["command", { x: 488, y: 1411, width: 264, height: 296 }],
  ["file-uploader-calendar", { x: 754, y: 1409, width: 442, height: 298 }],
  ["ai-assist-pill", { x: 0, y: 1540, width: 278, height: 203 }],
  ["command-student-bio", { x: 279, y: 1708, width: 509, height: 317 }],
  ["testimonials", { x: 792, y: 1708, width: 405, height: 316 }],
  ["studio-bio", { x: 0, y: 1745, width: 277, height: 194 }],
  ["chart", { x: 0, y: 1945, width: 277, height: 313 }],
  ["design-collection", { x: 280, y: 2028, width: 405, height: 319 }],
  ["truefounders-footer", { x: 687, y: 2027, width: 509, height: 320 }],
]);

const percentOf = (value: number, total: number) => `${(value / total) * 100}%`;

/** Cards sharing a row reveal left to right instead of all at once. */
function revealStagger(x: number) {
  return `${Math.round(x / REVEAL_STAGGER_COLUMN_PX) * REVEAL_STAGGER_MS}ms`;
}

function rectStyle({ x, y, width, height }: FeaturedRect): CSSProperties {
  return {
    "--featured-left": percentOf(x, FEATURED_FRAME.width),
    "--featured-top": percentOf(y, FEATURED_FRAME.height),
    "--featured-width": percentOf(width, FEATURED_FRAME.width),
    "--featured-height": percentOf(height, FEATURED_FRAME.height),
    "--design-card-stagger": revealStagger(x),
  } as CSSProperties;
}

function rectSizes({ width }: FeaturedRect) {
  const viewportShare = ((width / FEATURED_FRAME.width) * 100).toFixed(1);
  return `${CAPPED_MIN_VIEWPORT} ${width}px, ${PINNED_MIN_VIEWPORT} ${viewportShare}vw, ${MOBILE_SIZES}`;
}

export function partitionFeaturedDesignWork(items: DesignWork[]) {
  const itemsById = new Map(items.map((item) => [item.id, item]));
  const featured: FeaturedDesignWork[] = [];

  for (const [id, rect] of featuredRects) {
    const item = itemsById.get(id);
    if (!item) continue;
    featured.push({
      item,
      style: rectStyle(rect),
      sizes: rectSizes(rect),
      eager: rect.y < ABOVE_THE_FOLD_Y,
    });
  }

  const rest = items.filter((item) => !featuredRects.has(item.id));
  return { featured, rest };
}
