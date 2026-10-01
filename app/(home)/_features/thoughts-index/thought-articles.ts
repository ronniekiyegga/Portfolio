import { slugify } from "@/lib/slugify";

import { productJudgementSections } from "./product-judgement-articles";
import {
  allThoughts,
  blueCover,
  featuredInvestigationSlug,
  featuredThoughts,
  tealCover,
  type ThoughtPost,
} from "./thoughts";

export type ThoughtArticleBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; code: string }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | { type: "diagram"; label: string; text: string };

export type ThoughtArticleSection = {
  heading: string;
  paragraphs?: string[];
  blocks?: ThoughtArticleBlock[];
};

export type ThoughtArticle = ThoughtPost & {
  image: string;
  authorName: string;
  authorImage: string;
  lede?: string[];
  sections: ThoughtArticleSection[];
};

const author = {
  authorName: "Ronnie Kiyegga",
  authorImage: "/images/profile/Ronnie-suit.jpg",
} as const;

const sections: Record<string, ThoughtArticleSection[]> = {
  "responsive-ten-thousand-records": [
    {
      heading: "The average is lying to you",
      paragraphs: [
        "A stall that only appears at peak traffic is rarely a CPU story. It is usually a queueing story that p50 never reports. Averages smooth away the exact moment a lock, a waterfalled fetch, or a saturated connection pool starts holding the line.",
        "If you only look at mean latency, you will ship a dashboard that looks healthy while a slice of users wait on a retry they cannot see. Tail latency is where the product actually fails.",
      ],
    },
    {
      heading: "Trace the wait, not the work",
      paragraphs: [
        "When the stall is intermittent, add spans around waits: lock acquisition, outbound I/O, and anything that can block the event loop. The useful question is not “how long did the handler run?” It is “where did the handler sit still?”",
        "Missing traces are themselves a signal. If a span disappears under load, you are probably dropping telemetry on the same path that is dropping work. Fix the collector before you trust the flame graph.",
      ],
    },
    {
      heading: "Reproduce the shape of traffic",
      paragraphs: [
        "A local loop of 10,000 records is not peak traffic. Peak traffic arrives unevenly, retries, and shares a pool with everything else. Reproduce the burst, the fan-out, and the shared resource — then the stall usually stops being mysterious.",
      ],
    },
  ],
  "streaming-windows": [
    {
      heading: "Saying no is a product decision",
      paragraphs: [
        "A rate limiter is not a middleware nicety. It is the line between a service that degrades and a service that takes the rest of the system with it. The hard part is not counting requests. It is deciding whose requests still matter when you are over budget.",
        "Token buckets are easy to explain and easy to get unfair. A bursty client can empty the bucket and starve everyone else unless you separate fairness from capacity.",
      ],
    },
    {
      heading: "Keep the cheap path cheap",
      paragraphs: [
        "The limiter has to sit on the cheapest path you have. If every decision hits Redis, Redis becomes the outage. Local counters with periodic reconciliation, or an approximate window, are usually enough to protect the origin.",
        "When you do refuse work, refuse it honestly. A 429 with a retry hint is better than a slow 500 that looks like capacity you do not have.",
      ],
    },
    {
      heading: "Measure the refusals",
      paragraphs: [
        "If you cannot see who you are shedding, you will tune the limiter against a ghost. Track allowed, rejected, and retry-after by route and caller. The graph should tell you whether you are protecting the system or just hiding the incident.",
      ],
    },
  ],
  "hicks-law": [
    {
      heading: "The delay is in the decision",
      blocks: [
        {
          type: "p",
          text: "Hick’s Law describes a simple pattern: as the number and complexity of choices increase, deciding generally takes longer. I find it useful because it shifts the question from “Can we fit another option here?” to “What decision are we asking someone to make?”",
        },
        {
          type: "p",
          text: "A long list is not automatically bad. The problem appears when several options look equally important, use similar language, or require someone to understand the product before they can continue. That is when a small interaction starts feeling like work.",
        },
        {
          type: "image",
          src: "/images/editorial/hicks-law/options-comparison.png",
          alt: "Two versions of a mood selector: a focused four-option menu and a longer eight-option menu.",
          width: 1200,
          height: 1500,
        },
      ],
    },
    {
      heading: "Reducing friction is not the same as removing choice",
      blocks: [
        {
          type: "p",
          text: "I do not use Hick’s Law as an excuse to remove useful controls. Sometimes the right answer is a better default. Sometimes it is grouping related actions, using clearer labels, or revealing advanced choices only when they become relevant.",
        },
        {
          type: "p",
          text: "The goal is not the smallest possible interface. It is an interface where the next step is understandable. If every action is given the same visual weight, the user has to create the hierarchy themselves.",
        },
        {
          type: "image",
          src: "/images/editorial/hicks-law/decision-time-curve.png",
          alt: "A Hick’s Law graph showing decision time increasing as the number of choices grows.",
          width: 736,
          height: 736,
        },
      ],
    },
    {
      heading: "How I use it in practice",
      blocks: [
        {
          type: "p",
          text: "When I review a screen, I start with the task rather than the component. What did someone come here to do? Which action should be obvious without explanation? Which choices can wait until the user has more context?",
        },
        {
          type: "list",
          items: [
            "Give the most common action a clear visual priority.",
            "Group related choices instead of presenting one flat list.",
            "Use sensible defaults, but keep them easy to change.",
            "Move specialist options behind progressive disclosure rather than deleting them.",
          ],
        },
        {
          type: "p",
          text: "I would then watch whether people reach the intended action without pausing, backtracking, or opening several controls first. Hick’s Law is not a rule that tells me exactly how many options to show. It is a reminder that every choice has a cost, and the interface should make that cost worthwhile.",
        },
      ],
    },
  ],
  "burst-traffic": [
    {
      heading: "Traffic is not a smooth line",
      paragraphs: [
        "Burst traffic finds the first shared resource and sits on it. That is usually a pool, a lock, or a downstream that was sized for the average. Queueing theory is not optional once the arrival rate stops being polite.",
        "The first thing that breaks is rarely the thing you load-tested. It is the thing everyone shares when they all retry at once.",
      ],
    },
    {
      heading: "Shed before you queue forever",
      paragraphs: [
        "An unbounded queue is a way of turning a spike into an outage that lasts longer than the spike. Cap the queue. Return a clear refusal. Keep writes honest — do not accept work you cannot finish.",
        "If you must buffer, buffer with a deadline. Work that is late is often worse than work that was never accepted.",
      ],
    },
    {
      heading: "Make the burst visible",
      paragraphs: [
        "Plot accepted versus refused versus in-flight. If those three lines do not move together, you do not understand the burst yet. The graph should make the queue’s decision obvious.",
      ],
    },
  ],
  "memory-inclusion": [
    {
      heading: "Remembering is a product claim",
      paragraphs: [
        "A product that remembers context can feel intelligent. The same product can feel haunted when it surfaces a draft, a search, or a person the user was trying to leave behind.",
        "Memory inclusion is the question of what the system is allowed to keep, and when recalling it is worse than forgetting.",
      ],
    },
    {
      heading: "Keep context, not surveillance",
      paragraphs: [
        "The useful memory is usually local and short: the filter they just set, the file they were editing, the step they had not finished. Cross-session recall of sensitive state needs an explicit contract, not a clever default.",
        "If the user cannot see what you stored, they cannot trust what you restore. Show the memory. Let them clear it.",
      ],
    },
    {
      heading: "Expiry is a feature",
      paragraphs: [
        "Infinite retention is an accident, not a strategy. Put a clock on context that is not part of the user’s account. When the clock runs out, the product should feel clean, not forgetful.",
      ],
    },
  ],
  "idempotency-matters": [
    {
      heading: "The retry is the bug",
      paragraphs: [
        "The first time I watched a “simple” create endpoint double-charge a write, the database was not the villain. The client retried. The network had already succeeded. We had no idempotency key, so the second request was a second fact.",
        "Idempotency is how you tell the system that two arrivals are one intention. Without it, every timeout becomes a fork in the data.",
      ],
    },
    {
      heading: "Postgres or DynamoDB is the wrong first question",
      paragraphs: [
        "You can do this with a unique constraint and a request key in Postgres. You can do it with a conditional write in DynamoDB. The storage engine matters less than whether the key is in the contract before the first retry.",
        "Put the key on the wire. Persist the outcome. Return the same result the second time. Then choose the database that already matches the rest of the system.",
      ],
    },
    {
      heading: "Make duplicates boring",
      paragraphs: [
        "If operators cannot tell a duplicate from a new write, you will page people for work that already finished. Log the key. Surface “already applied” as success, not as an error that invites another retry.",
      ],
    },
  ],
  "what-10000-rows-actually-means": [
    {
      heading: "Ten thousand is a rendering problem",
      blocks: [
        {
          type: "p",
          text: "This is the implementation I see most often, including in my own work:",
        },
        {
          type: "code",
          language: "tsx",
          code: `<tbody>
  {events.map((event) => (
    <EventRow key={event.id} event={event} />
  ))}
</tbody>`,
        },
        {
          type: "p",
          text: "The code is reasonable. The problem is scale.",
        },
        {
          type: "p",
          text: "If the viewport only shows 20 or 30 rows, mounting thousands of EventRow components is work for content the user cannot currently see. React still walks the list. The browser still creates nodes, computes layout, and paints.",
        },
        {
          type: "p",
          text: "The pipeline is API, then JavaScript, then React render, then DOM, then layout, then paint. A fast API and a slow table can coexist. Request timing and rendering time are different measurements.",
        },
        {
          type: "p",
          text: "10,000 is not a threshold where React suddenly falls over. A simple row on a desktop machine behaves differently from a dense row with nested controls on a work laptop. Row complexity, DOM structure, device, browser and how often the list updates all change the cost.",
        },
      ],
    },
    {
      heading: "Measure before choosing the optimisation",
      blocks: [
        {
          type: "p",
          text: "\"The table is slow\" is not enough information. It does not tell you whether you are waiting on the network, on React, or on the browser.",
        },
        {
          type: "p",
          text: "The Network panel shows request and transfer time. If the payload is large or the endpoint is slow, the rest of the pipeline has not even started.",
        },
        {
          type: "p",
          text: "React Profiler shows render and commit behaviour. If a poll or a filter rerenders thousands of rows, that is a React cost.",
        },
        {
          type: "p",
          text: "The Performance panel shows main-thread work: scripting, layout, paint. A long layout or paint after a commit is the browser paying for the DOM you just built.",
        },
        {
          type: "p",
          text: "DOM inspection answers a blunt question: how many nodes did we actually mount? If tbody contains 10,000 rows and the user can see 24, you already know a lot.",
        },
        {
          type: "p",
          text: "I use those views to put the cost in one part of the pipeline before I pick a fix. An illustrative example, not a measurement from a specific incident: a 40ms query inside a 400ms frame is still a slow screen.",
        },
      ],
    },
    {
      heading: "Window the work",
      blocks: [
        {
          type: "p",
          text: "If the diagnosis is excessive DOM and render work, the useful move is to stop mounting rows the user cannot see.",
        },
        {
          type: "p",
          text: "Virtualisation keeps the records you already have, and only renders a window: the visible rows plus a small overscan so scrolling does not flash empty space. The dataset can still be 10,000 records. What changes is how much UI exists at once.",
        },
        {
          type: "p",
          text: "This repo does not ship a virtualiser. The snippet below is example code using TanStack Virtual, and only after profiling has already put the cost on DOM and render work.",
        },
        {
          type: "code",
          language: "tsx",
          code: `const ROW_HEIGHT = 44;

const virtualizer = useVirtualizer({
  count: events.length,
  getScrollElement: () => viewportRef.current,
  estimateSize: () => ROW_HEIGHT,
  getItemKey: (index) => events[index].id,
  overscan: 10,
});

const visibleRows = virtualizer.getVirtualItems();`,
        },
        {
          type: "p",
          text: "These rows are fixed-height, so estimating their position is straightforward. If the row height were dynamic, I'd need to measure it rather than relying on the same estimate for every row.",
        },
        {
          type: "p",
          text: "getItemKey is there because the virtualizer tracks items by index unless you tell it otherwise. That matters as soon as the list can be filtered, sorted, or prepended to.",
        },
        {
          type: "diagram",
          label: "Only the visible rows plus overscan are mounted. The rest of the 10,000 records stay in memory.",
          text: `10,000 records

    rows above viewport

┌──────────────────┐
│ visible row      │
│ visible row      │
│ visible row      │
│ visible row      │
└──────────────────┘

    rows below viewport`,
        },
        {
          type: "p",
          text: "The rows above and below are still in events. They are not in the document.",
        },
      ],
    },
    {
      heading: "But should 10,000 records be in the browser?",
      blocks: [
        {
          type: "p",
          text: "Virtualisation answers the render question. It does not answer whether the browser should have received 10,000 records in the first place.",
        },
        {
          type: "p",
          text: "If the user is browsing a historical log, I would rather page or cursor the API:",
        },
        {
          type: "code",
          language: "http",
          code: "GET /events?limit=50&cursor=eyJpZCI6IjEwMDAifQ==",
        },
        {
          type: "p",
          text: "Pagination controls how much data we retrieve. Virtualisation controls how much UI we render. They are not competing solutions. A large enough interface can use both: a paged or filtered payload, then a windowed list if that payload is still too tall to mount.",
        },
        {
          type: "p",
          text: "The right split depends on what the screen is for. Browsing a historical dataset usually wants pagination. Search usually wants server-side filtering. An operational feed may stream new records rather than download a slab. A dashboard may need aggregates, not raw rows.",
        },
        {
          type: "p",
          text: "If the interaction never required the full set, shrinking the request is the cheaper fix.",
        },
      ],
    },
    {
      heading: "The shape of the application changes the problem",
      blocks: [
        {
          type: "p",
          text: "Not every frontend is a large table. Before I pick a React optimisation, I want a clearer picture of what kind of work the interface is doing.",
        },
        {
          type: "p",
          text: "A data-heavy application spends most of its effort ingesting, displaying, filtering, sorting and aggregating information. Analytics dashboards, monitoring tools, admin tables and operational views look like this.",
        },
        {
          type: "p",
          text: "The pressure points tend to be payload size, query strategy, rendering collections, DOM size, expensive transformations, freshness, caching, aggregation, and staying responsive while data changes.",
        },
        {
          type: "p",
          text: "Pagination, server-side filtering, virtualisation, caching, memoisation when a profile shows it is worth it, a worker for genuinely heavy client CPU, and transitions for non-urgent rendering all exist for those bottlenecks. They are not a stack you apply together. Each one addresses a different cost.",
        },
        {
          type: "p",
          text: "A workflow-heavy product is a different shape. Onboarding, booking, checkout, case management, approvals and multi-step admin flows often do not care about 10,000 rows.",
        },
        {
          type: "p",
          text: "The harder problems are the current step, which transitions are valid, persisting progress, recovering after a refresh or a dropped request, validation, duplicate submits, keeping people out of impossible states, permissions, and keeping client state honest against the server.",
        },
        {
          type: "p",
          text: "A bag of booleans is how those products get into trouble:",
        },
        {
          type: "code",
          language: "ts",
          code: `{
  submitted: true,
  approved: false,
  completed: true
}`,
        },
        {
          type: "p",
          text: "Depending on the workflow, that combination should not exist. Making the status explicit is usually enough:",
        },
        {
          type: "code",
          language: "ts",
          code: `type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "completed";`,
        },
        {
          type: "p",
          text: "That is not an argument for a state machine library on every form. It is an argument for not encoding a workflow as independent flags.",
        },
        {
          type: "p",
          text: "A product can be both. A case-management system might have a data-heavy dashboard of thousands of cases, while each case follows a workflow with strict states, permissions and transitions.",
        },
        {
          type: "p",
          text: "In that situation I do not start with which React optimisation to use. I start with what the screen is doing, and where it is constrained.",
        },
        {
          type: "p",
          text: "A large dataset does not automatically mean virtualisation, useMemo, workers or pagination.",
        },
        {
          type: "p",
          text: "First establish where the cost is.",
        },
        {
          type: "p",
          text: "If the browser is mounting thousands of nodes the user cannot see, reduce the rendered window.",
        },
        {
          type: "p",
          text: "If you are transferring more data than the interaction needs, reduce the dataset before it reaches React.",
        },
        {
          type: "p",
          text: "If computation is blocking the main thread, look at the computation.",
        },
        {
          type: "p",
          text: "Choose the tool after you know the bottleneck.",
        },
      ],
    },
  ],
  "10000-concurrent-database-connections": [
    {
      heading: "Connections are not free",
      paragraphs: [
        "Ten thousand concurrent connections is usually a pool-sizing error wearing a scale story. Each connection costs memory on the database and a slot you cannot give to a query that actually needs to run.",
        "The application that opens a connection per request will hit the ceiling long before the data model does.",
      ],
    },
    {
      heading: "Pool, then queue, then refuse",
      paragraphs: [
        "A shared pool with a hard max, a wait timeout, and a clear rejection is how you keep the database alive. An elastic pool that grows with traffic is how you take the database down with you.",
        "If the wait is longer than the user’s patience, refuse. A fast error is cheaper than a connection that sits idle in a pile of other idle connections.",
      ],
    },
    {
      heading: "Postgres and DynamoDB fail differently",
      paragraphs: [
        "Postgres will show you the pile. DynamoDB will throttle and ask you to rethink access patterns. Neither one wants 10,000 chatty clients. Both want fewer, busier connections and a workload you can name.",
      ],
    },
  ],
  "rate-limiter-1m-rps": [
    {
      heading: "A million is a placement problem",
      paragraphs: [
        "You do not rate-limit a million requests a second in the application process that also does the work. The limiter has to sit in front, in memory, and make a decision without a network hop on the hot path.",
        "If the counter lives in the same place as the origin, the origin is already paying for traffic you meant to refuse.",
      ],
    },
    {
      heading: "Approximate is allowed",
      paragraphs: [
        "Exact global counts at this rate are a research project. Sliding windows, Count-Min sketches, and regional limiters that reconcile later will protect the system. Perfect fairness will not.",
        "Decide what you can be wrong about. Being 5% off on a limit is better than being 100% down because the limiter was consistent and slow.",
      ],
    },
    {
      heading: "Test the refuse path",
      paragraphs: [
        "Load tests that never hit the limiter do not test the limiter. Drive traffic past the budget and watch the rejected path: status codes, latency, and whether the origin stays quiet. That silence is the feature.",
      ],
    },
  ],
  "debug-peak-traffic": [
    {
      heading: "Peak is a different program",
      paragraphs: [
        "A bug that only appears at peak traffic is often a race, a pool exhaustion, or a cache that stampedes. You will not see it in a quiet staging environment unless you manufacture the peak.",
        "Start with the resources that become scarce: threads, connections, locks, and downstream quotas. The stack trace from a quiet hour is a different program.",
      ],
    },
    {
      heading: "Keep the evidence",
      paragraphs: [
        "When the incident ends, the process is gone and so is the proof. Continuous profiling, sampled traces, and a core dump policy are how you debug the next peak without waiting for it to last an hour.",
        "If you cannot afford to store everything, store the outliers. Peak bugs live in the tail.",
      ],
    },
    {
      heading: "Change one thing",
      paragraphs: [
        "The temptation is to restart, scale, and patch at once. Then you do not know what fixed it. During the incident, buy time. After it, reproduce with one variable. That is the only way the next peak is cheaper.",
      ],
    },
  ],
  "aggregate-logs-10000-servers": [
    {
      heading: "Loss is a design choice",
      paragraphs: [
        "Aggregating logs from 10,000 servers without loss sounds like a shipping problem. It is a buffering and acknowledgement problem. If a node can fall over before the batch is ack’d, you will lose the only lines that explained the fallover.",
        "At this count, the collector is a distributed system. Treat it like one: backpressure, disk buffers, and a known loss budget when the budget is exceeded.",
      ],
    },
    {
      heading: "Do not make the app wait on logs",
      paragraphs: [
        "Synchronous logging on the request path is how a log outage becomes a product outage. Write locally, ship asynchronously, and fail the ship — not the request — when the pipeline is behind.",
        "The exception is an audit line you cannot lose. That line needs its own durable path, not a shared debug stream.",
      ],
    },
    {
      heading: "Sample the noise, keep the faults",
      paragraphs: [
        "Most of 10,000 servers is repetition. Sample the routine. Keep errors, slow requests, and anything tied to an incident id at full fidelity. The pipeline stays cheap. The investigation stays possible.",
      ],
    },
  ],
  ...productJudgementSections,
};

