"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import { loadStoreItemsAction } from "../server/store.actions";
import type {
  StoreCategory,
  StoreFilter,
  StoreItem,
  StorePage,
  StorePricing,
} from "../types";
import { STORE_PAGE_SIZE } from "../lib/constants";
import { StoreFilters } from "./store-filters";
import { StoreGrid } from "./store-grid";
import { StoreGridSkeleton } from "./store-grid-skeleton";

/**
 * Top-level Store view.
 */
export function StoreView({
  initialPage,
  categories,
  initialCategorySlug = null,
}: {
  initialPage: StorePage;
  categories: readonly StoreCategory[];
  initialCategorySlug?: string | null;
}) {
  const [query, setQuery] = React.useState("");
  const [pricing, setPricing] = React.useState<StorePricing | null>(null);
  const [categorySlug, setCategorySlug] = React.useState<string | null>(
    initialCategorySlug,
  );
  const debouncedQuery = useDebouncedValue(query, 300);

  const filter = React.useMemo<StoreFilter>(
    () => ({
      query: debouncedQuery.trim() || undefined,
      pricing: pricing ?? undefined,
      categorySlug: categorySlug ?? undefined,
    }),
    [debouncedQuery, pricing, categorySlug],
  );

  const initialFilterKey = React.useMemo(
    () =>
      JSON.stringify({
        categorySlug: initialCategorySlug ?? undefined,
      } satisfies StoreFilter),
    [initialCategorySlug],
  );

  const { items, nextCursor, status, loadMore } = useStoreFeed({
    filter,
    initialPage,
    initialFilterKey,
  });

  const [sentinelRef, sentinelVisible] = useIntersectionObserver({
    rootMargin: "200px 0px",
  });

  React.useEffect(() => {
    if (sentinelVisible && status === "idle" && nextCursor !== null) {
      loadMore();
    }
  }, [sentinelVisible, status, nextCursor, loadMore]);

  const hasFilter = Boolean(
    filter.query || filter.pricing || filter.categorySlug,
  );

  return (
    <div className="flex flex-col gap-4">
      <StoreFilters
        query={query}
        pricing={pricing}
        categorySlug={categorySlug}
        categories={categories}
        onQueryChange={setQuery}
        onPricingChange={setPricing}
        onCategoryChange={setCategorySlug}
      />

      {status === "loading-initial" ? (
        <StoreGridSkeleton count={6} />
      ) : items.length === 0 ? (
        <EmptyState
          hasFilter={hasFilter}
          onReset={() => {
            setQuery("");
            setPricing(null);
            setCategorySlug(null);
          }}
        />
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {items.length}
            </span>{" "}
            product{items.length === 1 ? "" : "s"}
          </p>
          <StoreGrid items={items} />
        </>
      )}

      {nextCursor !== null && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {status === "loading-more" ? (
            <Spinner aria-label="Loading more products" />
          ) : (
            <span className="sr-only">Loading more products…</span>
          )}
        </div>
      )}
    </div>
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
          {hasFilter ? "No products match" : "No products yet"}
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

function useStoreFeed({
  filter,
  initialPage,
  initialFilterKey,
}: {
  filter: StoreFilter;
  initialPage: StorePage;
  initialFilterKey: string;
}) {
  const [items, setItems] = React.useState<readonly StoreItem[]>(
    initialPage.items,
  );
  const [nextCursor, setNextCursor] = React.useState<number | null>(
    initialPage.nextCursor,
  );
  const [status, setStatus] = React.useState<FeedStatus>("idle");

  const isFirstRun = React.useRef(true);

  const filterKey = JSON.stringify(filter);

  React.useEffect(() => {
    if (isFirstRun.current && filterKey === initialFilterKey) {
      isFirstRun.current = false;
      return;
    }
    isFirstRun.current = false;

    let cancelled = false;
    setStatus("loading-initial");

    loadStoreItemsAction({
      filter,
      cursor: 0,
      limit: STORE_PAGE_SIZE,
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
      const page = await loadStoreItemsAction({
        filter,
        cursor: nextCursor,
        limit: STORE_PAGE_SIZE,
      });
      setItems((prev) => [...prev, ...page.items]);
      setNextCursor(page.nextCursor);
    } finally {
      setStatus("idle");
    }
  }, [filter, nextCursor, status]);

  return { items, nextCursor, status, loadMore };
}
