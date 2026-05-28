import type { Metadata } from "next";

import { JsonLd } from "@/components/common/json-ld";
import {
  ARTICLES_PAGE_SIZE,
  loadArticles,
  PostsView,
} from "@/features/articles";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";

const description =
  "Notes, walkthroughs, and lessons learned. Updated whenever something is worth writing down.";

export const metadata: Metadata = {
  title: "Articles",
  description,
  alternates: { canonical: "/articles" },
  openGraph: {
    title: `Articles · ${siteConfig.name}`,
    description,
    url: absoluteUrl("/articles"),
    type: "website",
  },
};

/**
 * Articles index page.
 * Lists every article with the same infinite-scroll feed used on
 * the home page.
 */
export default async function ArticlesPage() {
  const initialPage = await loadArticles({ limit: ARTICLES_PAGE_SIZE });

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <JsonLd
        data={collectionPageJsonLd({
          name: "Articles",
          description,
          url: absoluteUrl("/articles"),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Articles", url: absoluteUrl("/articles") },
        ])}
      />

      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Articles
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Writing
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>

      <PostsView initialPage={initialPage} />
    </div>
  );
}
