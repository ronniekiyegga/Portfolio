/**
 * Stops stray `next dev` processes and deletes `.next`.
 * Run when you see lock errors, 500s, missing *-manifest.json, Turbopack
 * "Persisting failed" / SST errors, or webpack cache rename failures.
 *
 * Two dev servers on different ports (e.g. 3000 + 3001) still share `.next`;
 * that corrupts manifests. This script frees several common ports by default.
 */
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");
const lockFile = path.join(nextDir, "dev", "lock");
/** Comma-separated, e.g. CLEAN_NEXT_PORTS=3000,3001 pnpm clean:next */
const ports = (process.env.CLEAN_NEXT_PORTS || "3000,3001,3002")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function sh(cmd) {
  try {
    execSync(cmd, { stdio: "ignore", shell: true });
  } catch {
    /* lsof/xargs may exit 1 if nothing to kill */
  }
}

if (process.platform !== "win32") {
  for (const p of ports) {
    sh(`lsof -ti:${p} 2>/dev/null | xargs kill 2>/dev/null`);
  }
  if (fs.existsSync(lockFile)) {
    sh(`lsof -t ${JSON.stringify(lockFile)} 2>/dev/null | xargs kill 2>/dev/null`);
  }
  sh("sleep 0.4");
}

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

process.stdout.write(
  "Removed .next (freed ports " + ports.join(", ") + " when possible).\n",
);
