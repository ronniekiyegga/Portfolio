export interface WorkItemInsight {
  title: string;
  content: string;
  /** Optional bullet list (used for Solution focus, tradeoffs, etc.) */
  actions?: string[];
}

export interface ProjectSectionStat {
  value: string;
  label: string;
}

export interface WorkItem {
  /**
   * Stable key for linking cards/sections to this entry.
   * Editing `title` or `desc` does not break lookups — keep this unchanged.
   */
  id: string;
  tag?: string;
  type: string;
  title: string;
  desc: string;
  tags: string[];
  metric: string;
  href: string;
  gradient: string;
  preview: "analytics" | "maths" | "knn" | "pseudolab";
  heroImage: string;
  modalDetailImage?: string;
  blogHref?: string;
  githubHref?: string;
  insights?: WorkItemInsight[];
  statistics?: ProjectSectionStat[];
}

export type ProjectCardStackDef = {
  id: number;
  title?: string | null;
  icon: "purple" | "teal" | null;
  imageSrc: string;
  imageAlt: string;
};

export type ProjectCardShowcaseRow = {
  imageOnLeft: boolean;
  watermark: string;
  stack: ProjectCardStackDef[];
  /** Must match a `WorkItem.id` in `workItems` */
  workItemId: string;
};

/** Figma “Project Files” — used for FIGMA FILE on every showcase row */
export const PROJECT_CARD_SHOWCASE_FIGMA_HREF =
  "https://www.figma.com/design/Au6mJ4osdzMpUBlqojMYzm/Project-Files?node-id=0-1&t=52XXZclkPhzyBPFG-1";

export const PROJECT_CARD_STACK_ROW_1: ProjectCardStackDef[] = [
  {
    id: 1,
    icon: "teal",
    imageSrc: "/images/projects/edufeedbackpro/DMI_HERO.svg",
    imageAlt: "EduFeedbackPro hero preview",
  },
  {
    id: 2,
    icon: "purple",
    imageSrc: "/images/projects/edufeedbackpro/DMI.svg",
    imageAlt: "EduFeedbackPro benefits preview",
  },
  {
    id: 3,
    icon: null,
    imageSrc: "/images/projects/edufeedbackpro/EDUFEEDBACKPRO.svg",
    imageAlt: "EduFeedbackPro support preview",
  },
];

export const PROJECT_CARD_STACK_ROW_2: ProjectCardStackDef[] = [
  {
    id: 1,
    icon: "teal",
    imageSrc: "/images/projects/maths-tutoring/Tutoring_hero.webp",
    imageAlt: "Mathematics Tutoring hero preview",
  },
  {
    id: 2,
    icon: "purple",
    imageSrc: "/images/projects/maths-tutoring/Tutoring-2.webp",
    imageAlt: "Mathematics Tutoring marketing preview",
  },
  {
    id: 3,
    icon: null,
    imageSrc: "/images/projects/maths-tutoring/Tutoring-3.webp",
    imageAlt: "Mathematics Tutoring platform preview",
  },
];

export const PROJECT_CARD_STACK_ROW_3: ProjectCardStackDef[] = [
  {
    id: 1,
    icon: "purple",
    imageSrc: "/images/projects/truefounders/TrueFounders_hero.webp",
    imageAlt: "TrueFounders hero preview",
  },
  {
    id: 2,
    icon: "teal",
    imageSrc: "/images/projects/truefounders/truefounders-2.webp",
    imageAlt: "TrueFounders value proposition preview",
  },
  {
    id: 3,
    icon: null,
    imageSrc: "/images/projects/truefounders/truefounders-3.webp",
    imageAlt: "TrueFounders brand preview",
  },
];

export const PROJECT_CARD_SHOWCASE_ROWS: ProjectCardShowcaseRow[] = [
  {
    imageOnLeft: true,
    watermark: "PROJECT 1",
    stack: PROJECT_CARD_STACK_ROW_1,
    workItemId: "edu-analytics-dashboard",
  },
  {
    imageOnLeft: false,
    watermark: "PROJECT 2",
    stack: PROJECT_CARD_STACK_ROW_2,
    workItemId: "edtech-tutoring",
  },
  {
    imageOnLeft: true,
    watermark: "PROJECT 3",
    stack: PROJECT_CARD_STACK_ROW_3,
    workItemId: "true-founders",
  },
];

export type ProjectCardStackFan = "se" | "sw";

