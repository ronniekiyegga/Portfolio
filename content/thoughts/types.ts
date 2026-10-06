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

/** The authored body of one article. Index metadata lives in thoughts.ts. */
export type ThoughtArticleContent = {
  lede?: string[];
  sections: ThoughtArticleSection[];
};
