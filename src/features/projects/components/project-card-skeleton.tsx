import { Skeleton } from "@/components/ui/skeleton";

/**
 * Placeholder shown while a project card is loading.
 */
export function ProjectCardSkeleton({
  aspect = "aspect-[4/3]",
}: {
  aspect?: string;
}) {
  return <Skeleton className={`w-full ${aspect} rounded-xl`} />;
}

/**
 * Grid of skeleton cards. Aspects are mixed so the skeleton hints at
 * the masonry layout users will see once content loads.
 */
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  const aspects = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square"];
  return (
    <div className="columns-1 gap-5 sm:columns-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="mb-5 break-inside-avoid">
          <ProjectCardSkeleton aspect={aspects[idx % aspects.length]} />
        </div>
      ))}
    </div>
  );
}
