"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { styleScript } from "@/app/fonts";

const GRADIENT_1 = "linear-gradient(77deg, #3A07F2 10.26%, #0CD1CF 98.05%)";

const TEXT_GRADIENT = "linear-gradient(to bottom, #69eacb, #6654f1)";

const MUTED_TEXT_COLOR = "#9ca3af";
const MUTED_LINE_COLOR = "#f0f0f0";
const MUTED_DEFAULT_LINE_WIDTH = 56;
const GRADIENT_DEFAULT_LINE_WIDTH = 120;

const SPARKLE_PATH =
  "M4.43352 3.86465L4.78459 5.03688L5.13567 3.86465C5.22381 3.57022 5.26814 3.42277 5.35477 3.30143C5.4312 3.19487 5.53121 3.10395 5.64843 3.03447C5.7809 2.95571 5.94309 2.91587 6.26797 2.83528L7.55743 2.51612L6.26797 2.19696C5.9441 2.11683 5.78241 2.07653 5.64843 1.99778C5.53121 1.9283 5.4312 1.83738 5.35477 1.73082C5.26814 1.61039 5.22432 1.46294 5.13567 1.1676L4.78459 -0.00463867L4.43352 1.1676C4.34537 1.46203 4.30105 1.60947 4.21441 1.73082C4.13798 1.83738 4.03797 1.9283 3.92076 1.99778C3.78829 2.07653 3.6261 2.11637 3.30121 2.19696L2.01176 2.51612L3.30121 2.83528C3.62509 2.91541 3.78728 2.95571 3.92076 3.03447C4.03797 3.10395 4.13798 3.19487 4.21441 3.30143C4.30105 3.42186 4.34487 3.5693 4.43352 3.86465ZM1.35091 6.27322C1.43603 6.38495 1.48388 6.52141 1.58059 6.79524L1.76293 7.30809L1.94527 6.79524C2.04147 6.52278 2.08983 6.38633 2.17495 6.27322C2.25 6.17432 2.34621 6.09006 2.45752 6.02458C2.58294 5.95086 2.73456 5.91148 3.03677 5.83318L3.52586 5.70634L3.03677 5.5795C2.73405 5.50074 2.58244 5.46136 2.45752 5.3881C2.34628 5.3229 2.25026 5.23841 2.17495 5.13945C2.08983 5.02773 2.04198 4.89127 1.94527 4.61744L1.76293 4.10459L1.58059 4.61744C1.48439 4.8899 1.43603 5.02635 1.35091 5.13945C1.27586 5.23836 1.17965 5.32262 1.06834 5.3881C0.942916 5.46182 0.791304 5.5012 0.489087 5.5795L0 5.70634L0.489087 5.83318C0.791808 5.91194 0.94342 5.95132 1.06834 6.02458C1.17958 6.08978 1.2756 6.17427 1.35091 6.27322Z";

export interface SectionKickerProps {
  children: React.ReactNode;
  className?: string;
  lineWidth?: number;
  variant?: "gradient" | "muted";
}

function SparkleIcon({
  gradientId,
  muted,
}: {
  gradientId: string;
  muted: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="-0.1 -0.1 8.2 8.2"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      {muted ? (
        <path d={SPARKLE_PATH} fill="currentColor" />
      ) : gradientId ? (
        <>
          <defs>
            <linearGradient
              id={gradientId}
              x1="-0.797355"
              y1="5.43808"
              x2="8.15606"
              y2="3.37361"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.139423" stopColor="#3A07F2" />
              <stop offset="1" stopColor="#0CD1CF" />
            </linearGradient>
          </defs>
          <path d={SPARKLE_PATH} fill={`url(#${gradientId})`} />
        </>
      ) : (
        <path d={SPARKLE_PATH} fill="#3A07F2" />
      )}
    </svg>
  );
}


export default function SectionKicker({
  children,
  className,
  lineWidth,
  variant = "gradient",
}: SectionKickerProps) {
  const muted = variant === "muted";
  const effectiveLineWidth =
    lineWidth ?? (muted ? MUTED_DEFAULT_LINE_WIDTH : GRADIENT_DEFAULT_LINE_WIDTH);
  const [gradientId, setGradientId] = useState("");

  useEffect(() => {
    if (muted) return;
    setGradientId(`sk-${crypto.randomUUID().replace(/-/g, "")}`);
  }, [muted]);

  return (
    <div
      className={cn(
        "mx-auto flex w-fit items-center justify-center",
        muted
          ? "gap-3 py-1"
          : "h-[46px] max-w-sm gap-0 pt-[11.1px] pb-[11.81px]",
        className,
      )}
    >
      <div
        className={cn(
          "shrink-0",
          muted ? "h-px bg-[#f0f0f0] dark:bg-white/10" : "h-0.5 opacity-10 dark:opacity-20",
        )}
        style={
          muted
            ? { width: effectiveLineWidth, backgroundColor: MUTED_LINE_COLOR }
            : { width: effectiveLineWidth, background: GRADIENT_1 }
        }
        aria-hidden
      />

      <div
        className={cn(
          "flex shrink-0 items-center",
          muted ? "gap-2 text-[#9ca3af] dark:text-neutral-500" : "gap-2 px-2 pb-px",
        )}
        style={muted ? { color: MUTED_TEXT_COLOR } : undefined}
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
          <SparkleIcon gradientId={gradientId} muted={muted} />
        </div>
        <span
          className={cn(
            muted
              ? "whitespace-nowrap font-sans text-base font-normal leading-6"
              : `${styleScript.className} whitespace-nowrap text-lg font-semibold text-white`,
          )}
          style={
            muted
              ? undefined
              : {
                  background: TEXT_GRADIENT,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }
          }
        >
          {children}
        </span>
      </div>

      <div
        className={cn(
          "shrink-0",
          muted ? "h-px bg-[#f0f0f0] dark:bg-white/10" : "h-0.5 opacity-5 dark:opacity-15",
        )}
        style={
          muted
            ? { width: effectiveLineWidth, backgroundColor: MUTED_LINE_COLOR }
            : { width: effectiveLineWidth, background: GRADIENT_1 }
        }
        aria-hidden
      />
    </div>
  );
}
