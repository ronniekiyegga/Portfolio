"use client";

import * as React from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/shared/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface StickyFooterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** Badge text above title (e.g. "Update", "Project") */
  badge?: string;
  /** Image src to show at the top of the dialog */
  image?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
}

export function StickyFooterDialog({
  open,
  onOpenChange,
  title,
  description,
  badge,
  image,
  children,
  footer,
  contentClassName,
}: StickyFooterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "grid max-h-[85vh] w-full max-w-3xl grid-rows-[auto_1fr_auto] gap-8 overflow-hidden border-0 px-8 py-4 shadow-xl sm:rounded-xl",
          "bg-[#1e1e1e] text-white",
          "ring-1 ring-white/10",
          "[&>button]:text-white/70 [&>button]:hover:text-white [&>button]:hover:bg-white/10",
          contentClassName,
        )}
      >
        {/* Subtle iridescent gradient at top */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(251,146,60,0.08)_0%,rgba(236,72,153,0.06)_25%,rgba(99,102,241,0.05)_50%,rgba(59,130,246,0.04)_75%,transparent_100%)]"
          aria-hidden
        />

        <div>
          <DialogHeader className="relative space-y-3 border-b border-white/10 px-8 py-6 text-left">
            {badge && (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-emerald-950/60 px-2.5 py-1 text-xs font-medium text-emerald-300/90">
                <RefreshCw className="size-3" />
                {badge}
              </span>
            )}
            <DialogTitle className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-white/60">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          {image && (
            <div className="relative aspect-2/1 w-full overflow-hidden sm:rounded-t-xl">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>
          )}
        </div>

        <div className="relative min-h-0 overflow-y-auto px-8 py-6">
          <div className="prose prose-invert prose-sm max-w-none [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-blue-300">
            {children}
          </div>
        </div>

        <DialogFooter className="relative border-t border-white/10 px-8 py-4">
          {footer ?? (
            <DialogClose asChild>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-white/10 px-5 text-sm font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e1e]"
              >
                Close
              </button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
