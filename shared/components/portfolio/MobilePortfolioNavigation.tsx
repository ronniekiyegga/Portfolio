"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SpecularPill } from "@/app/components/SpecularButton";
import { cn } from "@/lib/utils";

const mobileNavigationItems = [
  { href: "/", label: "Home" },
  { href: "/design", label: "Design" },
  { href: "/thoughts", label: "Thoughts" },
] as const;

export function MobilePortfolioNavigation() {
  const pathname = usePathname();

  return (
    <nav className="mobileNav" aria-label="Mobile navigation">
      <div className="mobileNavLinks">
        {mobileNavigationItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={cn(pathname === href && "is-active")}
          >
            {label}
          </Link>
        ))}
      </div>
      <span className="mobileNavRule" aria-hidden />
      <SpecularPill
        className="mobileContact"
        href="mailto:kiyeggaronnie@gmail.com"
      >
        Contact
      </SpecularPill>
    </nav>
  );
}
