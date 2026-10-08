import Link from "next/link";
import dynamic from "next/dynamic";

import { clientWork } from "./client-work";

const DepthCarousel = dynamic(() => import("./DepthCarousel"), {
  loading: () => <div className="clientCarousel" aria-hidden />,
});

export function SelectedWorkSection() {
  return (
    <section
      id="selected-work"
      className="section clientWork reveal"
      aria-labelledby="design-heading"
    >
      <p className="sectionLabel">/ Selected Work</p>
      <div className="clientWorkHeader">
        <div className="sectionIntro">
          <h2 id="design-heading">From product problem to working software</h2>
          <p>
            A selection of products I’ve designed and built, connecting user
            needs, interface design and the engineering behind them.
          </p>
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
          ariaLabel="Products and systems I've taken from requirements through implementation and delivery."
          cardWidth={560}
          cardHeight={395}
          radius={0}
          depth={45}
          spread={-190}
          verticalSpread={-25}
          tilt={-45}
          rotation={0}
          rotateX={-5}
          skewX={0}
          skewY={-2}
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
