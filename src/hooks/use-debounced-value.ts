"use client";

import * as React from "react";

/**
 * Returns a value that lags `delay` ms behind its source.
 * Useful for debouncing fast-changing inputs (search box, slider)
 * before triggering side effects.
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
