"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  type ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import NativeStartNow from "@/shared/components/ui/NativeButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightPillarComponent from "@/shared/components/ui/gradients/LightPillarComponent";
import PrismComponent from "@/shared/components/ui/gradients/PrismComponent";
import LightRaysComponent from "@/shared/components/ui/gradients/LightRaysComponent";
import FloatingLinesComponent from "@/shared/components/ui/gradients/FloatingLinesComponent";
import type { WorkItem } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export const AUTOPLAY_DURATION = 10000;

const BACKGROUND_MAP = {
  lightPillar: <LightPillarComponent />,
  prism: <PrismComponent />,
  lightRays: <LightRaysComponent />,
  floatingLines: <FloatingLinesComponent />,
} as const;

export type BackgroundKey = keyof typeof BACKGROUND_MAP;
export type FeatureBackground = ReactNode | string | BackgroundKey;

export type Feature = {
  title: string;
  description: string;
  /** Foreground image shown in the card (from /public). Not used when href is set. */
  image: string;
  /** Background: image path (string), gradient key (lightPillar | prism | lightRays | floatingLines), or ReactNode. Not used when href is set. */
  background: FeatureBackground;
  /** When set, renders as an external link instead of a tab */
  href?: string;
};

const DEFAULT_FEATURES: Feature[] = [
  {
    title: "Design",
    description:
      "Access and switch between multiple AI models including GPT, Claude, and Gemini from a unified interface with seamless provider switching.",
    image: "/images/illustrations/DESIGN.svg",
    background: "lightPillar",
  },
  {
    title: "Engineering",
    description:
      "Work with teammates across the globe with real-time presence indicators, seamless syncing, and automatic conflict resolution.",
    image: "/images/projects/edufeedbackpro/numerix-ai/NUMERIX_AI.svg",
    background: "prism",
  },
  {
    title: "Architecture",
    description:
      "Deploy intelligent agents that learn your workflow patterns and automate repetitive tasks with context-aware suggestions.",
    image:
      "/images/projects/knn-classifier/google-teachable/GOOGLE_TEACHABLE.svg",
    background: "lightRays",
  },
];

/** Used when page theme is dark (card contrasts with dark page) */
const LIGHT_BACKGROUNDS = [
  "/images/backgrounds/BG_HERO1.svg",
  "/images/backgrounds/BG_1.png",
  "/images/backgrounds/BackgroundImage_2.svg",
] as const;

const DARK_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1770490085047-1460359929e7?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1721111648084-5e4f18a8635c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770106678115-ec9aa241cdf6?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
] as const;

/** Used when page theme is light (card contrasts with light page) */
// const DARK_BACKGROUNDS = [
//   "/BackgroundImage_2.svg",
//   "/BackgroundImage_2.svg",
//   "/BackgroundImage_2.svg",
// ] as const;

/** Theme-aware backgrounds: light theme → DARK_BACKGROUNDS, dark theme → LIGHT_BACKGROUNDS */
const getCardBackgrounds = (isDark: boolean) =>
  isDark ? LIGHT_BACKGROUNDS : DARK_BACKGROUNDS;

export type ProjectLinks = {
  liveWebsite?: string;
  designFile?: string;
  githubHref?: string;
};

interface ExpandableFeatures4Props {
  badge: string;
  title: string;
  description: ReactNode;
  /** When true, image appears on left, text on right (for alternating layout) */
  imageOnLeft?: boolean;
  /** Image src for the details modal header */
  detailsImage?: string;
  /** Per-card features (image + background). When provided, overrides the default. */
  features?: Feature[];
  /** Optional project links: liveWebsite → "Live Website" button, designFile → "Design File" button */
  links?: ProjectLinks;
  /** Optional WorkItem for opening a project modal */
  workItem?: WorkItem;
  /** Callback to open a project modal with work item */
  onOpenProjectModal?: (workItem: WorkItem) => void;
}

const BADGE: string = "Platform Features";
const TITLE: string = "Project Title";
const DESC: string =
  "Streamline your workflow with tools designed to enhance productivity at every step.";

