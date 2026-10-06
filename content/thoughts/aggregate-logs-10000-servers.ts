import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "An incident begins. Error rates rise; a dependency slows down. Requests time out; the application begins emitting more logs than usual. Then the logging destination becomes unavailable or rate-limits ingestion. The obvious response is:",
    "“Buffer everything until the logging platform recovers.”",
    "That feels responsible; logs are evidence, and incidents are exactly when evidence matters most. The risk is that an unbounded buffer becomes another outage. Memory fills; disk fills; a logging sidecar consumes CPU; the application blocks while trying to write. The workload users actually need becomes less reliable because the observability pipeline is trying to preserve every line. Reliable logging is not achieved by refusing to lose anything under any conditions.",
    "It is achieved by deciding which events matter most, how long they can wait, what can be dropped or sampled, and how the application remains useful when observability is degraded.",
  ],
  sections: [
    {
      heading: "The obvious solution: retain every log",
      blocks: [
        {
          type: "p",
          text: "A central logging system is valuable because it makes distributed behaviour searchable. When an incident occurs, teams need to answer:",
        },
        {
          type: "code",
          language: "text",
          code: `Which route failed?
Which dependency slowed down?
Which requests were affected?
What changed before the failure?
Did a retry occur?
What happened to this user’s workflow?`,
        },
        {
          type: "p",
          text: "Retaining logs supports those questions; the problem is that log volume often rises with failure volume.",
        },
        {
          type: "code",
          language: "text",
          code: `Dependency starts failing
    ↓
Many requests fail
    ↓
Each request produces error logs
    ↓
Logging pipeline receives a burst
    ↓
Logging destination slows or rejects events
    ↓
Producers buffer more data`,
        },
        {
          type: "p",
          text: "The event that creates the incident can also create the pressure that breaks the logging path. If the buffer has no bound, the logging strategy can consume the resources needed for recovery.",
        },
      ],
    },
    {
      heading: "The hidden question: which logs have the same value?",
      blocks: [
        {
          type: "p",
          text: "Not every event needs the same delivery guarantee; a production system may emit:",
        },
        {
          type: "code",
          language: "text",
          code: `Security audit events
Payment and billing events
Authorisation failures
Application errors
Request access logs
Debug traces
High-volume informational events
Metrics-like counters`,
        },
        {
          type: "p",
          text: "Treating all of these as equally important creates an expensive and fragile pipeline. A better design classifies them:",
        },
        {
          type: "code",
          language: "text",
          code: `Critical audit events
Need durable handling and clear escalation if delivery fails.

Error events
Need representative examples, correlation, and bounded buffering.

Operational request logs
Need short-term searchability and sampling under high volume.

Debug logs
May be disabled, sampled, or dropped first under pressure.`,
        },
        {
          type: "p",
          text: "The classification is not an excuse to lose important data, but it is the only way to preserve the most important data when capacity is limited.",
        },
      ],
    },
    {
      heading: "Buffers need an explicit failure policy",
      blocks: [
        {
          type: "p",
          text: "A buffer protects against short disruptions, and it also needs limits.",
        },
        {
          type: "code",
          language: "text",
          code: `Maximum number of events
Maximum bytes
Maximum time an event may remain buffered
What is retained first
What is sampled or dropped first
What happens when the buffer is full
How operators know delivery is delayed or data was lost`,
        },
        {
          type: "p",
          text: "A bounded policy might look like:",
        },
        {
          type: "code",
          language: "text",
          code: `Audit event:
persist locally or to a durable event store; raise alert on delivery failure

Error event:
buffer up to a defined capacity; retain event fingerprint and representative payload

Debug event:
sample aggressively or drop under pressure`,
        },
        {
          type: "p",
          text: "The exact thresholds depend on the system; the important point is that “buffer everything forever” is not a design. It is an unbounded resource claim.",
        },
      ],
    },
    {
      heading: "Logging must not block the primary workload",
      blocks: [
        {
          type: "p",
          text: "A service should not become unavailable because its logging destination is slow. For most request handling, logging should be asynchronous or non-blocking from the application’s perspective. A failed log delivery should not turn a successful user action into a failed one. There are exceptions; some security or financial workflows may require a durable audit record as part of the business operation. In those cases, the audit event needs a stronger transactional or outbox-style path, not merely an ordinary log statement. The distinction matters:",
        },
        {
          type: "code",
          language: "text",
          code: `Operational logging
Useful for diagnosis; should not normally block user work

Audit/business event
Part of the domain record; may need durable persistence before success`,
        },
        {
          type: "p",
          text: "Calling both “logs” can hide the fact that they have different correctness requirements.",
        },
      ],
    },
    {
      heading: "Repeated errors need aggregation, not amplification",
      blocks: [
        {
          type: "p",
          text: "An outage can produce thousands of near-identical stack traces. Writing every one of them in full may make the logging system slower and the incident harder to understand. A more useful approach is often:",
        },
        {
          type: "code",
          language: "text",
          code: `Record the error fingerprint
Count repeated occurrences
Retain representative examples
Attach request or correlation IDs
Emit metrics for rate and affected route
Sample repeated stack traces`,
        },
        {
          type: "p",
          text: "This preserves the signal:",
        },
        {
          type: "code",
          language: "text",
          code: `payment.webhook_processing_failed
error_class=database_timeout
count=8,412
first_seen=...
last_seen=...
affected_route=...`,
        },
        {
          type: "p",
          text: "without requiring an operator to sift through thousands of identical messages. The goal is not to hide failures, but to keep failure evidence usable.",
        },
      ],
    },
    {
      heading: "Structured logs make the pipeline recoverable",
      blocks: [
        {
          type: "p",
          text: "Free-form messages are readable but difficult to aggregate; a structured event can carry the fields needed for investigation:",
        },
        {
          type: "code",
          language: "json",
          code: `{
  "timestamp": "2026-10-05T18:00:00Z",
  "level": "error",
  "event": "subscription.webhook_processing_failed",
  "request_id": "req_123",
  "provider_event_id": "evt_123",
  "error_class": "database_timeout",
  "retry_attempt": 2
}`,
        },
        {
          type: "p",
          text: "That makes it possible to ask useful questions:",
        },
        {
          type: "code",
          language: "text",
          code: `How many failures occurred by route?
Did they begin before or after a deployment?
Which error class grew first?
Which provider events are waiting for retry?
Did the same workflow eventually recover?`,
        },
        {
          type: "p",
          text: "It also reduces the temptation to log entire raw payloads.",
        },
      ],
    },
    {
      heading: "Privacy is part of the logging design",
      blocks: [
        {
          type: "p",
          text: "Logs often become a place where sensitive information escapes ordinary data controls. Avoid recording:",
        },
        {
          type: "code",
          language: "text",
          code: `Passwords
Authorisation headers
Session tokens
Full payment payloads
Private user-entered notes
Personal information not needed for diagnosis`,
        },
        {
          type: "p",
          text: "A failure path deserves the same redaction discipline as a normal path. The worst time to discover that an exception logger captured raw request bodies is during an incident. Access to logs also needs governance; a powerful logging platform can become a broad internal data-access surface if anyone can search unredacted production records.",
        },
      ],
    },
    {
      heading: "The practical lesson",
      blocks: [
        {
          type: "p",
          text: "Buffering every log feels safe because data loss is uncomfortable, but an unbounded logging buffer can convert a degraded observability system into degraded product availability. Classify events; bound buffers. Protect the primary workload; preserve critical audit data through a stronger path. Aggregate repeated failures; make loss or delay visible. The question is not:",
        },
        {
          type: "p",
          text: "“How do we make sure we never lose a log?”",
        },
        {
          type: "p",
          text: "It is:",
        },
        {
          type: "p",
          text: "“Which evidence must survive, how do we preserve it safely, and how do we keep the product running when the logging pipeline does not?”",
        },
      ],
    },
  ],
};
