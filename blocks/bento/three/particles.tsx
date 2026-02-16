"use client";

export function LightDarkParticles({ id }: { id: string }) {
  return (
    <div
      id={id}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-40 dark:opacity-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
    </div>
  );
}