const SMOOTH_EASE = "power3.out" as const;
const Y_OFFSET = 32;
const X_OFFSET = 48;

export default function ExpandableFeatures4({
  badge = BADGE,
  title = TITLE,
  description = DESC,
  imageOnLeft = false,
  features: featuresProp,
  workItem,
  onOpenProjectModal,
}: ExpandableFeatures4Props) {
  const featuresList = featuresProp ?? DEFAULT_FEATURES;
  const tabFeatures = featuresList.filter((f) => !f.href);
  /** Fixed image: prefer _HERO variant so it doesn't change when tabs/spinners cycle */
  const heroImage =
    featuresList.find((f) => f.image.includes("_HERO"))?.image ??
    featuresList[0]?.image ??
    "";
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [isDark, setIsDark] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const cardBackgrounds = getCardBackgrounds(isDark);
  const sectionRef = useRef<HTMLElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setExpandedIndex((current) => (current + 1) % tabFeatures.length);
    }, AUTOPLAY_DURATION);
  }, [tabFeatures.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer]);

  const handleSelect = (index: number) => {
    if (index === expandedIndex) return;
    setExpandedIndex(index);
    resetTimer();
  };

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;

      const imageCol = imageColRef.current;
      const badgeEl = badgeRef.current;
      const titleEl = titleRef.current;
      const descEl = descRef.current;
      const ctaEl = ctaRef.current;
      const buttonsContainer = buttonsRef.current;
      const buttons = buttonsContainer?.querySelectorAll("button");

      const dir = imageOnLeft ? 1 : -1;

      gsap.set(
        [badgeEl, titleEl, descEl, ctaEl, buttons, imageCol].filter(Boolean),
        { force3D: true },
      );
      gsap.set(badgeEl, { y: Y_OFFSET * 0.3, opacity: 0 });
      gsap.set(titleEl, { x: dir * X_OFFSET * 0.38, opacity: 0 });
      gsap.set(descEl, { y: Y_OFFSET * 0.25, opacity: 0 });
      gsap.set(ctaEl, { opacity: 0 });
      if (buttons?.length) {
        gsap.set(buttons, { y: 8, opacity: 0 });
      }
      gsap.set(imageCol, { x: -dir * X_OFFSET * 0.5, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(badgeEl, {
        y: 0,
        opacity: 1,
        duration: 0.42,
        ease: "expo.out",
      })
        .to(
          titleEl,
          { x: 0, opacity: 1, duration: 0.4, ease: "expo.out" },
          "-=0.28",
        )
        .to(
          descEl,
          { y: 0, opacity: 1, duration: 0.38, ease: "expo.out" },
          "-=0.25",
        )
        .to(ctaEl, { opacity: 1, duration: 0.32, ease: "expo.out" }, "-=0.22")
        .to(
          imageCol,
          { x: 0, opacity: 1, duration: 0.48, ease: "expo.out" },
          "-=0.38",
        );

      if (buttons?.length) {
        tl.to(
          buttons,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "expo.out",
          },
          "-=0.28",
        );
      }

      const st = tl.scrollTrigger;
      cleanupRef.current = () => {
        st?.kill();
        tl.kill();
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupRef.current?.();
    };
  }, [imageOnLeft]);

  return (
    <section
      ref={sectionRef}
      className="w-full min-w-0 bg-transparent @container overflow-hidden py-8 md:py-16"
    >
      <div className="mx-auto w-full min-w-0 max-w-5xl px-4 sm:px-6">
        <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:grid-cols-7 sm:gap-6 md:gap-12">
          <div
            ref={textColRef}
            className={cn(
              "flex min-w-0 flex-col gap-12 pb-6 sm:col-span-3 md:py-12",
              "order-2 sm:order-1",
              imageOnLeft && "sm:order-2",
            )}
          >
            <div className="min-w-0 text-balance gap-0 ">
              <h4
                ref={badgeRef}
                className="mb-2 w-fit rounded-full text-[11px] font-bold uppercase tracking-wide text-gradient-blue-static"
              >
                {badge}
              </h4>
              <h2
                ref={titleRef}
                data-project-title
                className="font-semibold text-2xl leading-tight text-white "
              >
                {title}
              </h2>
              <div
                ref={descRef}
                data-project-content
                className="mt-4 leading-[1.6] [&_p]:mb-2 [&_p:last-child]:mb-0 text-[14px] md:text-sm text-gray-500"
              >
                {description}
              </div>
            </div>
            <div
              ref={ctaRef}
              data-project-cta
              className="opacity-0 flex flex-wrap items-center gap-0"
            >
              {workItem && onOpenProjectModal && (
                <NativeStartNow
                  variant="gradient"
                  size="xs"
                  label="Case Study"
                  onStart={() => {
                    onOpenProjectModal(workItem);
                    return Promise.resolve();
                  }}
                />
              )}
            </div>

            <div
              ref={buttonsRef}
              className="-ml-6 mt-auto flex min-w-0 flex-col"
            >
              {featuresList.map((feature) => {
                const tabIndex = tabFeatures.findIndex((t) => t === feature);
                const isTab = tabIndex >= 0;
                const isActive = isTab && expandedIndex === tabIndex;
                if (feature.href) {
                  return (
                    <a
                      key={feature.title}
                      href={feature.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-fit cursor-pointer items-center gap-2 px-4 pb-2 pt-1.5 text-left text-sm font-medium text-gray-500 duration-200 hover:text-gray-700 dark:text-white/70 dark:hover:text-white/90"
                    >
                      <div className="flex size-3 md:size-4 shrink-0 items-center justify-center" />
                      {feature.title}
                    </a>
                  );
                }
                return (
                  <button
                    key={feature.title}
                    onClick={() => handleSelect(tabIndex)}
                    className={cn(
                      "active:scale-98 group flex w-fit cursor-pointer items-center gap-2 px-4 pb-2 pt-1.5 text-left text-sm font-medium duration-200",
                      isActive
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-300 dark:text-white/70 dark:hover:text-white/90",
                    )}
                  >
                    <div className="flex size-3 md:size-4 shrink-0 items-center justify-center">
                      {isActive && (
                        <Loader
                          key={expandedIndex}
                          duration={AUTOPLAY_DURATION}
                        />
                      )}
                    </div>
                    {feature.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            ref={imageColRef}
            className={cn(
              "relative min-w-0 overflow-hidden sm:col-span-4",
              "order-1 sm:order-2",
              imageOnLeft && "sm:order-1",
            )}
          >
            <div
              role={workItem && onOpenProjectModal ? "button" : undefined}
              tabIndex={workItem && onOpenProjectModal ? 0 : undefined}
              onClick={() =>
                workItem && onOpenProjectModal && onOpenProjectModal(workItem)
              }
              onKeyDown={(e) =>
                workItem &&
                onOpenProjectModal &&
                (e.key === "Enter" || e.key === " ") &&
                onOpenProjectModal(workItem)
              }
              className={cn(
                "corner-cut-tr-bl aspect-4/5 min-h-0 min-w-0 relative overflow-hidden",
                workItem && onOpenProjectModal && "cursor-pointer",
              )}
            >
              {/* Shared background - cycles with AUTOPLAY_DURATION */}
              <div
                className="absolute inset-0 z-0 size-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${cardBackgrounds[expandedIndex % cardBackgrounds.length]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="relative z-10 flex h-full min-h-0 min-w-0 items-center justify-center p-4">
                <div className="relative max-h-full min-w-0 scale-90 sm:scale-[1] aspect-square w-full max-w-[450px]">
                  <Image
                    src={heroImage}
                    alt={tabFeatures[expandedIndex]?.title ?? "Project"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 240px, 340px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const r = 10;
const circumference = 2 * Math.PI * r;

function Loader({ duration }: { duration: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="size-4"
    >
      <circle
        cx="12"
        cy="12"
        r={r}
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.2"
      />
      <circle
        cx="12"
        cy="12"
        r={r}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        transform="rotate(-90 12 12)"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
      >
        <animate
          attributeName="stroke-dashoffset"
          from={circumference}
          to={0}
          dur={`${duration}ms`}
          fill="freeze"
        />
      </circle>
    </svg>
  );
}
