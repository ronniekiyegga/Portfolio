import Link from "next/link";

import { FigmaMark } from "../tools/ToolMarks";

const figmaFileUrl =
  "https://www.figma.com/design/0wURLIqsRo6YCvukM6o8t1/Design-Work?node-id=0-1";

type StudyEmphasis = "side" | "center";

type InterfaceStudy = {
  id: string;
  title: string;
  kind: string;
};

const commandCentre: InterfaceStudy = {
  id: "command-centre",
  title: "Command Centre",
  kind: "Command Centre",
};

const commandPalette: InterfaceStudy = {
  id: "command-palette",
  title: "Command Palette",
  kind: "Command Palette",
};

const insightPanel: InterfaceStudy = {
  id: "insight-panel",
  title: "Insight Panel",
  kind: "Insight Panel",
};

const interfaceRows: (InterfaceStudy & { emphasis: StudyEmphasis })[][] = [
  [
    { ...insightPanel, emphasis: "side" },
    { ...commandCentre, emphasis: "center" },
    { ...commandPalette, emphasis: "side" },
  ],
  [
    { ...commandPalette, emphasis: "side" },
    { ...insightPanel, emphasis: "center" },
    { ...commandCentre, emphasis: "side" },
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
  kind,
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
          <Link className="interfaceStudyCard" href="/design">
            <div className="interfaceStudyInner" />
          </Link>
        </div>
        <div className="interfaceStudyMeta">
          <p>{kind}</p>
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
          <div className="interfaceCopy">
            <h2 id="interfaces-heading">Interfaces &amp; Components</h2>
            <p>
              A selection of dashboards, search tools and interface details
              I&apos;ve designed.
              <br />
              Product work along side independent studies
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

      <div className="interfaceBoard">
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
    </section>
  );
}
