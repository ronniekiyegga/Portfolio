import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/shared/components/ui/spotlight";

interface SpotlightProps {
  children: React.ReactNode;
}

export default function SpotlightCard({ children }: SpotlightProps) {
  return (
    <div className="relative flex h-260 w-full overflow-hidden rounded-md bg-black/96 antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-size-[40px_40px] select-none",
          "bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      {children}
    </div>
  );
}
