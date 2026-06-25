import { slugify } from "@/lib/slugify";

export type EngineeringArticleTable = {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

export type EngineeringArticleSection = {
  heading?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  table?: EngineeringArticleTable;
  image?: string;
  imageAlt?: string;
  /** Insert image after this paragraph index (0-based). Defaults to 0. */
  imageAfterParagraph?: number;
  /** Visually distinct aside for short production notes */
  variant?: "default" | "callout";
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

export function isDiagramBlogImage(image: string): boolean {
  return image.endsWith(".svg");
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
      "Why one-directional push over plain HTTP beat the obvious answer for real-time dashboards, and why the network, not the protocol, made the decision.",
    readTime: "14 min read",
    image: "/images/blog/architecture/sse-vs-websockets.svg",
    date: "2026-01-08",
    authorName: "Ronnie Kiyegga",
    authorImage: "/images/profile/Avatar.svg",
    sections: [
      {
        paragraphs: [
          "Every engineer eventually reaches the point where a product needs to update in real time. At first, the decision feels straightforward: pick a protocol, stream the updates and move on.",
          "In practice, that decision sits on top of several layers of networking. IP moves packets between machines. TCP provides reliable, ordered delivery. HTTP carries application traffic. From there you begin choosing higher-level protocols such as REST, Server-Sent Events (SSE), WebSockets or WebRTC depending on how your application communicates. It's tempting to think those choices are mostly about performance, but in production they're usually about constraints.",
          "We learnt that lesson while deploying an operational analytics platform into schools.",
        ],
      },
      {
        heading: "Networking context",
        paragraphs: [
          "Before comparing SSE and WebSockets, it's worth understanding where they sit.",
        ],
        table: {
          headers: ["Layer", "Responsibility", "Examples"],
          rows: [
            ["Layer 3", "Routing packets between hosts", "IP"],
            ["Layer 4", "Reliable transport", "TCP, UDP, QUIC"],
            [
              "Layer 7",
              "Application protocols",
              "HTTP, REST, SSE, WebSockets, gRPC, WebRTC",
            ],
          ],
        },
      },
      {
        heading: "Production starts where local development ends",
        paragraphs: [
          "The product itself wasn't particularly unusual. Teachers used a dashboard throughout the day to monitor student submissions, assessment progress and intervention alerts, and whenever something changed the dashboard needed to update automatically without requiring users to refresh the page. On paper, WebSockets looked like the obvious answer: framework support was mature, every tutorial recommended them, and they promised low-latency bidirectional communication through a single abstraction. Updates were event-driven rather than continuous. Most dashboards sat idle for long periods before receiving a burst of activity when classes submitted work simultaneously, and that distinction mattered more than raw protocol performance.",
          "That assumption lasted until we deployed into schools. The problem stopped being about protocols almost immediately. Unlike a developer laptop connected to reliable home broadband, schools operate on heavily managed networks where hundreds of devices share the same wireless infrastructure. Requests pass through content filters, SSL inspection appliances, safeguarding policies and managed proxies designed primarily for security rather than application performance. Teachers move between classrooms throughout the day, forcing devices to roam between wireless access points, while some schools aggressively terminate long-lived connections and others proxy almost every outbound request.",
          "None of those constraints appeared during development. Every one of them appeared in production. That forced us to stop asking which protocol was theoretically faster and start asking a much more practical question: **which protocol survives this environment?**",
        ],
      },
      {
        heading: "Looking at the data instead of the protocol",
        paragraphs: [
          "Once we started looking at the data instead of the protocol we noticed something uncomfortable about the problem we were solving. Although the dashboard looked like a collaborative workspace to users, nothing we monitored actually required collaboration. There were no shared cursors, no live messaging between users and no requirement for clients to constantly stream state back to the server.",
          "Instead, almost all movement was one-directional: server to client whenever something in the system changed. A student submitted work. A teacher marked an assessment. A report finished generating. The dashboard simply needed to reflect those events as quickly as possible. That distinction matters architecturally. Bidirectional communication is powerful, but it also introduces complexity you only need when both sides are continuously exchanging state. Our workload wasn't really \"real-time communication\", it was server-to-client notifications.",
        ],
      },
      {
        heading: "Why not polling?",
        paragraphs: [
          "One question naturally follows: if the dashboard only required server-to-client updates, why not simply poll the API every few seconds? Polling would have worked, and for a small number of users it would have been the fastest thing to ship.",
          "The problem is what happens once dashboards stay open all day. Every connected client would continue generating requests even when nothing had changed. The workload was event-driven rather than time-driven, so most requests would simply return \"nothing new\". Server-Sent Events allowed the server to remain silent until there was actually something worth sending, which kept idle connections cheap without sacrificing responsiveness when activity spiked.",
        ],
        image: "/images/blog/architecture/polling-vs-sse.svg",
        imageAlt: "Polling sends repeated requests while idle versus SSE pushing events only when data changes",
        imageAfterParagraph: 0,
      },
      {
        heading: "The boring option won",
        paragraphs: [
          "That leaves Server-Sent Events, a technology that appears almost boring compared to WebSockets but matched our workload perfectly. Because SSE operates over ordinary HTTP, we didn't need to redesign our infrastructure. Authentication already behaved exactly as every other request, existing load balancers continued working without special configuration, reverse proxies treated connections like normal HTTP traffic and our logging and monitoring remained unchanged. We didn't have to introduce an entirely different operational model just because updates happened in real time.",
          "Notification state remained in PostgreSQL as the source of truth. The client hydrated from the database first whenever it loaded or reconnected, while SSE only pushed incremental updates afterwards. That meant a dropped connection could delay an update, but it would not make the application lose state. SSE was an enhancement layer, not the system of record.",
          "Perhaps the biggest advantage only became obvious once teachers started using the system. When someone walked between classrooms and briefly lost Wi-Fi, the browser automatically re-established the connection without them thinking about transport protocols or connection state. Nobody celebrated that feature because nobody noticed it, and that's usually a sign you've made the right infrastructure decision.",
        ],
      },
      {
        heading: "Security and operational simplicity mattered too",
        paragraphs: [
          "Schools introduce another constraint that rarely appears in architecture diagrams: student data. Every additional component handling live traffic becomes another surface that needs monitoring, securing and maintaining, particularly when you're dealing with sensitive information.",
          "By continuing to operate over HTTP, our authentication model remained consistent with the rest of the application. Existing middleware, logging, reverse proxies and infrastructure policies continued working exactly as before without introducing an entirely separate communication stack. Sometimes reducing operational surface area creates more long-term value than introducing additional capability, particularly when your users never needed that capability in the first place.",
        ],
      },
      {
        heading: "Production note: proxy buffering",
        variant: "callout",
        paragraphs: [
          "Reverse proxies such as Nginx can buffer HTTP responses by default, which breaks streaming by holding events until an internal buffer fills. For SSE, proxy buffering needs to be disabled so events flush to the browser immediately. In Nginx this can be handled with headers such as `X-Accel-Buffering: no`.",
          "At larger scale, the challenge shifts from choosing SSE versus WebSockets to distributing events across multiple application instances. Once clients are connected to different servers, an event produced on one instance needs to reach every instance that may be holding active SSE connections. That usually means introducing Redis Pub/Sub or a dedicated message bus so events can be fanned out regardless of where they originated. We did not need that layer on day one, but it is the next scaling concern once a single node stops being enough.",
        ],
      },
      {
        heading: "When I would absolutely choose WebSockets",
        paragraphs: [
          "None of this means WebSockets are the wrong technology. If I were building Slack, Figma, Google Docs or a multiplayer game, I'd reach for them without hesitation because those products genuinely depend on bidirectional communication. Typing indicators, presence updates, collaborative editing, shared cursors and game-state synchronisation all require clients and servers to exchange information continuously.",
          "Our dashboard simply didn't have those requirements. Choosing the more powerful technology would have increased operational complexity without solving a real problem. Engineering isn't about choosing the technology with the longest feature list; it's about choosing the one that matches the workload you're actually building.",
        ],
      },
      {
        heading: "The engineering lesson",
        paragraphs: [
          "Looking back, I don't think this story is really about Server-Sent Events. It's about engineering judgement under real constraints. As engineers, we naturally compare technologies: PostgreSQL versus MongoDB, Redis versus Memcached, REST versus GraphQL, React versus Vue or SSE versus WebSockets, but those comparisons rarely determine the architecture on their own. They're useful for understanding trade-offs, yet production systems are almost never built in isolation.",
          "The environment usually decides for you. In our case, the deciding factor wasn't latency, browser support or theoretical scalability. It wasn't even the protocol itself. It was the reality of deploying software into hundreds of classrooms running on networks we didn't control. Once we accepted that constraint, the architectural decision almost made itself.",
          'That\'s a lesson I\'ve found applies far beyond networking. The best engineering decisions rarely come from asking, *"Which technology is the most capable?"* They come from asking, *"What constraints does this environment impose, and which solution fits them best?"* More often than not, that question leads you towards something simpler than you originally expected. Choosing the boring option is sometimes the most senior decision you can make when it matches the workload and the environment you actually operate in.',
          "The best technology isn't usually the one with the longest feature list. It's the one that quietly survives production. Every technology decision eventually becomes an infrastructure decision.",
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
    image: "/images/blog/architecture/canary-nginx.svg",
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
    image: "/images/blog/architecture/postgres-bigquery.svg",
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
