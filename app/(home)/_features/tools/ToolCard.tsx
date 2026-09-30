import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

export type ToolCardProps = {
  name: string;
  gradient: string;
  glyph?: "white" | "color";
  surfaceShadow?: string;
  glyphShadow?: string;
  iconGradient?: string;
  icon?: string;
  mark?: string;
  iconClassName?: string;
  figure?: ReactNode;
};

export function ToolCard({
  name,
  gradient,
  glyph = "white",
  surfaceShadow = "none",
  glyphShadow,
  iconGradient,
  icon,
  mark,
  iconClassName,
  figure,
}: ToolCardProps) {
  return (
    <li aria-label={name} title={name}>
      <div className="toolCard">
        <div
          className="toolIcon"
          aria-hidden="true"
          style={
            {
              "--tool-gradient": gradient,
              "--tool-surface-shadow": surfaceShadow,
              ...(glyphShadow
                ? { "--tool-glyph-shadow": glyphShadow }
                : null),
            } as CSSProperties
          }
        >
          <div
            className={
              glyph === "white"
                ? "toolGlyph is-white"
                : "toolGlyph"
            }
          >
            {figure ??
              (icon ? (
                iconGradient ? (
                  <span
                    className="toolIconMask"
                    style={
                      {
                        "--tool-icon-mask": `url("${icon}")`,
                        "--tool-icon-gradient": iconGradient,
                      } as CSSProperties
                    }
                  />
                ) : (
                  <Image
                    className={iconClassName}
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                )
              ) : (
                <span className="toolMark">{mark}</span>
              ))}
          </div>
        </div>
      </div>
    </li>
  );
}
