import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Project } from "../types";

/**
 * Sidebar widget that lists the most recent projects.
 */
export function LatestProjectsCard({
  projects,
}: {
  projects: readonly Project[];
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Latest Projects</CardTitle>
        <CardAction>
          <Link
            href="/projects"
            aria-label="View all projects"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="size-4"
            />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {projects.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No projects yet.
          </p>
        ) : (
          projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={project.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3"
    >
      <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={project.coverUrl}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:underline">
          {project.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {project.visibility === "open-source" ? "Open Source" : "Private"}
        </p>
      </div>
      <FontAwesomeIcon
        icon={project.visibility === "open-source" ? faGithub : faLock}
        className="size-3 shrink-0 text-muted-foreground"
        aria-hidden
      />
    </Link>
  );
}
