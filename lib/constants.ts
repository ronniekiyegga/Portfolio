export type ToolFigureId =
  | "figma"
  | "react"
  | "typescript"
  | "nodejs"
  | "aws"
  | "ronnie"
  | "postgresql"
  | "python";

export type ToolDefinition = {
  name: string;
  gradient: string;
  glyph?: "white" | "color";
  surfaceShadow?: string;
  glyphShadow?: string;
  iconGradient?: string;
  icon?: string;
  iconClassName?: string;
  figure?: ToolFigureId;
};

export const sectionLinks = [
  { label: "About", href: "#about-heading", figure: "book", hideOnMobile: false },
  { label: "Experience", href: "#experience-heading", figure: "analytics", hideOnMobile: false },
  { label: "Education", href: "#education-heading", figure: "graduate", hideOnMobile: false },
  { label: "Design Case Studies", href: "#interfaces-heading", figure: "usecases", hideOnMobile: true },
] as const;

export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/ronniekiyegga";

export const socialLinks = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: "https://linkedin.com/in/ronniekiyegga" },
] as const;

export const tools: ToolDefinition[] = [
  {
    name: "Figma",
    glyph: "color",
    figure: "figma",
    gradient:
      "radial-gradient(100% 45% at 50% 50%, #fff 30%, rgb(255 255 255 / 40%) 100%)",
  },
  {
    name: "React",
    figure: "react",
    gradient: "linear-gradient(144deg, #ac5dd9 3.63%, #004fc4 94.05%)",
    glyphShadow:
      "drop-shadow(0 0.75px 0.55px rgb(31 25 87 / 42%)) drop-shadow(0 2px 2.5px rgb(31 25 87 / 18%))",
  },
  {
    name: "TypeScript",
    figure: "typescript",
    gradient: "linear-gradient(77deg, #3a07f2 10.26%, #0cd1cf 98.05%)",
    surfaceShadow: "0 20px 40px 2px rgb(0 0 0 / 8%)",
    glyphShadow:
      "drop-shadow(0 0 0 rgb(45 48 51 / 76%)) drop-shadow(0 1px 2px rgb(37 17 79 / 40%))",
  },
  {
    name: "Tailwind CSS",
    icon: "/images/icons/Tailwind_Icon.svg",
    glyph: "color",
    gradient: "linear-gradient(90deg, #f7f0ac 0%, #acf7f0 50%, #f0acf7 100%)",
    surfaceShadow: "0 20px 40px 2px rgb(0 0 0 / 8%)",
    glyphShadow:
      "drop-shadow(0 1px 0.65px rgb(14 122 197 / 38%)) drop-shadow(0 3px 3px rgb(14 122 197 / 16%))",
  },
  {
    name: "Node.js",
    figure: "nodejs",
    glyph: "color",
    gradient:
      "linear-gradient(297deg, #3d3393 8.3%, #2b76b9 35.59%, #2cacd1 63.24%, #35eb93 91.67%)",
    glyphShadow:
      "drop-shadow(0 0 0 rgb(45 48 51 / 76%)) drop-shadow(0 1px 2px rgb(37 17 79 / 40%))",
  },
  {
    name: "Amazon Web Services",
    glyph: "color",
    figure: "aws",
    gradient:
      "linear-gradient(282deg, rgb(143 168 255 / 20%) 8.49%, rgb(0 0 0 / 0%) 41.39%), linear-gradient(137deg, #ffe195 -6.74%, rgb(242 187 90 / 88%) 3.22%, rgb(191 122 0 / 75%) 13.48%, rgb(191 122 0 / 0%) 49.53%, rgb(15 18 24 / 0%) 49.53%)",
  },
  {
    name: "Next.js",
    icon: "/images/icons/Nextjs_Icon.svg",
    glyph: "color",
    gradient:
      "linear-gradient(181deg, #000010 7.5%, #051830 32.24%, #3e5169 51.33%, #051830 67.82%, #000010 92.55%)",
    glyphShadow: "drop-shadow(0 2px 2px rgb(0 0 0 / 40%))",
  },
  {
    name: "Docker",
    icon: "/images/icons/Docker_Icon.svg",
    glyph: "color",
    gradient: "linear-gradient(180deg, #fbfbfb 68.72%, #e1e7fb 130.66%)",
    glyphShadow: "drop-shadow(0 1px 1px rgb(44 91 170 / 25%))",
  },
  {
    name: "Ronnie design system",
    figure: "ronnie",
    gradient: "linear-gradient(144deg, #ff3b3b 3.63%, #60c 94.05%)",
    glyphShadow:
      "drop-shadow(0 1px 0.7px rgb(49 18 91 / 38%)) drop-shadow(0 3px 3px rgb(49 18 91 / 18%))",
  },
  {
    name: "GitHub Actions",
    icon: "/images/icons/Github_Actions_Icon.svg",
    gradient: "linear-gradient(144deg, #ac5dd9 3.63%, #004fc4 94.05%)",
    iconGradient:
      "linear-gradient(135deg, #fff 54.8%, rgb(251 233 217 / 59%) 69.69%, #dedaf9 86.6%, rgb(240 172 247 / 76%) 97.21%)",
    glyphShadow:
      "drop-shadow(0 1px 0.8px rgb(38 45 126 / 48%)) drop-shadow(0 3px 3px rgb(38 45 126 / 22%))",
  },
  {
    name: "PostgreSQL",
    figure: "postgresql",
    gradient:
      "linear-gradient(87deg, #9cecfb -45.69%, #65c7f7 25.96%, #0a40ff 97.6%)",
    glyphShadow: "drop-shadow(0 4px 11.1px rgb(0 0 0 / 10%))",
  },
  {
    name: "Python",
    figure: "python",
    glyph: "color",
    gradient: "linear-gradient(35deg, #7c14b8 11.9%, #6ae5e6 85.98%)",
    glyphShadow: "drop-shadow(0 1px 1px rgb(42 89 151 / 24%))",
  },
];
