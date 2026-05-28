"use client";

import * as React from "react";

/**
 * Subscribes to a 1-second tick.
 *
 * `useSyncExternalStore` requires `getSnapshot` to return the *same*
 * value while the external state is unchanged. Reading `Date.now()`
 * directly would return a fresh value on every call and trip React's
 * infinite-loop guard, so we cache the value in a module-level store
 * and only refresh it on each tick.
 *
 * A single interval is shared across all subscribers.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let intervalId: ReturnType<typeof setInterval> | null = null;
let cachedNow = 0;

function startIfNeeded() {
  if (intervalId !== null) return;
  cachedNow = Date.now();
  intervalId = setInterval(() => {
    cachedNow = Date.now();
    listeners.forEach((listener) => listener());
  }, 1000);
}

function stopIfIdle() {
  if (intervalId === null) return;
  if (listeners.size > 0) return;
  clearInterval(intervalId);
  intervalId = null;
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  startIfNeeded();
  return () => {
    listeners.delete(listener);
    stopIfIdle();
  };
}

function getSnapshot(): number {
  return cachedNow;
}

function getServerSnapshot(): number {
  return 0;
}

export function useClock(): number {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
