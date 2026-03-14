"use client";

import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";
import MainHeader from "./MainHeader";

/**
 * Wraps NavV1 and hides it when user scrolls past hero (DynamicIsland visible).
 */
export default function NavV1Wrapper() {
  const dynamicIslandVisible = useDynamicIslandVisibility();
  return <MainHeader hideWhenBottomNav={dynamicIslandVisible} />;
}
