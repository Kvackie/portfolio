// Serves the exported site locally *at the /portfolio sub-path*.
//
// Needed because the site is deployed under /portfolio, not the domain root.
// Next emits paths like /portfolio/_next/... and /portfolio/img/..., so serving
// out/ directly at / 404s every asset. This mounts out/ at the sub-path instead,
// so what you see locally is what Pages will serve.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const PORT = Number(process.env.PORT || 4321);

// Must match BASE_PATH in lib/site.ts. Duplicated because this file is plain
// ESM and cannot import the TypeScript module.
const BASE_PATH = "/portfolio";

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
    let pathname = decodeURIComponent((req.url ?? "/").split("?")[0]);

    // Send bare / to the real entry point.
    if (pathname === "/" || pathname === "") {
      res.writeHead(302, { location: `${BASE_PATH}/` }).end();
      return;
    }

    // Strip the base path so the request maps onto out/.
    if (pathname === BASE_PATH) {
      pathname = "/";
    } else if (pathname.startsWith(`${BASE_PATH}/`)) {
      pathname = pathname.slice(BASE_PATH.length);
    } else {
      res.writeHead(404).end(`not found: ${pathname} (site lives at ${BASE_PATH}/)`);
      return;
    }

    let file = path.join(OUT, pathname);

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
      res.writeHead(404).end(`not found: ${pathname}`);
      return;
    }

    res.writeHead(200, {
      "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`Serving ${OUT} at ${BASE_PATH}/`);
    console.log(`  ->  http://localhost:${PORT}${BASE_PATH}/`);
  });