export const PROJECT_CARD_FAN_DX = 32;
export const PROJECT_CARD_FAN_DY = 28;

export function projectCardStackOffset(
  index: number,
  fan: ProjectCardStackFan,
): { left: number; top: number } {
  if (fan === "se") {
    return {
      left: index * PROJECT_CARD_FAN_DX,
      top: index * PROJECT_CARD_FAN_DY,
    };
  }
  return {
    left: (2 - index) * PROJECT_CARD_FAN_DX,
    top: index * PROJECT_CARD_FAN_DY,
  };
}

export interface DesignItem {
  type: string;
  name: string;
  gradient: string;
  accentColor: string;
  label: string;
  sublabel: string;
  extras?: "buttons" | "logo-circle" | "code" | "dots" | "search";
}

import type { TechIconKey } from "@/shared/components/sections/integrations-one";

export interface ExperienceItem {
  initial: string;
  company: string;
  role: string;
  desc: string;
  tags: string[];
  techStack?: TechIconKey[];
  dates: string;
}

/** V1 Experiences component (expandable list) */
export interface ExperienceV1Item {
  id: string;
  role: string;
  dates: string;
  /** Plain paragraph, or bullet lines (rendered as a list in Experiences) */
  responsibilities: string | readonly string[];
  /** Shown after role, separated by a middle dot — omit for title-only lines */
  organisation?: string;
  /** Appended after org, e.g. (Available for work) */
  suffix?: string;
}

export function getWorkItemById(id: string): WorkItem | undefined {
  return workItems.find((w) => w.id === id);
}

export const experiencesV1: ExperienceV1Item[] = [
  {
    id: "Full Stack Software Engineer 2026",
    dates: "2026",
    role: "Full Stack Software Engineer",
    organisation: "Independent Consultant",
    suffix: "",
    responsibilities: [
      "Building and shipping SaaS platforms (Next.js, Node.js, PostgreSQL) with a focus on fast iteration and stable deployment",
      "Designing CI/CD pipelines and containerised environments (Docker, GitHub Actions) to streamline deployments",
      "Contributing to open-source and exploring performance improvements in real-time systems",
    ],
  },
  {
    id: "SRS",
    dates: "2023–2026",
    role: "Software Engineer",
    organisation: "School of Research Science",
    responsibilities: [
      "Reduced ML latency by 70% (2s → 600ms) and saved £6K/year by shifting inference client-side (TensorFlow.js)",
      "Improved release velocity by 50% by implementing CI/CD pipelines and canary deployments across a 3-engineer team",
      "Built real-time EdTech platforms including student analytics dashboards and an AI-powered pseudocode IDE",
    ],
  },
  {
    id: "fullstack-contract",
    dates: "2020–2023",
    role: "Full Stack Software Engineer",
    organisation: "Independent Contractor",
    responsibilities: [
      "Architected a Next.js/PostgreSQL e-commerce platform processing 2k+ monthly transactions with 99.9% uptime and zero data loss",
      "Built a low-latency API gateway (Node.js, Redis, RBAC) sustaining <40ms response times under load",
      "Delivered a reusable React design system (30+ components) reducing frontend delivery time by 33%",
    ],
  },
  {
    id: "Internship",
    dates: "2019 – 2019",
    role: "Engineering Intern",
    organisation: "Adaptive",
    responsibilities:
      "Reduced data retrieval latency by ~40% for institutional analyst teams by engineering automated Python/SQL ingestion pipelines spanning equities, FX, and fixed income datasets, accelerating time-to-insight for daily reporting workflows.",
  },
];

