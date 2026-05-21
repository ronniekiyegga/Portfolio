"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ImageIllustration } from "@/shared/components/ui/illustrations/image-illustration";
import { TracingBeam } from "@/shared/components/ui/tracing-beam";
import type { WorkItem } from "@/lib/data";

/** Wrap metrics in «value» in insight copy for tabular emphasis (e.g. «sub-50ms»). */
export function renderInsightRichText(text: string): ReactNode {
  const segments = text.split(/(«[^»]+»)/g);
  return segments.map((segment, i) => {
    const inner = segment.match(/^«([^»]+)»$/);
    if (inner) {
      return (
        <span
          key={i}
          className="whitespace-nowrap font-semibold tabular-nums text-foreground"
        >
          {inner[1]}
        </span>
      );
    }
    return segment ? <span key={i}>{segment}</span> : null;
  });
}

export function heroImageClassForStudy(preview?: WorkItem["preview"]): string {
  return preview === "analytics"
    ? "mx-auto w-full max-w-[min(100%,680px)] max-h-[320px] md:max-h-[360px] h-auto object-contain rounded-lg"
    : "mx-auto w-full max-w-[min(100%,680px)] max-h-[320px] md:max-h-[380px] h-auto object-contain rounded-lg";
}

export interface ProjectStudyContentProps {
  item: WorkItem;
  /**
   * When set (modal), parallax ties to this scroll container; when omitted (full page),
   * scroll uses the document.
   */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  tracingBeamGradientId?: string;
}

export function ProjectStudyContent({
  item,
  scrollContainerRef,
  tracingBeamGradientId = "tb-project-study",
}: ProjectStudyContentProps) {
  const heroCls = heroImageClassForStudy(item.preview);

  return (
    <section aria-label={`${item.title} case study`}>
      <div className="pb-56 pt-56 lg:pt-150">
        <ImageIllustration
          containerRef={scrollContainerRef}
          src={item.heroImage}
          alt={item.title}
          maxScale={1.06}
          scaleProgressSpan={0.22}
          minScale={item.preview === "analytics" ? 0.9 : 1.1}
          className="max-w-3xl md:max-w-4xl"
        />
        <div className="mx-auto mt-20 max-w-6xl px-6 lg:mt-40 lg:px-12">
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12 lg:gap-8">
            <div className="flex min-w-0 flex-col gap-4 pr-20 md:pr-24">
              <p
                className="font-jetbrains text-[10px] tracking-widest uppercase"
                style={{ color: "var(--muted)" }}
              >
                {item.type}
              </p>
              <h3 className="font-cormorant wrap-break-word text-xl font-normal leading-tight text-foreground md:text-2xl">
                {item.title}
              </h3>
              <p className="max-w-prose text-[15px] leading-relaxed text-muted-foreground md:text-base">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border px-2.5 py-1 font-jetbrains text-[9px] uppercase tracking-widest"
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
                {item.metric}
              </p>
            </div>

            {item.insights && item.insights.length > 0 ? (
              <TracingBeam
                className="w-full max-w-none pl-20"
                svgGradientId={tracingBeamGradientId}
              >
                <div className="max-w-[min(100%,42rem)] space-y-14 md:space-y-16">
                  <div className="relative overflow-hidden rounded-xl bg-muted/30 px-4 py-6">
                    <Image
                      src={item.modalDetailImage ?? item.heroImage}
                      alt={item.title}
                      width={1200}
                      height={700}
                      className={heroCls}
                    />
                  </div>
                  {item.statistics && item.statistics.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                      {item.statistics.map((stat, i) => (
                        <div
                          key={`${stat.label}-${i}`}
                          className="rounded-lg bg-muted/40 px-3 py-2.5 text-center sm:px-4 sm:py-3"
                        >
                          <div
                            className="text-base font-semibold tabular-nums sm:text-lg"
                            style={{
                              background:
                                "linear-gradient(135deg, #3e7bfa 0%, #6600cc 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {stat.value}
                          </div>
                          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.insights.map((insight, i) => (
                    <div
                      key={`${insight.title}-${i}`}
                      className="border-b border-border/50 pb-12 last:border-b-0 last:pb-4 md:pb-14 md:last:pb-6"
                    >
                      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {insight.title}
                      </h4>
                      <p className="max-w-prose text-[15px] leading-[1.65] text-foreground/90 md:text-base">
                        {renderInsightRichText(insight.content)}
                      </p>
                      {insight.actions && insight.actions.length > 0 ? (
                        <ul className="marker:text-muted-foreground/70 mt-5 max-w-prose list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-muted-foreground md:text-base dark:text-gray-400">
                          {insight.actions.map((action, j) => (
                            <li key={`${insight.title}-${j}`} className="pl-1">
                              {renderInsightRichText(action)}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </TracingBeam>
            ) : (
              <div className="space-y-8">
                <div className="relative overflow-hidden rounded-xl bg-muted/30 p-6">
                  <Image
                    src={item.modalDetailImage ?? item.heroImage}
                    alt={item.title}
                    width={1200}
                    height={700}
                    className={heroCls}
                  />
                </div>
                {item.statistics && item.statistics.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                    {item.statistics.map((stat, i) => (
                      <div
                        key={`${stat.label}-${i}`}
                        className="rounded-lg bg-muted/40 px-3 py-2.5 text-center sm:px-4 sm:py-3"
                      >
                        <div
                          className="text-base font-semibold tabular-nums sm:text-lg"
                          style={{
                            background:
                              "linear-gradient(135deg, #3e7bfa 0%, #6600cc 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {stat.value}
                        </div>
                        <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
