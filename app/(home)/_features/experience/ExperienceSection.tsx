import Image from "next/image";
import { Inter } from "next/font/google";

const experienceType = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

type ExperienceMark = "srs" | "adaptive";

type ExperienceItem = {
  id: string;
  dates: string;
  role: string;
  connector?: "-" | "at" | "·";
  organisation: string;
  organisationHref?: string;
  mark?: ExperienceMark;
  description: string;
};

const experiences: ExperienceItem[] = [
  {
    id: "contractor-2026",
    dates: "2026",
    role: "Software Engineer",
    connector: "·",
    organisation: "Selected Client Work",
    description:
      "Building product and analytics software across education and operations, from early requirements through to production.",
  },
  {
    id: "srs",
    dates: "2023 - 2026",
    role: "Software Engineer",
    connector: "at",
    organisation: "School of Research Science",
    organisationHref: "https://srsdubai.ae/",
    mark: "srs",
    description:
      "Built assessment, analytics and operational tools used across a school of more than 1,000 students.",
  },
  {
    id: "contractor-2020",
    dates: "2020 - 2023",
    role: "Software Engineer",
    connector: "·",
    organisation: "Client Projects",
    description:
      "Built web products for clients, working across React interfaces, APIs, payments and production infrastructure.",
  },
  {
    id: "adaptive",
    dates: "2019 - 2019",
    role: "Software Engineer Intern",
    connector: "at",
    organisation: "Adaptive",
    organisationHref: "https://weareadaptive.com/",
    mark: "adaptive",
    description:
      "Worked on financial data tooling and visualisation for equities, FX and fixed-income datasets.",
  },
];

function titleConnector(connector: ExperienceItem["connector"]) {
  if (connector === "-") return " - ";
  if (connector === "·") return " · ";
  if (connector === "at") return " at ";
  return " ";
}

function CompanyMark({ name }: { name: ExperienceMark }) {
  if (name === "srs") {
    return (
      <Image
        alt=""
        aria-hidden
        className="experienceMark experienceMarkSrs"
        height={16}
        src="/images/icons/srs-mark.png"
        width={17}
      />
    );
  }

  if (name === "adaptive") {
    return (
      <svg
        aria-hidden
        className="experienceMark experienceMarkAdaptive"
        fill="none"
        viewBox="0 0 539 535"
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="experience-adaptive"
            x1="0"
            x2="0"
            y1="0"
            y2="535"
          >
            <stop offset="0" stopColor="#07090f" />
            <stop offset="0.5" stopColor="#3d4a62" />
            <stop offset="1" stopColor="#07090f" />
          </linearGradient>
        </defs>
        <rect
          fill="url(#experience-adaptive)"
          height="412"
          width="108"
          x="0"
          y="36"
        />
        <rect
          fill="url(#experience-adaptive)"
          height="412"
          width="107"
          x="144"
          y="123"
        />
        <rect
          fill="url(#experience-adaptive)"
          height="412"
          width="107"
          x="288"
          y="54"
        />
        <rect
          fill="url(#experience-adaptive)"
          height="412"
          width="108"
          x="431"
          y="0"
        />
      </svg>
    );
  }

  return null;
}

export function ExperienceSection() {
  return (
    <section
      className="section experience reveal"
      aria-labelledby="experience-heading"
    >
      <p className="sectionLabel">/ Experience</p>
      <div className="sectionContent">
        <h2 className="sr-only" id="experience-heading">
          Experience
        </h2>
        <ul className={`experienceList ${experienceType.className}`}>
          {experiences.map((item) => (
            <li className="experienceItem" key={item.id}>
              <span className="experienceDates">{item.dates}</span>
              <div className="experienceCopy">
                <p className="experienceTitle">
                  <span className="experienceRole">{item.role}</span>
                  {titleConnector(item.connector)}
                  {item.organisationHref ? (
                    <a
                      className="experienceLink"
                      href={item.organisationHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.mark ? <CompanyMark name={item.mark} /> : null}
                      {item.mark ? " " : null}
                      {item.organisation}
                    </a>
                  ) : (
                    <>
                      {item.mark ? <CompanyMark name={item.mark} /> : null}
                      {item.mark ? " " : null}
                      {item.organisation}
                    </>
                  )}
                </p>
                <div className="experienceDropdown">
                  <p className="experienceDetail">
                    <span aria-hidden>↳</span>
                    <span>{item.description}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
