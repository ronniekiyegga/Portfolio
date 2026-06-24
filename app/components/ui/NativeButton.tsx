"use client";

import { NativeButton } from "./native-button-shadcnui";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, Rocket } from "lucide-react";
import { ReactNode, useState } from "react";

export interface NativeStartNowProps {
  /**
   * Callback when start button is clicked
   */
  onStart: () => void | Promise<void>;
  /**
   * Text to show on the button
   * Default: "Start Now"
   */
  label?: string;
  /**
   * Loading text during async action
   * Default: "Starting..."
   */
  loadingLabel?: string;
  /**
   * Success text after completion
   * Default: "Let's Go!"
   */
  successLabel?: string;
  /**
   * Size variant
   * Default: "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Show sparkle animation on hover
   * Default: true
   */
  showRocket?: boolean;
  /**
   * Icon to use for Rocket and success state
   * Default: Rocket icon
   */
  icon?: ReactNode;
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Disable the button
   */
  disabled?: boolean;
  /**
   * Variant style
   * Default: "gradient"
   */
  variant?: "gradient" | "solid" | "outline";
}

const sizeVariants = {
  xs: "h-8 px-3 text-xs !font-medium",
  sm: "h-9 px-4 text-sm",
  default: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

const sizeMap = {
  xs: "sm" as const,
  sm: "sm" as const,
  md: "default" as const,
  lg: "lg" as const,
};

const iconSizeVariants = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  default: "h-4 w-4",
};

export default function NativeStartNow({
  onStart,
  label = "View Details",
  loadingLabel = "loading...",
  successLabel = "Let's Go!",
  size = "md",
  showRocket = true,
  icon,
  className,
  disabled = false,
  variant = "gradient",
}: NativeStartNowProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    if (disabled || status !== "idle") return;

    setStatus("loading");
    try {
      await onStart();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      setStatus("idle");
    }
  };

  const getButtonStyles = () => {
    const baseStyles =
      "relative overflow-hidden font-semibold transition-all duration-300";

    switch (variant) {
      case "gradient":
        return cn(
          baseStyles,
          "bg-linear-to-r! from-black! via-neutral-900! to-black! text-white",
          "hover:shadow-lg hover:shadow-black/50",
          "border-0",
        );
      case "solid":
        return cn(baseStyles, "!bg-black text-white", "hover:!bg-neutral-900");
      case "outline":
        return cn(
          baseStyles,
          "border-2 border-black text-black bg-transparent",
          "hover:!bg-black hover:text-white",
        );
      default:
        return baseStyles;
    }
  };

  return (
    <motion.div
      className={cn("relative inline-flex", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Sparkle particles - gradient color for visibility on dark button */}
      <AnimatePresence>
        {showRocket && isHovered && status === "idle" && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 3) * 40,
                  y: Math.sin((i * Math.PI) / 3) * 40,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-[#0CD1CF] [&_svg]:stroke-[#0CD1CF] [&_svg]:fill-[#0CD1CF]"
              >
                <div className="h-3 w-3">
                  {icon || (
                    <Rocket className="h-3 w-3 stroke-[#0CD1CF] fill-[#0CD1CF]" />
                  )}
                </div>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <NativeButton
        onClick={handleClick}
        disabled={disabled || status !== "idle"}
        loading={false}
        size={sizeMap[size ?? "md"]}
        variant="custom"
        className={cn(
          sizeVariants[size === "md" ? "default" : size ?? "sm"],
          getButtonStyles(),
          disabled && "opacity-50 cursor-not-allowed",
          "rounded-md shadow-md",
        )}
      >
        {/* Shimmer effect - gradient colors */}
        {variant === "gradient" && status === "idle" && (
          <motion.div
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,transparent_0%,rgba(58,7,242,0.5)_40%,rgba(12,209,207,0.5)_60%,transparent_100%)]"
            animate={{
              x: ["-200%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Button content */}
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 relative z-10"
            >
              {label}
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 relative z-10"
            >
              <Loader2
                className={cn(
                  iconSizeVariants[size === "md" ? "md" : size],
                  "animate-spin",
                )}
              />
              {loadingLabel}
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="flex items-center gap-2 relative z-10"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 0.5,
                }}
                className={cn(
                  iconSizeVariants[size === "md" ? "md" : size],
                  "fill-current",
                )}
              >
                {icon || (
                  <Rocket
                    className={cn(
                      iconSizeVariants[size === "md" ? "md" : size],
                      "fill-current",
                    )}
                  />
                )}
              </motion.div>
              {successLabel}
            </motion.div>
          )}
        </AnimatePresence>
      </NativeButton>
    </motion.div>
  );
}
