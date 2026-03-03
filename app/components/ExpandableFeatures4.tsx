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
import { AnimatePresence, motion } from "motion/react";
import NativeStartNow from "./ui/NativeButton";
import { StickyFooterDialog } from "./ui/sticky-footer-dialog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightPillarComponent from "./ui/gradients/LightPillarComponent";
import PrismComponent from "./ui/gradients/PrismComponent";
import LightRaysComponent from "./ui/gradients/LightRaysComponent";
import FloatingLinesComponent from "./ui/gradients/FloatingLinesComponent";
import { MoveUpRight } from "lucide-react";

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
    image: "/DESIGN.svg",
    background: "lightPillar",
  },
  {
    title: "Engineering",
    description:
      "Work with teammates across the globe with real-time presence indicators, seamless syncing, and automatic conflict resolution.",
    image: "/NUMERIX_AI.svg",
    background: "prism",
  },
  {
    title: "Architecture",
    description:
      "Deploy intelligent agents that learn your workflow patterns and automate repetitive tasks with context-aware suggestions.",
    image: "/GOOGLE_TEACHABLE.svg",
    background: "lightRays",
  },
];

/** Used when page theme is dark (card contrasts with dark page) */
const LIGHT_BACKGROUNDS = [
  "/BG_HERO1.svg",
  "/BG_1.png",
  "/BackgroundImage_2.svg",
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
  /** Optional project links: liveWebsite → "Live Website"/"Live Demo" button, designFile → "Design File" button */
  links?: ProjectLinks;
}

const BADGE: string = "Platform Features";
const TITLE: string = "Project Title";
const DESC: string =
  "Streamline your workflow with tools designed to enhance productivity at every step.";

const SMOOTH_EASE = "power3.out" as const;
const Y_OFFSET = 32;
const X_OFFSET = 48;

const PROJECT_LINK_BASE_CLASSES =
  "inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs font-semibold shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-0";

