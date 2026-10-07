import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A dashboard is fast all morning, then a reporting deadline arrives and a large customer’s team signs in together. The system does not crash; it simply starts to stall. Some pages eventually load, others time out, and restarting an application instance helps only briefly.",
    "CPU is not obviously saturated and the database is not pinned at 100%, so the investigation naturally begins in the application code:",
    "“Which line of code is taking too long?”",
    "Profiling is useful when a function is doing expensive work. Here, however, the slowdown appears only when many requests overlap, which suggests that time may be accumulating somewhere a CPU profile will not show.",
    "The more revealing question is:",
    "“Where is work waiting?”",
    "Following that waiting time—from application workers to connection pools, locks, queues and external providers—turns a vague peak-traffic failure into a capacity problem we can reason about.",
  ],
  sections: [
    {
      heading: "Where the time actually goes",
      blocks: [
        {
          type: "p",
          text: "A profile will reveal expensive JSON processing, a huge response, an unindexed query or repeated external calls. A peak-only slowdown is more deceptive, because a request can take over nine seconds while doing very little work. For example:",
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
          text: "The endpoint is slow, but the business logic is not necessarily the cause. A CPU profiler samples only active work, so it shows almost none of those nine seconds; a wall-clock or off-CPU view, or a trace with timings around each wait, is what shows where the time went.",
        },
      ],
    },
    {
      heading: "Waiting accumulates before failure appears",
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
          text: "When demand approaches a limit, work begins to wait. At first, the waiting may be small enough that nobody notices. As utilisation increases, the queue can grow quickly; a small increase in traffic can create a large increase in tail latency because more work is competing for the same resource. That is why a typical request can look fine while real users are struggling. For example, the median can stay healthy while the tail does not:",
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
          text: "The median, like an average, hides the fact that a meaningful part of the user population is experiencing a broken workflow.",
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
connection wait: short
query: short
provider call: short

Peak:
connection wait: most of the request
query: about the same
provider call: about the same`,
        },
        {
          type: "p",
          text: "That points toward a connection or concurrency issue, not a suddenly slow query.",
        },
        {
          type: "p",
          text: "Another trace may show connection wait and query time much as they are under normal traffic, while the call to the external provider accounts for most of the request. Here the database is barely involved. The provider may be slowing under its own load or throttling the concurrent calls the service now sends it. The same user-visible symptom leads to a different investigation, and nothing on the application's own CPU graph would have pointed there.",
        },
        {
          type: "p",
          text: "Traces have limits of their own. They only show the waits someone instrumented, so time spent queuing for a pool or a lock without its own span appears as an unexplained gap, or not at all. Sampling can also drop the slow requests being investigated, particularly when the decision to keep a trace is made before anyone knows the request will be slow. No slow span does not mean nothing was slow.",
        },
      ],
    },
    {
      heading: "Restarting the service",
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
          text: "The goal is to restore service without losing what the incident could have taught you.",
        },
      ],
    },
    {
      heading: "Retries can turn a stall into a feedback loop",
      blocks: [
        {
          type: "p",
          text: "Stalled systems often receive more traffic because users and clients react to uncertainty. A person refreshes, a browser retries, a mobile client reconnects, a job worker retries and a load balancer sends another attempt.",
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
          text: "The system ends up processing the original work plus the retries, which is why retries need:",
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
      heading: "What is full?",
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
          text: "Each problem has a different response, and a longer timeout fixes none of them. The fix has to change the constrained part of the system.",
        },
        {
          type: "p",
          text: "While that fix is found, pausing non-critical work such as email sending, analytics updates or report generation can keep sign-in and core reads and writes moving. Which work counts as critical is a product decision, and it is easier to make before an incident than during one.",
        },
      ],
    },
    {
      heading: "Start where time accumulates",
      blocks: [
        {
          type: "p",
          text: "A peak-traffic stall is rarely one slow function. More often it is the interaction of finite capacity, concurrency, queues, retries, dependencies, and work that stayed synchronous longer than it needed to. When it happens, do not start by guessing which limit to increase. Start by finding where time accumulates. Then ask: What is waiting, what is it waiting for, and what can we change so the important work continues to move?",
        },
      ],
    },
  ],
};
