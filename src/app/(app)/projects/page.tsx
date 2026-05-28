import type { Metadata } from "next";

import { JsonLd } from "@/components/common/json-ld";
import {
  loadProjects,
  PROJECTS_PAGE_SIZE,
  ProjectsView,
} from "@/features/projects";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";

const description =
  "A collection of projects I'm currently working on or have shipped — some open source, some private client work.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects · ${siteConfig.name}`,
    description,
    url: absoluteUrl("/projects"),
    type: "website",
  },
};

/**
 * Projects — full project listing.
 * Renders the first page on the server so the initial paint
 * includes content; subsequent pages are loaded by the client view.
 */
export default async function ProjectsPage() {
  const initialPage = await loadProjects({ limit: PROJECTS_PAGE_SIZE });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <JsonLd
        data={collectionPageJsonLd({
          name: "Projects",
          description,
          url: absoluteUrl("/projects"),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Projects", url: absoluteUrl("/projects") },
        ])}
      />

      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Projects
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Things I&apos;ve built
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>

      <ProjectsView initialPage={initialPage} />
    </div>
  );
}
