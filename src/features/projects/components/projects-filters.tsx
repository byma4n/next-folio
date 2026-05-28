"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import type { ProjectVisibility } from "../types";

/**
 * Controls bar for the Projects page.
 *
 * Stateless: receives current values and notifies the parent of any
 * change. The parent owns the actual filter state and decides when
 * to re-fetch.
 */
export function ProjectsFilters({
  query,
  visibility,
  onQueryChange,
  onVisibilityChange,
}: {
  query: string;
  visibility: ProjectVisibility | null;
  onQueryChange: (value: string) => void;
  onVisibilityChange: (value: ProjectVisibility | null) => void;
}) {
  const showClear = query.length > 0;

  return (
    <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          inputMode="search"
          placeholder="Search projects…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="rounded-full pr-9 pl-9"
          aria-label="Search projects"
        />
        {showClear && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <FontAwesomeIcon icon={faXmark} className="size-3" aria-hidden />
          </button>
        )}
      </div>

      <ToggleGroup
        type="single"
        size="sm"
        value={visibility ?? ""}
        onValueChange={(value) =>
          onVisibilityChange(
            value === "open-source" || value === "private" ? value : null,
          )
        }
        aria-label="Filter by visibility"
        className="self-start sm:self-auto"
      >
        <ToggleGroupItem value="open-source" className="gap-1.5">
          <FontAwesomeIcon icon={faGithub} className="size-3" aria-hidden />
          Open Source
        </ToggleGroupItem>
        <ToggleGroupItem value="private" className="gap-1.5">
          <FontAwesomeIcon icon={faLock} className="size-3" aria-hidden />
          Private
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
