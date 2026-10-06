import { Fragment } from "react";
import Link from "next/link";

import { socialLinks } from "@/lib/constants";

import { SplashCursorToggle } from "./SplashCursorToggle";
import { LiveVisitorCount } from "./LiveVisitorCount";

type StatusbarProps = {
  visitorCount?: number | null;
};

export function Statusbar({ visitorCount = null }: StatusbarProps) {
  return (
    <div className="statusBar">
      <p className="contextLine">
        {socialLinks.map((link, index) => (
          <Fragment key={link.label}>
            {index > 0 ? (
              <span className="socialSeparator" aria-hidden>
                /
              </span>
            ) : null}
            <Link href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </Link>
          </Fragment>
        ))}
      </p>
      <div className="statusMeta">
        {/* <LiveVisitorCount initialCount={visitorCount} /> */}
        <Link className="contextLine" href="mailto:kiyeggaronnie@gmail.com">
          <span aria-hidden className="pulseDot ping">
            ●
          </span>{" "}
          Open to opportunities
        </Link>
        <SplashCursorToggle />
      </div>
    </div>
  );
}
