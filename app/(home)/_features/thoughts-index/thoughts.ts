export const thoughtCategories = [
  { slug: "all", title: "All" },
  { slug: "design", title: "Design" },
  { slug: "system-design", title: "System Design" },
  { slug: "product", title: "Product" },
] as const;

export type ThoughtCategorySlug = (typeof thoughtCategories)[number]["slug"];

type ThoughtTags = [string, string, string, ...string[]];

type ThoughtRecord = {
  slug: string;
  category: Exclude<ThoughtCategorySlug, "all">;
  overlayTitle: string;
  title?: string;
  description: string;
  dateTime: string;
  tags: ThoughtTags;
  hasContextNote?: boolean;
};

export type ThoughtPost = Omit<ThoughtRecord, "title"> & {
  title: string;
  href: string;
  isFeatured?: boolean;
};

const categoryTitles = new Map<ThoughtCategorySlug, string>(
  thoughtCategories.map((category) => [category.slug, category.title]),
);

export function thoughtCategoryTitle(category: ThoughtCategorySlug) {
  return categoryTitles.get(category) ?? category;
}

export function thoughtPath(slug: string) {
  return `/thoughts/${slug}`;
}

export const renderingHero = "/images/editorial/react-rendering-hero.png";

const thoughtRecords: ThoughtRecord[] = [
  {
    slug: "where-request-time-goes",
    category: "system-design",
    overlayTitle: "When CPU looks fine but requests still stall",
    title: "Tail latency and the waits a CPU profile misses",
    description: "Where time goes when utilisation looks fine",
    dateTime: "2026-09-24",
    tags: ["tail latency", "tracing", "queueing"],
    hasContextNote: true,
  },
  {
    slug: "visual-hierarchy",
    category: "design",
    overlayTitle: "Why making it bigger does not create visual hierarchy",
    description: "When everything asks for attention, nothing gets it.",
    dateTime: "2026-09-22",
    tags: ["hierarchy", "typography", "layout"],
  },
  {
    slug: "idempotency-matters",
    category: "system-design",
    overlayTitle: "Why disabling the button did not stop the duplicate request",
    description: "Retries, redelivery and the server's invariant.",
    dateTime: "2026-09-15",
    tags: ["concurrency", "idempotency", "databases"],
    hasContextNote: true,
  },
  {
    slug: "spacing-information-architecture",
    category: "design",
    overlayTitle:
      "Why adding more whitespace does not fix an unclear interface",
    description: "Proximity explains structure before a border does.",
    dateTime: "2026-09-08",
    tags: ["spacing", "grouping", "layout"],
  },
  {
    slug: "hicks-law",
    category: "design",
    overlayTitle: "Why more options can make a simple task feel harder",
    description: "Defaults and disclosure make choices easier",
    dateTime: "2026-09-02",
    tags: ["usability", "defaults", "decision-making"],
  },
  {
    slug: "what-10000-rows-actually-means",
    category: "system-design",
    overlayTitle: "What 10,000 rows actually means for a React interface",
    description: "Rendering 10,000 rows is a different problem.",
    dateTime: "2026-08-27",
    tags: ["react", "virtualisation", "pagination"],
    hasContextNote: true,
  },
  {
    slug: "burst-traffic",
    category: "system-design",
    overlayTitle:
      "Why adding servers does not automatically survive a traffic spike",
    description: "Find the constrained resource before scaling out.",
    dateTime: "2026-08-19",
    tags: ["queues", "backpressure", "retries"],
    hasContextNote: true,
  },
  {
    slug: "empty-state-first",
    category: "product",
    overlayTitle: "Why the empty state should come before the happy path",
    description: "Design the first visit before the full dashboard.",
    dateTime: "2026-08-14",
    tags: ["empty states", "error handling", "ux writing"],
  },
  {
    slug: "10000-concurrent-database-connections",
    category: "system-design",
    overlayTitle: "Why 10,000 database connections is not a database setting",
    description: "Pools, hold time and where excess work waits.",
    dateTime: "2026-07-30",
    tags: ["connection pooling", "postgres", "dynamodb"],
    hasContextNote: true,
  },
  {
    slug: "memory-inclusion",
    category: "product",
    overlayTitle: "When product memory becomes surveillance",
    title: "Keeping context without making the product feel haunted",
    description: "What to remember, and when to forget",
    dateTime: "2026-07-28",
    tags: ["personalisation", "context", "privacy"],
  },
  {
    slug: "responsive-not-shrinking",
    category: "design",
    overlayTitle:
      "Why shrinking the desktop does not make a design responsive",
    description: "Smaller screens force you to decide what matters.",
    dateTime: "2026-07-16",
    tags: ["responsive", "breakpoints", "layout"],
  },
  {
    slug: "rate-limiting-strategy",
    category: "system-design",
    overlayTitle:
      "Why “100 requests per minute” is not a rate-limiting strategy",
    description: "Rate limits start with resource, identity and cost.",
    dateTime: "2026-06-25",
    tags: ["rate limiting", "fairness", "admission control"],
    hasContextNote: true,
  },
  {
    slug: "design-systems-remove-decisions",
    category: "design",
    overlayTitle: "Why a component library can make product delivery slower",
    description: "Reuse helps only when the decision is the same.",
    dateTime: "2026-06-09",
    tags: ["design systems", "components", "consistency"],
  },
  {
    slug: "logging-under-load",
    category: "system-design",
    overlayTitle: "Why buffering every log can make an incident worse",
    description: "Keep the evidence without starving the service.",
    dateTime: "2026-04-30",
    tags: ["logging", "observability", "backpressure"],
    hasContextNote: true,
  },
];

