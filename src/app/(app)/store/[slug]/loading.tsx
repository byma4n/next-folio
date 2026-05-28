import { Skeleton } from "@/components/ui/skeleton";

export default function StoreItemLoading() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Skeleton className="h-16 rounded-xl" />
        <Skeleton className="h-16 rounded-xl" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
