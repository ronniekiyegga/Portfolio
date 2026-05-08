/**
 * Starts `next dev` on the first free TCP port >= PORT (default 3000).
 * Next.js does not try the next port when the default is taken; this wrapper does.
 */
const net = require("node:net");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.join(__dirname, "..");
const startPort = Number.parseInt(process.env.PORT || "3000", 10);
const maxAttempts = Number.parseInt(process.env.PORT_TRY_MAX || "50", 10);
/** Forward e.g. `--turbopack` after `pnpm dev:auto -- --turbopack`. */
const extraArgs = process.argv.slice(2);

function portFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(false));
    server.listen(port, "0.0.0.0", () => {
      server.close(() => resolve(true));
    });
  });
}

async function findPort() {
  for (let i = 0; i < maxAttempts; i++) {
    const p = startPort + i;
    if (await portFree(p)) return p;
  }
  throw new Error(
    `No free port in ${startPort}–${startPort + maxAttempts - 1} (set PORT or PORT_TRY_MAX).`,
  );
}

findPort()
  .then((port) => {
    const nextBin = path.join(
      path.dirname(require.resolve("next/package.json")),
      "dist",
      "bin",
      "next",
    );
    const child = spawn(
      process.execPath,
      [nextBin, "dev", "-p", String(port), ...extraArgs],
      {
        cwd: root,
        stdio: "inherit",
        env: { ...process.env, PORT: String(port) },
      },
    );
    child.on("exit", (code, signal) => {
      process.exit(signal ? 1 : code ?? 0);
    });
  })
  .catch((err) => {
    process.stderr.write(err.message + "\n");
    process.exit(1);
  });
