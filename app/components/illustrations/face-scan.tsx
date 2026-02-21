"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TextScramble } from "@/app/components/motion-primitives/text-scramble";
import { cn } from "@/lib/utils";
import { LightDarkParticles } from "@/app/blocks/bento/three/particles";
import Image from "next/image";

export const FaceScanIllustration = ({
  startWhenVisible = true,
}: {
  startWhenVisible?: boolean;
} = {}) => {
  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    if (!startWhenVisible) return;

    // When hero becomes visible, run scan effect 1.2s later (after entrance settles)
    const timer = setTimeout(() => {
      setShow(true);

      const hideTimer = setTimeout(() => {
        setShow(false);
        setShowName(true);
      }, 100);

      return () => clearTimeout(hideTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, [startWhenVisible]);

  return (
    <div
      aria-hidden
      className="group relative mx-auto w-fit max-w-full min-w-0 overflow-hidden px-8 md:px-40 lg:px-52"
    >
      {/* Grid overlay - FIXED: proper circle mask */}

      {/* Large name: z-10, behind image but extending wider */}
      <div
        className="absolute text-xl left-1/2 -translate-x-1/2 top-24 z-0 w-full max-w-[90vw] sm:max-w-[450px] md:max-w-[650px] lg:max-w-[800px] flex justify-between items-start pointer-events-none"
        aria-hidden
      >
        <span className="sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-neutral-800 dark:text-neutral-50 drop-shadow-sm dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] select-none">
          Ronnie
        </span>
        <span className="sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-neutral-800 dark:text-neutral-50 drop-shadow-sm dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.5)] select-none">
          Kiyegga
        </span>
      </div>

      <div
        className="not-dark:opacity-25 absolute -inset-6 z-10 mix-blend-screen"
        style={{
          maskImage:
            "radial-gradient(circle closest-side at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle closest-side at 50% 50%, #000 70%, transparent 100%)",
          backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
          backgroundSize: "5px 5px",
        }}
      />

      {/* Spinning gradient ring - FIXED: contained */}
      <div
        className="absolute inset-0 animate-spin opacity-50 blur-lg duration-[3s] dark:opacity-20 overflow-hidden rounded-full"
        style={{
          maskImage:
            "radial-gradient(circle closest-side at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle closest-side at 50% 50%, #000 70%, transparent 100%)",
        }}
      >
        <div className="bg-linear-to-r/increasing animate-hue-rotate absolute inset-0 rounded-full from-pink-300 to-indigo-300" />
      </div>

      {/* Scan line - hidden to remove shadow above face in dark mode */}
      <div className="animate-scan absolute inset-x-12 inset-y-0 z-10 hidden">
        <div className="absolute inset-x-0 m-auto h-6 rounded-full bg-white/50 blur-2xl" />
      </div>

      {/* Card frame — z-[60] so it appears on top of the face image (z-50) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        className="aspect-2/3 absolute inset-0 z-60 m-auto w-24"
      >
        <CardDecorator className="scale-125 border-white blur-[3px]" />
        <motion.div
          initial={{ "--frame-color": "white" }}
          animate={{ "--frame-color": "var(--color-lime-400)" }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <CardDecorator className="border-(--frame-color) z-10" />
        </motion.div>
        <LightDarkParticles id="light-dark-particles" />
      </motion.div>

      {/* Flash effect */}
      {show && (
        <div className="absolute inset-0 z-10 scale-150 rounded-full bg-white mix-blend-overlay blur-xl" />
      )}

      {/* Face image in front of text (z-20) */}
      <div
        className="relative z-50 bg-radial ring-2 aspect-square w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto group-hover:opacity-95"
        style={{
          maskImage:
            "radial-gradient(circle closest-side at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle closest-side at 50% 50%, #000 70%, transparent 100%)",
        }}
      >
        <Image
          src="/Avatar.svg"
          alt="Ronnie's Avatar"
          className="bg-illustration size-full object-cover grayscale"
          width={560}
          height={560}
        />
      </div>

      {/* Name label */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex h-4 justify-center"
      >
        {showName && (
          <TextScramble className="text-center font-mono text-sm uppercase text-white">
            RONNIE KIYEGGA
          </TextScramble>
        )}
      </div>
    </div>
  );
};

export const CardDecorator = ({ className }: { className?: string }) => (
  <>
    <span
      className={cn(
        "absolute -left-px -top-px block size-2.5 border-l-[1.5px] border-t-[1.5px] border-white",
        className,
      )}
    ></span>
    <span
      className={cn(
        "absolute -right-px -top-px block size-2.5 border-r-[1.5px] border-t-[1.5px] border-white",
        className,
      )}
    ></span>
    <span
      className={cn(
        "absolute -bottom-px -left-px block size-2.5 border-b-[1.5px] border-l-[1.5px] border-white",
        className,
      )}
    ></span>
    <span
      className={cn(
        "absolute -bottom-px -right-px block size-2.5 border-b-[1.5px] border-r-[1.5px] border-white",
        className,
      )}
    ></span>
  </>
);

export default FaceScanIllustration;
