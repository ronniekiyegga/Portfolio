"use client";

import React, { useCallback, useEffect, useRef } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/shared/components/ui/dialog";
import GradualBlur from "@/shared/components/effects/GradualBlur";
import { Bell, X } from "lucide-react";
import type { WorkItem } from "@/lib/data";
import { ProjectStudyContent } from "@/shared/components/sections/ProjectStudyContent";

interface ProjectModalProps {
  item: WorkItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const DESKTOP_SCROLL_CAP = 600;

export function ProjectModal({ item, open, onOpenChange }: ProjectModalProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  const startAutoScroll = useCallback((el: HTMLDivElement) => {
    isAnimatingRef.current = true;
    el.scrollTop = 0;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return false;

    const isDesktop =
      typeof window !== "undefined" && window.innerWidth >= 1024;
    const maxScrollDistance = isDesktop ? DESKTOP_SCROLL_CAP : maxScroll;
    const scrollTarget = Math.min(maxScroll, maxScrollDistance);

    const duration = 2000;
    const startTime = performance.now();
    const startTop = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      el.scrollTop = startTop + eased * scrollTarget;
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return true;
  }, []);

  const setScrollRef = useCallback((el: HTMLDivElement | null) => {
    scrollRef.current = el;
  }, []);

  useEffect(() => {
    if (!open) {
      isAnimatingRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      scrollRef.current?.scrollTo({ top: 0 });
      return;
    }

    let started = false;
    const tryScroll = () => {
      const el = scrollRef.current;
      if (!el || started) return;
      if (el.scrollHeight <= el.clientHeight) return;
      started = true;
      startAutoScroll(el);
    };

    const el = scrollRef.current;
    if (el) {
      const observer = new ResizeObserver(tryScroll);
      observer.observe(el);
      const t = setTimeout(tryScroll, 300);
      return () => {
        clearTimeout(t);
        observer.disconnect();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        scrollRef.current?.scrollTo({ top: 0 });
      };
    }

    let observer: ResizeObserver | null = null;
    const t = setInterval(() => {
      const target = scrollRef.current;
      if (target) {
        clearInterval(t);
        observer = new ResizeObserver(tryScroll);
        observer.observe(target);
        setTimeout(tryScroll, 200);
      }
    }, 50);
    const t2 = setTimeout(() => clearInterval(t), 2000);

    return () => {
      clearInterval(t);
      clearTimeout(t2);
      observer?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      scrollRef.current?.scrollTo({ top: 0 });
    };
  }, [open, item, startAutoScroll]);

  const handleScroll = useCallback(() => {
    if (isAnimatingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const isDesktop =
      typeof window !== "undefined" && window.innerWidth >= 1024;
    if (isDesktop && el.scrollTop < DESKTOP_SCROLL_CAP) {
      el.scrollTop = DESKTOP_SCROLL_CAP;
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl w-[95vw] max-h-[90vh] p-0 gap-0 flex flex-col border border-gray-900 bg-background dark:bg-[#111111] [&>button]:hidden"
        aria-describedby={undefined}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Project details</DialogTitle>
        </VisuallyHidden.Root>

        <div className="flex flex-col gap-2.5 shrink-0 px-6 pt-8 pb-5">
          <div className="flex justify-between items-center w-full">
            <div className="min-h-[30px] flex items-center gap-3">
              <span className="font-semibold text-[15px] leading-tight bg-linear-to-r from-[#3e7bfa] to-[#6600cc] bg-clip-text text-transparent">
                {item?.title ?? "Project"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {item?.href && item.href !== "#" ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium leading-normal text-muted-foreground hover:text-foreground transition-colors"
                  style={{
                    fontFamily: "var(--font-david-libre), serif",
                    fontSize: "0.78906rem",
                  }}
                >
                  LIVE
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1 font-medium leading-normal text-muted-foreground/50"
                  style={{
                    fontFamily: "var(--font-david-libre), serif",
                    fontSize: "0.78906rem",
                  }}
                  aria-hidden
                >
                  LIVE
                </span>
              )}
              <button
                type="button"
                className="relative inline-flex h-[22px] w-[22px] items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[linear-gradient(144deg,#FF3B3B_3.63%,#60C_94.05%)]"
                  aria-hidden
                />
              </button>
              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full shadow-[0_4.259px_4.259px_-2.13px_rgba(0,0,0,0.04),0_10.648px_12.777px_-2.13px_rgba(0,0,0,0.08)] text-slate-600 hover:text-slate-800 transition-colors"
                  style={{
                    background:
                      "linear-gradient(114deg, rgba(62, 123, 250, 0.02) 20.34%, rgba(102, 0, 204, 0.04) 36.8%, rgba(102, 0, 204, 0) 56.12%, rgba(62, 123, 250, 0.02) 76.52%), white",
                  }}
                  aria-label="Close"
                >
                  <X className="w-3 h-3 shrink-0" />
                </button>
              </DialogClose>
            </div>
          </div>
        </div>

        <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col">
          <div
            ref={setScrollRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto"
          >
            {item ? (
              <ProjectStudyContent
                item={item}
                scrollContainerRef={
                  scrollRef as React.RefObject<HTMLElement | null>
                }
                tracingBeamGradientId="tb-project-modal"
              />
            ) : null}
          </div>

          <GradualBlur
            target="parent"
            position="bottom"
            height="4rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential
            opacity={1}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
