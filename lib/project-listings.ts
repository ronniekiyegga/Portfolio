/** Toggle the legacy 3-tile mockup grid. Hero image in the listing row stays visible. */
export const SHOW_PROJECT_IMAGE_GRID = false;

export type ProjectArchitecturalDecision = {
  title: string;
  description: string;
  /** Terms to bold in the description for skimmable technical anchors. */
  emphasisTerms?: readonly string[];
};

export type ProjectMetricPill = {
  /** Gray text before the blue value */
  prefix?: string;
  /** Blue highlight text */
  value: string;
  /** Gray text after the blue value */
  suffix?: string;
};

export type ProjectCardListing = {
  workItemId: string;
  badge: string;
  /** Optional display title override for the listing header */
  listingTitle?: string;
  /** Pitch shown on the project row (CV-aligned). Falls back to workItem.desc when omitted. */
  listingDesc?: string;
  metricPills?: ProjectMetricPill[];
  /** Tags in the listing row; falls back to workItem.tags when omitted. */
  listingTags?: string[];
  architecturalDecisions: ProjectArchitecturalDecision[];
  /** Panel heading above decision cards; defaults to Architectural Decisions */
  decisionsSectionTitle?: string;
  ctaVariant?: "code-only";
  bigImage: string;
  topImage: string;
  bottomImage: string;
  topLabel: string;
  topSublabel: string;
  bottomTitle: string;
  bottomSubtitle: string;
  heroLabels: { title: string; subtitle: string }[];
  stackedColumnImagePaddingClassName?: string;
};

