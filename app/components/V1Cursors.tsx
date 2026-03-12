"use client";

import dynamic from "next/dynamic";
import { useSplash } from "@/app/contexts/SplashContext";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

/**
 * Renders V2's CustomCursor (dot + ring) when splash/fluid cursor is off.
 * When splash is on, NavV1 renders SplashCursor.
 */
export default function V1Cursors() {
  const { splashActive } = useSplash();
  if (splashActive) return null;
  return <CustomCursor />;
}
