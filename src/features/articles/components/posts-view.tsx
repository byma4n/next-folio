"use client";

import * as React from "react";

import { Spinner } from "@/components/ui/spinner";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

import { loadArticlesAction } from "../server/articles.actions";
import type { Article, ArticlePage } from "../types";
import { ARTICLES_PAGE_SIZE } from "../lib/constants";
import { ArticleListItem } from "./article-list-item";

/**
 * Infinite-scrolling article feed.
 *
 * Receives the first page from the server for an SSR-friendly
 * initial paint; subsequent pages come from the `loadArticlesAction`
 * Server Action when the sentinel scrolls into view.
 */
export function PostsView({ initialPage }: { initialPage: ArticlePage }) {
  const { items, nextCursor, status, loadMore } = useArticleFeed(initialPage);

  const [sentinelRef, sentinelVisible] = useIntersectionObserver({
    rootMargin: "200px 0px",
  });

  React.useEffect(() => {
    if (sentinelVisible && status === "idle" && nextCursor !== null) {
      loadMore();
    }
  }, [sentinelVisible, status, nextCursor, loadMore]);

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No posts yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {items.map((article, index) => (
        <ArticleListItem
          key={article.id}
          article={article}
          priority={index === 0}
        />
      ))}

      {nextCursor !== null && (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {status === "loading-more" ? (
            <Spinner aria-label="Loading more posts" />
          ) : (
            <span className="sr-only">Loading more posts…</span>
          )}
        </div>
      )}

      {nextCursor === null && items.length > ARTICLES_PAGE_SIZE && (
        <p className="py-2 text-center text-xs text-muted-foreground">
          You&apos;ve reached the end.
        </p>
      )}
    </div>
  );
}

type FeedStatus = "idle" | "loading-more";

function useArticleFeed(initialPage: ArticlePage) {
  const [items, setItems] = React.useState<readonly Article[]>(
    initialPage.items,
  );
  const [nextCursor, setNextCursor] = React.useState<number | null>(
    initialPage.nextCursor,
  );
  const [status, setStatus] = React.useState<FeedStatus>("idle");

  const loadMore = React.useCallback(async () => {
    if (status !== "idle" || nextCursor === null) return;
    setStatus("loading-more");
    try {
      const page = await loadArticlesAction({
        cursor: nextCursor,
        limit: ARTICLES_PAGE_SIZE,
      });
      setItems((prev) => [...prev, ...page.items]);
      setNextCursor(page.nextCursor);
    } finally {
      setStatus("idle");
    }
  }, [nextCursor, status]);

  return { items, nextCursor, status, loadMore };
}
