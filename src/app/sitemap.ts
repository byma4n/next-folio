import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { listArticleSlugs, loadArticles } from "@/features/articles";
import { listStoreItemSlugs, loadStoreItems } from "@/features/store";
import { absoluteUrl } from "@/lib/seo";

/**
 * Dynamic sitemap.
 *
 * Combines static routes with feature-owned content (articles,
 * store items). Each entry uses the most specific `lastModified`
 * available — for content rows we use `publishedAt` so search
 * engines see real change dates and crawl efficiently.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleSlugs, articles, storeSlugs, storeItems] = await Promise.all([
    listArticleSlugs(),
    loadArticles({ limit: 1000 }),
    listStoreItemSlugs(),
    loadStoreItems({ limit: 1000 }),
  ]);

  const articleBySlug = new Map(
    articles.items.map((a) => [a.slug, a] as const),
  );
  const storeBySlug = new Map(
    storeItems.items.map((i) => [i.slug, i] as const),
  );

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/profile"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/store"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articleSlugs.map((slug) => {
    const article = articleBySlug.get(slug);
    return {
      url: absoluteUrl(`/articles/${slug}`),
      lastModified: article ? new Date(article.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: article?.coverUrl ? [article.coverUrl] : undefined,
    };
  });

  const storeRoutes: MetadataRoute.Sitemap = storeSlugs.map((slug) => {
    const item = storeBySlug.get(slug);
    return {
      url: absoluteUrl(`/store/${slug}`),
      lastModified: item ? new Date(item.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: item?.coverUrl ? [item.coverUrl] : undefined,
    };
  });

  // Reference siteConfig.name to keep this file's import surface
  // honest — sitemap content is implicitly tied to the configured
  // site.
  void siteConfig.name;

  return [...staticRoutes, ...articleRoutes, ...storeRoutes];
}
