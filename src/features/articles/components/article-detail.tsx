import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Article } from "../types";
import { formatRelative } from "../lib/format-relative";
import { ArticleBody } from "./article-body";

/**
 * Author info needed to render the byline.
 * Kept as a plain shape so the page can pass it from any source —
 * usually the `profile` feature.
 */
export type ArticleAuthor = {
  readonly name: string;
  readonly handle: string;
  readonly avatarUrl: string;
};

/**
 * Full-page article detail view.
 */
export function ArticleDetail({
  article,
  author,
}: {
  article: Article;
  author?: ArticleAuthor;
}) {
  return (
    <article className="flex flex-col gap-8">
      <BackButton />
      <ArticleCover article={article} />
      <ArticleHeadline article={article} />
      {author && <ArticleByline author={author} article={article} />}
      <ArticleBody blocks={article.body} />
    </article>
  );
}

function BackButton() {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="-ml-2 w-fit rounded-full"
    >
      <Link href="/">
        <ArrowLeft className="size-3.5" aria-hidden />
        Back
      </Link>
    </Button>
  );
}

function ArticleCover({ article }: { article: Article }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted">
      <Image
        src={article.coverUrl}
        alt={article.title}
        fill
        priority
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover"
      />
    </div>
  );
}

function ArticleHeadline({ article }: { article: Article }) {
  return (
    <header className="flex flex-col gap-3 sm:gap-4">
      <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {article.title}
      </h1>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {article.excerpt}
      </p>
    </header>
  );
}

function ArticleByline({
  author,
  article,
}: {
  author: ArticleAuthor;
  article: Article;
}) {
  return (
    <div className="flex items-center gap-3 border-y border-border/60 py-4">
      <Link
        href="/profile"
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <span className="relative size-9 overflow-hidden rounded-full bg-muted">
          <Image
            src={author.avatarUrl}
            alt={author.handle}
            fill
            sizes="36px"
            className="object-cover"
          />
        </span>
        <span className="text-sm font-medium text-foreground">
          @{author.handle}
        </span>
      </Link>
      <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
        {article.readingTimeMin && (
          <span>{article.readingTimeMin} min read</span>
        )}
        <span aria-hidden>·</span>
        <time dateTime={article.publishedAt}>
          {formatRelative(article.publishedAt)}
        </time>
      </div>
    </div>
  );
}
