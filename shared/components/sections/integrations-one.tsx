import {
  Gemini,
  GooglePaLM,
  Replit,
  MediaWiki,
  MagicUI,
  VSCodium,
} from "@/shared/components/media/logos";

import Image from "next/image";

export const TECH_ICONS = [
  { src: "/images/icons/Figma_Icon.svg", alt: "Figma" },
  { src: "/images/icons/React_Icon.svg", alt: "React" },
  { src: "/images/icons/Nextjs_Icon.svg", alt: "Nextjs" },
  { src: "/images/icons/Python_Icon.svg", alt: "Python" },
  { src: "/images/icons/Typescript_Icon.svg", alt: "TypeScript" },
  { src: "/images/icons/Docker_Icon.svg", alt: "Docker" },
  { src: "/images/icons/Redis_Icon.svg", alt: "Redis" },
  { src: "/images/icons/Slack_Icon.svg", alt: "Slack" },
  { src: "/images/icons/Github_Actions_Icon.svg", alt: "GitHub Actions" },
  { src: "/images/icons/Nginx_Icon.svg", alt: "Nginx" },
  { src: "/images/icons/Nodejs_Icon.svg", alt: "Nodejs" },
  { src: "/images/icons/TensorFlow_Icon.svg", alt: "TensorFlow" },
] as const;

export type TechIconKey = (typeof TECH_ICONS)[number]["alt"];

export default function Integrations({
  variant = "default",
  icons,
}: {
  variant?: "default" | "inline";
  /** When provided, only show these icons (by alt name). Use [] for none, omit for all. */
  icons?: TechIconKey[];
}) {
  const displayIcons =
    icons === undefined
      ? TECH_ICONS
      : TECH_ICONS.filter((icon) => icons.includes(icon.alt));

  if (variant === "inline") {
    if (displayIcons.length === 0) return null;
    return (
      <span className="inline-flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          Tech Stack:
        </span>
        <span className="inline-flex flex-wrap items-center gap-3 divide-x divide-neutral-300 *:pr-3 dark:divide-neutral-600">
          {displayIcons.map(({ src, alt }) => (
            <span key={alt} className="flex items-center ">
              <Image
                src={src}
                alt={alt}
                width={18}
                height={18}
                className="size-5 object-contain"
              />
            </span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <section className="dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-muted-foreground font-medium">Built with : </p>
          <div className="max-w-2xs flex flex-wrap gap-3 divide-x *:pr-3">
            <div>
              <Gemini className="m-auto size-5" />
            </div>
            <div>
              <GooglePaLM className="m-auto size-5" />
            </div>
            <div>
              <Replit className="m-auto size-5" />
            </div>
            <div>
              <MediaWiki className="m-auto size-5" />
            </div>
            <div>
              <MagicUI className="m-auto size-5" />
            </div>
            <div>
              <VSCodium className="m-auto size-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
