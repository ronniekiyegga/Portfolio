import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "Take a job-application tracker that works well on desktop. A candidate can see each application, its interview timeline, the filters and the next action all at once, and that context makes every decision easier.",
    "On a phone, none of it fits. The usual response is to **make everything narrower**: the navigation collapses, cards stack and the table squeezes until it technically fits.",
    "But now the next action and the interview date might be several screens apart, and secondary details appear before the thing the candidate opened the page to do.",
    "That isn’t a width problem. It’s a **priority problem** the smaller screen has exposed. Let’s look at what responsive design actually has to decide once content becomes a single column, touch replaces a pointer and the user has less space and attention.",
  ],
  sections: [
    {
      heading: "Stacking turns order into a decision",
      blocks: [
        {
          type: "p",
          text: "A common responsive transformation looks like this:",
        },
        {
          type: "code",
          language: "text",
          code: `Desktop:
Sidebar · Main content · Context panel

Mobile:
Sidebar becomes menu
Main content stacks
Context panel moves below`,
        },
        {
          type: "p",
          text: "That is often necessary, but it is not sufficient. On desktop, the page may rely on simultaneous visibility:",
        },
        {
          type: "code",
          language: "text",
          code: `Application details
Next action
Interview timeline
Task list
Supporting metadata`,
        },
        {
          type: "p",
          text: "Once those elements become vertical, the order becomes a product decision.",
        },
        {
          type: "code",
          language: "text",
          code: `Application details

Next action

Tasks

Timeline

Supporting metadata`,
        },
        {
          type: "p",
          text: "That order needs a reason: what a person should see first, what should stay fixed, what can move behind a disclosure and what becomes hard to scan once it is separated from the rest. Spacing also carries more of the structure once columns become a sequence: without side-by-side placement, the gaps alone have to show whether the next block continues the previous one or starts something new. Without those answers, the design has only rearranged components.",
        },
      ],
    },
    {
      heading: "Smaller screens expose unclear priority",
      blocks: [
        {
          type: "p",
          text: "Wide screens allow teams to postpone prioritisation. There is room for every panel, every filter, every data point, every action, and every piece of secondary context. A smaller screen removes that luxury. The important question becomes: What is the candidate most likely trying to do here? On a phone, their tasks may include:",
        },
        {
          type: "code",
          language: "text",
          code: `Check the next follow-up
Update an application status
Capture a note after a conversation
Review interview details
Mark a task complete`,
        },
        {
          type: "p",
          text: "Those tasks may need to be easy to reach and quick to complete. Less frequent tasks may remain available without occupying the same visual priority:",
        },
        {
          type: "code",
          language: "text",
          code: `Bulk updates
Complex reporting
Large exports
Deep configuration
Detailed pipeline administration`,
        },
        {
          type: "p",
          text: "The product should not arbitrarily delete features from mobile. It should make common, time-sensitive work easier while keeping complex work possible.",
        },
      ],
    },
    {
      heading: "Tables need a different decision",
      blocks: [
        {
          type: "p",
          text: "Tables show why shrinking is not enough. A desktop table can display:",
        },
        {
          type: "code",
          language: "text",
          code: "Company | Role | Status | Applied | Next action | Source | Salary | Actions",
        },
        {
          type: "p",
          text: "On a phone, squeezing all columns into the same width produces tiny text, unclear relationships, and accidental horizontal scrolling. The obvious fix is often to hide columns. That can be correct, but it raises a product question: Which information is necessary for the user to recognise and act on this record? Possible answers include:",
        },
        {
          type: "code",
          language: "text",
          code: `Show a summary card with company, role, status, and next action.

Show the most important columns and move details into a drill-in view.

Allow horizontal scrolling for expert comparison work.

Give the user control over visible fields.

Use a compact list on mobile and retain the full table on larger screens.`,
        },
        {
          type: "p",
          text: "The correct choice depends on the task. A person comparing financial records may need a table. A person checking the next application action may need a concise list. A responsive breakpoint cannot decide that for you.",
        },
      ],
    },
    {
      heading: "Touch changes interaction cost",
      blocks: [
        {
          type: "p",
          text: "Desktop interactions often assume:",
        },
        {
          type: "code",
          language: "text",
          code: `Pointer precision
Hover states
Dense targets
Keyboard shortcuts
Large visible workspace`,
        },
        {
          type: "p",
          text: "A phone has different conditions:",
        },
        {
          type: "code",
          language: "text",
          code: `Touch input
Limited precision
No persistent hover
Interrupted attention
Variable network quality
One-handed use`,
        },
        {
          type: "p",
          text: "That affects interactions as well as layout. A small icon button that works with a mouse may be difficult to use by touch. A drag-and-drop board may be harder to discover and operate; a tooltip may not exist in the same way. A dense inline-editing pattern may become error-prone. For important actions, the interface needs clear labels, sufficient target size, meaningful confirmation where appropriate, and recoverable error states. Mobile should not feel like a reduced desktop; the workflow needs to be reliable in its actual context.",
        },
      ],
    },
    {
      heading: "Responsive design includes loading and error states",
      blocks: [
        {
          type: "p",
          text: "A layout can look correct in a static design and still fail in use. On smaller screens, check:",
        },
        {
          type: "list",
          items: [
            "Does a long validation message push the primary action too far away?",
            "Does an error appear where the user can see it?",
            "Does a loading state preserve enough context?",
            "Does the user lose entered form data after a network failure?",
            "Can a confirmation state be understood without relying on a wide layout?",
            "Does increased text size break the information order?",
            "Does keyboard navigation still work?",
          ],
        },
        {
          type: "p",
          text: "The browser width is only one dimension of responsiveness. Content length, connection reliability, input method, accessibility settings, and user attention all matter. Checking these at representative phone, tablet and desktop widths does not replace usability research, but it catches layouts that only work with ideal demo content.",
        },
      ],
    },
    {
      heading: "Design the narrow workflow first",
      blocks: [
        {
          type: "p",
          text: "A useful exercise is to design the narrowest layout as a sequence of decisions:",
        },
        {
          type: "code",
          language: "text",
          code: `What is the page?
What is the current state?
What needs attention?
What can the user do next?
What supporting information is needed now?
What can be revealed on demand?`,
        },
        {
          type: "p",
          text: "Then expand that experience for larger screens. This does not mean “mobile first” as a rigid visual rule. It means using constrained space to identify the actual hierarchy before a wide layout makes everything appear equally possible.",
        },
      ],
    },
    {
      heading: "Final thoughts",
      blocks: [
        {
          type: "p",
          text: "A responsive design is not a desktop design that has survived compression. It is an interface that continues to support the user’s task when the screen is narrower, interaction is touch-based, attention is limited, and content must become sequential. When a layout changes at a breakpoint, ask more than “does it fit?” Ask:",
        },
        {
          type: "p",
          text: "“What changed about the user’s work, and does the new order make the next useful action clearer?”",
        },
      ],
    },
  ],
};
