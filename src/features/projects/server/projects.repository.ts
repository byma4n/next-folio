import { projectsData } from "@/data/projects";

import type {
  Project,
  ProjectFilter,
  ProjectPage,
} from "../types";

/**
 * Project data access.
 *
 * Reads from `src/data/projects.ts` — pure static data. Filter and
 * pagination are evaluated in-memory.
 */

const SORTED = [...projectsData].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

/**
 * Returns one page of projects matching the filter.
 */
export async function loadProjects({
  filter = {},
  cursor = 0,
  limit = 8,
}: {
  filter?: ProjectFilter;
  cursor?: number;
  limit?: number;
} = {}): Promise<ProjectPage> {
  const matched = SORTED.filter((project) => matchesFilter(project, filter));
  const slice = matched.slice(cursor, cursor + limit);
  const nextCursor =
    cursor + slice.length < matched.length ? cursor + slice.length : null;
  return { items: slice, nextCursor };
}

/** Returns the N most recently published projects. */
export async function listLatestProjects(
  limit: number = 4,
): Promise<readonly Project[]> {
  const page = await loadProjects({ cursor: 0, limit });
  return page.items;
}

function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter.visibility && project.visibility !== filter.visibility) {
    return false;
  }
  if (filter.query) {
    const q = filter.query.trim().toLowerCase();
    if (q && !project.title.toLowerCase().includes(q)) return false;
  }
  return true;
}
