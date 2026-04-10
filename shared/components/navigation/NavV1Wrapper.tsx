"use client";

import { useDynamicIslandVisibility } from "@/shared/hooks/useDynamicIslandVisibility";
import { useHomeSectionScrollSpy } from "@/shared/hooks/useHomeSectionScrollSpy";
import MainHeader from "./MainHeader";

/**
 * Wraps NavV1 and hides it when user scrolls past hero (DynamicIsland visible).
 */
export default function NavV1Wrapper() {
  const dynamicIslandVisible = useDynamicIslandVisibility();
  useHomeSectionScrollSpy();

  return <MainHeader hideWhenBottomNav={dynamicIslandVisible} />;
}
