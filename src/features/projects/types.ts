/** Public types for the `projects` feature. */

export type ProjectVisibility = "open-source" | "private";

type ProjectBase = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly coverUrl: string;
  /**
   * Intrinsic image dimensions. Required so the masonry layout can
   * preserve the natural aspect ratio without layout shift.
   */
  readonly coverWidth: number;
  readonly coverHeight: number;
  /** Live URL the card links to. */
  readonly demoUrl: string;
  /** ISO date used for sorting "latest". */
  readonly publishedAt: string;
};

export type OpenSourceProject = ProjectBase & {
  readonly visibility: "open-source";
  /** Source repository URL. Required for open-source projects. */
  readonly repoUrl: string;
};

export type PrivateProject = ProjectBase & {
  readonly visibility: "private";
};

/**
 * A project is either open-source (has a public repo) or private
 * (demo only). Modelled as a discriminated union so `repoUrl` is
 * unreachable on private projects at the type level.
 */
export type Project = OpenSourceProject | PrivateProject;

export type ProjectFilter = {
  /** Free-text search across title. */
  readonly query?: string;
  /** When set, only projects with this visibility are returned. */
  readonly visibility?: ProjectVisibility;
};

export type ProjectPage = {
  readonly items: readonly Project[];
  /** `null` when no more pages remain. */
  readonly nextCursor: number | null;
};
