import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface LogoIconProps extends SVGProps<SVGSVGElement> {
  uniColor?: boolean;
}

export function LogoIcon({ className, uniColor = false, ...props }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn(className)}
      aria-hidden
      {...props}
    >
      {uniColor ? (
        <path
          fill="currentColor"
          d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"
        />
      ) : (
        <>
          <path
            fill="currentColor"
            fillOpacity="0.6"
            d="M12 2L2 7v10l10 5 10-5V7L12 2z"
          />
          <path
            fill="currentColor"
            d="M12 4.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18z"
          />
          <path
            fill="currentColor"
            fillOpacity="0.8"
            d="M4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"
          />
        </>
      )}
    </svg>
  );
}
