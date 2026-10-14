import AsciiMonogram from "@/components/ascii-monogram";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import Wordmark from "@/components/wordmark";
import { LINKS, PROJECTS, SKILL_GROUPS, STATS } from "@/data/projects";

const NAV = [
  { href: "#work", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
];

const SOCIALS = [
  { href: LINKS.github, label: "GitHub", Icon: GitHubIcon },
  { href: LINKS.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
];

function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 scroll-mt-28 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {title}
      </h2>
      {lede && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          {lede}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-accent-ink"
      >
        Skip to the projects
      </a>

      <div className="grid-wash" aria-hidden="true" />

      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <header className="sticky top-3 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-5xl px-2 sm:px-4">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-surface/85 px-4 py-2.5 shadow-lg shadow-black/5 backdrop-blur-md">
          <Wordmark />

          <nav className="flex items-center gap-1 overflow-x-auto font-mono text-[11px] uppercase tracking-wider sm:gap-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg px-2 py-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent/50 hover:text-accent"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* -------------------------------------------------------------- */}
        {/* Hero                                                            */}
        {/* -------------------------------------------------------------- */}
        <section
          id="top"
          className="mx-auto max-w-5xl px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-24"
        >
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl flex-1">
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                <span aria-hidden="true">◎</span>
                {LINKS.location}
              </p>

              <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {LINKS.headline}
              </h1>

              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
                Six projects so far, mostly browser games — Phaser and Three.js
                in TypeScript, each one built to be finished enough to actually
                play, then published as static files so they run anywhere with
                nothing to install.{" "}
                <span className="text-ink">
                  Four of them you can click straight into below
                </span>
                .
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 font-mono text-xs font-semibold tracking-wide text-accent-ink transition-colors hover:bg-accent-hover"
                >
                  Browse the projects
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/70 px-3 py-2 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    <Icon className="h-3.5 w-3.5 text-accent" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full shrink-0 self-center lg:w-auto">
              <AsciiMonogram />
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Stats                                                           */}
        {/* -------------------------------------------------------------- */}
        <section
          aria-label="At a glance"
          className="mx-auto max-w-5xl px-5 pb-4 sm:px-8"
        >
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-surface px-5 py-6">
                <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Work                                                            */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            id="work"
            eyebrow="The work"
            title="Side projects"
            lede="Most of them are games, built to be finished enough to play. The pattern is the same in all of them: TypeScript, a real test suite, art and sound made in code wherever possible, and a build small enough to deploy as static files."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Skills                                                          */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading
            id="skills"
            eyebrow="Toolbox"
            title="Skills"
            lede="Everything below is something I have actually shipped a project with."
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {group.label}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* About                                                           */}
        {/* -------------------------------------------------------------- */}
        {/* -------------------------------------------------------------- */}
        {/* About                                                           */}
        {/* -------------------------------------------------------------- */}
        <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <SectionHeading id="about" eyebrow="About" title="How they're made" />

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold text-ink">Deployed from GitHub</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every push runs the tests and publishes a static build to Pages.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold text-ink">Mobile first</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every game is designed for a phone held upright and played with
                thumbs, then checked on desktop.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-semibold text-ink">Tested where it counts</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Vitest suites cover the simulation and the balance numbers,
                because those are the parts that quietly break.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                             */}
      {/* ------------------------------------------------------------------ */}
      <footer className="relative z-10 mx-auto mt-8 w-full max-w-5xl px-5 pb-12 sm:px-8">
        <div className="flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] text-muted">
            © 2026 {LINKS.name}
          </p>
          <p className="font-mono text-[11px] text-muted">
            Built with Next.js, deployed from GitHub Actions.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUpIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </>
  );
}
