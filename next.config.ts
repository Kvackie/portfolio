import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/site";

const nextConfig: NextConfig = {
  // Static export: the whole site is prerendered to plain HTML/CSS/JS so
  // GitHub Pages can serve it. No server, no Node runtime, no image optimiser.
  output: "export",

  // This repo is a project page, so GitHub serves it from
  // https://kvackie.github.io/portfolio rather than the domain root.
  // Next prefixes every generated asset path with this automatically.
  basePath: BASE_PATH,

  // Emit directory-style URLs (out/index.html rather than out.html) so that
  // Pages resolves paths the same way a static file server does.
  trailingSlash: true,

  // next/image cannot run its optimiser without a server. Images are already
  // compressed WebP, so components use a plain <img> and asset() instead.
  images: { unoptimized: true },

  turbopack: {
    // Pin the root to this directory; without it Turbopack walks up and finds
    // an unrelated package-lock.json in a parent folder.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;