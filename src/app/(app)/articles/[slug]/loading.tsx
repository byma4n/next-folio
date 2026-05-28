import { Skeleton } from "@/components/ui/skeleton";

/**
 * Suspense fallback for an article detail page.
 * Mirrors the article layout so the swap is seamless.
 */
export default function ArticleDetailLoading() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <Skeleton className="h-4 w-20" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
