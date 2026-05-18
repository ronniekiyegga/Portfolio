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
