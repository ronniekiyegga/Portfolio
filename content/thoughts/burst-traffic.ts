import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "When traffic arrives all at once (a booking window opening, a launch, a sale), pages that were fast a minute ago start to hang, and timeouts and retries begin to climb.",
    "The obvious response is to **add more servers**. Sometimes that’s exactly right: if requests are waiting for application CPU, more instances help.",
    "But every new instance also makes more database queries, cache reads, outbound calls and queue messages. If one of those shared resources is already at its limit, adding servers just **delivers work to the bottleneck faster**.",
    "In this article, I’ll look at how to find the resource that gives out first, why raising every limit makes things worse and what to do with work that doesn’t need to happen straight away.",
  ],
  sections: [
    {
      heading: "When more servers help",
      blocks: [
        {
          type: "p",
          text: "Scaling out works when the web tier is doing the limiting work. A CPU-heavy image transformation service benefits directly from more workers, and a stateless endpoint serving cached content scales horizontally well. Many product workflows, though, are bounded by a shared dependency rather than the application server, and for them more instances mean more of everything downstream:",
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
      heading: "Every layer has its own limit",
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
          text: "Each layer has a different concurrency budget. Suppose the database can safely run about 20 expensive queries at once, and five web instances already reach that by sending four each. Scaling to fifty instances lets the web tier attempt 200 of those queries at a time, but the database can still only run about 20 safely; the rest wait in a longer queue, add lock contention and push query latency up until requests time out. The same applies to a third-party API with a strict rate limit, where more web servers can turn a manageable burst into a large number of rejected or delayed outbound calls.",
        },
        {
          type: "p",
          text: "So the useful question shifts from how many servers we need to which resource reaches its safe capacity first, and what work should be allowed to wait.",
        },
      ],
    },
    {
      heading: "Queueing is often the real story",
      blocks: [
        {
          type: "p",
          text: "A service can feel slow even when its own CPU is not high, because a request may spend most of its time waiting for a connection, a lock or an external provider rather than doing work. Adding web servers does not reduce that waiting, and it can increase the number of requests waiting at the same time. This is why burst traffic needs visibility into:",
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
          text: "Those lead to different fixes. More servers help with the first only when the work is happening in the tier being scaled. They do nothing for the second.",
        },
      ],
    },
    {
      heading: "Raising every limit",
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
        {
          type: "p",
          text: "Moving work off the request path does not make it disappear. It still has to run, and the queue can become the next constrained resource. If consumers fall behind during the spike, the backlog grows and the oldest pending item keeps getting older, so a notification meant to be slightly delayed can arrive after it stops being useful. The age of the oldest pending work often says more than the number of items waiting. Background jobs are also commonly retried, so a job can run more than once, and anything with an external effect, such as sending a notification, needs to be safe to repeat.",
        },
        {
          type: "p",
          text: "That is the trade-off. Asynchronous processing protects interactive latency by exchanging immediate completion for eventual completion, which only works when the user's outcome genuinely does not depend on the deferred work.",
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
          text: "This is backpressure. Saying “not now” is a better failure mode than accepting unlimited work until every request times out, as long as the user experience makes the state clear:",
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
          text: "More servers can solve a web-server bottleneck, but they cannot automatically solve a database bottleneck, a connection-pool bottleneck, an external API limit, a retry storm, or a queueing problem. In some cases, they make those problems worse by increasing concurrent demand. Before scaling out, ask: Where does work start waiting, what is the constrained resource, and which work must remain available to users during the spike? Then scale the layer that is actually constrained, bound the work sent downstream, move non-critical work off the critical path and make overload visible.",
        },
        {
          type: "p",
          text: "Accepting every request immediately matters less than keeping the important user workflow reliable when demand is least predictable.",
        },
      ],
    },
  ],
};
