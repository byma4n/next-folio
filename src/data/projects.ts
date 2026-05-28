/**
 * Static projects content.
 *
 * Each project is either `open-source` (with a `repoUrl`) or
 * `private` (demo only). The discriminated union in
 * `@/features/projects` enforces the right shape for each variant.
 */

import type { Project } from "@/features/projects";

export const projectsData: readonly Project[] = [
  {
    id: "nextfolio-template",
    slug: "nextfolio",
    title: "Nextfolio",
    visibility: "open-source",
    coverUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    coverWidth: 900,
    coverHeight: 1200,
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/your-handle/nextfolio",
    publishedAt: "2026-05-20T00:00:00.000Z",
  },
  {
    id: "side-project-one",
    slug: "side-project-one",
    title: "Side Project One",
    visibility: "private",
    coverUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
    coverWidth: 900,
    coverHeight: 600,
    demoUrl: "https://example.com",
    publishedAt: "2026-04-12T00:00:00.000Z",
  },
  {
    id: "client-work-alpha",
    slug: "client-work-alpha",
    title: "Client Work — Alpha",
    visibility: "private",
    coverUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
    coverWidth: 900,
    coverHeight: 1125,
    demoUrl: "https://example.com",
    publishedAt: "2026-02-05T00:00:00.000Z",
  },
  {
    id: "open-source-utility",
    slug: "open-source-utility",
    title: "Open-Source Utility",
    visibility: "open-source",
    coverUrl:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
    coverWidth: 900,
    coverHeight: 600,
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/your-handle/open-source-utility",
    publishedAt: "2025-11-30T00:00:00.000Z",
  },
  {
    id: "client-work-beta",
    slug: "client-work-beta",
    title: "Client Work — Beta",
    visibility: "private",
    coverUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
    coverWidth: 900,
    coverHeight: 600,
    demoUrl: "https://example.com",
    publishedAt: "2025-08-14T00:00:00.000Z",
  },
];