export default function ExpandableFeatures4({
  badge = BADGE,
  title = TITLE,
  description = DESC,
  imageOnLeft = false,
  detailsImage,
  features: featuresProp,
  links,
}: ExpandableFeatures4Props) {
  const featuresList = featuresProp ?? DEFAULT_FEATURES;
  const tabFeatures = featuresList.filter((f) => !f.href);
  const linkFeatures = featuresList.filter((f) => !!f.href);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
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
    const section = sectionRef.current;
    if (!section) return;

    const textCol = textColRef.current;
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
    gsap.set(badgeEl, { y: Y_OFFSET, opacity: 0 });
    gsap.set(titleEl, { x: dir * X_OFFSET, opacity: 0 });
    gsap.set(descEl, { y: Y_OFFSET * 0.75, opacity: 0 });
    gsap.set(ctaEl, { opacity: 0 });
    if (buttons?.length) {
      gsap.set(buttons, { y: 12, opacity: 0 });
    }
    gsap.set(imageCol, { x: -dir * X_OFFSET * 1.2, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        end: "top 30%",
        toggleActions: "play none none none",
      },
    });

    tl.to(badgeEl, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: SMOOTH_EASE,
    })
      .to(
        titleEl,
        { x: 0, opacity: 1, duration: 0.55, ease: SMOOTH_EASE },
        "-=0.4",
      )
      .to(
        descEl,
        { y: 0, opacity: 1, duration: 0.5, ease: SMOOTH_EASE },
        "-=0.35",
      )
      .to(ctaEl, { opacity: 1, duration: 0.4, ease: SMOOTH_EASE }, "-=0.3")
      .to(
        imageCol,
        { x: 0, opacity: 1, duration: 0.7, ease: SMOOTH_EASE },
        "-=0.8",
      );

    if (buttons?.length) {
      tl.to(
        buttons,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: SMOOTH_EASE,
        },
        "-=0.6",
      );
    }

    const st = tl.scrollTrigger;
    return () => {
      st?.kill();
      tl.kill();
    };
  }, [imageOnLeft]);

  return (
    <section
      ref={sectionRef}
      className="w-full min-w-0 bg-transparent @container overflow-hidden py-8 md:py-16"
    >
      <div className="mx-auto w-full min-w-0 max-w-full px-2 sm:px-4">
        <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:grid-cols-7 sm:gap-8 md:gap-12 lg:gap-16">
          <div
            ref={textColRef}
            className={cn(
              "flex min-w-0 flex-col gap-6 pb-4 sm:col-span-3 md:py-6",
              imageOnLeft && "sm:order-2",
            )}
          >
            <div className="min-w-0 text-balance">
              <h4
                ref={badgeRef}
                className="mb-2 w-fit rounded-full text-[11px] font-bold uppercase tracking-wide text-gradient-blue"
              >
                {badge}
              </h4>
              <h2
                ref={titleRef}
                className="text-xl font-semibold sm:text-2xl lg:text-3xl text-white "
              >
                {title}
              </h2>
              <div
                ref={descRef}
                className=" mt-3 text-sm sm:text-md text-gray-500 dark:text-white/50"
              >
                {description}
              </div>
            </div>
            <div
              ref={ctaRef}
              data-project-cta
              className="opacity-0 flex flex-wrap items-center gap-2"
            >
              {links?.designFile || links?.liveWebsite ? (
                <>
                  {links.designFile && (
                    <a
                      href={links.designFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        PROJECT_LINK_BASE_CLASSES,
                        "!bg-gradient-to-r !from-black !via-neutral-900 !to-black text-white hover:shadow-black/50",
                      )}
                    >
                      Figma File <MoveUpRight className="size-3.5" />
                    </a>
                  )}
                  {links.liveWebsite && (
                    <a
                      href={links.liveWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        PROJECT_LINK_BASE_CLASSES,
                        "!bg-gradient-to-r !from-black !via-neutral-900 !to-black text-white hover:shadow-black/50",
                      )}
                    >
                      {links.designFile ? "Live Demo" : "Live Website"}{" "}
                      <MoveUpRight className="size-3.5" />
                    </a>
                  )}
                </>
              ) : (
                <NativeStartNow
                  variant="gradient"
                  size="xs"
                  label="Live Website"
                  onStart={() => {
                    setDetailsOpen(true);
                    return Promise.resolve();
                  }}
                />
              )}
              <StickyFooterDialog
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
                title={title}
                description="Project details and overview."
                badge="Project"
                image={detailsImage}
              >
                <div className="space-y-4 text-sm text-muted-foreground">
                  {description}
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </StickyFooterDialog>
            </div>

            <div ref={buttonsRef} className="mt-auto flex min-w-0 flex-col">
              {tabFeatures.map((feature, index) => (
                <button
                  key={feature.title}
                  onClick={() => handleSelect(index)}
                  className={cn(
                    "active:scale-98 group flex w-fit cursor-pointer items-center gap-2 px-4 pb-2 pt-1.5 text-left text-sm font-medium duration-200",
                    expandedIndex === index
                      ? "text-white"
                      : "  text-gray-500 hover:text-gray-700 dark:text-white/70 dark:hover:text-white/90",
                  )}
                >
                  <div className="flex size-4 shrink-0 items-center justify-center">
                    {expandedIndex === index && (
                      <Loader
                        key={expandedIndex}
                        duration={AUTOPLAY_DURATION}
                      />
                    )}
                  </div>
                  {feature.title}
                </button>
              ))}
              {linkFeatures.map((feature) => (
                <a
                  key={feature.title}
                  href={feature.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit cursor-pointer items-center gap-2 px-4 pb-2 pt-1.5 text-left text-sm font-medium text-gray-500 duration-200 hover:text-gray-700 dark:text-white/70 dark:hover:text-white/90"
                >
                  <div className="flex size-4 shrink-0 items-center justify-center" />
                  {feature.title}
                  <MoveUpRight className="size-3.5 opacity-70" />
                </a>
              ))}
            </div>
          </div>
          <div
            ref={imageColRef}
            className={cn(
              "relative min-w-0 overflow-hidden sm:col-span-4",
              imageOnLeft && "sm:order-1",
            )}
          >
            <div
              aria-hidden
              className="mask-x-from-45% border-tracing-gradient pointer-events-none absolute -inset-x-1 -inset-y-6 rotate-45 border-y"
            />
            <div
              aria-hidden
              className="mask-y-from-75% border-tracing-gradient pointer-events-none absolute -inset-x-1 -inset-y-12 border-x"
            />

            <div className="corner-cut-tr-bl rounded-tl-lg rounded-br-lg aspect-4/5 min-h-0 min-w-0 relative overflow-hidden border border-tracing-gradient">
              {/* Shared background - cycles with AUTOPLAY_DURATION */}
              <div
                className="absolute inset-0 z-0 size-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${cardBackgrounds[expandedIndex % cardBackgrounds.length]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={expandedIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative z-10 flex h-full min-h-0 min-w-0 items-center justify-center p-4"
                >
                  <div className="relative max-h-full min-w-0 scale-90 sm:scale-[1] aspect-square w-full max-w-[450px]">
                    <Image
                      src={tabFeatures[expandedIndex].image}
                      alt={tabFeatures[expandedIndex].title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 240px, 340px"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
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
