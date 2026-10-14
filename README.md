# Valentin Wannesian — portfolio

The site behind **[kvackie.github.io/portfolio](https://kvackie.github.io/portfolio/)**.

A single static page: a hero, the projects, a skills list, a short about and a
contact block. Built with Next.js and Tailwind, prerendered to plain HTML, CSS
and a little JavaScript, and published to GitHub Pages by GitHub Actions on
every push to `main`.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000/portfolio
npm run build    # static export into out/
npm run serve    # serve the export locally, at the right sub-path
```

`npm run serve` exists because of a subtlety worth knowing: the site is served
from `/portfolio`, not the domain root. Opening `out/index.html` directly, or
serving `out/` at `/`, will 404 every asset.

## How it is put together

| Path | What it is |
| --- | --- |
| `app/page.tsx` | The whole page: hero, stats, projects, skills, about, contact |
| `app/globals.css` | The warm palette, defined once as CSS variables |
| `data/projects.ts` | All project copy, skills and links |
| `lib/site.ts` | `BASE_PATH`, shared by `next.config.ts` and the components |
| `components/` | ASCII monogram, project cards, header, icons |

### Things that will bite you

**Assets need the base path by hand.** `next/image` does not apply `basePath`
to `src` in a static export, so anything referenced from `/public` has to go
through `asset()` in `lib/site.ts`. It is easy to add an image with a bare
`/img/foo.webp` that works in `npm run dev` and 404s once deployed.

**No server, so no image optimisation.** `next/image` cannot run its optimiser
without a server, so the components use a plain `<img>` against pre-compressed
WebP. Do not reintroduce `next/image` without also turning off `output: "export"`.

**Dark only, on purpose.** There is no theme toggle and no light palette. The
game screenshots are all dark interfaces; a light site made them fight the
background. If a light mode comes back, it belongs as a second block of
variables in `globals.css`.

**`npm install`, not `create-next-app`.** npm 12 refuses the `--allow-scripts`
flag that `create-next-app` passes internally, so the scaffold command fails on
this machine. Copying an existing scaffold in works fine.

## Adding a project

Add an entry to `PROJECTS` in `data/projects.ts`. The only field that really
needs thought is `repo`: leave it off and the card renders unlinked, which is
what the two private repositories do. Screenshots go in `public/img/` and are
referenced as `/img/...` — the `asset()` call adds the base path for you.

## Credits

Layout inspired by [aditya.me](https://ad1tya.me/) and
[matthiasholmberg.github.io/portfolio](https://matthiasholmberg.github.io/portfolio/).
All the games linked from here are Valentin's own work.