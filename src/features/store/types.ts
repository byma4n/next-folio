/** Public types for the `store` feature. */

import type { ArticleBlock } from "@/features/articles";

/**
 * Reuse the article block union for store-item bodies. Keeps the
 * detail-page renderer single — the type belongs to the article
 * feature because it was introduced there first.
 */
export type StoreBlock = ArticleBlock;

export type StorePricing = "free" | "paid";

export type StoreCategory = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description?: string;
};

type StoreItemBase = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  /** Short summary shown on cards and as the detail-page lede. */
  readonly excerpt: string;
  /** Long-form body. Optional — list views don't need it. */
  readonly body?: readonly StoreBlock[];
  readonly coverUrl: string;
  readonly coverWidth: number;
  readonly coverHeight: number;
  /** Always-public live-preview URL. */
  readonly previewUrl: string;
  /** Categories the item belongs to. */
  readonly categories: readonly StoreCategory[];
  /** ISO date used for sorting "latest". */
  readonly publishedAt: string;
};

export type FreeStoreItem = StoreItemBase & {
  readonly pricing: "free";
  /** Source repository, if open. */
  readonly repoUrl?: string;
  /** Direct download artifact, if applicable. */
  readonly downloadUrl?: string;
};

export type PaidStoreItem = StoreItemBase & {
  readonly pricing: "paid";
  /** External storefront URL (Lemon Squeezy, Gumroad, …). */
  readonly purchaseUrl: string;
  /** Optional human-readable price label, e.g. "$49". */
  readonly priceLabel?: string;
};

export type StoreItem = FreeStoreItem | PaidStoreItem;

export type StoreFilter = {
  readonly query?: string;
  readonly pricing?: StorePricing;
  /** Filter to items belonging to this category slug. */
  readonly categorySlug?: string;
};

export type StorePage = {
  readonly items: readonly StoreItem[];
  readonly nextCursor: number | null;
};
