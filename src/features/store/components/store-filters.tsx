"use client";

import { Search, Tag, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import type { StoreCategory, StorePricing } from "../types";

/**
 * Controls bar for the Store page: search + pricing toggle + category
 * chip row. Stateless: parent owns the values and decides when to
 * refetch.
 */
export function StoreFilters({
  query,
  pricing,
  categorySlug,
  categories,
  onQueryChange,
  onPricingChange,
  onCategoryChange,
}: {
  query: string;
  pricing: StorePricing | null;
  categorySlug: string | null;
  categories: readonly StoreCategory[];
  onQueryChange: (value: string) => void;
  onPricingChange: (value: StorePricing | null) => void;
  onCategoryChange: (value: string | null) => void;
}) {
  const showClear = query.length > 0;

  return (
    <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            inputMode="search"
            placeholder="Search products…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="rounded-full pr-9 pl-9"
            aria-label="Search products"
          />
          {showClear && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-3" aria-hidden />
            </button>
          )}
        </div>

        <ToggleGroup
          type="single"
          size="sm"
          value={pricing ?? ""}
          onValueChange={(value) =>
            onPricingChange(
              value === "free" || value === "paid" ? value : null,
            )
          }
          aria-label="Filter by pricing"
          className="self-start sm:self-auto"
        >
          <ToggleGroupItem value="free">Free</ToggleGroupItem>
          <ToggleGroupItem value="paid" className="gap-1.5">
            <Tag className="size-3" aria-hidden />
            Paid
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {categories.length > 0 && (
        <CategoryChipRow
          categories={categories}
          activeSlug={categorySlug}
          onChange={onCategoryChange}
        />
      )}
    </div>
  );
}

function CategoryChipRow({
  categories,
  activeSlug,
  onChange,
}: {
  categories: readonly StoreCategory[];
  activeSlug: string | null;
  onChange: (slug: string | null) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5"
    >
      <Chip active={activeSlug === null} onClick={() => onChange(null)}>
        All
      </Chip>
      {categories.map((category) => (
        <Chip
          key={category.slug}
          active={activeSlug === category.slug}
          onClick={() => onChange(category.slug)}
        >
          {category.name}
        </Chip>
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
