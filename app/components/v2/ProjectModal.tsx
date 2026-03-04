"use client";

import { useRef } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTitle } from "@/app/components/ui/dialog";
import { ImageIllustration } from "@/app/components/ui/illustrations/image-illustration";
import type { WorkItem } from "@/lib/v2-data";

interface ProjectModalProps {
  item: WorkItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ item, open, onOpenChange }: ProjectModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl w-[95vw] max-h-[90vh] p-0 gap-0 border border-gray-900 bg-background [&>button]:text-foreground [&>button]:hover:text-foreground [&>button]:opacity-70 [&>button]:right-6 [&>button]:top-6"
        aria-describedby={undefined}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Project details</DialogTitle>
        </VisuallyHidden.Root>
        <div ref={scrollRef} className="overflow-y-auto max-h-[90vh]">
          <section>
            <div className="pb-56 pt-56 lg:pt-96">
              <div className="mx-auto mb-8 max-w-6xl px-6 lg:mb-12 lg:px-12">
                <h1 className="text-balance text-md font-semibold md:text-xl">
                  {item?.title ?? "Project"}
                </h1>
              </div>
              <ImageIllustration
                containerRef={scrollRef}
                src={item?.heroImage}
                alt={item?.title ?? "Project"}
              />
              <div className="mx-auto mt-8 max-w-6xl px-6 lg:mt-12 lg:px-12">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                  <p className="text-muted-foreground">
                    Our advanced visual processing system can{" "}
                    <strong className="text-foreground font-semibold">
                      analyze and interpret complex images
                    </strong>
                    , enabling applications from medical diagnostics to
                    autonomous navigation and content moderation.
                  </p>

                  <p className="text-muted-foreground">
                    Our platform{" "}
                    <strong className="text-foreground font-semibold">
                      integrates text, image, and audio processing
                    </strong>{" "}
                    into a unified framework, creating more intuitive and
                    powerful AI systems that understand the world more like
                    humans do.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
