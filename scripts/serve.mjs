// Serves the exported site locally *at the /portfolio sub-path*.
//
// Needed because the site is deployed under /portfolio, not the domain root.
// Opening out/index.html directly, or serving out/ at /, 404s every asset
// because Next emits paths like /portfolio/_next/... and /portfolio/img/....

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const PORT = Number(process.env.PORT || 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

if (!fs.existsSync(OUT)) {
  console.error("No out/ directory. Run `npm run build` first.");
  process.exit(1);
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let file = path.join(OUT, url);

    // Keep requests inside out/.
    if (!path.resolve(file).startsWith(path.resolve(OUT))) {
      res.writeHead(403).end("forbidden");
      return;
    }

    // Directory -> index.html, and tolerate extensionless paths.
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file) && fs.existsSync(`${file}.html`)) {
      file = `${file}.html`;
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404).end(`not found: ${url}`);
      return;
    }

    res.writeHead(200, {
      "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`Serving ${OUT}`);
    console.log(`  ->  http://localhost:${PORT}/portfolio/`);
  });