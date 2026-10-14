import type { Project } from "@/data/projects";
import { asset } from "@/lib/site";
import {
  ArrowUpRightIcon,
  CoffeeIcon,
  LockIcon,
  PlayIcon,
} from "./icons";

function TechPills({ tech }: { tech: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function StatusBadge({ status }: { status: NonNullable<Project["status"]> }) {
  const isPrivate = status === "private";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
      {isPrivate ? (
        <LockIcon className="h-3 w-3" />
      ) : (
        <CoffeeIcon className="h-3 w-3" />
      )}
      {isPrivate ? "Private — not linked" : "In progress"}
    </span>
  );
}

/** Screenshot, or a warm placeholder when the project has nothing public. */
function ProjectImage({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,var(--accent-soft),var(--surface-2))] p-6 text-center">
        <span className="font-display text-4xl font-semibold tracking-tight text-accent/70">
          {project.title.charAt(0)}
        </span>
        <span className="max-w-[22ch] font-mono text-[11px] leading-relaxed tracking-wide text-muted">
          Not published — screenshots land here when it ships
        </span>
      </div>
    );
  }

  return (
    <img
      src={asset(project.image)}
      alt={project.imageAlt ?? `${project.title} screenshot`}
      width={1200}
      height={900}
      // eslint-disable-next-line @next/next/no-img-element
      // The captures are tall phone-shaped screens; cover crops them to a
      // consistent band instead of letterboxing each card differently.
      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      loading="lazy"
      decoding="async"
    />
  );
}

/** The large card above the grid. */
export function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-surface-2 md:aspect-auto md:border-b-0 md:border-r">
          <ProjectImage project={project} />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            Featured
          </p>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-sm text-muted">{project.tagline}</p>

          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            {project.description}
          </p>

          {project.details && (
            <ul className="mt-4 space-y-2">
              {project.details.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm text-muted">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          <TechPills tech={project.tech} />

          <div className="mt-6 flex flex-wrap gap-3">
            {project.play && (
              <a
                href={project.play}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 font-mono text-xs font-semibold tracking-wide text-accent-ink transition-colors hover:bg-accent-hover"
              >
                <PlayIcon className="h-3.5 w-3.5" />
                Play in browser
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 font-mono text-xs font-semibold tracking-wide text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                Source
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/** One card in the grid. Links only when there is somewhere to go. */
export function ProjectCard({ project }: { project: Project }) {
  const isPrivate = Boolean(project.status);

  const body = (
    <>
      <div className="relative aspect-video overflow-hidden border-b border-border bg-surface-2">
        <ProjectImage project={project} />
        {isPrivate && (
          <div className="absolute inset-0 bg-surface/55 backdrop-blur-[1px]" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          {!isPrivate && (
            <ArrowUpRightIcon className="mt-1 h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          )}
        </div>

        <p className="mt-1 font-mono text-xs text-muted">{project.tagline}</p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.status && (
          <div className="mt-4">
            <StatusBadge status={project.status} />
          </div>
        )}

        <div className="mt-auto">
          <TechPills tech={project.tech} />
        </div>
      </div>
    </>
  );

  const shell =
    "group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md";

  if (!project.repo) {
    return <div className={shell}>{body}</div>;
  }

  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
    >
      <span className="sr-only">{project.title} — view on GitHub</span>
      {body}
    </a>
  );
}