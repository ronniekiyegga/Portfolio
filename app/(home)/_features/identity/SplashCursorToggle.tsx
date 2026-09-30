"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SplashCursor = dynamic(
  () => import("@/shared/components/effects/SplashCursor"),
  { ssr: false },
);

const SPLASH_DURATION_MS = 5000;

export function SplashCursorToggle() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timeout = window.setTimeout(
      () => setIsActive(false),
      SPLASH_DURATION_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [isActive]);

  return (
    <>
      <button
        type="button"
        className="splashToggle"
        aria-pressed={isActive}
        aria-label={isActive ? "Turn off fluid cursor" : "Turn on fluid cursor"}
        onClick={() => setIsActive((active) => !active)}
      >
        <i className="moonBody" aria-hidden />
        <i className="moonStar" aria-hidden />
      </button>
      {isActive ? createPortal(<SplashCursor />, document.body) : null}
    </>
  );
}
