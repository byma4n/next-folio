import { storeCategoriesData, storeData } from "@/data/store";

import type {
  StoreCategory,
  StoreFilter,
  StoreItem,
  StorePage,
} from "../types";

/**
 * Store data access.
 *
 * Reads from `src/data/store.ts` — pure static data. Filter and
 * pagination are evaluated in-memory.
 */

const SORTED = [...storeData].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

/** Returns one page of store items matching the filter. */
export async function loadStoreItems({
  filter = {},
  cursor = 0,
  limit = 8,
}: {
  filter?: StoreFilter;
  cursor?: number;
  limit?: number;
} = {}): Promise<StorePage> {
  const matched = SORTED.filter((item) => matchesFilter(item, filter));
  const slice = matched.slice(cursor, cursor + limit);
  const nextCursor =
    cursor + slice.length < matched.length ? cursor + slice.length : null;
  return { items: slice, nextCursor };
}

/** Returns a single store item by slug, or `null` if not found. */
export async function getStoreItemBySlug(
  slug: string,
): Promise<StoreItem | null> {
  return SORTED.find((item) => item.slug === slug) ?? null;
}

/** Returns the slugs of all store items, used for static generation. */
export async function listStoreItemSlugs(): Promise<readonly string[]> {
  return SORTED.map((item) => item.slug);
}

/** Returns the N most recently published store items. */
export async function listLatestStoreItems(
  limit: number = 4,
): Promise<readonly StoreItem[]> {
  const page = await loadStoreItems({ cursor: 0, limit });
  return page.items;
}

/** Returns every store category. */
export async function listStoreCategories(): Promise<readonly StoreCategory[]> {
  return storeCategoriesData;
}

function matchesFilter(item: StoreItem, filter: StoreFilter): boolean {
  if (filter.pricing && item.pricing !== filter.pricing) return false;
  if (filter.categorySlug) {
    const has = item.categories.some((c) => c.slug === filter.categorySlug);
    if (!has) return false;
  }
  if (filter.query) {
    const q = filter.query.trim().toLowerCase();
    if (!q) return true;
    const haystack = `${item.title} ${item.excerpt}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}
