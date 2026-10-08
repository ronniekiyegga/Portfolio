export type ExperienceMark = "srs" | "adaptive";

export type ExperienceItem = {
  id: string;
  dates: string;
  role: string;
  connector?: "-" | "at" | "·";
  organisation: string;
  organisationHref?: string;
  mark?: ExperienceMark;
  description: string;
};

export const experiences: ExperienceItem[] = [
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
      "Built internal assessment, booking and reporting products used across a 1,000+ student organisation.",
  },
  {
    id: "contractor-2020",
    dates: "2020 - 2023",
    role: "Software Engineer",
    connector: "·",
    organisation: "Client Projects",
    description:
      "Delivered customer-facing ecommerce, media and operational products across long-term client engagements.",
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
      "Built data visualisation and ingestion tooling for financial-data workflows.",
  },
];
