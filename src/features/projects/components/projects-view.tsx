"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import { loadProjectsAction } from "../server/projects.actions";
import type {
  Project,
  ProjectFilter,
  ProjectPage,
  ProjectVisibility,
} from "../types";
import { PROJECTS_PAGE_SIZE } from "../lib/constants";
import { ProjectsFilters } from "./projects-filters";
import { ProjectGrid } from "./project-grid";
import { ProjectGridSkeleton } from "./project-card-skeleton";

/**
 * Top-level Projects view.
 *
 * Owns the filter state and the paginated list. Hands off rendering
 * to small, stateless components (`ProjectsFilters`, `ProjectGrid`).
 *
 * `initialPage` comes from the server so the first paint is fully
 * pre-rendered; subsequent fetches go through the server action.
 */
export function ProjectsView({
  initialPage,
}: {
  initialPage: ProjectPage;
}) {
  const [query, setQuery] = React.useState("");
  const [visibility, setVisibility] = React.useState<ProjectVisibility | null>(
    null,
  );
  const debouncedQuery = useDebouncedValue(query, 300);

  const filter = React.useMemo<ProjectFilter>(
    () => ({
      query: debouncedQuery.trim() || undefined,
      visibility: visibility ?? undefined,
    }),
    [debouncedQuery, visibility],
  );

  const { items, nextCursor, status, loadMore } = useProjectFeed({
    filter,
    initialPage,
  });

  const [sentinelRef, sentinelVisible] = useIntersectionObserver({
    rootMargin: "200px 0px",
  });

  React.useEffect(() => {
    if (sentinelVisible && status === "idle" && nextCursor !== null) {
      loadMore();
    }
  }, [sentinelVisible, status, nextCursor, loadMore]);

  const hasFilter = Boolean(filter.query || filter.visibility);

  return (
    <div className="flex flex-col gap-4">
      <ProjectsFilters
        query={query}
        visibility={visibility}
        onQueryChange={setQuery}
        onVisibilityChange={setVisibility}
      />

      {status === "loading-initial" ? (
        <ProjectGridSkeleton count={6} />
      ) : items.length === 0 ? (
        <EmptyState
          hasFilter={hasFilter}
          onReset={() => {
            setQuery("");
            setVisibility(null);
          }}
        />
      ) : (
        <>
          <ResultCount count={items.length} />
          <ProjectGrid projects={items} />
        </>
      )}

      {nextCursor !== null && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {status === "loading-more" ? (
            <Spinner aria-label="Loading more projects" />
          ) : (
            <span className="sr-only">Loading more projects…</span>
          )}
        </div>
      )}
    </div>
  );
}

function ResultCount({ count }: { count: number }) {
  return (
    <p className="text-xs text-muted-foreground">
      Showing <span className="font-medium text-foreground">{count}</span>{" "}
      project{count === 1 ? "" : "s"}
    </p>
  );
}

function EmptyState({
  hasFilter,
  onReset,
}: {
  hasFilter: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Search className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">
          {hasFilter ? "No projects match" : "No projects yet"}
        </p>
        {hasFilter && (
          <p className="text-xs text-muted-foreground">
            Try a different search or clear the filter.
          </p>
        )}
      </div>
      {hasFilter && (
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={onReset}
        >
          Reset filters
        </Button>
      )}
    </div>
  );
}

type FeedStatus = "idle" | "loading-initial" | "loading-more";

function useProjectFeed({
  filter,
  initialPage,
}: {
  filter: ProjectFilter;
  initialPage: ProjectPage;
}) {
  const [items, setItems] = React.useState<readonly Project[]>(
    initialPage.items,
  );
  const [nextCursor, setNextCursor] = React.useState<number | null>(
    initialPage.nextCursor,
  );
  const [status, setStatus] = React.useState<FeedStatus>("idle");

  const isFirstRun = React.useRef(true);

  const filterKey = JSON.stringify(filter);
  const defaultKey = "{}";

  React.useEffect(() => {
    if (isFirstRun.current && filterKey === defaultKey) {
      isFirstRun.current = false;
      return;
    }
    isFirstRun.current = false;

    let cancelled = false;
    setStatus("loading-initial");

    loadProjectsAction({
      filter,
      cursor: 0,
      limit: PROJECTS_PAGE_SIZE,
    })
      .then((page) => {
        if (cancelled) return;
        setItems(page.items);
        setNextCursor(page.nextCursor);
        setStatus("idle");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("idle");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  const loadMore = React.useCallback(async () => {
    if (status !== "idle" || nextCursor === null) return;
    setStatus("loading-more");
    try {
      const page = await loadProjectsAction({
        filter,
        cursor: nextCursor,
        limit: PROJECTS_PAGE_SIZE,
      });
      setItems((prev) => [...prev, ...page.items]);
      setNextCursor(page.nextCursor);
    } finally {
      setStatus("idle");
    }
  }, [filter, nextCursor, status]);

  return { items, nextCursor, status, loadMore };
}
