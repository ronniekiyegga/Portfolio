"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerLinks = [
  { title: "LinkedIn", href: "https://linkedin.com/in/ronniekiyegga" },
  { title: "Github", href: "https://github.com/BlissfulCoda" },
  { title: "Email", href: "mailto:contact@ronniekiyegga.com" },
];

export default function FooterSection() {
  return (
    <footer
      role="contentinfo"
      className="flex w-full flex-col bg-white py-20 dark:bg-neutral-950 dark:bg-[url('/BG_1.svg')] dark:bg-cover dark:bg-center dark:bg-no-repeat"
    >
      {/* Main content area - CTA + faded text */}
      <div className="relative flex flex-col items-center px-6 py-16 md:px-12 lg:px-16">
        {/* CTA block - centered */}
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gradient-blue"
            
          >
            Let&apos;s connect
          </p>
          <h2 className="mb-4 max-w-xl text-3xl font-semibold leading-tight text-neutral-800 dark:text-white md:text-4xl">
            Let&apos;s create something{" "}
            <span
              className="font-(family-name:--font-style-script) italic text-gradient-blue"
              style={{
                fontStyle: "italic",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              meaningful
            </span>
          </h2>
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            Whether you need a product built from scratch, a design system, or
            help improving an existing product I&apos;d love to hear about your
            project.
          </p>
          <Link
            href="mailto:contact@ronniekiyegga.com"
            className="flex w-40 items-stretch gap-[0.2rem] p-[0.14rem_0.16rem] transition-opacity hover:opacity-95"
            style={{
              borderRadius: "1.44438rem",
              background:
                "linear-gradient(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.76) 97.21%)",
              boxShadow:
                "0 0 1.036px 0 rgba(0, 0, 0, 0.08) inset, 0 0.777px 0 0 rgba(255, 255, 255, 0.10)",
            }}
          >
            <span
              className="flex flex-1 items-center justify-center gap-2 rounded-[1.3rem] px-5 py-2.5 text-sm font-medium text-white"
              style={{
                background: "#1a1a1a",
                boxShadow:
                  "0 1.434px 1.147px 0 rgba(0, 0, 0, 0.12), 0 1.554px 1.554px 0 rgba(0, 0, 0, 0.14), 0 11.573px 9.258px 0 rgba(0, 0, 0, 0.14), 0 6.488px 5.19px 0 rgba(0, 0, 0, 0.14), 0 1.434px 1.147px 0 rgba(0, 0, 0, 0.12), 0 0.518px 0 0 rgba(255, 255, 255, 0.30) inset",
              }}
            >
              Get in Touch
              <ArrowRight className="size-4 shrink-0" />
            </span>
          </Link>
        </div>

        {/* Large faded "DESIGN ENGINEER" - below CTA, watermark style */}
        <div
          aria-hidden
          className="pointer-events-none mt-12 flex w-full justify-center"
        >
          <span
            className="select-none text-[clamp(3rem,12vw,10rem)] font-bold leading-none tracking-tight opacity-[0.09]"
            style={{
              fontFamily: "var(--font-geist-sans)",
              background:
                "linear-gradient(180deg, rgba(148, 148, 148, 0.61) 56.07%, rgba(7, 7, 7, 0.00) 86.27%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DESIGN ENGINEER
          </span>
        </div>
      </div>

      {/* Footer bar - full width, copyright left, links right */}
      <div className="border-t border-neutral-200/80 px-6 py-5 dark:border-neutral-700/50 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 sm:text-xs">
            ©2026 Ronnie Kiyegga. All rights reserved.
          </span>
          <div className="flex gap-8">
            {footerLinks.map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                className="text-[11px] text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 sm:text-xs"
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
