/** Serializable slides for the hero design carousels (passed from Server → Client). */
export type HeroCarouselImageSlide = {
  src: string;
  title: string;
  alt?: string;
  /**
   * Rich label segments: [PROJECT, DOMAIN, SECTION, YEAR_TAG]
   * The last segment receives the accent colour in the UI.
   * Minimum one segment; typically four.
   */
  caption?: [string, ...string[]];
  /** Whether the project is live or coming soon */
  status?: "live" | "coming-soon";
};

export type HeroCarouselSlidesProp = {
  up: HeroCarouselImageSlide[];
  down: HeroCarouselImageSlide[];
};