export const workItems: WorkItem[] = [
  {
    id: "edu-analytics-dashboard",
    type: "B2B SaaS · Analytics Platform",
    title: "EduFeedbackPro",
    desc: "Analytics platform for student performance, focused on transforming fragmented data into actionable signals through structured data modelling and real-time aggregation.",
    tags: [
      "TypeScript",
      "Next.js",
      "BigQuery",
      "PostgreSQL",
      "Docker",
      "ElevenLabs",
      "Neon",
      "Playwright",
    ],
    metric: "sub-50ms latency",
    href: "https://edu-feedback-pro-beta.vercel.app/",
    gradient: "linear-gradient(160deg, #0d0d1f 0%, #1a0d2e 50%, #120820 100%)",
    preview: "analytics",
    heroImage: "/images/projects/edufeedbackpro/edufeedbackpro_hero.webp",
    modalDetailImage: "/images/projects/edufeedbackpro/EFP_PNG.png",
    insights: [
      {
        title: "Intro",
        content:
          "EduFeedbackPro is an internal analytics tool for secondary schools. The main issue I was dealing with was how fragmented the data was. It already existed, but it lived across exports, MIS systems, and spreadsheets, so staff had to piece things together manually. I built the UI and the data path from Postgres and BigQuery out to the browser, including real-time updates with SSE.",
        actions: [
          "Role-based access across departments",
          "Single student/cohort model instead of manual reconciliation across systems",
          "Next.js 15, Prisma, Neon Postgres, BigQuery, Docker, Playwright on critical paths",
          "Runs in production, so performance and failure modes had to be handled properly",
        ],
      },
      {
        title: "Performance highlights",
        content:
          "The dashboards are used throughout the day, so I needed reads to stay fast without putting pressure on Postgres. I kept analytical queries in BigQuery so the main database could handle user-facing work without getting blocked.",
        actions: [
          "Target low-latency reads once caches are warm",
          "No polling; updates are pushed via SSE when data changes",
          "Notifications arrive shortly after changes are written",
          "Postgres handles auth, enrolment, and writes; BigQuery handles heavier analytical queries",
        ],
      },
      {
        title: "Problem",
        content:
          "The core problem wasn't lack of data, it was how hard it was to use. Marks and cohort data were spread across different systems, and staff had to reconcile everything manually. That made it slow to spot issues, and most insights only showed up after the fact.",
        actions: [
          "Same student represented differently across sources, leading to duplication",
          "Reports were batch-based, so insights arrived late",
          "No shared signal for when something needed attention",
          "Anything derived still had to map back to numbers people trusted",
        ],
      },
      {
        title: "Solution",
        content:
          "I structured the system around how staff already think about the data: students, cohorts, and assessments, with dashboards built on top. Instead of relying on manual refresh, the server pushes updates when something changes.",
        actions: [
          "Dashboards surface patterns earlier instead of at the end of term",
          "Server builds BigQuery queries from UI actions; no direct query access from the client",
          "Voice input is optional; all workflows work without it",
          "RBAC scoped by department to keep data isolated between groups",
        ],
      },
      {
        title: "Real-time architecture",
        content:
          "Most of the traffic is server to client, so I didn't need WebSockets. SSE was enough for pushing updates without adding extra complexity.",
        actions: [
          "Events emitted on domain changes (enrolment, assessment, notifications)",
          "In-memory subscription layer, with a path to Redis if needed later",
          "Reconnection and backoff tuned for unreliable networks",
          "Heartbeats to keep long-lived connections alive",
        ],
      },
      {
        title: "System architecture",
        content:
          "I split transactional and analytical workloads so they don't interfere with each other. Postgres handles user data and writes. BigQuery handles heavier analytical queries.",
        actions: [
          "Next.js Route Handlers for APIs and SSE streams",
          "Prisma on Postgres, with a clear boundary for BigQuery calls",
          "Docker for consistent deploys; Sentry for production monitoring",
          "Short TTL for notifications, longer TTL for expensive analytical reads",
        ],
      },
      {
        title: "Key engineering decisions",
        content:
          "Most decisions came down to keeping things simple while handling real-time updates and read-heavy traffic.",
        actions: [
          "Used SSE because updates are one-way; WebSockets weren't necessary",
          "Split databases so analytical queries don't affect transactional performance",
          "Kept query generation on the server instead of exposing SQL to clients",
          "Treated voice as optional, not something required to use the system",
        ],
      },
      {
        title: "Tradeoffs",
        content:
          "Some of the simpler choices come with limits, especially around scaling and data freshness.",
        actions: [
          "In-memory pub/sub works for a single instance; scaling would require Redis",
          "TTL caching reduces load but introduces some staleness",
          "Postgres and BigQuery need consistent schemas; UI can't compensate for that",
          "SSE is one-way; real-time collaboration would need a different approach",
        ],
      },
    ],
    statistics: [
      { value: "50ms", label: "P95" },
      { value: "<10s", label: "SSE Updates" },
      { value: "0", label: "Polling" },
    ],
  },
  {
    id: "subscription-api",
    type: "Backend · API Infrastructure",
    title: "Subscription API",
    desc: "Backend subscription management API with authentication, RBAC, and rate limiting, structured around a service layer to keep data access, business logic, and transport concerns decoupled.",
    tags: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "Postgres",
      "JWT",
      "Zod",
    ],
    metric: "Edge validation · tenant isolation",
    href: "#",
    gradient: "linear-gradient(160deg, #12141a 0%, #1a1f2e 50%, #0f1118 100%)",
    preview: "analytics",
    heroImage:
      "/images/projects/subscription-api/auth-middleware-1.webp?v=20260423",
    modalDetailImage:
      "/images/projects/subscription-api/router-boundary-2.webp",
    githubHref: "https://github.com/BlissfulCoda",
    insights: [
      {
        title: "Overview",
        content:
          "Backend subscription management API with authentication, RBAC, and rate limiting, structured around a service layer to keep data access, business logic, and transport concerns decoupled. Inputs are Zod-validated, persistence is Prisma on Postgres, and auth plus rate limits run before route handlers so failure modes stay consistent under load.",
      },
    ],
    statistics: [
      { value: "RBAC", label: "Scopes" },
      { value: "Edge", label: "Limits" },
      { value: "Zod", label: "Validation" },
    ],
  },
  {
    id: "true-founders",
    type: "Brand Identity · Brand Identity",
    title: "True Founders",
    desc: "A brand and landing concept for a women's life coaching practice in Dubai that turns twelve-competitor analysis and three audience personas into clearer positioning, stronger trust signals, and a direct path from discovery to enquiry.",
    tags: [
      "Figma",
      "UX Audit",
      "Competitive Analysis",
      "Personas",
      "Landing Page",
    ],
    metric: "12 competitors analysed",
    href: "#",
    gradient: "linear-gradient(160deg, #100e00 0%, #2a2200 50%, #181400 100%)",
    preview: "analytics",
    heroImage: "/images/projects/truefounders/TrueFounders_hero.webp",
    modalDetailImage: "/images/projects/truefounders/truefounders-2.webp",
    insights: [
      {
        title: "Overview",
        content:
          "A brand identity and landing page redesign concept for a women's life coaching business in Dubai, informed by competitive analysis across 12 competitors, persona development for three audience segments, and conversion-focused page structure.",
      },
    ],
    statistics: [
      { value: "12", label: "Competitors" },
      { value: "3", label: "Personas" },
      { value: "UX", label: "Audit" },
    ],
  },
  // Tutoring Platform
  {
    id: "edtech-tutoring",
    type: "B2C SaaS · Tutoring Platform",
    title: "Ms Maryam's Maths",
    desc: "Full-stack learning platform for GCSE and A-level maths with real-time progress tracking, authentication, and a focus on performance and predictable user flows at scale.",
    tags: [
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Clerk",
      "PostgreSQL",
      "DigitalOcean",
      "Nginx",
      "GitHub Actions",
    ],
    metric: "3 min deploy vs 20+ min",
    href: "https://www.msmaryamsmaths.com/",
    gradient: "linear-gradient(160deg, #0a1628 0%, #0d2244 50%, #081830 100%)",
    preview: "maths",
    heroImage: "/images/projects/maths-tutoring/Tutoring_hero.webp",
    insights: [
      {
        title: "Overview",
        content:
          "Built this from scratch for a GCSE and A-Level maths tutor. The process started entirely in Figma: brand identity, user flows, and a full component spec across seven marketing sections before writing any code. Once the design was locked in, the build covered the public marketing site, Clerk-authenticated dashboard, and a structured course catalogue across six subject areas, all shipped to a self-hosted VPS with a zero-touch deployment pipeline.",
      },
      {
        title: "Design Process",
        content:
          "Figma-first meant engineering decisions were already validated against real user needs before implementation started:",
        actions: [
          "Brand identity, colour system, and typography locked in before any code was written",
          "Seven marketing sections prototyped: Hero, Product Display, Results, Possibilities, Curriculum, Differentiators, AI Benefits",
          "Student dashboard and course pages designed as a component spec, then coded directly from that",
        ],
      },
      {
        title: "System Architecture",
        content:
          "Next.js 16 App Router with route groups separating marketing, auth, dashboard, and course concerns:",
        actions: [
          "Clerk handles auth with a checkUser sync pattern that keeps Clerk and Postgres in step on every sign-in",
          "PostgreSQL via Prisma ORM, schema covers users and tasks with cascade deletes on user removal",
          "Express sidecar running on port 3001 for server-side logic that sits outside the Next.js request lifecycle",
          "Standalone output in next.config so the app self-hosts without a separate Node runtime layer",
          "Six course routes: GCSE Foundation, GCSE Higher, A-Levels, Further Maths, Exam Prep, Homework Support",
        ],
      },
      {
        title: "Deployment Pipeline",
        content:
          "GitHub Actions handles the full build and deploy on every push to main, no manual steps:",
        actions: [
          "Pipeline: npm ci, Prisma generate, Next.js build, verify standalone output exists, bundle static assets",
          "SCP deploys the Next.js standalone build and Express server to the DigitalOcean VPS as separate steps",
          "PM2 manages both processes on the VPS with auto-restart on failure",
          "Nginx sits in front as the reverse proxy",
          "Took deployment from 20+ minutes of manual SSH and copy steps down to under 3 minutes end-to-end",
        ],
      },
    ],
    statistics: [
      { value: "<3min", label: "Deploy Time" },
      { value: "6", label: "Course Types" },
      { value: "7", label: "Marketing Sections" },
    ],
  },
  // KNN Classifier
  {
    id: "knn-classifier",
    type: "Educational Tool · ML Classifier",
    title: "KNN Image Classifier",
    desc: "On-device ML image classifier built with TensorFlow.js, enabling students to train and run models directly in the browser without server infrastructure.",
    tags: ["TensorFlow.js", "React", "On-device AI"],
    metric: "400+ students, zero infra cost",
    href: "https://blissfulcoda.github.io/teachablemachine/",
    gradient: "linear-gradient(160deg, #0a1a0a 0%, #0d2e0d 50%, #081808 100%)",
    preview: "knn",
    heroImage: "/images/projects/knn-classifier/KNN_CLASSIFIER.svg",
    githubHref: "https://github.com/BlissfulCoda/teachablemachine",
    insights: [
      {
        title: "The Problem",
        content:
          "iPad classrooms couldn't use Google Teachable Machine due to browser restrictions and network requirements. Students needed a way to train and run ML classifiers entirely in the browser, with no server infrastructure. The solution: real-time client-side inference with TensorFlow.js, enabling 400+ students to use the tool with zero infrastructure cost.",
      },
    ],
    statistics: [
      { value: "400+", label: "Students" },
      { value: "BYOK", label: "AI Reviewer" },
    ],
  },
  // Algo-pseudo
  {
    id: "algo-pseudo",
    type: "Developer Tool · Open Source",
    title: "Algo-pseudo IDE",
    desc: "Browser-based pseudocode IDE for GCSE and A-Level students with real-time syntax validation and AI-assisted code review.",
    tags: ["Next.js", "TypeScript", "Open Source"],
    metric: "Exam-spec compliant",
    href: "https://www.algo-pseudo.com/",
    gradient: "linear-gradient(160deg, #0a1a1a 0%, #0d2e2e 50%, #081818 100%)",
    preview: "pseudolab",
    heroImage: "/images/projects/algo-pseudo/PSEUDOLAB_PNG.png",
    blogHref: "#",
    githubHref: "https://github.com/BlissfulCoda/pseudolab",
    insights: [
      {
        title: "The Problem",
        content:
          "Students preparing for Cambridge IGCSE and A-Level Computer Science exams needed a way to write and run pseudocode that matched the exam specification exactly. Existing tools were either too generic or required local installation. PseudoLab IDE provides a browser-based environment with real-time execution, syntax highlighting, and a built-in reference—enabling 400+ students to practice exam-style pseudocode with instant feedback.",
      },
    ],
    statistics: [
      { value: "400+", label: "Students" },
      { value: "BYOK", label: "AI Reviewer" },
    ],
  },
];

