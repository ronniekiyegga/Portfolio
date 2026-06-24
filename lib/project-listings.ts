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
    listingTitle: "Edufeedbackpro",
    listingDesc:
      "Operational analytics for a 1,000+ student institution, built around one constraint: educators check data between lessons, not in meetings. Every decision below falls out of that.",
    metricPills: [
      { prefix: "reports", value: "3min to <10sec" },
      { prefix: "release", value: "10 to 5 days" },
      { value: "1,000", suffix: "students" },
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
    architecturalDecisions: [
      {
        title: "Operational vs Analytical Data",
        description:
          "PostgreSQL handles operational state; BigQuery serves reporting workloads, preventing analytics queries from impacting transactional performance.",
        emphasisTerms: ["PostgreSQL", "BigQuery"],
      },
      {
        title: "Server-Sent Events over WebSockets",
        description:
          "Reporting updates are one-directional. SSE reduced infrastructure complexity while remaining compatible with restrictive school networks.",
        emphasisTerms: ["SSE", "school networks"],
      },
      {
        title: "Capability-Based Access",
        description:
          "Membership capabilities replace fixed role hierarchies, avoiding role explosion across multi-tenant organisations.",
        emphasisTerms: ["Membership capabilities", "multi-tenant"],
      },
      {
        title: "Eventual Consistency for Reporting",
        description:
          "Eventual consistency was traded for predictable write performance and responsive operational workflows during peak usage.",
        emphasisTerms: ["Eventual consistency", "predictable write performance"],
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
      "B2C maths platform for GCSE and A-Level students, designed in Figma first, then shipped as a marketing site, authenticated dashboard, and six-course catalogue on a self-hosted VPS with a zero-touch deploy pipeline.",
    metricPills: [
      { prefix: "deploy", value: "20+min to <3min" },
      { value: "6", suffix: "course types" },
      { value: "7", suffix: "marketing sections" },
    ],
    architecturalDecisions: [
      {
        title: "Figma-First, Then Code",
        description:
          "Flows and components were locked in Figma before code, so build decisions tracked tutor workflows instead of mid-sprint rework.",
      },
      {
        title: "Clerk + Postgres Sync Pattern",
        description:
          "Clerk handles auth; a checkUser sync keeps identities and enrolment aligned on sign-in. Marketing stays public; dashboards stay gated.",
      },
      {
        title: "Sidecar for Out-of-Band Logic",
        description:
          "Express on port 3001 runs out-of-band server work, keeping App Router handlers focused on request-scoped logic.",
      },
      {
        title: "GitHub Actions to VPS Deploy",
        description:
          "Every push to main builds, verifies, and SCPs to DigitalOcean, replacing 20+ minute manual SSH deploys with a sub-three-minute pipeline.",
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
  {
    workItemId: "true-founders",
    badge: "BRAND IDENTITY",
    listingDesc:
      "Brand and landing concept for a women's life coaching practice in Dubai. Twelve-competitor analysis and three personas turned into clearer positioning, trust signals, and a direct path from discovery to enquiry.",
    metricPills: [
      { value: "12", suffix: "competitors" },
      { value: "3", suffix: "personas" },
      { value: "UX audit" },
    ],
    architecturalDecisions: [
      {
        title: "Competitive Analysis as Structure",
        description:
          "Twelve competitor audits informed page hierarchy and messaging gaps. Layout decisions came from what the market already proved, not from generic landing-page templates.",
      },
      {
        title: "Persona-Led Page Flow",
        description:
          "Three audience segments mapped to distinct trust signals and enquiry paths. Each section answers a specific objection surfaced in research rather than filling a standard template.",
      },
      {
        title: "Enquiry-First Conversion",
        description:
          "The page optimises for a high-trust, private audience: clarity of offer, social proof placement, and a single primary action from first visit through to enquiry.",
      },
    ],
    bigImage: "/images/projects/truefounders/TrueFounders_hero.webp",
    topImage: "/images/projects/truefounders/truefounders-2.webp",
    bottomImage: "/images/projects/truefounders/truefounders-3.webp",
    topLabel: "Value Proposition Design",
    topSublabel: "Clarifying the offer for a high-trust, private audience",
    bottomTitle: "Enquiry Journey",
    bottomSubtitle: "End-to-end user journey from first visit to enquiry",
    heroLabels: [
      {
        title: "Conversion-Focused Landing Page",
        subtitle: "Designed to drive bookings and communicate trust clearly",
      },
      {
        title: "Brand Identity System",
        subtitle: "Visual direction, tone, and consistency across touchpoints",
      },
    ],
  },
];