const articleLede: Partial<Record<string, string[]>> = {
  "what-10000-rows-actually-means": [
    "10,000 records is not particularly unusual for an application. Rendering 10,000 rows in the browser is a different problem.",
    "An analytics endpoint can return quickly and the page can still feel slow. Once the data reaches the client, React still has to render it, and the browser has to create, layout and paint the resulting DOM.",
    "When a large table starts struggling, I do not immediately reach for useMemo or start changing the API. I first want to know where the work is happening.",
  ],
};

function coverFor(slug: string) {
  const isBlueCard =
    slug === featuredInvestigationSlug ||
    featuredThoughts.some((thought) => thought.slug === slug);

  return isBlueCard ? blueCover : tealCover;
}

export function getThoughtArticle(slug: string): ThoughtArticle | undefined {
  const thought = allThoughts.find((item) => item.slug === slug);
  const articleSections = sections[slug];

  if (!thought || !articleSections) {
    return undefined;
  }

  return {
    ...thought,
    ...author,
    image:
      featuredThoughts.find((item) => item.slug === thought.slug)?.image ??
      coverFor(slug),
    lede: articleLede[slug],
    sections: articleSections,
  };
}

export function getAllThoughtArticleSlugs() {
  return allThoughts
    .filter((thought) => sections[thought.slug])
    .map((thought) => ({ slug: thought.slug }));
}

export function getThoughtArticleHeadings(article: ThoughtArticle) {
  return article.sections
    .filter((section) => section.heading.trim().length > 0)
    .map((section) => ({
      text: section.heading,
      slug: slugify(section.heading),
      level: 2 as const,
    }));
}
