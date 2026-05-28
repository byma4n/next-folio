import { RouteLoader } from "@/components/common/route-loader";

/**
 * Global loading fallback rendered by Suspense at the root segment.
 *
 * Routes can opt into a more specific skeleton by adding their own
 * `loading.tsx`. Anything that doesn't gets this minimal loader.
 */
export default function Loading() {
  return <RouteLoader />;
}
