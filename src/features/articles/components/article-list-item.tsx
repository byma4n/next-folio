import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";

import type { Article } from "../types";
import { formatPublished } from "../lib/format-published";

/**
 * One article preview as it appears in the home feed.
 *
 * The `priority` prop should be set on the first item in the feed so
 * its cover is treated as the LCP candidate — Next.js then loads it
 * eagerly with `fetchpriority="high"` instead of lazy by default.
 */
export function ArticleListItem({
  article,
  priority = false,
}: {
  article: Article;
  priority?: boolean;
}) {
  const href = `/articles/${article.slug}`;
  const published = formatPublished(article.publishedAt, siteConfig.locale);

  return (
    <article className="flex flex-col gap-3">
      <Link
        href={href}
        className="group block overflow-hidden rounded-xl bg-muted"
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={article.coverUrl}
            alt={`Cover image: ${article.title}`}
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <header className="flex flex-col gap-1.5">
        <p className="text-xs text-muted-foreground">
          {published}
          {article.readingTimeMin
            ? ` · ${article.readingTimeMin} min read`
            : null}
        </p>
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          <Link href={href} className="hover:underline">
            {article.title}
          </Link>
        </h3>
      </header>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>

      <Link
        href={href}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-sky-500 transition-colors hover:text-sky-400"
      >
        Read more
        <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </article>
  );
}
