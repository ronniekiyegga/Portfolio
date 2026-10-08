import { Fragment, type ReactNode } from "react";
import Link from "next/link";

import { socialLinks } from "@/lib/site-links";

export function SocialLinks({ lead }: { lead?: ReactNode }) {
  return (
    <>
      {lead}
      {socialLinks.map(({ label, href }, index) => (
        <Fragment key={label}>
          {lead || index > 0 ? (
            <span className="socialSeparator" aria-hidden>
              /
            </span>
          ) : null}
          <Link
            className="socialLink"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {label}
          </Link>
        </Fragment>
      ))}
    </>
  );
}
