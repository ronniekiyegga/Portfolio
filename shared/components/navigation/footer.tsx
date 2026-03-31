"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerLinks = [
  { title: "LinkedIn", href: "https://linkedin.com/in/ronniekiyegga" },
  { title: "Github", href: "https://github.com/BlissfulCoda" },
  { title: "Email", href: "mailto:kiyeggaronnie@gmail.com" },
];

export default function FooterSection() {
  return (
    <footer
      role="contentinfo"
      className="footer-section flex w-full min-w-0 flex-col overflow-x-hidden pt-12 pb-4"
    >
      {/* Main content area - CTA + faded text */}
      <div className="relative flex flex-col items-center justify-between px-6 py-16 md:px-12 lg:py-12 lg:px-16">
        {/* CTA block - centered */}
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.15rem] text-gradient-blue-static">
            Let&apos;s connect
          </p>
          <h2 className="footer-cta-heading mb-2 max-w-4xl text-2xl font-semibold leading-tight text-neutral-800 sm:text-xl md:text-[30px] dark:text-white">
            <span className="font-(family-name:--font-source-serif) font-semibold">
              Have a project you want to bring to{" "}
            </span>
            <span className="font-(family-name:--font-style-script) text-gradient-blue-static pr-2">
              {" "}
              life?
            </span>
          </h2>
          <p className="footer-cta-paragraph mb-8 max-w-sm text-xs leading-relaxed text-[#595F7A] md:max-w-lg md:text-sm dark:text-white">
            I help turn ideas into real, high-quality products, from concept to
            launch.
          </p>
          <Link
            href="mailto:kiyeggaronnie@gmail.com"
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
              className="flex flex-1 items-center justify-center gap-2 rounded-[1.3rem] px-5 py-2.5 text-xs font-medium text-white"
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
          <span className="footer-design-engineer select-none text-[clamp(3rem,8rem,10rem)] font-bold leading-none tracking-widest opacity-[0.09]">
            SOFTWARE ENGINEER
          </span>
        </div>
      </div>

      {/* Footer bar - full width, copyright left, links right */}
      <div className="border-t border-indigo-100/80 px-6 py-8  dark:border-indigo-800 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 sm:text-xs">
            ©2026 Ronnie <span>Kiyegga</span>. All rights reserved.
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
