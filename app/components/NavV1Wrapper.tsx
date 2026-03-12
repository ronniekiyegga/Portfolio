"use client";

import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";
import NavV1 from "./NavV1";

/**
 * Wraps NavV1 and hides it when user scrolls past hero (DynamicIsland visible).
 */
export default function NavV1Wrapper() {
  const dynamicIslandVisible = useDynamicIslandVisibility();
  return <NavV1 hideWhenBottomNav={dynamicIslandVisible} />;
}
