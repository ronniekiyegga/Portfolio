"use client";

import { useCallback, useEffect, useRef } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/app/components/ui/dialog";
import Image from "next/image";
import { ImageIllustration } from "@/app/components/ui/illustrations/image-illustration";
import { TracingBeam } from "@/app/components/ui/tracing-beam";
import GradualBlur from "@/app/components/GradualBlur";
import { ArrowUpRight, Bell, X } from "lucide-react";
import type { WorkItem } from "@/lib/v2-data";

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
        className="max-w-5xl w-[95vw] max-h-[90vh] p-0 gap-0 flex flex-col border border-gray-900 bg-background [&>button]:hidden"
        aria-describedby={undefined}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Project details</DialogTitle>
        </VisuallyHidden.Root>

        {/* Header — matches project preview design with extra space */}
        <div className="flex flex-col gap-2.5 shrink-0 px-6 pt-8 pb-5">
          <div className="flex justify-between items-center w-full">
            <div className="min-h-[30px] flex items-center gap-3">
              <span className="font-semibold text-[15px] leading-tight bg-linear-to-r from-[#3e7bfa] to-[#6600cc] bg-clip-text text-transparent">
                {item?.title ?? "Project"}
              </span>
              {item?.href && item.href !== "#" ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  aria-label="Open project"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-muted-foreground/50 shrink-0" aria-hidden>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={
                  item?.blogHref && item.blogHref !== "#" ? item.blogHref : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium leading-normal text-muted-foreground hover:text-foreground transition-colors"
                style={{
                  fontFamily: "var(--font-david-libre), serif",
                  fontSize: "0.78906rem",
                }}
              >
                BLOG
              </a>
              <a
                href={
                  item?.githubHref && item.githubHref !== "#"
                    ? item.githubHref
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium leading-normal text-muted-foreground hover:text-foreground transition-colors"
                style={{
                  fontFamily: "var(--font-david-libre), serif",
                  fontSize: "0.78906rem",
                }}
              >
                GITHUB
              </a>
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
            <section>
              <div className="pb-56 pt-56 lg:pt-150">
                <ImageIllustration
                  containerRef={scrollRef}
                  src={item?.heroImage}
                  alt={item?.title ?? "Project"}
                />
                <div className="mx-auto mt-20 max-w-6xl px-6 lg:mt-40 lg:px-12">
                  <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] md:gap-12 lg:gap-2">
                    {/* Left: project metadata (hover content from work card) */}
                    <div className="flex flex-col gap-4 max-w-xs">
                      <p
                        className="font-jetbrains text-[10px] tracking-widest uppercase"
                        style={{ color: "var(--muted)" }}
                      >
                        {item?.type}
                      </p>
                      <h3 className="font-cormorant text-2xl font-normal leading-tight text-foreground">
                        {item?.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item?.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item?.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 border rounded font-jetbrains text-[9px] tracking-widest uppercase"
                            style={{
                              borderColor: "var(--border)",
                              color: "var(--muted)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p
                        className="font-cormorant text-2xl italic"
                        style={{ color: "var(--metric-color)" }}
                      >
                        {item?.metric}
                      </p>
                    </div>

                    {/* Right: tracing beam starting at image, with image + insights */}
                    {item?.insights && item.insights.length > 0 ? (
                      <TracingBeam
                        containerRef={scrollRef}
                        className="w-full max-w-none pl-20 "
                      >
                        <div className="space-y-8">
                          <div className="relative overflow-hidden rounded-xl bg-muted/30 px-4">
                            <Image
                              src={item?.heroImage ?? ""}
                              alt={item?.title ?? "Project"}
                              width={600}
                              height={400}
                              className="w-full h-auto object-contain rounded-lg"
                            />
                          </div>
                          {item.insights.map((insight, i) => (
                            <div key={i} className="pb-8">
                              <h4 className="font-semibold text-lg text-foreground mb-3">
                                {insight.title}
                              </h4>
                              <p className="text-muted-foreground text-[15px] leading-relaxed">
                                {insight.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TracingBeam>
                    ) : (
                      <div className="relative overflow-hidden rounded-xl bg-muted/30 p-4">
                        <Image
                          src={item?.heroImage ?? ""}
                          alt={item?.title ?? "Project"}
                          width={600}
                          height={400}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
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
