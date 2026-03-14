import { DesignCarousel } from "./DesignCarousel";

const textContainerClass = "max-w-5xl mx-auto px-4 lg:px-0";
const contentIndentClass = "pl-4 md:pl-12";

export function DesignSection() {
  return (
    <section id="design" className="pt-2 pb-4 md:pb-6 section-white-bg">
      <div className={textContainerClass}>
        <p
          className="font-jetbrains text-[10px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--muted)" }}
        >
          Design Work
        </p>
        <h2
          className={`font-cormorant font-light leading-[1.05] tracking-tight mb-10 ${contentIndentClass}`}
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