export const PROJECT_CARD_LISTINGS: ProjectCardListing[] = [
  {
    workItemId: "edu-analytics-dashboard",
    badge: "ANALYTICS PLATFORM",
    listingTitle: "EduFeedbackPro",
    listingDesc:
      "Operational analytics platform for a 1,000+ student institution. Teachers needed answers in the five minutes between lessons, not after a weekly reporting meeting, so the architecture prioritised fast operational workflows over perfectly fresh reporting.",
    metricPills: [
      { prefix: "reports", value: "3min to <10sec" },
      { prefix: "release", value: "10 to 5 days" },
      { value: "1,000+", suffix: "students" },
    ],
    listingTags: [
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "BigQuery",
      "SSE",
      "Playwright",
      "Docker",
      "Redis",
    ],
    decisionsSectionTitle: "Architectural Decisions",
    architecturalDecisions: [
      {
        title: "Postgres for ops state, BigQuery for reporting",
        description:
          "Dashboard aggregations were degrading write latency during peak marking windows. Splitting the workloads bought predictable writes; reports became eventually consistent, usually within minutes, which teachers never noticed.",
      },
      {
        title: "SSE over WebSockets",
        description:
          "Updates only flowed server to browser. SSE rides plain HTTP, survives school proxies, and reconnects natively; WebSockets would have added a second operational surface for bidirectional capability nothing used.",
      },
      {
        title: "Capabilities over role hierarchy",
        description:
          "Staff responsibilities changed faster than job titles. Modelling permissions as capabilities made access changes data updates rather than code changes.",
      },
      {
        title: "Inference moved on-device",
        description:
          "Server round-trips on 600+ low-spec iPads cost 2s per prediction. Moving model execution to TensorFlow.js in the browser cut it to 600ms and removed the network from the prediction path entirely.",
      },
    ],
    bigImage: "/images/projects/edufeedbackpro/Edufeedbackpro-1.webp",
    topImage: "/images/projects/edufeedbackpro/Edufeedbackpro-2.webp",
    bottomImage: "/images/projects/edufeedbackpro/Edufeedbackpro-3.webp",
    topLabel: "AI Study Assistant",
    topSublabel:
      "Voice-powered interaction for guided learning and feedback",
    bottomTitle: "Student Workspace",
    bottomSubtitle: "Manage student data, uploads, and learning records",
    heroLabels: [
      {
        title: "Student Analytics Dashboard",
        subtitle:
          "Performance, risk signals, and cohort-level insights",
      },
    ],
    stackedColumnImagePaddingClassName: "px-3 pt-3",
  },
  {
    workItemId: "subscription-api",
    badge: "API INFRASTRUCTURE",
    listingDesc:
      "Subscription management API shaped around one rule: auth and validation run before any handler touches business logic. Transport, service layer, and persistence stay decoupled so billing routes stay stable as scopes grow.",
    metricPills: [
      { value: "RBAC scopes" },
      { value: "Edge rate limits" },
      { value: "Zod at the boundary" },
    ],
    architecturalDecisions: [
      {
        title: "Auth Boundary Before Handlers",
        description:
          "JWT verification and request-level access control run in middleware so route handlers never assume trust. Failure modes stay consistent under load because unauthorized requests never reach service code.",
      },
      {
        title: "Service Layer Over Fat Routes",
        description:
          "Subscription creation and billing writes sit behind a small, stable business layer. Routes stay thin; data access and domain rules live in one place when product requirements shift.",
      },
      {
        title: "Schema Validation at the Edge",
        description:
          "Zod validates inputs before Prisma touches Postgres. Invalid payloads fail fast with predictable errors instead of leaking database exceptions to clients.",
      },
    ],
    bigImage: "/images/projects/subscription-api/auth-middleware-1.webp",
    topImage: "/images/projects/subscription-api/router-boundary-2.webp",
    bottomImage: "/images/projects/subscription-api/structure-3.webp",
    topLabel: "API surface",
    topSublabel:
      "Protected billing routes split between read paths and write actions",
    bottomTitle: "Service layer",
    bottomSubtitle:
      "Subscription creation kept behind a small, stable business layer",
    heroLabels: [
      {
        title: "Auth boundary",
        subtitle:
          "JWT verification and request-level access control before handlers run",
      },
    ],
    stackedColumnImagePaddingClassName: "px-3 pt-3",
    ctaVariant: "code-only",
  },
  {
    workItemId: "edtech-tutoring",
    badge: "EDTECH PLATFORM",
    listingDesc:
      "Solo-built B2C maths platform for GCSE and A-Level students. Owned end to end: Figma-validated workflows, marketing site, authenticated dashboard, six-course catalogue, and automated deployment on a self-hosted VPS.",
    metricPills: [
      { prefix: "deploy", value: "20+min to <3min" },
      { value: "6", suffix: "course types" },
      { prefix: "CI/CD", value: "on every push" },
    ],
    decisionsSectionTitle: "Architectural Decisions",
    architecturalDecisions: [
      {
        title: "Figma validation before code",
        description:
          "Marketing sections and the course structure were validated in Figma before implementation, so build effort went into flows that had already survived design scrutiny rather than speculative UI.",
      },
      {
        title: "Automated deploys over manual SSH",
        description:
          "GitHub Actions builds, transfers, and reloads PM2 behind Nginx on every push. Releases went from 20+ minutes of manual steps to under 3, repeatable by anyone.",
      },
      {
        title: "Separate public from authenticated systems",
        description:
          "The marketing site and the learning platform deploy independently, so content changes never risk the authenticated application and each side evolves on its own release cadence.",
      },
      {
        title: "One VPS, no Kubernetes",
        description:
          "Single-tenant product, single node. Docker and Nginx gave zero-downtime container swaps without a cluster to operate, and the scaling triggers that would change this are documented, not guessed at.",
      },
    ],
    bigImage: "/images/projects/maths-tutoring/Tutoring_hero.webp",
    topImage: "/images/projects/maths-tutoring/Tutoring-2.webp",
    bottomImage: "/images/projects/maths-tutoring/Tutoring-3.webp",
    topLabel: "Student Acquisition Funnel",
    topSublabel: "Conversion-focused landing pages for student acquisition",
    bottomTitle: "Lesson & Dashboard Experience",
    bottomSubtitle:
      "Core interface for lessons, dashboards, and student interaction",
    heroLabels: [
      {
        title: "Student Learning Dashboard",
        subtitle:
          "Track progress, performance, and engagement across subjects",
      },
      {
        title: "Course Experience",
        subtitle: "Structured lessons, navigation, and learning flow design",
      },
    ],
  },
];
