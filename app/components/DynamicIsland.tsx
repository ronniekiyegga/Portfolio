"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Link2, Mail, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const CONTACT_SECTION_ID = "contact-info-section";

export default function DynamicIsland() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById(CONTACT_SECTION_ID);
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast = !entry.isIntersecting;
        setIsVisible(scrolledPast);
        if (!scrolledPast) setIsDismissed(false);
      },
      {
        threshold: 0,
        rootMargin: "-10px 0px 0px 0px",
      },
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const showPills = isVisible && !isDismissed;

  return (
    <AnimatePresence>
      {showPills && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 px-2"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Left pill - Avatar + Name */}
          <div
            className="flex p-[2px]"
            style={{
              borderRadius: "var(--Corner-radius-32, 2.26806rem)",
              background: "var(--Gradients-Cream-Buttons)",
            }}
          >
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
              style={{
                borderRadius: "10.31175rem",
                border: "1.134px solid var(--Gradients-Cream, #FFF)",
                background: "var(--Gradients-White-1)",
              }}
            >
              <div className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image
                  src="/Avatar.svg"
                  alt="Ronnie"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-neutral-800 font-[family-name:var(--font-style-script)] text-xs font-medium">
                Ronnie
              </span>
            </div>
          </div>

          {/* Middle pill - Email (slightly bigger), hidden on mobile */}
          <div
            className="hidden min-w-[180px] max-w-[240px] p-[2px] md:flex"
            style={{
              borderRadius: "var(--Corner-radius-32, 2.26806rem)",
              background: "var(--Gradients-Cream-Buttons)",
            }}
          >
            <div
              className="flex flex-1 items-center justify-between gap-1.5 rounded-full px-3.5 py-3"
              style={{
                borderRadius: "10.31175rem",
                border: "1.134px solid var(--Gradients-Cream, #FFF)",
                background: "var(--Gradients-White-1)",
              }}
            >
              <span className="truncate font-[family-name:var(--font-source-serif)] text-[12px] text-neutral-800">
                ronniekiyegga@dmi.com
              </span>
              <div className="flex shrink-0 items-center gap-1 text-gray-400">
                <User className="h-3.5 w-3.5" />
                <Link2 className="h-3.5 w-3.5" />
                <Mail className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right pill - Let's chat + Close */}
          <div
            className="flex gap-1.5 p-[2px]"
            style={{
              borderRadius: "var(--Corner-radius-32, 2.26806rem)",
              background: "var(--Gradients-Cream-Buttons)",
            }}
          >
            <div
              className="flex items-center gap-1.5 rounded-full px-1.5 py-0.5"
              style={{
                borderRadius: "10.31175rem",
                border: "1.134px solid var(--Gradients-Cream, #FFF)",
                background: "var(--Gradients-White-1)",
              }}
            >
              <div
                className="flex p-[2px]"
                style={{
                  borderRadius: "1.38813rem",
                  background: "var(--Gradients-Button-Outer)",
                  boxShadow:
                    "0 0 0.996px 0 rgba(0, 0, 0, 0.08) inset, 0 0.747px 0 0 rgba(255, 255, 255, 0.10)",
                }}
              >
                <Link
                  href="mailto:ronniekiyegga@dmi.com"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-[family-name:var(--font-dancing-script)] text-xs font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{
                    borderRadius: "1.38813rem",
                    background: "var(--BG-Black-2)",
                    boxShadow:
                      "0 1.378px 1.102px 0 rgba(0, 0, 0, 0.12), 0 1.494px 1.494px 0 rgba(0, 0, 0, 0.14), 0 11.122px 8.898px 0 rgba(0, 0, 0, 0.14), 0 6.235px 4.988px 0 rgba(0, 0, 0, 0.14), 0 1.378px 1.102px 0 rgba(0, 0, 0, 0.12), 0 0.498px 0 0 rgba(255, 255, 255, 0.30) inset",
                  }}
                >
                  Let&apos;s chat
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-sky-300" />
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                aria-label="Close"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-200"
                style={{
                  background: "var(--Gradients-White-1)",
                }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
