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
import Notes2Illustration from "@/app/components/ui/illustrations/notes-2-illustration";
import Calendar10Illustration from "@/app/components/ui/illustrations/calendar-10-illustration";
import { AnimatePresence, motion } from "motion/react";
import AgentTaskPlanningIllustration from "@/app/components/ui/illustrations/agent-task-planning-illustration";
import NativeStartNow from "./ui/NativeButton";
import { StickyFooterDialog } from "./ui/sticky-footer-dialog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AUTOPLAY_DURATION = 10000;

const features = [
  {
    title: "Design",
    description:
      "Access and switch between multiple AI models including GPT, Claude, and Gemini from a unified interface with seamless provider switching.",
    image:
      "https://images.unsplash.com/photo-1770490085047-1460359929e7?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Engineering",
    description:
      "Work with teammates across the globe with real-time presence indicators, seamless syncing, and automatic conflict resolution.",
    image:
      "https://images.unsplash.com/photo-1721111648084-5e4f18a8635c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Production",
    description:
      "Deploy intelligent agents that learn your workflow patterns and automate repetitive tasks with context-aware suggestions.",
    image:
      "https://images.unsplash.com/photo-1770106678115-ec9aa241cdf6?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const illustrations = [
  <Notes2Illustration key="m3" />,
  <Calendar10Illustration key="map" />,
  <AgentTaskPlanningIllustration key="m4" />,
];

interface ExpandableFeatures4Props {
  badge: string;
  title: string;
  description: ReactNode;
  /** When true, image appears on left, text on right (for alternating layout) */
  imageOnLeft?: boolean;
  /** Image src for the details modal header */
  detailsImage?: string;
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
  detailsImage,
}: ExpandableFeatures4Props) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
      setExpandedIndex((current) => (current + 1) % features.length);
    }, AUTOPLAY_DURATION);
  }, []);

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
      className="w-full min-w-0 bg-transparent @container overflow-hidden py-12 md:py-16"
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
                className="text-xl font-semibold sm:text-2xl lg:text-3xl text-white dark:text-white"
              >
                {title}
              </h2>
              <div
                ref={descRef}
                className="text-white/30 mt-3 text-sm sm:text-md dark:text-white/80"
              >
                {description}
              </div>
            </div>
            <div ref={ctaRef} data-project-cta className="opacity-0">
              <NativeStartNow
                variant="gradient"
                size="xs"
                onStart={() => {
                  setDetailsOpen(true);
                  return Promise.resolve();
                }}
              />
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
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
              {features.map((feature, index) => (
                <button
                  key={feature.title}
                  onClick={() => handleSelect(index)}
                  className={cn(
                    "active:scale-98 group flex w-fit cursor-pointer items-center gap-2 px-4 pb-2 pt-1.5 text-left text-sm font-medium duration-200",
                    expandedIndex === index
                      ? "text-white dark:text-white"
                      : "text-white/40 hover:text-foreground/75 dark:text-white/70 dark:hover:text-white/90",
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

            <div className="corner-cut-tr-bl rounded-tl-lg rounded-br-lg aspect-4/5 min-h-0 min-w-0 bg-muted relative overflow-hidden">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={`bg-${expandedIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={features[expandedIndex].image}
                    alt=""
                    fill
                    className="size-full object-cover opacity-75 dark:opacity-50"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

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
                  <div className="max-h-full min-w-0 scale-75 sm:scale-[0.7]">
                    {illustrations[expandedIndex]}
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
