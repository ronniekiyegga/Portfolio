"use client";

import dynamic from "next/dynamic";

const SonukumarShader = dynamic(
  () =>
    import("../design-archive/SonukumarShader").then(
      (module) => module.SonukumarShader,
    ),
  { ssr: false },
);

export function IdentityShader() {
  return (
    <div className="identityShader" aria-hidden>
      <SonukumarShader
        theme="light"
        background={{ dark: "#0f1220", light: "#fafafa" }}
      />
    </div>
  );
}
