"use client";

import * as React from "react";

/**
 * Returns `true` once the component has mounted on the client.
 * Useful for client-only UI that must avoid hydration mismatches.
 *
 * Implemented with `useSyncExternalStore` so it stays compatible
 * with the React Compiler and avoids "setState in effect" warnings.
 */
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
