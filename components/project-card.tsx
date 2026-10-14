import type { Project } from "@/data/projects";
import { asset } from "@/lib/site";
import { ArrowUpRightIcon, CoffeeIcon, LockIcon } from "./icons";

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
