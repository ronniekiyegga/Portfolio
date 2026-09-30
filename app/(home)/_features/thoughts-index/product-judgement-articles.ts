import type { ThoughtArticleSection } from "./thought-articles";

export const productJudgementSections: Record<string, ThoughtArticleSection[]> =
  {
    "visual-hierarchy": [
      {
        heading: "Hierarchy starts with the task",
        paragraphs: [
          "A screen can contain all the right information and still be difficult to use.",
          "I normally start by asking what someone came to this screen to do. That gives me a rough order of importance before I touch font sizes, colours or cards.",
          "On a booking page, the available time might matter more than the tutor biography. On an analytics dashboard, the exception requiring action might matter more than the total number of records.",
          "The interface should reflect that order.",
        ],
      },
      {
        heading: "Use fewer signals",
        paragraphs: [
          "Size, weight, colour, contrast, spacing and position can all create hierarchy.",
          "Using all of them at once usually creates noise.",
          "If something already has a larger heading and more space around it, it probably doesn't also need a bright background, border and icon.",
          "I try to use the smallest number of visual signals needed to make the hierarchy obvious.",
        ],
      },
      {
        heading: "The squint test",
        paragraphs: [
          "One check I use is to zoom out or squint at the interface until I can't properly read the text.",
          "The content disappears, but the hierarchy remains.",
          "I should still be able to tell where the page starts, what the main action is, which elements belong together and where my attention should move next.",
          "If everything has roughly the same visual weight, I probably haven't made enough decisions yet.",
        ],
      },
    ],
    "spacing-information-architecture": [
      {
        heading: "Space creates relationships",
        paragraphs: [
          "I used to think about spacing mostly as polish. I now treat it as part of how the interface communicates structure.",
          "Elements that belong together should generally sit closer together than elements belonging to different groups.",
          "That sounds simple, but it can remove a surprising amount of UI.",
          "A heading, value and supporting label with good internal spacing may already read as a group. It doesn't automatically need a card around it.",
        ],
      },
      {
        heading: "Not everything needs a container",
        blocks: [
          {
            type: "p",
            text: "It's easy for dashboards to become:",
          },
          {
            type: "diagram",
            label: "A dashboard made of four cards in a row.",
            text: "card → card → card → card",
          },
          {
            type: "p",
            text: "Borders and backgrounds can help establish structure, but they also add visual weight.",
          },
          {
            type: "p",
            text: "Before adding another container, I'll usually try spacing first.",
          },
          {
            type: "p",
            text: "If proximity alone communicates the grouping, the border isn't doing useful work.",
          },
        ],
      },
      {
        heading: "Consistency makes the interface predictable",
        paragraphs: [
          "The exact spacing value matters less than having a system.",
          "If similar relationships use similar spacing, people start understanding the structure without consciously thinking about it.",
          "That is why I prefer working from a small spacing scale rather than choosing a new value every time something looks slightly off.",
        ],
      },
    ],
    "empty-state-first": [
      {
        heading: "Real products spend time between states",
        blocks: [
          {
            type: "p",
            text: "It's easy to design a dashboard with perfect data.",
          },
          {
            type: "p",
            text: "Real interfaces also have:",
          },
          {
            type: "list",
            items: [
              "no data yet",
              "loading",
              "partial data",
              "failed requests",
              "permission restrictions",
              "filtered results with zero matches",
            ],
          },
          {
            type: "p",
            text: "Those states aren't edge decoration. They're part of the product.",
          },
        ],
      },
      {
        heading: "Empty should explain why",
        paragraphs: [
          "\u201cNo results\u201d doesn't tell me very much.",
          "There is a difference between \u201cYou haven't created anything yet.\u201d and \u201cNothing matches these filters.\u201d",
          "The first might need a creation action. The second probably needs a way to clear or change the filters.",
          "Same empty table. Completely different next action.",
        ],
      },
      {
        heading: "Design the recovery",
        paragraphs: [
          "I try to ask one question for each state: what can the user do next?",
          "A useful error state might offer retry. An empty search can offer clear filters. A first-use state can explain what will appear here and how to create it.",
          "Thinking about those states while designing usually exposes product decisions that a polished happy-state mockup hides.",
        ],
      },
    ],
    "responsive-not-shrinking": [
      {
        heading: "The layout should change before it breaks",
        paragraphs: [
          "Making a desktop layout narrower isn't really responsive design.",
          "A four-column dashboard eventually becomes three columns, then two, then one. But sometimes the problem isn't the number of columns.",
          "The desktop version may depend on information being visible side by side.",
          "Once that relationship disappears, simply stacking everything can make the workflow much harder to understand.",
        ],
      },
      {
        heading: "Preserve priority, not position",
        blocks: [
          {
            type: "p",
            text: "I care more about preserving the hierarchy than preserving the exact layout.",
          },
          {
            type: "p",
            text: "On desktop, this might work perfectly:",
          },
          {
            type: "diagram",
            label: "Desktop layout with filters, results and details side by side.",
            text: "Filters | Results | Details",
          },
          {
            type: "p",
            text: "On mobile, the useful experience could instead be this, with filters behind a temporary control:",
          },
          {
            type: "diagram",
            label: "Mobile flow from results, to opening an item, to its details.",
            text: "Results → open item → Details",
          },
          {
            type: "p",
            text: "The information hasn't changed. Its presentation has changed around the user's available space and likely task.",
          },
        ],
      },
      {
        heading: "Content decides the breakpoint",
        paragraphs: [
          "I don't want a component to become mobile because a framework says 768px.",
          "I want it to change when its current layout stops working.",
          "That might be when labels wrap badly, controls become cramped, a table loses useful context or the primary action gets pushed somewhere awkward.",
          "The breakpoint should follow the content.",
        ],
      },
    ],
    "design-systems-remove-decisions": [
      {
        heading: "A component isn't a design system",
        blocks: [
          {
            type: "p",
            text: "Having a Button.tsx, Card.tsx and Modal.tsx folder doesn't automatically give a product a design system.",
          },
          {
            type: "p",
            text: "The useful part is the shared decision behind them:",
          },
          {
            type: "list",
            items: [
              "How does focus look?",
              "How much spacing belongs between related controls?",
              "What does destructive mean?",
              "How do loading and disabled states behave?",
              "What happens when text is longer than expected?",
            ],
          },
          {
            type: "p",
            text: "Those decisions are what make reuse valuable.",
          },
        ],
      },
      {
        heading: "Abstract after the pattern appears",
        paragraphs: [
          "I don't want to turn every repeated rectangle into a reusable component.",
          "Two things can look similar while having completely different responsibilities.",
          "I'd rather see a pattern appear across the product, understand what actually stays consistent, and then extract the right boundary.",
          "Otherwise the abstraction starts dictating the product instead of supporting it.",
        ],
      },
      {
        heading: "Consistency buys attention",
        paragraphs: [
          "The biggest benefit isn't fewer lines of CSS.",
          "If familiar controls behave consistently, users don't have to relearn them on every screen.",
          "The same is true for engineers and designers. Solved decisions stay solved, leaving more attention for the parts of the product that are genuinely different.",
        ],
      },
    ],
  };
