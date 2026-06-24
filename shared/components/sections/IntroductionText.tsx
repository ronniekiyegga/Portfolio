"use client";

export default function IntroductionText() {
  return (
    <div className="mb-8 flex w-full flex-col gap-4">
      <p className="max-w-[44ch] text-pretty font-sans text-sm leading-6 text-neutral-600 md:text-base lg:text-sm dark:text-neutral-400">
        <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
          Full–Stack Engineer
        </strong>{" "}
        building operational systems, analytics platforms, and product
        infrastructure.
      </p>
      <p className="max-w-[44ch] text-pretty font-sans text-sm leading-6 text-neutral-600 md:text-base lg:text-sm dark:text-neutral-400">
        I design products in Figma, build them in TypeScript, and optimise them
        for production.
      </p>
    </div>
  );
}
