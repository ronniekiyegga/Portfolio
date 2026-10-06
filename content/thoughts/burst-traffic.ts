import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "Traffic increases; a marketing campaign lands; a deadline approaches; a feature is shared widely. A job opens for bookings; a popular workflow becomes part of everyone’s morning routine. Requests begin to slow down. The obvious response is:",
    "“Add more servers.”",
    "That can be the correct response when the application tier is the constrained resource. If CPU is saturated, requests are queueing at the web layer, and the database and dependencies have capacity, more application instances can improve throughput. The mistake is treating more servers as a universal answer to burst traffic. A traffic spike does not only create more web requests, and it creates more authentication checks, database queries, cache reads, external API calls, queue messages, retries, and connections. If the bottleneck is downstream, more servers can make the spike worse.",
  ],
  sections: [
    {
      heading: "The obvious solution: scale the application tier",
      blocks: [
        {
          type: "p",
          text: "The reasoning is straightforward:",
        },
        {
          type: "code",
          language: "text",
          code: `More requests
    ↓
More web servers
    ↓
More concurrent handling capacity
    ↓
Faster responses`,
        },
        {
          type: "p",
          text: "This works when the web tier is actually doing the limiting work. For example, a CPU-heavy image transformation service may benefit directly from more worker capacity. A stateless endpoint serving cached content may also scale horizontally well. The problem is that many product workflows are not bounded by the application server. They are bounded by a shared dependency.",
        },
        {
          type: "code",
          language: "text",
          code: `More application servers
    ↓
More concurrent requests to the database
    ↓
More connection pressure
    ↓
More concurrent external API calls
    ↓
More queue messages
    ↓
More retries when dependencies slow down`,
        },
        {
          type: "p",
          text: "The application tier becomes better at sending work to the resource that was already struggling.",
        },
      ],
    },
    {
      heading: "The hidden constraint: downstream capacity",
      blocks: [
        {
          type: "p",
          text: "A request path may include several limits:",
        },
        {
          type: "code",
          language: "text",
          code: `Client
    ↓
Load balancer
    ↓
Web application
    ↓
Authentication provider
    ↓
Connection pool
    ↓
Database
    ↓
External API
    ↓
Notification provider`,
        },
        {
          type: "p",
          text: "Each layer has a different concurrency budget; if the database can safely execute 20 expensive queries at a time, scaling the web application from five instances to fifty does not make the database capable of executing 200 expensive queries safely. It may create a longer queue, more lock contention, higher query latency, and eventually more request timeouts. The same applies to a third-party API with a strict rate limit. More web servers can turn a manageable burst into a large number of rejected or delayed outbound calls. The question is not:",
        },
        {
          type: "p",
          text: "“How many servers do we need?”",
        },
        {
          type: "p",
          text: "It is:",
        },
        {
          type: "p",
          text: "“Which resource is reaching its safe capacity first, and what work should be allowed to wait?”",
        },
      ],
    },
    {
      heading: "Queueing is often the real story",
      blocks: [
        {
          type: "p",
          text: "A service can feel slow even when its own CPU is not high. A request may spend most of its time waiting:",
        },
        {
          type: "code",
          language: "text",
          code: `20ms    application work
1,800ms waiting for a database connection
90ms    database query
2,000ms waiting for an external provider`,
        },
        {
          type: "p",
          text: "Adding web servers does not reduce that waiting, and it can increase the number of requests waiting at the same time. This is why burst traffic needs visibility into:",
        },
        {
          type: "list",
          items: [
            "Request concurrency",
            "p50, p95, and p99 latency",
            "Database connection wait time",
            "Query duration",
            "Queue depth",
            "External dependency latency",
            "Retry volume",
            "Rate-limit responses",
            "Error rate by route",
          ],
        },
        {
          type: "p",
          text: "The important distinction is:",
        },
        {
          type: "code",
          language: "text",
          code: "The service is slow because it is doing too much work",
        },
        {
          type: "p",
          text: "versus:",
        },
        {
          type: "code",
          language: "text",
          code: "The service is slow because work is waiting for a shared resource",
        },
        {
          type: "p",
          text: "Those lead to different fixes.",
        },
      ],
    },
    {
      heading: "The second obvious solution: increase every limit",
      blocks: [
        {
          type: "p",
          text: "Once traffic causes failures, the next instinct is often to increase every available limit:",
        },
        {
          type: "code",
          language: "text",
          code: `More instances
More database connections
Longer request timeouts
More worker concurrency
More retries
Larger queues`,
        },
        {
          type: "p",
          text: "This can make an incident less visible without making the system healthier. Longer timeouts keep requests in flight longer; more retries create additional work. More database connections can increase contention. Larger queues can delay failure until users have waited so long that the product feels broken. The system may become more capable of accepting work it cannot complete promptly. A safer approach is to decide which work is critical and which can be delayed.",
        },
      ],
    },
    {
      heading: "Keep the critical path small",
      blocks: [
        {
          type: "p",
          text: "Not every operation needs to happen before the user receives a useful response. Consider an application update:",
        },
        {
          type: "code",
          language: "text",
          code: `Create application record
    ↓
Write audit event
    ↓
Update analytics aggregate
    ↓
Send notification
    ↓
Refresh recommendation data`,
        },
        {
          type: "p",
          text: "The first two may be critical to the user’s action; the others may not be. A burst-resistant design can keep the critical path focused:",
        },
        {
          type: "code",
          language: "text",
          code: `Synchronous:
validate, persist the core change, return confirmed state

Asynchronous:
notifications, analytics, derived summaries, non-critical enrichment`,
        },
        {
          type: "p",
          text: "The point is not to push everything into a queue, but to avoid making an interactive request wait for work that does not affect the immediate outcome.",
        },
      ],
    },
    {
      heading: "Backpressure is better than silent overload",
      blocks: [
        {
          type: "p",
          text: "When capacity is constrained, the system needs a controlled way to admit work. That might mean:",
        },
        {
          type: "list",
          items: [
            "Returning a clear rate-limit response.",
            "Showing a pending state for an asynchronous operation.",
            "Deferring non-critical work.",
            "Limiting an expensive endpoint separately.",
            "Serving slightly stale data for a non-critical dashboard.",
            "Rejecting low-priority work to preserve the primary workflow.",
          ],
        },
        {
          type: "p",
          text: "This is backpressure, but it is not a failure to say “not now.” It is a better failure mode than accepting unlimited work until every request times out. The user experience should make the state clear:",
        },
        {
          type: "code",
          language: "text",
          code: `Your export is being prepared.
We will notify you when it is ready.

Your payment is being confirmed.
Do not submit again; we will update this page when confirmation arrives.`,
        },
        {
          type: "p",
          text: "The system should not pretend that a delayed operation completed.",
        },
      ],
    },
    {
      heading: "Final thoughts",
      blocks: [
        {
          type: "p",
          text: "More servers can solve a web-server bottleneck, and they cannot automatically solve a database bottleneck, a connection-pool bottleneck, an external API limit, a retry storm, or a queueing problem. In some cases, they make those problems worse by increasing concurrent demand. Before scaling out, ask: Where does work start waiting, what is the constrained resource, and which work must remain available to users during the spike? Scale the layer that is actually constrained; bound the work sent downstream. Move non-critical work off the critical path; make overload visible.",
        },
        {
          type: "p",
          text: "The goal is not to accept every request immediately; the goal is to keep the important user workflow reliable when demand is least predictable.",
        },
      ],
    },
  ],
};
