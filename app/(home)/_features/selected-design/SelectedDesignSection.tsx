import Link from "next/link";
import dynamic from "next/dynamic";

import type { DepthCarouselItem } from "./DepthCarousel";

const DepthCarousel = dynamic(() => import("./DepthCarousel"), {
  loading: () => <div className="clientCarousel" aria-hidden />,
});

const clientWork: DepthCarouselItem[] = [
  {
    image: "/images/editorial/client-work/ms-maryams-maths.webp",
    alt: "Ms Maryam's Maths tutoring website",
  },
  {
    image: "/images/editorial/client-work/provenant.webp",
    alt: "Provenant agent evidence platform website",
  },
  {
    image: "/images/editorial/client-work/Footer.webp",
    alt: "Mathematics tutoring newsletter and footer design",
  },
  {
    image: "/images/editorial/client-work/edufeedbackpro.webp",
    alt: "EduFeedbackPro school intelligence dashboard website",
  },
  {
    image: "/images/editorial/client-work/john-canary.webp",
    alt: "John Canary cleaning services website",
  },
  {
    image: "/images/editorial/client-work/true-founders.webp",
    alt: "True Founders coaching website",
  },
];

export function SelectedDesignSection() {
  return (
    <section
      id="selected-work"
      className="section clientWork reveal"
      aria-labelledby="design-heading"
    >
      <p className="sectionLabel">/ Selected Work</p>
      <div className="clientWorkHeader">
        <div className="clientWorkCopy">
          <h2 id="design-heading">
            <strong>Products I&apos;ve designed &amp; built</strong>
          </h2>
          <p>Taken from requirements through to delivery.</p>
        </div>
        <Link href="/design" className="clientWorkLink">
          View product &amp; interface design <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="clientCarouselFrame">
        <p className="sr-only" id="client-work-carousel-help">
          Drag, scroll, or use the left and right arrow keys to explore the
          work.
        </p>
        <DepthCarousel
          items={clientWork}
          ariaLabel="Products designed and built"
          cardWidth={560}
          cardHeight={395}
          radius={0}
          depth={45}
          spread={-200}
          verticalSpread={-28}
          tilt={-44}
          rotation={0}
          rotateX={-10}
          skewX={0}
          skewY={-5}
          tiltDirection="left"
          perspective={3800}
          visibleCards={6}
          falloff={0}
          blur={0}
          duration={620}
          ease="power3.out"
          loop
          showControls={false}
          showIndicators={false}
          className="clientCarousel"
        />
      </div>
    </section>
  );
}
