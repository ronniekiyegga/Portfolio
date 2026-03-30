/** Serializable slides for the hero design carousels (passed from Server → Client). */
export type HeroCarouselImageSlide = {
  src: string;
  title: string;
  alt?: string;
};

export type HeroCarouselSlidesProp = {
  up: HeroCarouselImageSlide[];
  down: HeroCarouselImageSlide[];
};
