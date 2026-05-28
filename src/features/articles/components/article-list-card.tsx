import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Article } from "../types";

/**
 * Sidebar widget that lists recent articles.
 * Each row links to its article; the card itself has no header link
 * since "Latest Articles" already conveys the scope.
 */
export function ArticleListCard({
  articles,
}: {
  articles: readonly Article[];
}) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Latest Articles</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {articles.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No articles yet.
          </p>
        ) : (
          articles.map((article) => (
            <ArticleRow key={article.id} article={article} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function ArticleRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex items-center gap-3 rounded-md transition-colors"
    >
      <div className="relative size-10 shrink-0 overflow-hidden rounded-md">
        <Image
          src={article.coverUrl}
          alt=""
          aria-hidden
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground group-hover:underline">
          {article.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
