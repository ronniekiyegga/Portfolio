export const thoughtCategories = [
  { slug: "all", title: "All" },
  { slug: "design", title: "Design" },
  { slug: "system-design", title: "System Design" },
  { slug: "product", title: "Product" },
] as const;

export type ThoughtCategorySlug = (typeof thoughtCategories)[number]["slug"];

export type ThoughtPost = {
  slug: string;
  category: Exclude<ThoughtCategorySlug, "all">;
  overlayTitle: string;
  overlayLines?: [string, string, string];
  date: string;
  dateTime: string;
  title: string;
  description: string;
  tags: [string, string, string, ...string[]];
  href: string;
};

export type FeaturedThought = ThoughtPost & {
  overlayLines: [string, string, string];
  image: string;
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

export const featuredInvestigationSlug = "what-10000-rows-actually-means";
export const blueCover = "/images/editorial/darkblue-card.jpg";
export const tealCover = "/images/editorial/darkblue-green-card.jpg";

export const featuredThoughts: FeaturedThought[] = [
  {
    slug: "responsive-ten-thousand-records",
    category: "system-design",
    overlayTitle:
      "How do you debug a stall that only appears when traffic hits its peak?",
    overlayLines: [
      "How do you debug a stall",
      "that only appears when",
      "traffic hits its peak?",
    ],
    date: "24 Sept 2026",
    dateTime: "2026-09-24",
    title: "Tail latency, missing traces and the lies averages tell",
    description:
      "Recent investigations into performance, real-time systems, product decisions and",
    tags: ["tail latency", "tracing", "observability"],
    href: thoughtPath("responsive-ten-thousand-records"),
    image: blueCover,
  },
  {
    slug: "streaming-windows",
    category: "system-design",
    overlayTitle:
      "How do you rate-limit a service without starving the requests that matter?",
    overlayLines: [
      "How do you rate-limit a",
      "service without starving",
      "the requests that matter?",
    ],
    date: "11 Sept 2026",
    dateTime: "2026-09-11",
    title: "Token buckets, fairness and the cost of saying no",
    description:
      "What holds when you have to refuse work without taking the system down",
    tags: ["rate limiting", "fairness", "load shedding"],
    href: thoughtPath("streaming-windows"),
    image: blueCover,
  },
];

export const gridThoughts: ThoughtPost[] = [
  {
    slug: "hicks-law",
    category: "design",
    overlayTitle: "The Cost of Choice",
    date: "2 Sept 2026",
    dateTime: "2026-09-02",
    title: "Why more choices made the dashboard slower to use",
    description:
      "Reducing options, default paths and the cost of deciding under time pressure",
    tags: ["usability", "defaults", "decision-making"],
    href: thoughtPath("hicks-law"),
  },
  {
    slug: "burst-traffic",
    category: "system-design",
    overlayTitle: "Queueing Under Load",
    date: "19 Aug 2026",
    dateTime: "2026-08-19",
    title: "Queueing, shedding load and keeping writes honest",
    description: "What breaks first when traffic is not a smooth line",
    tags: ["queues", "backpressure", "retries"],
    href: thoughtPath("burst-traffic"),
  },
  {
    slug: "memory-inclusion",
    category: "product",
    overlayTitle: "Remembering Just Enough",
    date: "28 Jul 2026",
    dateTime: "2026-07-28",
    title: "Keeping context without making the product feel haunted",
    description:
      "How much a product should remember, and when remembering is worse",
    tags: ["personalisation", "context", "privacy"],
    href: thoughtPath("memory-inclusion"),
  },
];

export const listedThoughts: ThoughtPost[] = [
  {
    slug: "visual-hierarchy",
    category: "design",
    overlayTitle: "Visual hierarchy is deciding what gets noticed first",
    date: "Sept 22 2026",
    dateTime: "2026-09-22",
    title: "Visual hierarchy is deciding what gets noticed first",
    description: "If everything asks for attention, nothing gets priority.",
    tags: ["hierarchy", "typography", "layout"],
    href: thoughtPath("visual-hierarchy"),
  },
  {
    slug: "idempotency-matters",
    category: "system-design",
    overlayTitle: "The bug that got me why idempotency matters",
    date: "Sept 15 2026",
    dateTime: "2026-09-15",
    title: "The bug that got me why idempotency matters",
    description: "Postgres or DynamoDB?",
    tags: ["concurrency", "idempotency", "databases"],
    href: thoughtPath("idempotency-matters"),
  },
  {
    slug: "spacing-information-architecture",
    category: "design",
    overlayTitle: "Spacing is part of the information architecture",
    date: "Sept 8 2026",
    dateTime: "2026-09-08",
    title: "Spacing is part of the information architecture",
    description: "Proximity can explain structure before a border ever does.",
    tags: ["spacing", "grouping", "layout"],
    href: thoughtPath("spacing-information-architecture"),
  },
  {
    slug: "what-10000-rows-actually-means",
    category: "system-design",
    overlayTitle: "What 10,000 rows actually means for a React interface",
    date: "Aug 27 2026",
    dateTime: "2026-08-27",
    title: "What 10,000 rows actually means for a React interface",
    description:
      "Rendering 10,000 rows is a different problem from returning 10,000 records.",
    tags: ["react", "virtualisation", "pagination"],
    href: thoughtPath("what-10000-rows-actually-means"),
  },
  {
    slug: "burst-traffic",
    category: "system-design",
    overlayTitle: "Handling Burst Traffic",
    date: "Aug 19 2026",
    dateTime: "2026-08-19",
    title: "Handling Burst Traffic",
    description: "Postgres or DynamoDB?",
    tags: ["queues", "backpressure", "retries"],
    href: thoughtPath("burst-traffic"),
  },
  {
    slug: "empty-state-first",
    category: "product",
    overlayTitle: "Designing the empty state before the happy state",
    date: "Aug 14 2026",
    dateTime: "2026-08-14",
    title: "Designing the empty state before the happy state",
    description: "A dashboard isn't finished when the mock data looks good.",
    tags: ["empty states", "error handling", "ux writing"],
    href: thoughtPath("empty-state-first"),
  },
  {
    slug: "10000-concurrent-database-connections",
    category: "system-design",
    overlayTitle: "How to handle 10,000 concurrent database connections",
    date: "Jul 30 2026",
    dateTime: "2026-07-30",
    title: "How to handle 10,000 concurrent database connections",
    description: "Postgres or DynamoDB?",
    tags: ["connection pooling", "postgres", "dynamodb"],
    href: thoughtPath("10000-concurrent-database-connections"),
  },
  {
    slug: "responsive-not-shrinking",
    category: "design",
    overlayTitle: "Responsive design isn't shrinking the desktop",
    date: "Jul 16 2026",
    dateTime: "2026-07-16",
    title: "Responsive design isn't shrinking the desktop",
    description: "Smaller screens force you to decide what actually matters.",
    tags: ["responsive", "breakpoints", "layout"],
    href: thoughtPath("responsive-not-shrinking"),
  },
  {
    slug: "rate-limiter-1m-rps",
    category: "system-design",
    overlayTitle: "Building a rate-limiter for 1M requests/second",
    date: "Jun 25 2026",
    dateTime: "2026-06-25",
    title: "Building a rate-limiter for 1M requests/second",
    description: "Postgres or DynamoDB?",
    tags: ["rate limiting", "scalability", "caching"],
    href: thoughtPath("rate-limiter-1m-rps"),
  },
  {
    slug: "design-systems-remove-decisions",
    category: "design",
    overlayTitle: "Design systems should remove decisions, not create paperwork",
    date: "Jun 9 2026",
    dateTime: "2026-06-09",
    title: "Design systems should remove decisions, not create paperwork",
    description:
      "Reuse is useful when the underlying decision is actually the same.",
    tags: ["design systems", "components", "consistency"],
    href: thoughtPath("design-systems-remove-decisions"),
  },
  {
    slug: "debug-peak-traffic",
    category: "system-design",
    overlayTitle: "How do you debug a bug that appears at peak traffic",
    date: "May 21 2026",
    dateTime: "2026-05-21",
    title: "How do you debug a bug that appears at peak traffic",
    description: "Postgres or DynamoDB?",
    tags: ["debugging", "profiling", "incidents"],
    href: thoughtPath("debug-peak-traffic"),
  },
  {
    slug: "aggregate-logs-10000-servers",
    category: "system-design",
    overlayTitle: "How to aggregate logs from 10,000 servers without data loss",
    date: "Apr 30 2026",
    dateTime: "2026-04-30",
    title: "How to aggregate logs from 10,000 servers without data loss",
    description: "Postgres or DynamoDB?",
    tags: ["logging", "observability", "backpressure"],
    href: thoughtPath("aggregate-logs-10000-servers"),
  },
];

export const allThoughts: ThoughtPost[] = [
  ...featuredThoughts,
  ...gridThoughts,
  ...listedThoughts.filter(
    (post) =>
      !featuredThoughts.some((thought) => thought.slug === post.slug) &&
      !gridThoughts.some((thought) => thought.slug === post.slug),
  ),
];
