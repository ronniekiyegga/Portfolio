"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";

interface ImageIllustrationProps {
  /** Optional scroll container ref — use when inside a modal or scrollable div */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Optional image src — defaults to flower image */
  src?: string;
  alt?: string;
  /**
   * Final resting scale when scroll/animation settles.
   * Keep start zoom the same (maxScale), only adjust the resting size.
   */
  minScale?: number;
}

export const ImageIllustration = ({
  containerRef,
  src = "https://res.cloudinary.com/dohqjvu9k/image/upload/v1757920639/flower_a5umwb.webp",
  alt = "flower background",
  minScale = 0.9,
}: ImageIllustrationProps) => {
  const scrollOptions = containerRef ? { container: containerRef } : undefined;
  const { scrollY, scrollYProgress } = useScroll(scrollOptions);

  const maxClip = 5;
  const maxScale = 1.4;

  const scaleFromProgress = useTransform(
    scrollYProgress,
    [0, 0.5],
    [maxScale, minScale],
    { clamp: true },
  );
  const scaleFromScrollY = useTransform(scrollY, [0, 1500], [maxScale, minScale], {
    clamp: true,
  });
  const scale = containerRef ? scaleFromProgress : scaleFromScrollY;

  const clipFromProgress = useTransform(
    scrollYProgress,
    [0, 0.3],
    [maxClip, 0],
    { clamp: true },
  );
  const clipFromScrollY = useTransform(scrollY, [0, 500], [maxClip, 0], {
    clamp: true,
  });
  const clip = containerRef ? clipFromProgress : clipFromScrollY;
  const clipPath = useMotionTemplate`inset(${clip}% ${clip}% ${clip}% ${clip}% round 0.75rem)`;

  return (
    <motion.div
      className="perspective-near aspect-3/2 mx-auto max-w-6xl overflow-hidden md:aspect-video px-6 lg:px-12"
      style={{ clipPath }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ scale }}
        className="origin-top w-full h-full object-cover object-center"
        width={2270}
        height={1578}
      />
    </motion.div>
  );
};
