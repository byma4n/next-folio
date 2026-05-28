import { articlesData } from "@/data/articles";

import type { Article, ArticlePage } from "../types";

/**
 * Article data access.
 *
 * Reads from `src/data/articles.ts` — pure static data. Async
 * signatures are preserved so consumers can swap in a real source
 * later (CMS, Markdown frontmatter, MDX) without touching the call
 * sites.
 */

const SORTED = [...articlesData].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

/**
 * Returns one page of articles, newest first.
 * Uses an offset cursor for simplicity.
 */
export async function loadArticles({
  cursor = 0,
  limit = 5,
}: {
  cursor?: number;
  limit?: number;
} = {}): Promise<ArticlePage> {
  const slice = SORTED.slice(cursor, cursor + limit);
  const nextCursor =
    cursor + slice.length < SORTED.length ? cursor + slice.length : null;
  return { items: slice, nextCursor };
}

/** Returns a single article by slug, or `null` if not found. */
export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  return SORTED.find((article) => article.slug === slug) ?? null;
}

/** Returns the slugs of all articles, used for static generation. */
export async function listArticleSlugs(): Promise<readonly string[]> {
  return SORTED.map((article) => article.slug);
}

/** Compatibility helper for sidebar widgets that just want the latest few. */
export async function listArticles(
  limit: number = 4,
): Promise<readonly Article[]> {
  const page = await loadArticles({ cursor: 0, limit });
  return page.items;
}
