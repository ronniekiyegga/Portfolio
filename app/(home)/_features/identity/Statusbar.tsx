import { Fragment } from "react";
import Link from "next/link";

import { socialLinks } from "@/lib/constants";

import { SplashCursorToggle } from "./SplashCursorToggle";

export function Statusbar() {
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