/** V1 Project section: feature tabs (Design, Engineering, Github) with project-specific images */
export interface ProjectSectionFeature {
  title: string;
  description: string;
  image: string;
  background: "lightPillar" | "prism" | "lightRays" | "floatingLines";
  href?: string;
}

export interface ProjectSectionItem {
  /** WorkItem is the single source of truth for title, desc, modal content */
  workItem: WorkItem;
  /** Short badge for project section (e.g. "B2C SAAS PLATFORM") */
  badge: string;
  /** Feature tabs shown on left - project-specific images */
  features: ProjectSectionFeature[];
  /** Optional links for design file, live site (overrides workItem.href if set) */
  links?: {
    liveWebsite?: string;
    designFile?: string;
    githubHref?: string;
  };
}

/** V1 project section items - derived from workItems, single source of truth */
export const projectSectionItems: ProjectSectionItem[] = [
  {
    workItem: getWorkItemById("edu-analytics-dashboard")!,
    badge: "ANALYTICS PLATFORM",
    features: [
      {
        title: "Design",
        description: "",
        image: "/images/projects/edufeedbackpro/DMI_HERO.svg",
        background: "lightPillar",
      },
      {
        title: "Engineering",
        description: "",
        image: "/images/projects/edufeedbackpro/EDUFEEDBACKPRO.svg",
        background: "prism",
      },
      {
        title: "Architecture",
        description: "",
        image: "/images/projects/edufeedbackpro/numerix-ai/NUMERIX_AI.svg",
        background: "lightRays",
      },
    ],
  },
  {
    workItem: getWorkItemById("edtech-tutoring")!,
    badge: "B2C SAAS PLATFORM",
    links: {
      designFile:
        "https://www.figma.com/proto/uCGr0CmmdDMJ0ngspgtqDa/Sarah-s-Maths-School?page-id=6%3A113&node-id=49-6208&viewport=616%2C735%2C0.22&t=D4BguGiRPhyckL0L-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=49%3A6208",
      liveWebsite: "https://www.msmaryamsmaths.com/",
    },
    features: [
      {
        title: "Design",
        description: "",
        image: "/images/projects/maths-tutoring/Tutoring_hero.webp",
        background: "floatingLines",
        href: "https://www.figma.com/proto/uCGr0CmmdDMJ0ngspgtqDa/Sarah-s-Maths-School?page-id=6%3A113&node-id=49-6208&viewport=616%2C735%2C0.22&t=D4BguGiRPhyckL0L-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=49%3A6208",
      },
      {
        title: "Engineering",
        description: "",
        image: "/images/projects/maths-tutoring/Tutoring-2.webp",
        background: "prism",
        href: "https://www.msmaryamsmaths.com/",
      },
      {
        title: "Architecture",
        description: "",
        image: "/images/illustrations/BLOG.svg",
        background: "lightPillar",
      },
    ],
  },
  {
    workItem: getWorkItemById("knn-classifier")!,
    badge: "EDUCATIONAL TOOL",
    links: { liveWebsite: "https://blissfulcoda.github.io/teachablemachine/" },
    features: [
      {
        title: "Design",
        description: "",
        image:
          "/images/projects/knn-classifier/google-teachable/GOOGLE_TEACHABLE.svg",
        background: "lightRays",
      },
      {
        title: "Engineering",
        description: "",
        image: "/images/projects/algo-pseudo/AI_PSEUDOCODE.svg",
        background: "prism",
        href: "https://blissfulcoda.github.io/teachablemachine/",
      },
      {
        title: "Architecture",
        description: "",
        image: "/images/illustrations/CODE.svg",
        background: "lightPillar",
      },
    ],
  },
  {
    workItem: getWorkItemById("algo-pseudo")!,
    badge: "DEVELOPER TOOL",
    links: { liveWebsite: "https://www.algo-pseudo.com/" },
    features: [
      {
        title: "Design",
        description: "",
        image: "/images/projects/algo-pseudo/PSEUDOLAB_HERO.svg",
        background: "prism",
      },
      {
        title: "Engineering",
        description: "",
        image: "/images/projects/algo-pseudo/AI_PSEUDOCODE.svg",
        background: "lightPillar",
        href: "https://www.algo-pseudo.com/",
      },
      {
        title: "Architecture",
        description: "",
        image: "/images/illustrations/CODE.svg",
        background: "floatingLines",
      },
    ],
  },
];

