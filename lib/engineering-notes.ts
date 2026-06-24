import { slugify } from "@/lib/slugify";

export type EngineeringArticleSection = {
  heading?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export type EngineeringArticle = {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  readTime: string;
  image: string;
  date: string;
  authorName: string;
  authorImage: string;
  sections: readonly EngineeringArticleSection[];
};

export const BYOK_ARTICLE_SLUG = "byok-shipping-ai-with-user-keys";

export function usesCompactBlogHero(article: {
  slug: string;
}): boolean {
  return article.slug === BYOK_ARTICLE_SLUG;
}

export const ENGINEERING_ARTICLES: readonly EngineeringArticle[] = [
  {
    slug: BYOK_ARTICLE_SLUG,
    categorySlug: "engineering",
    title: "BYOK: shipping AI features when you can't pay for inference",
    description:
      "Routing LLM requests through user-supplied keys for 600+ users: the key-handling boundary, rate-limit design, and the failure modes nobody warns you about.",
    readTime: "12 min read",
    image: "/images/blog/architecture/teachable-machine-ai.webp",
    date: "2026-02-14",
    authorName: "Ronnie Kiyegga",
    authorImage: "/images/profile/Avatar.svg",
    sections: [
      {
        heading: "Why BYOK was the only viable model",
        paragraphs: [
          "At 600+ active users, centrally funded inference would have consumed the product budget within weeks. The product still needed AI-assisted feedback, but paying for every token on behalf of users was not sustainable.",
          "Bring Your Own Key (BYOK) moved cost to the institution while keeping the feature available. The trade-off was operational: we had to design a boundary where user keys never leaked into logs, support tooling, or cross-tenant caches.",
        ],
      },
      {
        heading: "The key-handling boundary",
        paragraphs: [
          "Keys are encrypted at rest, scoped per organisation, and injected only at the provider router layer. Application logs record request metadata (latency, model, token counts) but never key material or raw prompts containing credentials.",
        ],
        bullets: [
          "Dedicated provider classes for OpenAI and Google Gemini with shared retry and timeout policy",
          "Per-org rate limits independent of provider quotas",
          "Automatic key validation on save with a clear error surface for educators",
          "Fallback routing when a provider returns 401/429 without exposing key state to the client",
        ],
      },
      {
        heading: "Failure modes worth planning for",
        paragraphs: [
          "BYOK shifts support burden: users blame the product when their key expires, even if the app behaved correctly. We added health indicators on the settings screen and structured error copy that distinguishes auth failures from model errors.",
          "The pattern works when your users are technical enough to manage keys and your margins cannot absorb inference. It breaks when you need uniform UX guarantees across tenants without configuration.",
        ],
      },
    ],
  },
  {
    slug: "sse-vs-websockets-school-firewalls",
    categorySlug: "engineering",
    title: "SSE vs WebSockets: the boring choice that survived school firewalls",
    description:
      "Why one-directional push over plain HTTP beat the obvious answer for real-time dashboards, and where it breaks at 100x scale.",
    readTime: "9 min read",
    image: "/images/projects/edufeedbackpro/edufeedbackpro_hero.webp",
    date: "2026-01-08",
    authorName: "Ronnie Kiyegga",
    authorImage: "/images/profile/Avatar.svg",
    sections: [
      {
        heading: "The constraint was the network, not the dashboard",
        paragraphs: [
          "School networks routinely block long-lived WebSocket upgrades or throttle them unpredictably. Our dashboards only needed server-to-client updates: new submissions, aggregate score shifts, and report-ready signals.",
          "Server-Sent Events over HTTP matched the data flow, reused existing load balancers, and worked through proxies that treated WebSockets as suspicious.",
        ],
      },
      {
        heading: "What SSE gave us in production",
        bullets: [
          "Automatic reconnect semantics with Last-Event-ID for missed events during brief drops",
          "Standard HTTP observability: request logs, CDN rules, and Nginx timeouts we already understood",
          "Lower operational surface than maintaining sticky sessions for WebSocket fan-out on a single VPS",
        ],
      },
      {
        heading: "Where I would reach for WebSockets instead",
        paragraphs: [
          "Bidirectional collaboration, typing indicators, or sub-100ms game-style interactions need full duplex. At 100x scale, SSE connection counts become their own problem; you will want a dedicated event bus and horizontal fan-out.",
          "For analytics dashboards on constrained school networks, SSE was the boring choice that kept shipping.",
        ],
      },
    ],
  },
  {
    slug: "canary-deployments-nginx-single-vps",
    categorySlug: "engineering",
    title: "Canary deployments on a single VPS with Nginx",
    description:
      "Halving release cycles without Kubernetes: weighted upstreams, health checks, and the rollback path that made Friday ships boring.",
    readTime: "7 min read",
    image: "/images/carousel/John_Canary_down.webp",
    date: "2025-11-22",
    authorName: "Ronnie Kiyegga",
    authorImage: "/images/profile/Avatar.svg",
    sections: [
      {
        heading: "Kubernetes was not the bottleneck",
        paragraphs: [
          "We needed safer releases, not a new cluster. A single VPS running Docker Compose plus Nginx was enough if traffic splitting and rollback were explicit in the proxy layer.",
        ],
      },
      {
        heading: "Weighted upstreams in Nginx",
        paragraphs: [
          "Nginx sits in front of two upstream groups: stable (90%) and canary (10%). New containers register on the canary port only after health checks pass. If error rates spike, we flip weights back to 100/0 without redeploying stable.",
        ],
        bullets: [
          "GitHub Actions builds and pushes images, then SSH deploys with a compose override for the canary service",
          "Health endpoint must validate database connectivity, not just return 200",
          "Release notes tied to image digest so rollback is a known-good tag, not \"previous folder on disk\"",
        ],
      },
      {
        heading: "What changed in the team rhythm",
        paragraphs: [
          "Release cycles dropped from ten days to five because deploy anxiety decreased. Friday ships became routine once rollback was a one-line Nginx config change rather than a manual restore.",
        ],
      },
    ],
  },
  {
    slug: "postgresql-vs-bigquery-analytics-split",
    categorySlug: "engineering",
    title: "PostgreSQL vs BigQuery: keeping analytics off the hot path",
    description:
      "Splitting OLTP and OLAP at the storage boundary so reporting workloads never starve writes during peak school hours.",
    readTime: "8 min read",
    image: "/images/projects/edufeedbackpro/DMI.png",
    date: "2025-10-03",
    authorName: "Ronnie Kiyegga",
    authorImage: "/images/profile/Avatar.svg",
    sections: [
      {
        heading: "One database was doing two jobs",
        paragraphs: [
          "PostgreSQL handled transactional writes during peak marking windows while educators ran heavy reporting queries against the same instance. Write latency spiked when analytics joined more than a few tables.",
          "The fix was not a bigger Postgres box. It was accepting that OLTP and OLAP have different access patterns and should not share the hot path.",
        ],
      },
      {
        heading: "Operational vs analytical storage",
        bullets: [
          "PostgreSQL remains the system of record for submissions, rubrics, and user state",
          "BigQuery holds denormalised reporting tables optimised for aggregation and export",
          "Async sync jobs batch changes on a schedule; dashboards read from BigQuery, not live joins on OLTP",
        ],
      },
      {
        heading: "Trade-offs we accepted",
        paragraphs: [
          "Reports are eventually consistent, usually within minutes, not milliseconds. That is acceptable for educator analytics but would fail for billing or inventory.",
          "The split reduced peak-hour write contention and made report generation predictable. It added pipeline maintenance, which is cheaper than starving production writes during school hours.",
        ],
      },
    ],
  },
] as const;

const ARTICLE_BY_SLUG = new Map(
  ENGINEERING_ARTICLES.map((article) => [article.slug, article]),
);

export function getEngineeringArticleBySlug(
  slug: string,
): EngineeringArticle | undefined {
  return ARTICLE_BY_SLUG.get(slug);
}

export function getAllEngineeringArticleSlugs(): string[] {
  return ENGINEERING_ARTICLES.map((article) => article.slug);
}

export function engineeringArticleHref(slug: string): string {
  return `/blog/${slug}`;
}

/** Stable slug helper if we ever derive from title alone. */
export function engineeringSlugFromTitle(title: string): string {
  return slugify(title);
}
