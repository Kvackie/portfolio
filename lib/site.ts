/**
 * The sub-path this site is served from.
 *
 * The repo is a GitHub *project* page, so everything lives under /portfolio
 * rather than at the domain root. Both next.config.ts and the components read
 * it from here so the two can never drift apart.
 *
 * next/image does NOT apply basePath to `src` in a static export, so any
 * static asset referenced directly has to be prefixed with this by hand.
 */
export const BASE_PATH = "/portfolio";

/** Prefix a path in /public with the deployment base path. */
export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}