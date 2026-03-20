"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { FileText, Figma, Rocket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { TextShimmer } from "@/app/components/ui/text-shimmer";
import { ResponseStream } from "@/components/ui/response-stream";

const CYCLE_DURATION = 7000;

const events = [
  { id: 0, icon: FileText, label: "Requirements", color: "blue" },
  { id: 1, icon: Figma, label: "Design", color: "white" },
  { id: 2, icon: Rocket, label: "Deploy", color: "cyan" },
];

const responses = [
  {
    id: 0,
    text: "Scoping the problem space. Translating goals into user flows, data models, and a clear technical brief.",
    color: "blue",
  },
  {
    id: 1,
    text: "Designing components in Figma. Every screen is production-intent — tokens, variants, and responsive layouts.",
    color: "white",
  },
  {
    id: 2,
    text: "Shipping to production via CI/CD. Nginx handles routing, PM2 keeps the process alive, zero-downtime deploys.",
    color: "cyan",
  },
];

const pathTransition = {
  duration: 1,
  ease: "easeInOut" as const,
};

const colorValueMap: Record<string, string> = {
  blue: "var(--color-blue-400)",
  cyan: "var(--color-cyan-400)",
  white: "#ffffff",
};

export const MyProcess = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [showShimmer, setShowShimmer] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const spanRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, CYCLE_DURATION);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (spanRef.current) {
        const width = (spanRef.current as HTMLElement).offsetWidth;
        setContainerWidth(width + 32);
      }
    };

    updateWidth();
    const timer = setTimeout(updateWidth, 50);

    return () => clearTimeout(timer);
  }, [activeEvent]);

  useEffect(() => {
    queueMicrotask(() => {
      setShowShimmer(false);
      setShowResponse(false);
    });
    const showShimmerTimer = setTimeout(() => setShowShimmer(true), 2000);
    const hideShimmerTimer = setTimeout(() => {
      setShowShimmer(false);
      setShowResponse(true);
    }, 4500);

    return () => {
      clearTimeout(showShimmerTimer);
      clearTimeout(hideShimmerTimer);
    };
  }, [activeEvent]);

  const currentEvent = useMemo(() => events[activeEvent], [activeEvent]);
  const currentResponse = useMemo(() => responses[activeEvent], [activeEvent]);

  return (
    <section
      id="process"
      className="relative flex size-fit min-h-[420px] min-w-[420px] items-center justify-center"
    >
      <div className="relative z-10 flex flex-col items-center">
        <svg
          viewBox="0 0 131 245"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground/10 absolute inset-x-0 top-8 mx-auto w-2/3"
        >
          <path d="M65.5 0V49" stroke="currentColor" />
          <path d="M65.5 106V155" stroke="currentColor" strokeLinecap="round" />
          <path
            d="M0.5 155.5C0.5 143.074 10.5736 133 23 133H26.119C38.5003 133 54.5209 132.623 59.5305 121.301C61.9802 115.764 63.8576 109.843 64 106"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path
            d="M130.5 155.5C130.5 143.074 120.426 133 108 133H104.881C92.4997 133 76.4791 132.623 71.4695 121.301C69.0198 115.764 67.1424 109.843 67 106"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path
            d="M65.5 244L65.5 195"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path
            d="M130.5 195V244"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path d="M0.5 195V244" stroke="currentColor" strokeLinecap="round" />

          <motion.path
            key={`event-tailark-${activeEvent}`}
            d="M65.5 0V49"
            pathLength="1"
            stroke={
              colorValueMap[currentEvent.color] ??
              `var(--color-${currentEvent.color}-400)`
            }
            strokeLinecap="round"
            strokeDasharray="0.3 2"
            initial={{ strokeDashoffset: 1.3 }}
            animate={{ strokeDashoffset: -2 }}
            transition={pathTransition}
          />

          <motion.path
            key={`tailark-llm-center-${activeEvent}`}
            d="M65.5 106V155"
            pathLength="1"
            stroke="var(--color-indigo-400)"
            strokeLinecap="round"
            strokeDasharray="0.3 2"
            initial={{ strokeDashoffset: 1.3 }}
            animate={{ strokeDashoffset: -2 }}
            transition={{ ...pathTransition, delay: 0.5 }}
          />

          <motion.path
            key={`tailark-llm-left-${activeEvent}`}
            d="M64 106C63.8576 109.843 61.9802 115.764 59.5305 121.301C54.5209 132.623 38.5003 133 26.119 133H23C10.5736 133 0.5 143.074 0.5 155.5"
            pathLength="1"
            stroke="var(--color-purple-400)"
            strokeLinecap="round"
            strokeDasharray="0.3 2"
            initial={{ strokeDashoffset: 1.3 }}
            animate={{ strokeDashoffset: -2 }}
            transition={{ ...pathTransition, delay: 0.6 }}
          />

          <motion.path
            key={`tailark-llm-right-${activeEvent}`}
            d="M67 106C67.1424 109.843 69.0198 115.764 71.4695 121.301C76.4791 132.623 92.4997 133 104.881 133H108C120.426 133 130.5 143.074 130.5 155.5"
            pathLength="1"
            stroke="var(--color-cyan-400)"
            strokeLinecap="round"
            strokeDasharray="0.3 2"
            initial={{ strokeDashoffset: 1.3 }}
            animate={{ strokeDashoffset: -2 }}
            transition={{ ...pathTransition, delay: 0.7 }}
          />

          <motion.path
            key={`llm-response-center-${activeEvent}`}
            d="M65.5 195V244"
            pathLength="1"
            stroke={
              colorValueMap[currentResponse.color] ??
              `var(--color-${currentResponse.color}-400)`
            }
            strokeLinecap="round"
            strokeDasharray="0.3 2"
            initial={{ strokeDashoffset: 1.3 }}
            animate={{ strokeDashoffset: -2 }}
            transition={{ ...pathTransition, delay: 1.5 }}
          />

          <motion.path
            key={`llm-response-right-${activeEvent}`}
            d="M130.5 195V244"
            pathLength="1"
            stroke={
              colorValueMap[currentResponse.color] ??
              `var(--color-${currentResponse.color}-400)`
            }
            strokeLinecap="round"
            strokeDasharray="0.3 2"
            initial={{ strokeDashoffset: 1.3 }}
            animate={{ strokeDashoffset: -2 }}
            transition={{ ...pathTransition, delay: 1.6 }}
          />

          <motion.path
            key={`llm-response-left-${activeEvent}`}
            d="M0.5 195V244"
            pathLength="1"
            stroke={
              colorValueMap[currentResponse.color] ??
              `var(--color-${currentResponse.color}-400)`
            }
            strokeLinecap="round"
            strokeDasharray="0.3 2"
            initial={{ strokeDashoffset: 1.3 }}
            animate={{ strokeDashoffset: -2 }}
            transition={{ ...pathTransition, delay: 1.7 }}
          />
        </svg>
        <motion.div
          className="bg-card ring-border-illustration h-8 overflow-hidden rounded-full px-4 border border-gray-300"
          animate={{ width: containerWidth > 0 ? containerWidth : "auto" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeEvent}
              initial={{ opacity: 0, filter: "blur(4px)", x: -32 }}
              exit={{ opacity: 0, filter: "blur(4px)", x: 32 }}
              animate={{ opacity: 1, filter: "blur(0)", x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-8 items-center"
            >
              <span ref={spanRef} className="text-nowrap text-sm font-medium">
                {currentEvent.label}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="size-17 mb-13.5 relative mt-14 flex -translate-y-px">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground/25 absolute inset-px animate-pulse"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="50"
              strokeDasharray="2 5"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="currentColor"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -100 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          <div className="absolute inset-3 opacity-50">
            <div className="bg-linear-to-r absolute inset-0 animate-pulse rounded-xl  blur-md" />
          </div>
          <div className="bg-radial to-card/50 from-card shadow-black/6.5 ring-border-illustration relative m-auto flex size-14 items-center justify-center rounded-full from-35% shadow-xl ring-1 backdrop-blur">
            <Image
              src="/images/icons/Figma_Icon.svg"
              alt="Figma"
              width={32}
              height={32}
              className="size-8 object-contain"
            />
          </div>
        </div>

        <div className="relative mb-14 flex items-center gap-8">
          <div className="bg-illustration ring-border-illustration shadow-black/6.5 flex size-11 rounded-full shadow-md  *:m-auto">
            <Image
              src="/images/icons/Nextjs_Icon.svg"
              alt="Next.js"
              width={28}
              height={28}
              className="size-7 object-contain dark:invert"
            />
          </div>
          <div className="bg-illustration ring-border-illustration shadow-black/6.5 flex size-11 rounded-full shadow-md *:m-auto">
            <Image
              src="/images/icons/Nodejs_Icon.svg"
              alt="Node.js"
              width={28}
              height={28}
              className="size-7 object-contain"
            />
          </div>
          <div className="bg-illustration ring-border-illustration shadow-black/6.5 flex size-11 rounded-full shadow-md *:m-auto">
            <Image
              src="/images/icons/Nginx_Icon.svg"
              alt="Nginx"
              width={28}
              height={28}
              className="size-7 object-contain"
            />
          </div>
        </div>

        <div className="relative">
          <div className="bg-linear-to-r absolute inset-0 rounded-xl opacity-25 mix-blend-lighten blur-md dark:mix-blend-overlay" />

          <div className="bg-illustration ring-border-illustration shadow-black/6.5 text-foreground/65 h-26 w-56 overflow-hidden rounded-2xl px-4 py-3 text-[11.5px] leading-relaxed shadow-md ">
            {showShimmer && <TextShimmer>Composing...</TextShimmer>}
            {showResponse && (
              <ResponseStream
                key={activeEvent}
                textStream={currentResponse.text}
                mode="typewriter"
                speed={25}
                segmentDelay={2}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProcess;
