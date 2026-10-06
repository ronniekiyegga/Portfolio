"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

import { FigmaMark } from "../tools/ToolMarks";

const figmaFileUrl =
  "https://www.figma.com/design/0wURLIqsRo6YCvukM6o8t1/Design-Work?node-id=0-1";

type StudyEmphasis = "side" | "center";

type InterfaceStudy = {
  id: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  objectPosition?: string;
};

const interfaceRows: (InterfaceStudy & { emphasis: StudyEmphasis })[][] = [
  [
    {
      id: "truefounders",
      title: "TrueFounders",
      description: "Natural, focused interactions",
      src: "/images/design/professional-support.webp",
      alt: "Video support interface with live translation controls",
      emphasis: "side",
    },
    {
      id: "design-collection",
      title: "Student workspace",
      description: "A connected learning workspace",
      src: "/images/design/design-collection.webp",
      alt: "Student portfolio, AI assistant and file upload interfaces",
      emphasis: "center",
    },
    {
      id: "curriculum-folders",
      title: "Curriculum folders",
      description: "Clear content organisation",
      src: "/images/design/folder-curriculum.webp",
      alt: "Layered curriculum folders for IB, A levels and GCSE",
      emphasis: "side",
    },
  ],
  [
    {
      id: "command-student-bio",
      title: "Command & profile",
      description: "Fast access to key actions",
      src: "/images/design/command-home.webp",
      alt: "Light and dark command search interfaces",
      emphasis: "side",
    },
    {
      id: "student-journeys",
      title: "Student journeys",
      description: "Stories that build trust",
      src: "/images/design/testimonials.webp",
      alt: "Student success stories and testimonial cards",
      emphasis: "center",
    },
    {
      id: "learning-navigation",
      title: "Learning navigation",
      description: "Scalable product navigation",
      src: "/images/design/navigation.webp",
      alt: "Responsive navigation concepts for a learning dashboard",
      emphasis: "side",
    },
  ],
];

function StudyStar({ gradientId }: { gradientId: string }) {
  return (
    <svg
      aria-hidden
      className="interfaceStudyStar"
      fill="none"
      overflow="visible"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientTransform="rotate(-14 0.5 0.5)"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop stopColor="#1A2980" />
          <stop offset="1" stopColor="#26D0CE" />
        </linearGradient>
      </defs>
      <g
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        <path d="m15 18 2 2 4-4" />
      </g>
    </svg>
  );
}

function StudyArrow() {
  return (
    <svg aria-hidden className="interfaceArrow" fill="none" viewBox="0 0 8 8">
      <path
        d="M1.6 6.4 6.4 1.6M2.55 1.6H6.4V5.45"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.15"
      />
    </svg>
  );
}

function InterfaceStudyCard({
  title,
  description,
  src,
  alt,
  objectPosition,
  emphasis,
  gradientId,
}: InterfaceStudy & {
  emphasis: StudyEmphasis;
  gradientId: string;
}) {
  return (
    <article className={`interfaceStudy is-${emphasis}`}>
      <div className="interfaceStudyBlur">
        <div className="interfaceStudyFrame">
          <Link
            className="interfaceStudyCard"
            href="/design"
            aria-label={`View ${title} in the design archive`}
          >
            <div className="interfaceStudyInner">
              <Image
                className="interfaceStudyImage"
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 672px) 19rem, 306px"
                quality={100}
                style={{ objectPosition }}
              />
            </div>
          </Link>
        </div>
        <div className="interfaceStudyMeta">
          <div className="interfaceStudyText">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <Link
            className="interfaceStudyMark"
            href="/design"
            aria-label={`View ${title}`}
          >
            <StudyStar gradientId={gradientId} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function MobileInterfaceCarousel() {
  const items = interfaceRows.flat();
  const [viewportRef, carouselApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const syncSelection = useCallback(() => {
    if (carouselApi) setSelectedIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on("select", syncSelection);
    carouselApi.on("reInit", syncSelection);

    return () => {
      carouselApi.off("select", syncSelection);
      carouselApi.off("reInit", syncSelection);
    };
  }, [carouselApi, syncSelection]);

  return (
    <div
      className="interfaceMobileCarousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Interface and component designs"
    >
      <div className="interfaceMobileViewport" ref={viewportRef}>
        <div className="interfaceMobileTrack">
          {items.map((item, itemIndex) => (
            <div
              className={`interfaceMobileSlide${
                itemIndex === selectedIndex ? " is-active" : ""
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${itemIndex + 1} of ${items.length}`}
              key={`mobile-${item.id}`}
            >
              <InterfaceStudyCard
                {...item}
                emphasis="center"
                gradientId={`mobile-study-star-${item.id}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="interfaceMobileDots" aria-label="Choose a design">
        {items.map((item, itemIndex) => (
          <button
            type="button"
            key={`dot-${item.id}`}
            className={itemIndex === selectedIndex ? "is-active" : undefined}
            aria-label={`Show ${item.title}`}
            aria-current={itemIndex === selectedIndex ? "true" : undefined}
            onClick={() => carouselApi?.scrollTo(itemIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export function InterfacesSection() {
  return (
    <section
      id="design"
      className="section interfaces reveal"
      aria-labelledby="interfaces-heading"
    >
      <p className="sectionLabel">/ Design</p>
      <div className="sectionContent">
        <div className="interfaceHeader">
          <div className="sectionIntro">
            <h2 id="interfaces-heading">Interfaces &amp; Components</h2>
            <p>
              A selection of dashboards, search tools and interface details
              I&apos;ve designed.
              <br />
              Product work alongside independent studies
            </p>
          </div>
          <div className="interfaceLinks">
            <a
              className="interfaceViewLink"
              href={figmaFileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FigmaMark className="interfaceFigmaMark" />
              Figma File
              <StudyArrow />
            </a>
            <span className="interfaceLinkSeparator" aria-hidden />
            <Link className="interfaceViewLink" href="/design">
              View Product Interfaces
              <StudyArrow />
            </Link>
          </div>
        </div>
      </div>

      <div className="interfaceBoard interfaceDesktopBoard">
        {interfaceRows.map((row, rowIndex) => (
          <div className="interfaceRow" key={rowIndex}>
            {row.map((item, itemIndex) => (
              <InterfaceStudyCard
                key={`${rowIndex}-${item.id}-${itemIndex}`}
                {...item}
                gradientId={`study-star-${rowIndex}-${item.id}-${itemIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
      <MobileInterfaceCarousel />
    </section>
  );
}
