import type { MouseEvent } from "react";

/** Fired after in-page section navigation so multiple UIs can sync active state (replaceState does not emit hashchange). */
export const HOME_SECTION_HASH_EVENT = "portfolio:home-section-hash";

/** In-page sections on the home layout (ids must match DOM). */
export const HOME_NAV_ITEMS = [
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Design", id: "design" },
] as const;

export type HomeSectionId = (typeof HOME_NAV_ITEMS)[number]["id"];

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
  sectionId: HomeSectionId,
  pathname: string,
  hash: string,
): boolean {
  if (pathname !== "/") return false;
  if (sectionId === "work") return hash === "" || hash === "work";
  return hash === sectionId;
}
