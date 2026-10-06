import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A screen feels cramped; the instinct is understandable:",
    "“Give everything more room.”",
    "Cards gain padding; sections gain larger gaps. Headings become more separated from content; the page begins to look calmer. Sometimes that is the right fix. Sometimes it only makes an unclear interface slower to scan. Whitespace is powerful because it tells users what belongs together and what does not. But if the structure is wrong, more space cannot make it right. The better question is not:",
    "“How much space should we add?”",
    "It is:",
    "“Which things belong together, and what relationship should the user understand?”",
  ],
  sections: [
    {
      heading: "The obvious solution: add more margin",
      blocks: [
        {
          type: "p",
          text: "Spacing can absolutely improve readability; a form with labels pressed against inputs is difficult to scan. A dashboard with no separation between cards becomes visually noisy; a destructive action placed too close to a safe routine action can invite mistakes. Adding space works because proximity communicates relationship.",
        },
        {
          type: "code",
          language: "text",
          code: `Label
Input`,
        },
        {
          type: "p",
          text: "should feel like one unit.",
        },
        {
          type: "code",
          language: "text",
          code: `Personal details

Billing preferences`,
        },
        {
          type: "p",
          text: "should feel like separate sections.",
        },
        {
          type: "code",
          language: "text",
          code: `Save changes
Cancel`,
        },
        {
          type: "p",
          text: "should feel connected to the form they affect; the problem begins when spacing becomes the answer to every organisational issue.",
        },
      ],
    },
    {
      heading: "The hidden problem: the screen has not decided what is grouped",
      blocks: [
        {
          type: "p",
          text: "Consider a page with:",
        },
        {
          type: "code",
          language: "text",
          code: `Application status
Interview scheduled
Next action
Prepare examples
Interview date
Thursday at 10:00
Archive application`,
        },
        {
          type: "p",
          text: "If these items are simply stacked with arbitrary gaps, users must infer the relationships. Does “Prepare examples” belong to the next action or the interview date? Is “Archive application” part of the status section or a separate account-level action? Is the date a property of the application or the next action? No amount of additional margin answers those questions reliably. The content needs a structure first:",
        },
        {
          type: "code",
          language: "text",
          code: `Current status
Interview scheduled

Next action
Prepare examples by Wednesday

Upcoming interview
Thursday, 10:00–11:00

Application management
Archive`,
        },
        {
          type: "p",
          text: "The spacing then reinforces meaningful groups instead of trying to invent them.",
        },
      ],
    },
    {
      heading: "The better question: what relationship does this gap represent?",
      blocks: [
        {
          type: "p",
          text: "A spacing scale is useful when it encodes relationships; for example:",
        },
        {
          type: "code",
          language: "text",
          code: `Small gap:
label and input, icon and text, related metadata

Medium gap:
sibling fields, controls within one section

Large gap:
separate content groups

Extra-large gap:
major page regions or workflow stages`,
        },
        {
          type: "p",
          text: "The exact pixel values matter less than the consistency of the meaning. If 8px sometimes means “these items are tightly related” and elsewhere means “these are separate page sections,” the user loses a quiet but valuable cue. A design system should not merely offer a set of possible gaps. It should help the team use spacing as a language.",
        },
      ],
    },
    {
      heading: "Why perfectly even spacing can be wrong",
      blocks: [
        {
          type: "p",
          text: "A common attempt at making a page feel organised is to make every gap equal. That looks orderly, but it can flatten hierarchy.",
        },
        {
          type: "code",
          language: "text",
          code: `Heading
16px
Status
16px
Next action
16px
Task details
16px
Section heading
16px
Footer actions`,
        },
        {
          type: "p",
          text: "The user sees a sequence of equally important items, but real information has different levels of relatedness.",
        },
        {
          type: "code",
          language: "text",
          code: `Heading
8px
Supporting description

24px
Current status
8px
Status value

32px
Next action
8px
Action detail

48px
History`,
        },
        {
          type: "p",
          text: "The different gaps tell the reader which items form a unit and where a new idea begins. Equal spacing is not always neutral, and it can obscure the product’s intended structure.",
        },
      ],
    },
    {
      heading: "More whitespace can reduce operational usefulness",
      blocks: [
        {
          type: "p",
          text: "Whitespace is often associated with good design because it is visible in marketing pages and editorial layouts. Operational interfaces have different constraints. Someone reviewing many applications, invoices, support cases, bookings, or alerts may need to compare information quickly. If every record becomes a large card with broad empty areas, the user sees less context at once and spends more time scrolling. The answer is not to eliminate space, but to make density intentional. A dense table can still be readable when it uses:",
        },
        {
          type: "code",
          language: "text",
          code: `Consistent column alignment
Predictable row height
Quiet secondary metadata
Clear status treatment
Stable grouping
A visible selected or focused state
Meaningful separation between rows and sections`,
        },
        {
          type: "p",
          text: "Space should help the user scan, and it should not make the product feel spacious at the expense of the work the user needs to do.",
        },
      ],
    },
    {
      heading: "Responsive layouts make spacing decisions visible",
      blocks: [
        {
          type: "p",
          text: "Desktop layouts can use columns to express grouping; on a smaller screen, those columns become a vertical sequence. That means spacing now carries more responsibility.",
        },
        {
          type: "code",
          language: "text",
          code: `Desktop:
Details · Next action
Timeline · Tasks

Mobile:
Details
Next action
Tasks
Timeline`,
        },
        {
          type: "p",
          text: "The gaps on mobile must make the new reading order understandable. A uniform vertical stack can leave users unsure whether a section is a continuation of the previous one or a separate concept. Responsive spacing is not just smaller spacing, but it is spacing that supports a changed information architecture.",
        },
      ],
    },
    {
      heading: "The practical test",
      blocks: [
        {
          type: "p",
          text: "A useful review question is: If the borders disappeared, would the spacing still explain the structure? If the answer is no, the layout may be relying on decorative containers rather than clear grouping. I also ask:",
        },
        {
          type: "list",
          items: [
            "Does each heading clearly introduce the content below it?",
            "Are labels visibly connected to the fields they describe?",
            "Are related actions grouped?",
            "Is a destructive action distinct from routine actions?",
            "Does the layout still make sense with longer content?",
            "Can someone scan the screen without reading every word?",
          ],
        },
        {
          type: "p",
          text: "The practical lesson: Whitespace is not a cosmetic gap, but it is a structural signal. Use it after you have decided what belongs together; if the screen is unclear, fix the product structure first. Then let spacing make that structure easier to read.",
        },
      ],
    },
  ],
};
