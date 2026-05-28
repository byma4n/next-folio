import { ProjectCard } from "./project-card";
import type { Project } from "../types";

/**
 * Masonry grid of project cards.
 *
 * Uses CSS multi-column so each card keeps its image's natural
 * aspect ratio without producing layout gaps. `break-inside-avoid`
 * stops a card from being split across columns.
 */
export function ProjectGrid({
  projects,
}: {
  projects: readonly Project[];
}) {
  if (projects.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No projects yet.
      </p>
    );
  }

  return (
    <div className="columns-1 gap-5 sm:columns-2 [column-fill:_balance]">
      {projects.map((project) => (
        <div key={project.id} className="mb-5 break-inside-avoid">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
