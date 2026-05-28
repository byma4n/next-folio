import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton mirroring the masonry grid for in-page loading states.
 */
export function StoreGridSkeleton({ count = 6 }: { count?: number }) {
  const aspects = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square"];
  return (
    <div className="columns-1 gap-5 sm:columns-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="mb-5 break-inside-avoid">
          <Skeleton
            className={`w-full ${aspects[idx % aspects.length]} rounded-xl`}
          />
        </div>
      ))}
    </div>
  );
}
