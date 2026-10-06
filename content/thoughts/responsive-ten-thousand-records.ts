import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A system is healthy all morning; requests are quick; dashboards load. Background jobs complete; then demand rises. A scheduled deadline arrives; a campaign launches; a large customer starts work. Users open the same dashboard; the system does not immediately crash. It stalls. Pages spin; some requests eventually succeed. Others time out. CPU may not look particularly high; the database may not be obviously at 100%. Restarting an instance may help briefly, then the problem returns. The obvious response is often to search for a slow function:",
    "“Which line of code is taking too long?”",
    "That is a reasonable place to start for a deterministic bug. At peak traffic, the more important question is often:",
    "“Where is work waiting?”",
    "A stall is frequently a queueing problem before it is a computation problem.",
  ],
  sections: [
    {
      heading: "The obvious solution: profile the slow endpoint",
      blocks: [
        {
          type: "p",
          text: "Profiling is useful; if a route is doing expensive JSON processing, rendering a huge response, running an unindexed query, or performing repeated external calls, a profile can reveal it. But a peak-only slowdown can be deceptive. A request may take ten seconds while doing only a small amount of actual work:",
        },
        {
          type: "code",
          language: "text",
          code: `30ms     application logic
4,000ms waiting for a database connection
80ms     query execution
5,000ms waiting for external dependency
90ms     response serialisation`,
        },
        {
          type: "p",
          text: "The endpoint is slow, but the business logic is not necessarily the cause. If profiling only captures active CPU work, it may tell you very little about the time users actually experience.",
        },
      ],
    },
    {
      heading: "The hidden mechanism: waiting accumulates before failure appears",
      blocks: [
        {
          type: "p",
          text: "Every system has finite resources:",
        },
        {
          type: "code",
          language: "text",
          code: `Application workers
Database connections
Database CPU and I/O
Locks
Queue consumers
External API capacity
Network sockets
Memory
Thread pools`,
        },
        {
          type: "p",
          text: "When demand approaches a limit, work begins to wait. At first, the waiting may be small enough that nobody notices. As utilisation increases, the queue can grow quickly; a small increase in traffic can create a large increase in tail latency because more work is competing for the same resource. That is why average latency can look reasonable while real users are struggling.",
        },
        {
          type: "code",
          language: "text",
          code: `p50: 150ms
p95: 3,800ms
p99: timeout`,
        },
        {
          type: "p",
          text: "The average may hide the fact that a meaningful part of the user population is experiencing a broken workflow.",
        },
      ],
    },
    {
      heading: "Start with the request timeline",
      blocks: [
        {
          type: "p",
          text: "When a system stalls, I want to split total request time into components:",
        },
        {
          type: "code",
          language: "text",
          code: `Request received
Authentication complete
Database connection acquired
Query complete
External dependency complete
Response returned`,
        },
        {
          type: "p",
          text: "Then I want to compare the incident window with normal traffic. A useful trace might show:",
        },
        {
          type: "code",
          language: "text",
          code: `Normal:
db_acquire_ms=5
query_ms=40
provider_ms=120

Peak:
db_acquire_ms=2,100
query_ms=55
provider_ms=180`,
        },
        {
          type: "p",
          text: "That points toward a connection or concurrency issue, not a suddenly slow query. Another trace may show:",
        },
        {
          type: "code",
          language: "text",
          code: `Normal:
db_acquire_ms=5
query_ms=40
provider_ms=120

Peak:
db_acquire_ms=10
query_ms=2,800
provider_ms=130`,
        },
        {
          type: "p",
          text: "That suggests the database is executing work slowly—perhaps due to locks, I/O pressure, missing indexes under a different data shape, or a query plan that degrades at volume. The same user-visible symptom leads to different investigations.",
        },
      ],
    },
    {
      heading: "The second obvious solution: restart the service",
      blocks: [
        {
          type: "p",
          text: "Restarting can reduce pressure temporarily, and it may clear local queues, release stuck resources, drop in-flight work, reset a connection pool, or remove a bad instance. During an incident, that can be a legitimate mitigation. But it is not an explanation. If the pressure is created by demand exceeding a shared downstream resource, the system will fill up again after the restart. A restart can also destroy useful evidence:",
        },
        {
          type: "code",
          language: "text",
          code: `In-flight request data
Local queue state
Connection-pool metrics
Error context
Timing relationships`,
        },
        {
          type: "p",
          text: "When possible, capture the state first:",
        },
        {
          type: "list",
          items: [
            "Which routes are slow?",
            "Which resource has increasing wait time?",
            "Are retries rising?",
            "Which dependency changed first?",
            "Is queue depth growing?",
            "Are lock waits present?",
            "Which deployment or configuration changed recently?",
          ],
        },
        {
          type: "p",
          text: "The goal is not to avoid restoring service, but to restore service without learning nothing.",
        },
      ],
    },
    {
      heading: "Retries can turn a stall into a feedback loop",
      blocks: [
        {
          type: "p",
          text: "Stalled systems often receive more traffic because users and clients react to uncertainty. A person refreshes; a browser retries; a mobile client reconnects; a job worker retries. A load balancer sends another attempt.",
        },
        {
          type: "code",
          language: "text",
          code: `Requests slow down
    ↓
Clients assume failure
    ↓
Retries increase
    ↓
More work enters the constrained resource
    ↓
Requests slow further`,
        },
        {
          type: "p",
          text: "The system begins processing original work plus retries; this is why retries need:",
        },
        {
          type: "code",
          language: "text",
          code: `Bounded attempts
Backoff
Jitter
Timeout budgets
Idempotency for mutations`,
        },
        {
          type: "p",
          text: "A retry is not inherently a reliability feature; under the wrong conditions, it is an amplifier.",
        },
      ],
    },
    {
      heading: "The useful question is “what is full?”",
      blocks: [
        {
          type: "p",
          text: "A productive incident investigation asks:",
        },
        {
          type: "code",
          language: "text",
          code: `What resource is full?
What work is waiting?
What created the waiting?
Which traffic is essential?
Which work can be deferred or rejected?
What signal would have warned us earlier?`,
        },
        {
          type: "p",
          text: "The answer may be:",
        },
        {
          type: "code",
          language: "text",
          code: `Database pool is full because a report route runs large queries.

External API calls are blocking web requests.

A lock is held by a long transaction.

A queue consumer is slower than message arrival.

One tenant creates disproportionate expensive traffic.

An autoscaling deployment multiplied database connections.

Retry traffic became a large share of incoming requests.`,
        },
        {
          type: "p",
          text: "Each problem has a different response; the correct fix is not “make the timeout longer.” It is a change that affects the constrained part of the system.",
        },
      ],
    },
    {
      heading: "Preserve the critical workflow",
      blocks: [
        {
          type: "p",
          text: "Under pressure, not every feature deserves equal capacity; a system can protect important user work by reducing or deferring less critical work:",
        },
        {
          type: "code",
          language: "text",
          code: `Keep:
authentication
core reads and writes
payment or booking confirmation
critical state transitions

Defer:
email sending
analytics updates
report generation
recommendation refreshes
non-essential enrichment`,
        },
        {
          type: "p",
          text: "This is a product decision as much as an infrastructure decision. The system is deciding what users can still rely on when capacity is constrained.",
        },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        {
          type: "p",
          text: "A peak-traffic stall is often not one slow function, but it is the interaction of finite capacity, concurrency, queues, retries, dependencies, and work that stayed synchronous longer than it needed to. When it happens, do not start by guessing which limit to increase. Start by finding where time accumulates. Then ask: What is waiting, what is it waiting for, and what can we change so the important work continues to move?",
        },
      ],
    },
  ],
};
