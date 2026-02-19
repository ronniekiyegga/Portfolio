import {
  Gemini,
  GooglePaLM,
  Replit,
  MediaWiki,
  MagicUI,
  VSCodium,
} from "@/app/components/logos";

export default function Integrations({
  variant = "default",
}: {
  variant?: "default" | "inline";
}) {
  if (variant === "inline") {
    return (
      <span className="inline-flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          Tech Stack:
        </span>
        <span className="inline-flex flex-wrap items-center gap-3 divide-x divide-neutral-300 *:pr-3 dark:divide-neutral-600">
          <span>
            <Gemini className="size-4" />
          </span>
          <span>
            <GooglePaLM className="size-4" />
          </span>
          <span>
            <Replit className="size-4" />
          </span>
          <span>
            <MediaWiki className="size-4" />
          </span>
          <span>
            <MagicUI className="size-4" />
          </span>
          <span>
            <VSCodium className="size-4" />
          </span>
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
