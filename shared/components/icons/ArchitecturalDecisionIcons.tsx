import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

const ICON_SLOT = "flex h-5 w-5 shrink-0 items-start justify-center";

/** Figma: 13 × 20 blue pointer — featured card */
export function DecisionCursorIcon({ className }: IconProps) {
  return (
    <span className={ICON_SLOT}>
      <svg
        viewBox="0 0 13 20"
        fill="none"
        className={cn("h-[19px] w-[13px]", className)}
        aria-hidden
      >
        <path
          d="M0.75 0.5L0.75 14.75L3.95 11.45L6.45 17.15L8.55 16.05L6.05 10.35H11.35L0.75 0.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

/** Figma: thin bar + panel with lines */
export function DecisionStreamIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-[21px] shrink-0 items-start justify-center gap-[1.5px] pt-px",
        className,
      )}
    >
      <svg
        viewBox="0 0 5 19"
        fill="none"
        className="h-[18px] w-[4px] text-[#444444] dark:text-white/55"
        aria-hidden
      >
        <rect x="0.75" y="0.75" width="3.5" height="17.5" rx="0.5" fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 15 19"
        fill="none"
        className="h-[18px] w-[14px] text-[#444444] dark:text-white/55"
        aria-hidden
      >
        <rect
          x="0.75"
          y="0.75"
          width="13.5"
          height="17.5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M3 5.5H12M3 9.5H12M3 13.5H9"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Figma: filled bolt ~19 × 21 */
export function DecisionBoltIcon({ className }: IconProps) {
  return (
    <span className={ICON_SLOT}>
      <svg
        viewBox="0 0 19 21"
        fill="none"
        className={cn("h-[20px] w-[19px] text-[#444444] dark:text-white/55", className)}
        aria-hidden
      >
        <path
          d="M10.2 0.75L3.25 11.25H8.95L7.55 20.25L15.75 8.75H10.45L10.2 0.75Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

/** Figma: two stacked disks with slight overlap */
export function DecisionDatabaseIcon({ className }: IconProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 shrink-0 flex-col items-center justify-start pt-px",
        className,
      )}
    >
      <svg
        viewBox="0 0 18 13"
        fill="none"
        className="h-[12px] w-[18px] text-[#444444] dark:text-white/55"
        aria-hidden
      >
        <ellipse cx="9" cy="4.5" rx="7.5" ry="3" fill="currentColor" />
        <path
          d="M1.5 4.5V7.5C1.5 9.05 4.86 10.35 9 10.35C13.14 10.35 16.5 9.05 16.5 7.5V4.5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <svg
        viewBox="0 0 18 9"
        fill="none"
        className="-mt-[2px] h-[9px] w-[18px] text-[#444444] dark:text-white/55"
        aria-hidden
      >
        <ellipse cx="9" cy="4" rx="7.5" ry="3" fill="currentColor" />
      </svg>
    </span>
  );
}

const DECISION_ICON_COMPONENTS = [
  DecisionCursorIcon,
  DecisionStreamIcon,
  DecisionBoltIcon,
  DecisionDatabaseIcon,
] as const;

export function ArchitecturalDecisionIcon({
  index,
  featured = false,
}: {
  index: number;
  featured?: boolean;
}) {
  const Icon = DECISION_ICON_COMPONENTS[index % DECISION_ICON_COMPONENTS.length];

  if (featured && index === 0) {
    return <Icon className="text-[#4353ff]" />;
  }

  return <Icon />;
}
