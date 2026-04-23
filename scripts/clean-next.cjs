/**
 * Stops a stray `next dev` (lock / default port) and deletes `.next`.
 * Run when you see lock errors, 500s, or missing *-manifest.json in dev.
 */
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");
const lockFile = path.join(nextDir, "dev", "lock");
const port = process.env.PORT || "3000";

function sh(cmd) {
  try {
    execSync(cmd, { stdio: "ignore", shell: true });
  } catch {
    /* lsof/xargs may exit 1 if nothing to kill */
  }
}

if (process.platform !== "win32") {
  sh(`lsof -ti:${port} 2>/dev/null | xargs kill 2>/dev/null`);
  if (fs.existsSync(lockFile)) {
    sh(`lsof -t ${JSON.stringify(lockFile)} 2>/dev/null | xargs kill 2>/dev/null`);
  }
  sh("sleep 0.4");
}

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

process.stdout.write(
  "Removed .next (released dev lock / port " + port + " when possible).\n",
);
