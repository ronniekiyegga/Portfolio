"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "DESIGN-FOCUSED",
  words = ["ENGINEER", "DESIGNER", "BACKEND", "3D Shaders"],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 ">
      <motion.span
        layoutId="subtext"
        className="text-[10px] md:text-[11px] font-medium drop-shadow-lg tracking-wide uppercase text-neutral-500 dark:text-neutral-400"
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className="relative w-fit overflow-hidden rounded-md py-2 font-sans text-[10px] md:text-[11px]  font-medium tracking-tight text-black bg-transparent dark:text-white "
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className={cn("inline-block whitespace-nowrap text-neutral-700")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </div>
  );
};
