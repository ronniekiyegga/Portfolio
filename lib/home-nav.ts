import type { MouseEvent } from "react";

/** Fired after in-page section navigation so multiple UIs can sync active state (replaceState does not emit hashchange). */
export const HOME_SECTION_HASH_EVENT = "portfolio:home-section-hash";

/**
 * In-page sections for scroll/history (DOM order).
 * Hero keeps `id="work"` for anchors and scroll spy; it is not a separate nav label (Projects covers intro + grid).
 */
export const HOME_SCROLL_SECTION_IDS = [
  "work",
  "projects",
  "experience",
  "design",
] as const;

export type HomeSectionId = (typeof HOME_SCROLL_SECTION_IDS)[number];

/** Header / DynamicIsland — no separate “Work”; Projects represents hero + project grid. */
export const HOME_NAV_ITEMS = [
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Design", id: "design" },
] as const;

export type HomeNavItemId = (typeof HOME_NAV_ITEMS)[number]["id"];

export function scrollToHomeSection(
  sectionId: HomeSectionId,
  pathname: string,
  setHash: (hash: string) => void,
  e?: MouseEvent<HTMLAnchorElement>,
) {
  e?.preventDefault();
  if (pathname !== "/") {
    window.location.href = `/#${sectionId}`;
    return;
  }
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", `/#${sectionId}`);
  setHash(sectionId);
  window.dispatchEvent(
    new CustomEvent<HomeSectionId>(HOME_SECTION_HASH_EVENT, {
      detail: sectionId,
    }),
  );
}

export function isHomeSectionActive(
  sectionId: HomeNavItemId,
  pathname: string,
  hash: string,
): boolean {
  if (pathname !== "/") return false;
  if (sectionId === "projects") {
    return hash === "" || hash === "work" || hash === "projects";
  }
  return hash === sectionId;
}
