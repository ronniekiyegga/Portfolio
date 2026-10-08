import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "When an application grows from a few hundred users to thousands, the database is usually the first thing people worry about. And the neatest-looking fix is a setting: **raise the maximum connection count** to match the number of users.",
    "It sounds logical. More users means more simultaneous work, so surely the database needs more simultaneous connections.",
    "But **users and connections aren’t the same thing**. Someone can keep a tab open for an hour while making only a handful of requests, and each request may hold a connection for just a few milliseconds.",
    "So the real question isn’t how many users you have. It’s how much work actually reaches the database at once, how long each piece holds a connection and what the database can run in parallel.",
    "Let’s work through why a higher limit can make things worse, how a **connection pool** changes the picture and how to tell a slow query from a request that’s simply waiting.",
  ],
  sections: [
    {
      heading: "What a higher limit lets in",
      blocks: [
        {
          type: "p",
          text: "PostgreSQL, for example, accepts 100 connections by default, so the proposal looks like this:",
        },
        {
          type: "code",
          language: "text",
          code: `Current limit: 100 connections
Expected demand: 10,000 users
New limit: 10,000 connections`,
        },
        {
          type: "p",
          text: "That change is not always wrong. If requests are failing because the database refuses new connections, a higher limit may reduce those immediate failures, and in a small system raising a low default can be a reasonable short-term mitigation. What it does not tell us is what all of those connections will do once they are accepted. Every open connection consumes memory, socket resources, session state, and scheduling overhead. More importantly, a larger number of connections permits more work to arrive at the database at the same time.",
        },
        {
          type: "p",
          text: "If the workload contains expensive queries, long transactions, lock contention, or inefficient read patterns, increasing the connection ceiling can turn a controlled queue into an overloaded database.",
        },
        {
          type: "code",
          language: "text",
          code: `More accepted connections
    ↓
More concurrent queries
    ↓
More CPU, memory, lock, and I/O pressure
    ↓
Longer query duration
    ↓
Connections stay occupied longer
    ↓
More requests wait`,
        },
        {
          type: "p",
          text: "At that point, the system can have a higher configured connection limit and worse user-facing latency. The setting changed; the bottleneck did not.",
        },
      ],
    },
    {
      heading: "A pool helps until its size becomes the limit",
      blocks: [
        {
          type: "p",
          text: "The next response is usually more sophisticated:",
        },
        {
          type: "p",
          text: "“Fine; we will use a connection pool.”",
        },
        {
          type: "p",
          text: "That is the right direction. A pool reuses a bounded set of database sessions instead of letting every request open a fresh connection, and it avoids the cost of repeated connection setup. But it can still hide the real problem if its size is treated as a number to keep increasing.",
        },
        {
          type: "code",
          language: "text",
          code: `Application instances: 10
Connections per instance: 30
Potential database connections: 300`,
        },
        {
          type: "p",
          text: "Then the application scales out:",
        },
        {
          type: "code",
          language: "text",
          code: `Application instances: 50
Connections per instance: 30
Potential database connections: 1,500`,
        },
        {
          type: "p",
          text: "Nothing in the pool configuration changed, yet the potential pressure on the database grew fivefold. This is especially easy to miss in serverless or autoscaling environments: one function instance may seem to have a modest pool, but a burst of traffic creates many instances at once, each opening its own connections. The aggregate connection count is what the database actually experiences. A connection pool is a concurrency limit as much as an optimisation, so its size belongs in the capacity model.",
        },
      ],
    },
    {
      heading: "Are queries slow, or are requests waiting?",
      blocks: [
        {
          type: "p",
          text: "When someone says “the database is slow,” I want to separate two different measurements:",
        },
        {
          type: "code",
          language: "text",
          code: `Time waiting to acquire a connection
Time executing a query`,
        },
        {
          type: "p",
          text: "They are often confused because the user experiences both as a slow request. Imagine this request:",
        },
        {
          type: "code",
          language: "text",
          code: `2,400ms  waiting for an available connection
45ms     query execution
30ms     serialisation and response`,
        },
        {
          type: "p",
          text: "The query is not the immediate bottleneck; the request spent most of its time waiting for a shared resource. Now compare it with this:",
        },
        {
          type: "code",
          language: "text",
          code: `10ms     waiting for a connection
2,900ms  query execution
30ms     serialisation and response`,
        },
        {
          type: "p",
          text: "Here, increasing the pool may make things worse. More queries will arrive concurrently, and each slow query will keep a connection occupied longer. The diagnosis changes the fix. Before changing limits, I would want to know:",
        },
        {
          type: "list",
          items: [
            "How many connections are open, active, and idle?",
            "How long do requests wait to acquire a connection?",
            "Which queries occupy connections longest?",
            "Are transactions held open while waiting for another dependency?",
            "Are there lock waits?",
            "Is the application creating more connections than expected during scale-out?",
            "Are slow queries returning too much data or missing an index?",
            "Are non-critical jobs competing with interactive user work?",
          ],
        },
        {
          type: "p",
          text: "Without those answers, “increase the pool” is only a guess.",
        },
      ],
    },
    {
      heading: "The useful model: connections are a shared, bounded resource",
      blocks: [
        {
          type: "p",
          text: "The more reliable model is:",
        },
        {
          type: "code",
          language: "text",
          code: `Many users
    ↓
Many short application requests
    ↓
A bounded number of reusable connections
    ↓
A database doing a bounded amount of useful concurrent work`,
        },
        {
          type: "p",
          text: "A request borrows a connection, performs a short query or transaction, and returns it quickly. That means the rest of the architecture should work to minimise connection occupancy:",
        },
        {
          type: "list",
          items: [
            "Keep transactions short.",
            "Avoid holding database transactions open across network calls.",
            "Avoid loading data that the screen does not need.",
            "Use pagination and filtering for large collections.",
            "Index the queries that matter.",
            "Move non-critical work off the interactive request path.",
            "Bound application concurrency where the database is the limiting resource.",
            "Use an external pooler when the deployment model produces many short-lived application connections, after checking whether transaction-level pooling breaks session features the application relies on, such as prepared statements or session settings.",
          ],
        },
        {
          type: "p",
          text: "Some waiting is healthy. A small, bounded queue is better than allowing unlimited work to overwhelm the database; what matters is that the waiting is visible, controlled and proportionate.",
        },
      ],
    },
    {
      heading: "Do not hold a database connection across user time",
      blocks: [
        {
          type: "p",
          text: "One failure mode is easy to introduce in multi-step workflows: a service starts a database transaction, creates a pending record, then waits for a user to complete a payment flow or for an external provider to respond. That connection is now held across human and network time.",
        },
        {
          type: "code",
          language: "text",
          code: `Begin transaction
    ↓
Create pending record
    ↓
Wait for payment redirect
    ↓
Wait for provider callback
    ↓
Commit`,
        },
        {
          type: "p",
          text: "That model does not survive concurrency well, because user and provider delays become database resource consumption. A safer model persists the state and releases the connection:",
        },
        {
          type: "code",
          language: "text",
          code: `Create pending record
    ↓
Commit transaction
    ↓
Wait for external callback
    ↓
Receive callback
    ↓
Start a new short transaction
    ↓
Verify and transition state
    ↓
Commit`,
        },
        {
          type: "p",
          text: "This is where workflow state, idempotency and connection management meet: durable state lets a system wait without holding scarce resources open.",
        },
      ],
    },
    {
      heading: "When a bigger pool is actually justified",
      blocks: [
        {
          type: "p",
          text: "None of this means a pool should never grow. A larger pool can be appropriate when measurement shows:",
        },
        {
          type: "list",
          items: [
            "The database has spare capacity.",
            "Query latency is low.",
            "Connection acquisition wait is the dominant delay.",
            "The workload is short-lived and efficiently indexed.",
            "Scale-out behaviour is understood.",
            "Other clients and workers have been included in the connection budget.",
          ],
        },
        {
          type: "p",
          text: "The point is that pool size should be an observed capacity decision, not a proxy for user count. A connection budget might include:",
        },
        {
          type: "code",
          language: "text",
          code: `Web application
Background jobs
Scheduled work
Admin tooling
Database migrations
Preview deployments
Monitoring
Other internal services`,
        },
        {
          type: "p",
          text: "The number that matters is the total possible connection pressure, not the value in one application configuration file.",
        },
      ],
    },
    {
      heading: "The closing rule",
      blocks: [
        {
          type: "p",
          text: "Ten thousand concurrent users does not mean ten thousand database connections. Instead of asking what the connection limit should be, ask how much concurrent database work this workload can safely run, how long that work occupies a connection and where excess work should wait.",
        },
        {
          type: "p",
          text: "A connection is a scarce, shared resource rather than a user session. Borrow it briefly, use it efficiently, return it quickly, and measure where requests wait before increasing any limit.",
        },
      ],
    },
  ],
};
