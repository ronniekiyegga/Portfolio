/** Serializable slides for the hero design carousels (passed from Server → Client). */
export type HeroCarouselImageSlide = {
  src: string;
  title: string;
  alt?: string;
  /** Two-word label derived from filename, e.g. ["TRUEFOUNDERS", "CHOOSE"] */
  caption?: [string, string];
  /** Whether the project is live or coming soon */
  status?: "live" | "coming-soon";
};

export type HeroCarouselSlidesProp = {
  up: HeroCarouselImageSlide[];
  down: HeroCarouselImageSlide[];
};
