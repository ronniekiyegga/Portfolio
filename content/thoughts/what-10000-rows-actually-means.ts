import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "An analytics page receives 10,000 records in a few hundred milliseconds, yet the loading indicator disappears only to leave the interface frozen. Scrolling stutters, filters take seconds to respond and the browser’s main thread stays busy long after the network request has finished.",
    "Because the symptom appears in a React table, the first suggestions are usually to memoise the rows or change the API. Either might help in the right situation, but the fast response has already told us something important: retrieving the data and presenting it are separate pieces of work.",
    "React still has to create thousands of elements, and the browser still has to build, lay out and paint their DOM nodes even though the viewport can show only a few dozen rows. Before choosing an optimisation, I want to place the cost in that pipeline. Once we know whether time is going to transfer, render, layout or paint, the correct boundary for the fix becomes much clearer.",
  ],
  sections: [
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
          text: "If the viewport only shows a few dozen rows, mounting thousands of EventRow components is work for content the user cannot currently see. React still walks the list. The browser still creates nodes, computes layout, and paints.",
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
          text: "DOM inspection answers a blunt question: how many nodes did we actually mount? If tbody contains 10,000 rows and the user can see a few dozen, you already know a lot.",
        },
        {
          type: "p",
          text: "I use those views to put the cost in one part of the pipeline before I pick a fix. For example, a 40ms query followed by a 400ms long task on the main thread still makes a slow screen.",
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
          text: "The snippet below uses TanStack Virtual as an example, and it only makes sense once profiling has put the cost on DOM and render work.",
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
          text: `10,000 records

    rows above viewport

┌──────────────────┐
│ visible row      │
│ visible row      │
│ visible row      │
│ visible row      │
└──────────────────┘

    rows below viewport`,
          label: "Only the visible rows plus overscan are mounted. The rest of the 10,000 records stay in memory.",
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
};
