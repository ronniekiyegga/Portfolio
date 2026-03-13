import { DesignCarousel } from "./DesignCarousel";

const textContainerClass = "max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24";

export function DesignSection() {
  return (
    <section id="design" className="py-2 section-white-bg">
      <div className={textContainerClass}>
        <p
          className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-4 reveal"
          style={{ color: "var(--muted)" }}
        >
          Design Work
        </p>
        <h2
          className="font-cormorant font-light leading-[1.05] tracking-tight mb-10 reveal"
          style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--text)" }}
        >
          Figma first,
          <br />
          <em className="italic text-gradient-design">then code</em>
        </h2>
      </div>

      <DesignCarousel controlsContainerClass={textContainerClass} />
    </section>
  );
}
