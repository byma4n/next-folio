import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { cn } from "@/lib/utils";

import type { Project } from "../types";
import { ProjectCardSourceLink } from "./project-card-source-link";

/**
 * A single project card.
 *
 * The card is the cover image. Title sits at the bottom-left over a
 * gradient that keeps it legible. The Source link (open-source only)
 * sits at the bottom-right. Visibility badge is in the top-left.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article className={cn("relative", className)}>
      <Link
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open demo: ${project.title}`}
        className="group relative block overflow-hidden rounded-xl bg-muted"
      >
        <Image
          src={project.coverUrl}
          alt={project.title}
          width={project.coverWidth}
          height={project.coverHeight}
          sizes="(min-width: 768px) 360px, 100vw"
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <VisibilityBadge project={project} />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-white drop-shadow-sm sm:text-base">
            {project.title}
          </h3>

          {project.visibility === "open-source" && (
            <ProjectCardSourceLink
              repoUrl={project.repoUrl}
              title={project.title}
            />
          )}
        </div>
      </Link>
    </article>
  );
}

function VisibilityBadge({ project }: { project: Project }) {
  if (project.visibility === "open-source") {
    return (
      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm backdrop-blur-sm">
        <FontAwesomeIcon icon={faGithub} className="size-2.5" aria-hidden />
        Open Source
      </span>
    );
  }
  return (
    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-zinc-900/80 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm backdrop-blur-sm">
      <FontAwesomeIcon icon={faLock} className="size-2.5" aria-hidden />
      Private
    </span>
  );
}
