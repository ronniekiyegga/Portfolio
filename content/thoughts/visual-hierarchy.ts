import type { ThoughtArticleContent } from "./types";

export const content: ThoughtArticleContent = {
  lede: [
    "A page feels busy. There are cards, status labels, buttons, metrics, filters, headings, helper text, navigation, and warnings. The information is all technically present, but the page does not feel easy to use. The obvious response is usually visual:",
    "“Make the important thing bigger.”",
    "The primary button becomes larger; the heading gains more weight; the warning turns brighter red. A card gets a stronger border; then another element is made prominent because it is also important. Soon, the interface contains several “most important” things. Nothing is easier to understand. That is because visual hierarchy is not the act of making an element larger. It is the decision about what a user should notice, understand, and act on first.",
  ],
  sections: [
    {
      heading: "The obvious solution: make the primary action louder",
      blocks: [
        {
          type: "p",
          text: "A larger button can be useful; if a user arrives at an empty dashboard and the intended first action is to add their first record, a clear primary action should be visible. Making it visually distinct removes hesitation. The problem appears when the screen has multiple competing goals. Consider an application-management screen:",
        },
        {
          type: "code",
          language: "text",
          code: `Application status
Interview scheduled

Next action
Prepare examples for technical interview

View interview
Edit application
Archive
Delete`,
        },
        {
          type: "p",
          text: "The actions do not have equal consequences. “View interview” supports the immediate user goal. “Edit application” is useful but less urgent. “Archive” changes what appears in the active pipeline. “Delete” is destructive. Making all four buttons equally prominent is visually neutral, but product-wise it is misleading. It asks the user to work out the hierarchy themselves. Making each button large only increases the noise.",
        },
      ],
    },
    {
      heading: "The hidden problem: the page has not decided what matters now",
      blocks: [
        {
          type: "p",
          text: "A page can contain many important things without needing to foreground all of them at once. The question is not:",
        },
        {
          type: "p",
          text: "“Which component deserves the strongest visual treatment?”",
        },
        {
          type: "p",
          text: "It is:",
        },
        {
          type: "p",
          text: "“What decision does the user need to make on this screen, in this state?”",
        },
        {
          type: "p",
          text: "That question changes the hierarchy. For a candidate preparing for an interview, the most useful attention order may be:",
        },
        {
          type: "code",
          language: "text",
          code: `1. What role and company is this?
2. What is happening next?
3. When is it happening?
4. What preparation is due?
5. What action can I take now?
6. What history or metadata might help?`,
        },
        {
          type: "p",
          text: "For a payment-failure screen, the order changes:",
        },
        {
          type: "code",
          language: "text",
          code: `1. Is my subscription active?
2. What failed?
3. What must I do to recover?
4. What happens if I do nothing?
5. Where can I get help?`,
        },
        {
          type: "p",
          text: "The interface should not force users to discover that order by reading every item on the page.",
        },
      ],
    },
    {
      heading: "Size is only one hierarchy signal",
      blocks: [
        {
          type: "p",
          text: "The easiest hierarchy tool to notice is size, but it is not the only one, and it is often not the most effective. Users also notice:",
        },
        {
          type: "list",
          items: [
            "Position in the reading flow",
            "Whitespace around an element",
            "Contrast against its surroundings",
            "Typography weight",
            "Surface treatment",
            "Grouping",
            "Alignment",
            "Motion, used carefully",
            "The number of competing elements",
            "The order in which information appears",
          ],
        },
        {
          type: "p",
          text: "A primary action can be clear because it is the only filled button in a stable location. A warning can be prominent because it appears beside the action it affects. A status can be easy to scan because its colour, label, and placement are consistent across the product. The user should not need a giant button to understand what they need to do.",
        },
      ],
    },
    {
      heading: "The better approach: design an attention order",
      blocks: [
        {
          type: "p",
          text: "I find it useful to write the intended reading order before changing the interface.",
        },
        {
          type: "code",
          language: "text",
          code: `Where am I?
What is the current state?
What needs attention?
What should I do next?
What information helps me make that decision?
What can wait?`,
        },
        {
          type: "p",
          text: "This exercise reveals when a page contains unresolved product decisions; if two different actions both appear to be primary, the issue may not be styling. The workflow may need a clearer sequence. If a dashboard puts a decorative chart above overdue work, the issue may not be the chart’s colour. The screen may be optimising for presentation rather than action. If a destructive action needs the same visual weight as a routine action to remain discoverable, the product may need to move it into a more appropriate context.",
        },
        {
          type: "p",
          text: "Hierarchy starts with product priority; visual treatment makes that priority legible.",
        },
      ],
    },
    {
      heading: "Different states need different hierarchy",
      blocks: [
        {
          type: "p",
          text: "A page should not keep the same visual emphasis in every state. A normal state may foreground ongoing work; an error state may need to foreground recovery. A completed state may need to reassure the user that nothing more is required.",
        },
        {
          type: "code",
          language: "text",
          code: `Normal:
Show the current work and next action.

Loading:
Show that the system is still determining state.

Error:
Show what failed and how the user can recover.

Empty:
Explain the product area and offer the first useful action.

Complete:
Confirm the outcome and show what, if anything, happens next.`,
        },
        {
          type: "p",
          text: "A subtle inline error might be appropriate for a missing optional field. It is not appropriate for a failed payment, lost booking confirmation, or access problem that prevents the user continuing. The visual hierarchy should match the consequence of missing the information.",
        },
      ],
    },
    {
      heading: "Density is not the opposite of clarity",
      blocks: [
        {
          type: "p",
          text: "The response to hierarchy problems is sometimes to add more whitespace and make every section larger. That can be useful for onboarding or a focused one-step task. It is not always appropriate for operational software. People using an application dashboard, case-management tool, monitoring screen, or admin interface may need to compare many items quickly. They need density, but they also need stable patterns. A dense interface can still be clear when it has:",
        },
        {
          type: "code",
          language: "text",
          code: `A visible page purpose
Consistent status treatment
Clear grouping
A stable primary action
Quiet secondary metadata
Obvious exceptions
Predictable placement of controls`,
        },
        {
          type: "p",
          text: "The goal is not to minimise information; the goal is to make the important information survive the density.",
        },
      ],
    },
    {
      heading: "Test whether people can find the right thing",
      blocks: [
        {
          type: "p",
          text: "Visual hierarchy should be tested as a task, not only reviewed as a screenshot. Ask someone unfamiliar with the page:",
        },
        {
          type: "list",
          items: [
            "What is this page for?",
            "What needs attention first?",
            "What would you do next?",
            "Which action feels risky?",
            "What happened after you completed the action?",
            "What information would you ignore for now?",
          ],
        },
        {
          type: "p",
          text: "If people have to inspect the entire screen carefully before answering, the hierarchy is doing too little work. The practical lesson is simple: Visual hierarchy is not making one element louder, but it is making the next useful decision easier to find. When the product knows what matters now, the design can make that clear. When the product does not know, no amount of larger type or brighter buttons will resolve the ambiguity.",
        },
      ],
    },
  ],
};
