"use client";

import Link from "next/link";
import { useLayoutEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface VersionDropdownProps {
  /** Where the dropdown appears relative to trigger: "top" = below (for top nav), "bottom" = above (for bottom pill) */
  placement: "top" | "bottom";
  /** Called when user selects an option (e.g. to close the dropdown) */
  onClose?: () => void;
  className?: string;
  /** When "v1", show V1 as current and V2 as link to /. When "v2" (default), V2 is current and V1 links to /v1. */
  currentVersion?: "v1" | "v2";
  /** When provided with placement="top", renders dropdown in a portal to avoid z-index/overflow issues */
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export function VersionDropdown({ placement, onClose, className, currentVersion = "v2", anchorRef }: VersionDropdownProps) {
  const id = useId().replace(/:/g, "");
  const v1Fill = `paint0_linear_v1_${id}`;
  const v1Check = `paint1_linear_v1_${id}`;
  const v2Fill = `paint0_linear_v2_${id}`;
  const v2Stroke = `paint1_linear_v2_${id}`;
  const v2CheckFill = `paint2_linear_v2_${id}`;
  const v2CheckStroke = `paint3_linear_v2_${id}`;

  const [portalStyle, setPortalStyle] = useState<React.CSSProperties>({ position: "fixed", zIndex: 99999 });

  useLayoutEffect(() => {
    if (placement !== "top" || !anchorRef?.current || typeof document === "undefined") return;
    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (rect) {
        setPortalStyle({
          position: "fixed",
          top: rect.bottom + 8,
          left: rect.left,
          zIndex: 99999,
        });
      }
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [placement, anchorRef]);

  const usePortal = placement === "top" && anchorRef != null && typeof document !== "undefined";

  const dropdownContent = (
    <div
      className={cn(
        "min-w-[260px] rounded-xl border overflow-hidden shadow-xl version-dropdown",
        !usePortal && "z-9999",
        !usePortal && placement === "top" && "absolute top-[calc(100%+8px)] left-0",
        !usePortal && placement === "bottom" && "absolute bottom-full left-0 mb-2",
        className,
      )}
      style={usePortal ? portalStyle : undefined}
    >
      <div className="version-dropdown-inner py-1">
        {currentVersion === "v2" ? (
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-between gap-2.5 px-4 py-3 text-[10px] no-underline transition-colors hover:bg-white/5 dark:hover:bg-white/5 w-full"
            style={{ color: "var(--muted)" }}
          >
            <div className="flex items-center gap-3">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 18 18"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M10.1429 3.99967C10.289 3.96608 10.442 3.97883 10.5806 4.03614C10.7191 4.09346 10.8364 4.19249 10.9161 4.3195L11.6337 5.46525C11.6916 5.55753 11.7696 5.63552 11.8619 5.69339L13.0076 6.41101C13.1349 6.49067 13.2342 6.60802 13.2916 6.74674C13.3491 6.88546 13.3619 7.03864 13.3282 7.18495L13.025 8.50181C13.0005 8.60823 13.0005 8.71882 13.025 8.82525L13.3282 10.1428C13.3615 10.2889 13.3486 10.4418 13.2912 10.5802C13.2337 10.7186 13.1346 10.8358 13.0076 10.9153L11.8619 11.6337C11.7696 11.6915 11.6916 11.7695 11.6337 11.8618L10.9161 13.0076C10.8365 13.1347 10.7193 13.2339 10.5807 13.2913C10.4421 13.3488 10.2891 13.3616 10.1429 13.3281L8.82532 13.0249C8.71913 13.0005 8.6088 13.0005 8.5026 13.0249L7.18503 13.3281C7.03882 13.3616 6.88579 13.3488 6.74722 13.2913C6.60865 13.2339 6.49142 13.1347 6.41181 13.0076L5.69418 11.8618C5.63611 11.7694 5.55787 11.6914 5.46532 11.6337L4.32029 10.916C4.19316 10.8364 4.09397 10.7192 4.03653 10.5806C3.97908 10.4421 3.96623 10.289 3.99974 10.1428L4.30224 8.82525C4.32671 8.71882 4.32671 8.60823 4.30224 8.50181L3.99902 7.18495C3.96541 7.03856 3.97829 6.88533 4.03588 6.7466C4.09347 6.60788 4.19289 6.49057 4.32029 6.41101L5.46532 5.69339C5.55787 5.63561 5.63611 5.55761 5.69418 5.46525L6.41181 4.3195C6.49148 4.19263 6.60864 4.09368 6.74705 4.03638C6.88546 3.97907 7.03828 3.96624 7.18431 3.99967L8.5026 4.30217C8.6088 4.32652 8.71913 4.32652 8.82532 4.30217L10.1429 3.99967Z"
                fill={`url(#${v1Fill})`}
                stroke="#F5F5F5"
                strokeWidth="0.721959"
              />
              <path
                d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                fill={`url(#${v1Check})`}
                stroke="#F5F5F5"
                strokeWidth="0.721959"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id={v1Fill}
                  x1="7.34119"
                  y1="5.68445"
                  x2="14.213"
                  y2="11.6112"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                  <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                  <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                </linearGradient>
                <linearGradient
                  id={v1Check}
                  x1="8.15706"
                  y1="7.52199"
                  x2="10.7899"
                  y2="9.79254"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                  <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                  <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col gap-0.5">
              <span
                className="font-semibold text-[11px]"
                style={{ color: "var(--text)" }}
              >
                Version 1
              </span>
              <span className="text-[9px] version-dropdown-desc">
                Classic design
              </span>
            </div>
          </div>
          <span
            className="text-[10px] px-2.5 py-1 rounded-full shrink-0 self-center font-medium"
            style={{
              background: "rgba(148, 189, 8, 0.15)",
              color: "#6B8E23",
            }}
          >
            Live
          </span>
        </Link>
        ) : (
          <Link
            href="/v2"
            onClick={onClose}
            className="flex items-center justify-between gap-2.5 px-4 py-3 text-[10px] no-underline transition-colors hover:bg-white/5 dark:hover:bg-white/5 w-full"
            style={{ color: "var(--muted)" }}
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 18 18"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M10.1429 3.99967C10.289 3.96608 10.442 3.97883 10.5806 4.03614C10.7191 4.09346 10.8364 4.19249 10.9161 4.3195L11.6337 5.46525C11.6916 5.55753 11.7696 5.63552 11.8619 5.69339L13.0076 6.41101C13.1349 6.49067 13.2342 6.60802 13.2916 6.74674C13.3491 6.88546 13.3619 7.03864 13.3282 7.18495L13.025 8.50181C13.0005 8.60823 13.0005 8.71882 13.025 8.82525L13.3282 10.1428C13.3615 10.2889 13.3486 10.4418 13.2912 10.5802C13.2337 10.7186 13.1346 10.8358 13.0076 10.9153L11.8619 11.6337C11.7696 11.6915 11.6916 11.7695 11.6337 11.8618L10.9161 13.0076C10.8365 13.1347 10.7193 13.2339 10.5807 13.2913C10.4421 13.3488 10.2891 13.3616 10.1429 13.3281L8.82532 13.0249C8.71913 13.0005 8.6088 13.0005 8.5026 13.0249L7.18503 13.3281C7.03882 13.3616 6.88579 13.3488 6.74722 13.2913C6.60865 13.2339 6.49142 13.1347 6.41181 13.0076L5.69418 11.8618C5.63611 11.7694 5.55787 11.6914 5.46532 11.6337L4.32029 10.916C4.19316 10.8364 4.09397 10.7192 4.03653 10.5806C3.97908 10.4421 3.96623 10.289 3.99974 10.1428L4.30224 8.82525C4.32671 8.71882 4.32671 8.60823 4.30224 8.50181L3.99902 7.18495C3.96541 7.03856 3.97829 6.88533 4.03588 6.7466C4.09347 6.60788 4.19289 6.49057 4.32029 6.41101L5.46532 5.69339C5.55787 5.63561 5.63611 5.55761 5.69418 5.46525L6.41181 4.3195C6.49148 4.19263 6.60864 4.09368 6.74705 4.03638C6.88546 3.97907 7.03828 3.96624 7.18431 3.99967L8.5026 4.30217C8.6088 4.32652 8.71913 4.32652 8.82532 4.30217L10.1429 3.99967Z"
                  fill={`url(#${v2Fill})`}
                  stroke={`url(#${v2Stroke})`}
                  strokeWidth="0.721959"
                />
                <path
                  d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                  fill={`url(#${v2CheckFill})`}
                  stroke={`url(#${v2CheckStroke})`}
                  strokeWidth="0.721959"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id={v2Fill} x1="7.34119" y1="5.68445" x2="14.213" y2="11.6112" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                    <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                    <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                  </linearGradient>
                  <linearGradient id={v2Stroke} x1="3.98071" y1="13.3464" x2="14.9993" y2="10.5915" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#667BF6" />
                    <stop offset="1" stopColor="#26D0CE" />
                  </linearGradient>
                  <linearGradient id={v2CheckFill} x1="8.15706" y1="7.52199" x2="10.7899" y2="9.79254" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                    <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                    <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                  </linearGradient>
                  <linearGradient id={v2CheckStroke} x1="6.86963" y1="10.4576" x2="11.091" y2="9.40225" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#667BF6" />
                    <stop offset="1" stopColor="#26D0CE" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-[11px]" style={{ color: "var(--text)" }}>Version 2</span>
                <span className="text-[9px] version-dropdown-desc">Current design</span>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full shrink-0 self-center font-medium" style={{ background: "rgba(148, 189, 8, 0.15)", color: "#6B8E23" }}>New</span>
          </Link>
        )}
        <div style={{ height: "1px", background: "var(--border)" }} />
        {currentVersion === "v2" ? (
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-between gap-3 px-4 py-3 text-[10px] w-full cursor-default text-left"
          style={{ color: "var(--muted)" }}
        >
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 18 18"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M10.1429 3.99967C10.289 3.96608 10.442 3.97883 10.5806 4.03614C10.7191 4.09346 10.8364 4.19249 10.9161 4.3195L11.6337 5.46525C11.6916 5.55753 11.7696 5.63552 11.8619 5.69339L13.0076 6.41101C13.1349 6.49067 13.2342 6.60802 13.2916 6.74674C13.3491 6.88546 13.3619 7.03864 13.3282 7.18495L13.025 8.50181C13.0005 8.60823 13.0005 8.71882 13.025 8.82525L13.3282 10.1428C13.3615 10.2889 13.3486 10.4418 13.2912 10.5802C13.2337 10.7186 13.1346 10.8358 13.0076 10.9153L11.8619 11.6337C11.7696 11.6915 11.6916 11.7695 11.6337 11.8618L10.9161 13.0076C10.8365 13.1347 10.7193 13.2339 10.5807 13.2913C10.4421 13.3488 10.2891 13.3616 10.1429 13.3281L8.82532 13.0249C8.71913 13.0005 8.6088 13.0005 8.5026 13.0249L7.18503 13.3281C7.03882 13.3616 6.88579 13.3488 6.74722 13.2913C6.60865 13.2339 6.49142 13.1347 6.41181 13.0076L5.69418 11.8618C5.63611 11.7694 5.55787 11.6914 5.46532 11.6337L4.32029 10.916C4.19316 10.8364 4.09397 10.7192 4.03653 10.5806C3.97908 10.4421 3.96623 10.289 3.99974 10.1428L4.30224 8.82525C4.32671 8.71882 4.32671 8.60823 4.30224 8.50181L3.99902 7.18495C3.96541 7.03856 3.97829 6.88533 4.03588 6.7466C4.09347 6.60788 4.19289 6.49057 4.32029 6.41101L5.46532 5.69339C5.55787 5.63561 5.63611 5.55761 5.69418 5.46525L6.41181 4.3195C6.49148 4.19263 6.60864 4.09368 6.74705 4.03638C6.88546 3.97907 7.03828 3.96624 7.18431 3.99967L8.5026 4.30217C8.6088 4.32652 8.71913 4.32652 8.82532 4.30217L10.1429 3.99967Z"
                fill={`url(#${v2Fill})`}
                stroke={`url(#${v2Stroke})`}
                strokeWidth="0.721959"
              />
              <path
                d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                fill={`url(#${v2CheckFill})`}
                stroke={`url(#${v2CheckStroke})`}
                strokeWidth="0.721959"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id={v2Fill}
                  x1="7.34119"
                  y1="5.68445"
                  x2="14.213"
                  y2="11.6112"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                  <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                  <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                </linearGradient>
                <linearGradient
                  id={v2Stroke}
                  x1="3.98071"
                  y1="13.3464"
                  x2="14.9993"
                  y2="10.5915"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#667BF6" />
                  <stop offset="1" stopColor="#26D0CE" />
                </linearGradient>
                <linearGradient
                  id={v2CheckFill}
                  x1="8.15706"
                  y1="7.52199"
                  x2="10.7899"
                  y2="9.79254"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                  <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                  <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                </linearGradient>
                <linearGradient
                  id={v2CheckStroke}
                  x1="6.86963"
                  y1="10.4576"
                  x2="11.091"
                  y2="9.40225"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#667BF6" />
                  <stop offset="1" stopColor="#26D0CE" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col gap-0.5">
              <span
                className="font-semibold text-[11px]"
                style={{ color: "var(--text)" }}
              >
                Version 2
              </span>
              <span className="text-[9px] version-dropdown-desc">
                Current design
              </span>
            </div>
          </div>
          <span
            className="text-[10px] px-2.5 py-1 rounded-full shrink-0 self-center font-medium"
            style={{
              background: "rgba(148, 189, 8, 0.15)",
              color: "#6B8E23",
            }}
          >
            New
          </span>
        </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-between gap-3 px-4 py-3 text-[10px] w-full cursor-default text-left"
            style={{ color: "var(--muted)" }}
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 18 18"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M10.1429 3.99967C10.289 3.96608 10.442 3.97883 10.5806 4.03614C10.7191 4.09346 10.8364 4.19249 10.9161 4.3195L11.6337 5.46525C11.6916 5.55753 11.7696 5.63552 11.8619 5.69339L13.0076 6.41101C13.1349 6.49067 13.2342 6.60802 13.2916 6.74674C13.3491 6.88546 13.3619 7.03864 13.3282 7.18495L13.025 8.50181C13.0005 8.60823 13.0005 8.71882 13.025 8.82525L13.3282 10.1428C13.3615 10.2889 13.3486 10.4418 13.2912 10.5802C13.2337 10.7186 13.1346 10.8358 13.0076 10.9153L11.8619 11.6337C11.7696 11.6915 11.6916 11.7695 11.6337 11.8618L10.9161 13.0076C10.8365 13.1347 10.7193 13.2339 10.5807 13.2913C10.4421 13.3488 10.2891 13.3616 10.1429 13.3281L8.82532 13.0249C8.71913 13.0005 8.6088 13.0005 8.5026 13.0249L7.18503 13.3281C7.03882 13.3616 6.88579 13.3488 6.74722 13.2913C6.60865 13.2339 6.49142 13.1347 6.41181 13.0076L5.69418 11.8618C5.63611 11.7694 5.55787 11.6914 5.46532 11.6337L4.32029 10.916C4.19316 10.8364 4.09397 10.7192 4.03653 10.5806C3.97908 10.4421 3.96623 10.289 3.99974 10.1428L4.30224 8.82525C4.32671 8.71882 4.32671 8.60823 4.30224 8.50181L3.99902 7.18495C3.96541 7.03856 3.97829 6.88533 4.03588 6.7466C4.09347 6.60788 4.19289 6.49057 4.32029 6.41101L5.46532 5.69339C5.55787 5.63561 5.63611 5.55761 5.69418 5.46525L6.41181 4.3195C6.49148 4.19263 6.60864 4.09368 6.74705 4.03638C6.88546 3.97907 7.03828 3.96624 7.18431 3.99967L8.5026 4.30217C8.6088 4.32652 8.71913 4.32652 8.82532 4.30217L10.1429 3.99967Z"
                  fill={`url(#${v1Fill})`}
                  stroke="#F5F5F5"
                  strokeWidth="0.721959"
                />
                <path
                  d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                  fill={`url(#${v1Check})`}
                  stroke="#F5F5F5"
                  strokeWidth="0.721959"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id={v1Fill} x1="7.34119" y1="5.68445" x2="14.213" y2="11.6112" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                    <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                    <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                  </linearGradient>
                  <linearGradient id={v1Check} x1="8.15706" y1="7.52199" x2="10.7899" y2="9.79254" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="0.351197" stopColor="#FBE9D9" stopOpacity="0.18" />
                    <stop offset="0.75" stopColor="#DEDAF9" stopOpacity="0.81" />
                    <stop offset="1" stopColor="#F0ACF7" stopOpacity="0.03" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-[11px]" style={{ color: "var(--text)" }}>Version 1</span>
                <span className="text-[9px] version-dropdown-desc">Classic design</span>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-full shrink-0 self-center font-medium" style={{ background: "rgba(148, 189, 8, 0.15)", color: "#6B8E23" }}>Live</span>
          </button>
        )}
      </div>
    </div>
  );

  if (usePortal && typeof document !== "undefined") {
    return createPortal(dropdownContent, document.body);
  }
  return dropdownContent;
}
