"use server";

import type { ProjectFilter, ProjectPage } from "../types";
import { loadProjects } from "./projects.repository";

/**
 * Server Action wrapper around `loadProjects`.
 */
export async function loadProjectsAction(args: {
  filter?: ProjectFilter;
  cursor?: number;
  limit?: number;
}): Promise<ProjectPage> {
  return loadProjects(args);
}
