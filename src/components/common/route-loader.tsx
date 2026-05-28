import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

/**
 * Suspense fallback used by `app/loading.tsx` and route segments.
 *
 * Routes can opt into a more specific skeleton by adding their own
 * `loading.tsx`. Anything that doesn't gets this minimal loader.
 */
export function RouteLoader({
  label = "Loading…",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex min-h-[60vh] items-center justify-center",
        className,
      )}
    >
      <Spinner aria-label={label} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
