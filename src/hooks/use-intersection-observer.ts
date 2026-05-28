"use client";

import * as React from "react";

/**
 * Watches a target element and reports whether it is intersecting
 * the viewport.
 *
 * Returns a ref to attach and the latest `isIntersecting` flag.
 * Disconnects automatically on unmount.
 *
 * The options object is serialised so that callers can pass an
 * inline literal (`{ rootMargin: "200px" }`) without triggering a
 * re-observe on every render.
 */
export function useIntersectionObserver(
  options?: IntersectionObserverInit,
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIntersecting] = React.useState(false);

  const optionsKey = JSON.stringify({
    rootMargin: options?.rootMargin,
    threshold: options?.threshold,
  });

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const parsed = JSON.parse(optionsKey) as IntersectionObserverInit;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, parsed);

    observer.observe(node);
    return () => observer.disconnect();
  }, [optionsKey]);

  return [ref, isIntersecting];
}
