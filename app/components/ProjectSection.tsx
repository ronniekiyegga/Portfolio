"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LampHeader from "./LampHeader";
import LampWidget from "../widgets/LampWidget";
import ExpandableFeatures4 from "./ExpandableFeatures4";
import { TracingBeam } from "../components/ui/tracing-beam";
import { ProjectModal } from "./v2/ProjectModal";
import { projectSectionItems, type WorkItem } from "@/lib/data";

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProjectModal = (workItem: WorkItem) => {
    setSelectedItem(workItem);
    setModalOpen(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(
      "[data-project-card]",
    );
    if (!cards.length) return;

    cards.forEach((card) => {
      const els = [
        card.querySelector("[data-project-badge]"),
        card.querySelector("[data-project-title]"),
        card.querySelector("[data-project-content]"),
        card.querySelector("[data-project-cta]"),
      ].filter(Boolean) as HTMLElement[];
      gsap.set(els, { autoAlpha: 0, force3D: true });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const badge = card.querySelector("[data-project-badge]");
          const title = card.querySelector("[data-project-title]");
          const content = card.querySelector("[data-project-content]");
          const cta = card.querySelector("[data-project-cta]");
          const els = [badge, title, content, cta].filter(
            Boolean,
          ) as HTMLElement[];

          gsap.to(els, {
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: "auto",
            force3D: true,
          });
          observer.unobserve(card);
        });
      },
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full min-w-0 overflow-x-hidden -mt-4 pt-4 pb-20 md:-mt-6 md:pt-6 md:pb-20 bg-[url('/BG_1.png')] bg-cover bg-center bg-no-repeat"
      suppressHydrationWarning
    >
      {/* Light mode: LiquidChrome background */}
      <div className="absolute inset-0 z-0 dark:hidden">
        {/* <LiquidChrome
          baseColor={[0.9, 0.9, 1]}
          speed={0.2}
          amplitude={0.5}
          interactive
          className="size-full opacity-10"
        /> */}
      </div>
      <div className="relative z-10">
        {/* <LampHeader /> */}
        <LampWidget />
        <TracingBeam className="w-full px-12 sm:px-20 lg:px-20 py-6 md:py-2">
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
                  onOpenProjectModal={openProjectModal}
                />
              </div>
            ))}
            <ProjectModal
              item={selectedItem}
              open={modalOpen}
              onOpenChange={setModalOpen}
            />

            {/* {projectContent.map((item, index) => (
            <div key={`content-${index}`} data-project-card className="mb-10">
              <h4
                data-project-badge
                className="opacity-0 text-white font-bold rounded-full text-[11px] w-fit py-1 mb-2 text-gradient-blue"
              >
                {item.badge}
              </h4>

              <p
                data-project-title
                className={twMerge(
                  inter.className,
                  "opacity-0 text-2xl font-bold mb-4 text-white ",
                )}
              >
                {item.title}
              </p>

              <div
                data-project-content
                className="opacity-0 text-sm prose prose-sm dark:prose-invert text-gray-400"
              >
                {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover text-black dark:text-white"
                  />
                )}
                {item.description}
              </div>
            </div>
          ))} */}

            {/* {PROJECTDISPLAY.map((tab) => {
            const { content: Content, ...tabProps } = tab;
            return (
              <span key={tab.title}>
                <Content {...tabProps} />
              </span>
            );
          })} */}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
