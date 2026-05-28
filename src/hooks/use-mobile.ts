"use client";

import * as React from "react";

import { BREAKPOINTS } from "@/lib/constants";

/**
 * Returns `true` when the viewport is below the mobile breakpoint.
 * SSR-safe via `useSyncExternalStore`: returns `false` on the server.
 */
const QUERY = `(max-width: ${BREAKPOINTS.mobile - 1}px)`;

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsMobile(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
