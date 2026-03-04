"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BsStars } from "react-icons/bs";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { useDynamicIslandVisibility } from "@/app/hooks/useDynamicIslandVisibility";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { Style_Script } from "next/font/google";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });

const CREAM_GRADIENT =
  "var(--Gradients-Cream-Buttons, linear-gradient(135deg, rgba(255, 255, 255, 0.55) 4.86%, rgba(255, 241, 254, 0.08) 22.6%, rgba(251, 233, 217, 0.29) 35.05%, rgba(222, 168, 255, 0.13) 44.56%, rgba(251, 233, 217, 0.07) 57.23%, rgba(255, 255, 255, 0.42) 85.1%))";

interface DynamicIslandV2Props {
  splashEnabled?: boolean;
  onToggleSplash?: () => void;
}

const navLinks = [
  { label: "Work", href: "#work", sectionId: "work" as const },
  { label: "Design", href: "#design", sectionId: "design" as const },
  { label: "Process", href: "#process", sectionId: "process" as const },
  {
    label: "Experience",
    href: "#experience",
    sectionId: "experience" as const,
  },
  { label: "Blog", href: "/blog", sectionId: null },
];

export function DynamicIslandV2({
  splashEnabled,
  onToggleSplash,
}: DynamicIslandV2Props) {
  const isVisible = useDynamicIslandVisibility();
  const activeSection = useActiveSection();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const pillOuter = "rounded-full p-2 shadow-[0_0_20px_rgba(59,7,242,0.08)]";
  const pillRadius = "3rem";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 px-2"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Left pill — Avatar + Ronniè + V1 dropdown (matches design spec) */}
          <div
            className="flex flex-col gap-2.5 p-1.5 rounded-[32px] dynamic-island-left-outer"
            style={{
              boxShadow: "0 0 20px rgba(59,7,242,0.06)",
              background:
                "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.26) 97.21%)",
            }}
          >
            <div
              className="flex gap-[9.65px] self-stretch rounded-full dynamic-island-left-inner"
              style={{
                background:
                  "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.26) 97.21%)",
              }}
            >
              <div
                className={cn(
                  "flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full",
                  "bg-linear-to-b from-[#f9f9f9] to-[#f6f6f6]",
                  "dark:from-[#0d0d1a] dark:to-[#0a0a12]",
                )}
              >
                <div
                  className={cn(
                    "h-[42.96px] w-[42.96px] shrink-0 overflow-hidden rounded-full dynamic-island-avatar-ring",
                    "border-[1.7px] border-solid border-[#e8e8e8]",
                    "bg-[#f9f9f9] dark:border-transparent dark:bg-[#0a0a12]",
                  )}
                >
                  <Image
                    src="/Avatar.svg"
                    alt="Ronniè"
                    width={43}
                    height={43}
                    className="size-full object-cover"
                  />
                </div>
                <span
                  className={cn(
                    "font-normal text-[#212225] dark:text-white shrink-0",
                    styleScript.className,
                  )}
                  style={{ fontSize: "14px", lineHeight: "1.2" }}
                >
                  Ronniè
                </span>
                <div className="flex items-center  shrink-0">
                  <div
                    className="h-[2.73px] w-[2.73px] shrink-0 rounded-full"
                    style={{ background: "#000d4d" }}
                  />
                  <div className="relative flex items-center" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-outfit text-[12px] transition-colors",
                        "bg-white/10 dark:bg-[#0d0d1a]",

                        "text-(--muted) hover:text-(--text)",
                      )}
                    >
                      V2
                      <svg
                        width="8"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="currentColor"
                        className={cn(
                          "transition-transform",
                          dropdownOpen && "rotate-180",
                        )}
                      >
                        <path d="M0 0l5 6 5-6z" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute bottom-full left-0 mb-2 min-w-[260px] rounded-xl border overflow-hidden shadow-xl z-50 version-dropdown">
                        <div className="version-dropdown-inner py-1">
                          <Link
                            href="https://www.ronniekiyegga.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-2.5 px-4 py-2.5 text-[10px] no-underline transition-colors hover:bg-white/5 dark:hover:bg-white/5 w-full"
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
                                  fill="url(#paint0_linear_v1_icon)"
                                  stroke="#F5F5F5"
                                  strokeWidth="0.721959"
                                />
                                <path
                                  d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                                  fill="url(#paint1_linear_v1_icon)"
                                />
                                <path
                                  d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                                  stroke="#F5F5F5"
                                  strokeWidth="0.721959"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_v1_icon"
                                    x1="7.34119"
                                    y1="5.68445"
                                    x2="14.213"
                                    y2="11.6112"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="white" />
                                    <stop
                                      offset="0.351197"
                                      stopColor="#FBE9D9"
                                      stopOpacity="0.18"
                                    />
                                    <stop
                                      offset="0.75"
                                      stopColor="#DEDAF9"
                                      stopOpacity="0.81"
                                    />
                                    <stop
                                      offset="1"
                                      stopColor="#F0ACF7"
                                      stopOpacity="0.03"
                                    />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint1_linear_v1_icon"
                                    x1="8.15706"
                                    y1="7.52199"
                                    x2="10.7899"
                                    y2="9.79254"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="white" />
                                    <stop
                                      offset="0.351197"
                                      stopColor="#FBE9D9"
                                      stopOpacity="0.18"
                                    />
                                    <stop
                                      offset="0.75"
                                      stopColor="#DEDAF9"
                                      stopOpacity="0.81"
                                    />
                                    <stop
                                      offset="1"
                                      stopColor="#F0ACF7"
                                      stopOpacity="0.03"
                                    />
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
                              className="text-[10px] px-2 py-0.5 rounded-full shrink-0 self-center"
                              style={{
                                background: "rgba(148, 189, 8, 0.10)",
                                color: "#8CB404",
                              }}
                            >
                              Live
                            </span>
                          </Link>
                          <div
                            style={{
                              height: "1px",
                              background: "var(--border)",
                            }}
                          />
                          <div
                            className="flex items-center justify-between gap-3 px-4 py-2.5 text-[10px] w-full"
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
                                  fill="url(#paint0_linear_v2_icon)"
                                  stroke="url(#paint1_linear_v2_icon)"
                                  strokeWidth="0.721959"
                                />
                                <path
                                  d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                                  fill="url(#paint2_linear_v2_icon)"
                                />
                                <path
                                  d="M6.86963 9.05049L8.33882 10.4576L10.4578 6.86945"
                                  stroke="url(#paint3_linear_v2_icon)"
                                  strokeWidth="0.721959"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_v2_icon"
                                    x1="7.34119"
                                    y1="5.68445"
                                    x2="14.213"
                                    y2="11.6112"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="white" />
                                    <stop
                                      offset="0.351197"
                                      stopColor="#FBE9D9"
                                      stopOpacity="0.18"
                                    />
                                    <stop
                                      offset="0.75"
                                      stopColor="#DEDAF9"
                                      stopOpacity="0.81"
                                    />
                                    <stop
                                      offset="1"
                                      stopColor="#F0ACF7"
                                      stopOpacity="0.03"
                                    />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint1_linear_v2_icon"
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
                                    id="paint2_linear_v2_icon"
                                    x1="8.15706"
                                    y1="7.52199"
                                    x2="10.7899"
                                    y2="9.79254"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stopColor="white" />
                                    <stop
                                      offset="0.351197"
                                      stopColor="#FBE9D9"
                                      stopOpacity="0.18"
                                    />
                                    <stop
                                      offset="0.75"
                                      stopColor="#DEDAF9"
                                      stopOpacity="0.81"
                                    />
                                    <stop
                                      offset="1"
                                      stopColor="#F0ACF7"
                                      stopOpacity="0.03"
                                    />
                                  </linearGradient>
                                  <linearGradient
                                    id="paint3_linear_v2_icon"
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
                              className="text-[10px] px-2 py-0.5 rounded-full shrink-0 self-center"
                              style={{
                                background: "rgba(148, 189, 8, 0.10)",
                                color: "#8CB404",
                              }}
                            >
                              New
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle pill — Nav links + active dot */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-0.5 dynamic-island-middle-outer",
              pillOuter,
            )}
            style={{
              borderRadius: pillRadius,
              background: CREAM_GRADIENT,
            }}
          >
            <div
              className={cn(
                "flex items-center gap-6 rounded-full px-6 py-2.5",
                "bg-white/95 dark:bg-[#0d0d1a]",
                "border border-white/30 dark:border-0",
              )}
              style={{ borderRadius: pillRadius }}
            >
              {navLinks.map((link) => {
                const isActive = link.sectionId === activeSection;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative flex flex-col items-center gap-1 py-1 transition-colors hover:opacity-100"
                    style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
                  >
                    <span className="font-outfit text-[12px]">
                      {link.label}
                    </span>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-opacity",
                        link.sectionId &&
                          (isActive ? "opacity-100" : "opacity-0"),
                      )}
                      style={{
                        background: "var(--text)",
                        ...(!link.sectionId && { opacity: 0 }),
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right pill — Same structure as V1: pill-outer-cream + lets-chat-inner */}
          <div className="p-[2px] rounded-full pill-outer-cream">
            <div
              className={cn(
                "flex items-center gap-0 rounded-full px-2 py-1.5",
                "lets-chat-inner",
              )}
              style={{
                backgroundImage: "url(/BG_1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Link
                href="mailto:contact@ronniekiyegga.com"
                className={cn(
                  "flex items-center gap-2 text-nowrap rounded-full px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90",
                  styleScript.className,
                )}
              >
                <span>Let&apos;s chat</span>
                <span style={{ color: "#00CFDE", fontSize: "14px" }}>→</span>
              </Link>
              <div className="h-4 w-px shrink-0 bg-white/30" />
              <button
                type="button"
                onClick={() => onToggleSplash?.()}
                className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10"
                aria-label={
                  splashEnabled ? "Disable fluid cursor" : "Enable fluid cursor"
                }
              >
                <BsStars
                  className={cn(
                    "size-3 shrink-0",
                    splashEnabled && "text-cyan-400",
                  )}
                />
              </button>
              <div className="h-3 w-px shrink-0 bg-white/30" />
              <div className="theme-toggle-outer shrink-0 pr-1.5">
                <div className="theme-toggle-inner overflow-hidden flex items-center justify-center">
                  <AnimatedThemeToggler className="size-3 shrink-0 text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
