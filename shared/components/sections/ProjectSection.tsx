"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LampWidget from "@/app/widgets/LampWidget";
import ExpandableFeatures4 from "./ExpandableFeatures4";
import { TracingBeam } from "@/shared/components/ui/tracing-beam";
import { ProjectModal } from "./ProjectModal";
import { projectSectionItems } from "@/lib/data";

import { useProjectContext } from "@/app/contexts/ProjectContext";

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const { openModal, modalOpen, setModalOpen, selectedItem } =
    useProjectContext();

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll<HTMLElement>(
        "[data-project-card]",
      );
      if (!cards.length) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.registerPlugin(ScrollTrigger);

      const cleanup: Array<{ st?: ScrollTrigger; tl: gsap.core.Timeline }> = [];

      cards.forEach((card) => {
        const badge = card.querySelector<HTMLElement>("[data-project-badge]");
        const title = card.querySelector<HTMLElement>("[data-project-title]");
        const content = card.querySelector<HTMLElement>(
          "[data-project-content]",
        );
        const cta = card.querySelector<HTMLElement>("[data-project-cta]");
        const els = [badge, title, content, cta].filter(Boolean);

        gsap.set(els, { autoAlpha: 0, y: 10, force3D: true });

        if (prefersReducedMotion) {
          gsap.set(els, { autoAlpha: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });

        tl.to(badge, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "expo.out",
          force3D: true,
        })
          .to(
            title,
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "expo.out" },
            "-=0.3",
          )
          .to(
            content,
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "expo.out" },
            "-=0.28",
          )
          .to(
            cta,
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "expo.out" },
            "-=0.25",
          );
        cleanup.push({ st: tl.scrollTrigger ?? undefined, tl });
      });

      cleanupRef.current = () =>
        cleanup.forEach(({ st, tl }) => {
          st?.kill();
          tl.kill();
        });
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupRef.current?.();
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full min-w-0 overflow-x-hidden -mt-4 pt-4 pb-20 md:-mt-6 md:pt-16 md:pb-20 bg-[url('/images/backgrounds/BG_1.png')] bg-cover bg-center bg-no-repeat"
      suppressHydrationWarning
    >
      <div className="absolute inset-0 z-0 dark:hidden" />
      <div className="relative z-10">
        <LampWidget />
        <TracingBeam className="w-full px-8 sm:px-20 lg:px-20 py-6 md:py-2">
          <div
            ref={containerRef}
            className="mx-auto w-full antialiased relative"
          >
            {projectSectionItems.map((item, index) => (
              <div
                key={`content-${index}`}
                data-project-card
                className="mb-16 md:mb-20 lg:mb-16"
              >
                <ExpandableFeatures4
                  badge={item.badge}
                  title={item.workItem.title}
                  description={<p>{item.workItem.desc}</p>}
                  imageOnLeft={index % 2 === 1}
                  detailsImage={item.workItem.heroImage}
                  features={item.features}
                  links={item.links}
                  workItem={item.workItem}
                  onOpenProjectModal={openModal}
                />
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>

      <ProjectModal
        item={selectedItem}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
