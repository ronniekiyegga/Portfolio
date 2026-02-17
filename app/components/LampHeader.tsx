"use client";

import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
import SectionKicker from "./ui/section-kicker";

export default function LampHeader() {
  return (
    <LampContainer kicker={<SectionKicker>Random Shots</SectionKicker>}>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 text-white bg-linear-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight md:text-5xl"
      >
        Intersection Of Design & Engineering
      </motion.h1>
    </LampContainer>
  );
}
