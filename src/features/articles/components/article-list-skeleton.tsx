import { Skeleton } from "@/components/ui/skeleton";

/**
 * Placeholder used while paginated article data is loading.
 */
export function ArticleListItemSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function ArticleListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-10">
      {Array.from({ length: count }).map((_, idx) => (
        <ArticleListItemSkeleton key={idx} />
      ))}
    </div>
  );
}
