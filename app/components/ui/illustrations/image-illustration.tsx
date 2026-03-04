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
}

export const ImageIllustration = ({
  containerRef,
  src = "https://res.cloudinary.com/dohqjvu9k/image/upload/v1757920639/flower_a5umwb.webp",
  alt = "flower background",
}: ImageIllustrationProps) => {
  const scrollOptions = containerRef ? { container: containerRef } : undefined;
  const { scrollY, scrollYProgress } = useScroll(scrollOptions);

  const maxClip = 5;
  const maxScale = 1.4;
  const scale = containerRef
    ? useTransform(scrollYProgress, [0, 0.5], [maxScale, 1], { clamp: true })
    : useTransform(scrollY, [0, 1500], [maxScale, 1], { clamp: true });
  const clip = containerRef
    ? useTransform(scrollYProgress, [0, 0.3], [maxClip, 0], { clamp: true })
    : useTransform(scrollY, [0, 500], [maxClip, 0], { clamp: true });
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
