export function AboutSection() {
  return (
    <section className="section about reveal lg:mb-4" aria-labelledby="about-heading">
      <p className="sectionLabel">/ About</p>
      <div className="sectionContent aboutCopy">
        <h2 className="sr-only" id="about-heading">
          About
        </h2>
        <p>
          I’m Ronnie, a product-minded software engineer who works across
          frontend, design and backend systems. I care about making interfaces
          clear and useful, then making sure the workflows behind them remain
          reliable when data is incomplete, requests fail or users take an
          unexpected path.
        </p>
        <p>
          My work has involved taking products end to end: translating ideas
          into Figma workflows, building responsive TypeScript and React
          interfaces, and working across APIs, databases and operational
          concerns. I am especially interested in design systems, data-heavy
          interfaces and the trade-offs behind software that needs to work
          beyond the happy path.
        </p>
        <p>
          Outside of delivery work, I learn by building and writing about
          engineering problems, product decisions and interface design.
        </p>
      </div>
    </section>
  );
}
