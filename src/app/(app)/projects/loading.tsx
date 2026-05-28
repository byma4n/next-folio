import { ProjectGridSkeleton } from "@/features/projects";

/**
 * Suspense fallback for the Projects segment.
 * Mirrors the page structure so the transition is seamless.
 */
export default function ProjectsLoading() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Projects
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Things I&apos;ve built
        </h1>
      </header>
      <ProjectGridSkeleton count={8} />
    </div>
  );
}
