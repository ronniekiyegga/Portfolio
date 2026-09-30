export const designCategories = [
  { slug: "all", title: "All" },
  { slug: "products", title: "Products" },
  { slug: "components", title: "Components" },
  { slug: "web", title: "Web" },
] as const;

export const designSorts = [
  { slug: "latest", title: "Latest" },
  { slug: "oldest", title: "Oldest" },
] as const;

export type DesignCategorySlug = (typeof designCategories)[number]["slug"];
export type DesignSortSlug = (typeof designSorts)[number]["slug"];
export type DesignMediaType = "image" | "video" | "shader";

export type DesignWork = {
  id: string;
  title: string;
  category: Exclude<DesignCategorySlug, "all">;
  type: string;
  mediaType: DesignMediaType;
  src?: string;
  poster?: string;
  aspectRatio: string;
  year: number;
};

function image(
  id: string,
  title: string,
  category: DesignWork["category"],
  type: string,
  aspectRatio: string,
): DesignWork {
  return {
    id,
    title,
    category,
    type,
    mediaType: "image",
    src: `/images/design/${id}.webp`,
    aspectRatio,
    year: 2026,
  };
}

export const designWork: DesignWork[] = [
  image("curriculum-teacher", "Curriculum & tutor card", "components", "Component", "1784 / 1199"),
  image("folder-curriculum", "Curriculum folders", "components", "Component", "1934 / 2094"),
  image("footer", "Site footer", "web", "Footer", "4122 / 3176"),
  image("bio-cards", "Bio cards", "components", "Component", "1987 / 2382"),
  image("curriculum-selection", "Curriculum selection", "web", "Carousel", "3550 / 2292"),
  image("prompt-interface", "Prompt interface", "components", "Component", "2985 / 1358"),
  image("professional-support", "Professional support", "web", "Section", "3390 / 2624"),
  image("pricing-card", "Pricing", "web", "Pricing", "3348 / 2457"),
  image("lesson-pill", "Lesson pill", "components", "Component", "2382 / 1359"),
  image("lesson-pill-dropdown", "Lesson pill dropdown", "components", "Component", "2382 / 2524"),
  image("notification", "Notification", "components", "Component", "2361 / 1747"),
  image("stat-card", "Stat card", "components", "Component", "2149 / 1757"),
  image("online-lesson", "Online lesson", "products", "Product", "2382 / 2313"),
  image("student-ranking", "Student ranking & chat", "products", "Dashboard", "2472 / 2071"),
  image("dropdown-performance", "Onboarding & performance", "products", "Dashboard", "2798 / 2070"),
  image("navigation", "Side navigation", "products", "Navigation", "2499 / 2247"),
  image("update-card", "Update card", "products", "Product", "1264 / 1829"),
  image("command", "Command palette", "components", "Component", "1614 / 1827"),
  image("file-uploader-calendar", "File uploader & calendar", "products", "Product", "2719 / 1827"),
  image("ai-assist-pill", "AI assist pill", "components", "Component", "2324 / 1684"),
  image("command-student-bio", "Command & student bio", "products", "Product", "3180 / 2137"),
  image("testimonials", "Testimonials", "web", "Section", "2994 / 2373"),
  image("studio-bio", "Studio bio", "components", "Component", "2802 / 1953"),
  image("chart", "Ranking chart", "components", "Component", "2802 / 3157"),
  image("design-collection", "Design collection", "products", "Product", "4392 / 3482"),
  image("truefounders-footer", "True Founders footer", "web", "Footer", "2801 / 1755"),
];

export const designCategoryLabels = {
  products: "Product",
  components: "Component",
  web: "Web",
} as const;

export function filterDesignWork(
  items: DesignWork[],
  category: DesignCategorySlug,
) {
  return category === "all"
    ? items
    : items.filter((item) => item.category === category);
}

export function sortDesignWork(items: DesignWork[], sort: DesignSortSlug) {
  return [...items].sort((a, b) =>
    sort === "latest" ? b.year - a.year || a.title.localeCompare(b.title) : a.year - b.year || a.title.localeCompare(b.title),
  );
}
