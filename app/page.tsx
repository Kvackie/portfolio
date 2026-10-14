import AsciiMonogram from "@/components/ascii-monogram";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PlayIcon,
} from "@/components/icons";
import { FeaturedCard, ProjectCard } from "@/components/project-card";
import Wordmark from "@/components/wordmark";
import { FEATURED, LINKS, REST, SKILL_GROUPS, STATS } from "@/data/projects";

const NAV = [
  { href: "#work", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { href: LINKS.github, label: "GitHub", Icon: GitHubIcon },
  { href: LINKS.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: `mailto:${LINKS.email}`, label: "Email", Icon: MailIcon },
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
        className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
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
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {LINKS.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="text-[15px] font-semibold text-ink sm:text-base">
                  {LINKS.headline}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden h-4 w-px bg-border sm:block"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-2.5 py-1 font-mono text-[11px] text-muted">
                  <span aria-hidden="true">◎</span>
                  {LINKS.location}
                </span>
              </div>

              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
                Software engineer by day. The rest of it goes here. Every project
                below is built from scratch, runs in a browser, and needs
                nothing installed —{" "}
                <span className="text-ink">
                  four of them you can play right now
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
                {FEATURED.play && (
                  <a
                    href={FEATURED.play}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 font-mono text-xs font-semibold tracking-wide text-ink transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <PlayIcon className="h-3.5 w-3.5" />
                    Play Trial and Error
                  </a>
                )}
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
        <section
          id="work"
          className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
        >
          <SectionHeading
            eyebrow="The work"
            title="Side projects"
            lede="Most of them are games, built to be finished enough to play. The pattern is the same in all of them: TypeScript, a real test suite, art and sound made in code wherever possible, and a build small enough to deploy as static files."
          />

          <FeaturedCard project={FEATURED} />

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {REST.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Skills                                                          */}
        {/* -------------------------------------------------------------- */}
        <section
          id="skills"
          className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
        >
          <SectionHeading
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
        <section
          id="about"
          className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
        >
          <SectionHeading eyebrow="About" title="Built for fun, finished enough to play" />

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                I&apos;m a software engineer based in Sweden. The job is the
                day-to-day; this is where everything else goes. Each project
                started as a question I wanted to answer — how does a hex island
                look in 3D, what actually makes a daily puzzle fun, can a
                settlement sim feel grim and still be fair — and got carried
                until it was finished enough to ship.
              </p>
              <p>
                I like the unglamorous parts as much as the rest: writing the
                tests for the simulation, documenting why a number is what it
                is, and making sure a build you can hand someone actually runs.
                Most of these READMEs are longer than the projects strictly need,
                which I have been told is a character trait.
              </p>
              <p>
                Nothing here needs an account or an install. Four of them you
                can play in this tab; the other two are still private while they
                grow.
              </p>
            </div>

            <aside className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                How they&apos;re made
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-muted">
                <li>
                  <span className="block font-semibold text-ink">
                    Deployed from GitHub
                  </span>
                  Every push runs the tests and publishes a static build to
                  Pages.
                </li>
                <li>
                  <span className="block font-semibold text-ink">
                    Mobile first
                  </span>
                  Every game is designed for a phone held upright and played
                  with thumbs, then checked on desktop.
                </li>
                <li>
                  <span className="block font-semibold text-ink">
                    Tested where it counts
                  </span>
                  Vitest suites cover the simulation and the balance numbers,
                  because those are the parts that quietly break.
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Contact                                                         */}
        {/* -------------------------------------------------------------- */}
        <section
          id="contact"
          className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-[linear-gradient(135deg,var(--accent-soft),var(--surface))] p-8 sm:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Contact
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Say hello
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              Always happy to talk about games, the odd build pipeline problem,
              or what you&apos;re building.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 font-mono text-xs font-semibold tracking-wide text-accent-ink transition-colors hover:bg-accent-hover"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
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