export const retiredThoughtSlugs: Readonly<Record<string, string>> = {
  "debug-peak-traffic": "where-request-time-goes",
  "responsive-ten-thousand-records": "where-request-time-goes",
  "rate-limiter-1m-rps": "rate-limiting-strategy",
  "streaming-windows": "rate-limiting-strategy",
  "aggregate-logs-10000-servers": "logging-under-load",
};

const recordsBySlug = new Map(
  thoughtRecords.map((record) => [record.slug, record]),
);

function getThoughtRecord(slug: string): ThoughtRecord {
  const record = recordsBySlug.get(slug);
  if (!record) {
    throw new Error(`Unknown thought slug: "${slug}"`);
  }
  return record;
}

export function getThoughtPost(slug: string): ThoughtPost {
  const { title, ...record } = getThoughtRecord(slug);
  return {
    ...record,
    title: title ?? record.overlayTitle,
    href: thoughtPath(slug),
  };
}

export const featuredThoughts: ThoughtPost[] = [
  {
    ...getThoughtPost("where-request-time-goes"),
    isFeatured: true,
  },
  {
    ...getThoughtPost("rate-limiting-strategy"),
    isFeatured: true,
    title: "Token buckets, fairness and the cost of saying no",
  },
];

export const gridThoughts: ThoughtPost[] = [
  getThoughtPost("hicks-law"),
  {
    ...getThoughtPost("burst-traffic"),
    description: "What breaks first when traffic is not a smooth line",
  },
  getThoughtPost("memory-inclusion"),
];

export const listedThoughts: ThoughtPost[] = [
  "visual-hierarchy",
  "idempotency-matters",
  "spacing-information-architecture",
  "what-10000-rows-actually-means",
  "burst-traffic",
  "empty-state-first",
  "10000-concurrent-database-connections",
  "responsive-not-shrinking",
  "rate-limiting-strategy",
  "design-systems-remove-decisions",
  "logging-under-load",
].map(getThoughtPost);

const placedSlugs = new Set(
  [...featuredThoughts, ...gridThoughts].map((thought) => thought.slug),
);

export const allThoughts: ThoughtPost[] = [
  ...featuredThoughts,
  ...gridThoughts,
  ...listedThoughts.filter((thought) => !placedSlugs.has(thought.slug)),
];