export const designItems: DesignItem[] = [
  {
    type: "Analytics UI",
    name: "EduFeedbackPro",
    gradient: "linear-gradient(160deg, #08081a 0%, #1a0d40 50%, #0d0820 100%)",
    accentColor: "#d4ff47",
    label: "EFP",
    sublabel: "ANALYTICS PLATFORM",
  },
  {
    type: "SaaS Platform",
    name: "Ms. Maryam's Maths",
    gradient: "linear-gradient(160deg, #060e20 0%, #0a1e44 50%, #060e28 100%)",
    accentColor: "#47a8ff",
    label: "∫",
    sublabel: "TUTORING PLATFORM",
    extras: "buttons",
  },
  {
    type: "Brand Identity",
    name: "True Founders",
    gradient: "linear-gradient(160deg, #100e00 0%, #2a2200 50%, #181400 100%)",
    accentColor: "#ffd147",
    label: "TF",
    sublabel: "COACHING BRAND",
    extras: "logo-circle",
  },
  {
    type: "Developer Tool",
    name: "PseudoLab IDE",
    gradient: "linear-gradient(160deg, #040e0e 0%, #0a2424 50%, #041414 100%)",
    accentColor: "#44ffcc",
    label: "PSEUDOLAB",
    sublabel: "",
    extras: "code",
  },
  {
    type: "AI Product UI",
    name: "Numerix AI",
    gradient: "linear-gradient(160deg, #180010 0%, #320020 50%, #200018 100%)",
    accentColor: "#ff4777",
    label: "Nx",
    sublabel: "AI PLATFORM",
    extras: "dots",
  },
  {
    type: "Profile UI",
    name: "GitHub Data Platform",
    gradient: "linear-gradient(160deg, #080818 0%, #120e30 50%, #0a0820 100%)",
    accentColor: "#a78bfa",
    label: "Gh",
    sublabel: "DATA PLATFORM",
    extras: "search",
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    initial: "S",
    company: "Product Engineer Consultant",
    role: "Product Engineer Consultant",
    desc: "Built multiple internal EdTech platforms used across the school's computer science programme including a real-time student analytics platform, an AI-powered browser-based pseudocode IDE with semantic analysis, and a KNN image classifier for on-device ML inference.",
    tags: ["Next.js", "TypeScript", "TensorFlow.js", "Docker", "Redis"],
    techStack: [
      "Figma",
      "Nextjs",
      "Python",
      "TypeScript",
      "Docker",
      "Redis",
      "Nginx",
      "TensorFlow",
    ],
    dates: "2023 — 2026",
  },
  {
    initial: "S",
    company: "School of Research Science",
    role: "Software Engineer",
    desc: "Built multiple internal EdTech platforms used across the school's computer science programme including a real-time student analytics platform, an AI-powered browser-based pseudocode IDE with semantic analysis, and a KNN image classifier for on-device ML inference.",
    tags: ["Next.js", "TypeScript", "TensorFlow.js", "Docker", "Redis"],
    techStack: [
      "Figma",
      "Nextjs",
      "Python",
      "TypeScript",
      "Docker",
      "Redis",
      "Nginx",
      "TensorFlow",
    ],
    dates: "2023 — 2026",
  },
  {
    initial: "F",
    company: "Freelance ",
    role: "Independent Software Engineer",
    desc: "Designed and built production-grade products for clients, including a 30+ component design system across 8 storefronts, a microservices e-commerce platform with 99.9% uptime, and a video pipeline that cut media costs by 40%.",
    tags: ["React", "Node.js", "AWS S3", "Stripe", "Figma"],
    techStack: ["Figma", "React", "Python", "TypeScript", "Nginx", "Nodejs"],
    dates: "2020 — 2023",
  },
  {
    initial: "A",
    company: "Adaptive",
    role: "Software Engineer Intern",
    desc: "Built project timeline visualisations for senior management across 3 product teams. Collaborated with data analysts and the UX team on internal dashboards for financial workflows.",
    tags: ["React", "TypeScript", "Data Viz"],
    techStack: ["React", "TypeScript", "Figma", "Slack", "Nodejs"],
    dates: "2019 - 2019",
  },
  {
    initial: "D",
    company: "DW Fitness First Baker Street",
    role: "Senior Strength & Conditioning Consultant",
    desc: "Led delivery of performance and conditioning programs across multi-club teams, including FGT and Team GB Pro Athlete initiatives. Designed individualised training and nutrition plans while managing onboarding and trainer allocation.",
    tags: [],
    dates: "2015 — 2019",
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: [
      "TypeScript / JavaScript",
      "React and Next.js",
      "Tailwind CSS",
      "React Query",
      "TensorFlow.js",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js and Express",
      "PostgreSQL / MongoDB",
      "RESTful APIs",
      "BigQuery",
      "Python",
    ],
  },
  {
    label: "Infrastructure",
    skills: [
      "Docker and Nginx",
      "GitHub Actions CI/CD",
      "AWS S3 and EC2",
      "DigitalOcean",
      "Sentry",
    ],
  },
  {
    label: "Design",
    skills: [
      "Figma (Advanced)",
      "Design Systems",
      "Prototyping",
      "WCAG Accessibility",
      "Motion Design",
    ],
  },
];
