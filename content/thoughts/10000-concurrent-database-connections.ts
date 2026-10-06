import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "Every system eventually reaches this moment. Traffic grows; a campaign works; a feature gets adopted faster than expected. A dashboard that was quiet last month becomes part of someone’s daily workflow. Then someone asks:",
    "“Can this handle 10,000 concurrent users?”",
    "It sounds like a capacity question; very quickly, it becomes a database question:",
    "“Should we increase the maximum connection count to 10,000?”",
    "That response is understandable. More users appear to imply more simultaneous work, and more simultaneous work appears to imply more database connections. The problem is that a user is not a database connection. A browser can be open for an hour while making only a handful of short requests. A database query may need a connection for 20 milliseconds; a background worker may need one for a transaction and then not touch the database again for several minutes.",
    "Giving every potential user their own connection is not scaling, but it is turning user concurrency into database overhead.",
  ],
  sections: [
    {
      heading: "The capacity model",
      blocks: [
        {
          type: "p",
          text: "The number is useful because it exposes a common modelling mistake: concurrent users are not long-lived database connections. The relevant variables are connection-pool size, application-instance concurrency, transaction duration, query cost, and the database’s ability to perform useful concurrent work.",
        },
      ],
    },
    {
      heading: "The obvious solution: increase the connection limit",
      blocks: [
        {
          type: "p",
          text: "Most databases expose a setting for the number of connections they will accept. Increasing it can feel like the direct fix:",
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
          text: "The reasoning is not irrational; if requests are failing because the database refuses new connections, a higher limit may reduce those immediate failures. In a small system, raising a low default can even be the correct short-term mitigation. But it does not answer the important question: What will all of those connections do once they are accepted? Every open connection consumes memory, socket resources, session state, and scheduling overhead. More importantly, a larger number of connections permits more work to arrive at the database at the same time.",
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
      heading: "The second obvious solution: make the pool bigger",
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
          text: "That is directionally correct; a pool is better than letting every request create a fresh connection. It reuses a bounded set of database sessions and avoids the cost of repeated connection establishment. But a pool can still hide the real problem if it is treated as a number to keep increasing.",
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
          text: "Nothing in the pool configuration changed; the database pressure did; this is especially easy to miss in serverless or autoscaling environments. One function instance may seem to have a modest pool, but a burst of traffic creates many instances at once. Each one opens connections; the aggregate connection count becomes the real system behaviour. A connection pool is not merely an optimisation, but it is a concurrency-control mechanism, and its size needs to be part of the capacity model.",
        },
      ],
    },
    {
      heading: "The hidden question: are queries slow, or are requests waiting?",
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
            "Use a pooler when the deployment model produces many short-lived application connections.",
          ],
        },
        {
          type: "p",
          text: "The objective is not to eliminate waiting entirely; a small, bounded queue can be healthier than allowing unlimited work to overwhelm the database. The objective is to make waiting visible, controlled, and proportionate.",
        },
      ],
    },
    {
      heading: "Do not hold a database connection across user time",
      blocks: [
        {
          type: "p",
          text: "One failure mode is easy to introduce in multi-step workflows; a service starts a database transaction, creates a pending record, then waits for a user to complete a payment flow or for an external provider to respond. That connection is now held across human and network time.",
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
          text: "That model does not survive concurrency well; user and provider delays become database resource consumption. A safer model persists the state and releases the connection:",
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
          text: "This is why workflow state, idempotency, and connection management connect; durable state lets a system wait without holding scarce resources open.",
        },
      ],
    },
    {
      heading: "When a bigger pool is actually justified",
      blocks: [
        {
          type: "p",
          text: "None of this means a pool should never grow; a larger pool can be appropriate when measurement shows:",
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
          text: "Ten thousand concurrent users does not mean ten thousand database connections. The question is not:",
        },
        {
          type: "p",
          text: "“What should I set the connection limit to?”",
        },
        {
          type: "p",
          text: "It is:",
        },
        {
          type: "p",
          text: "“How much concurrent database work is safe for this workload, how long does that work occupy a connection, and where should excess work wait?”",
        },
        {
          type: "p",
          text: "A connection is not a user session, but it is a scarce, shared resource. Borrow it briefly, use it efficiently, return it quickly, and measure where requests wait before increasing any limit.",
        },
      ],
    },
  ],
};
