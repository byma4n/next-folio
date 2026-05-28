"use client";

import * as React from "react";

import { ThemeProvider } from "./theme-provider";

/**
 * Composes every client provider in one place.
 * Mount once in the root layout. New providers are added here so the
 * provider tree never leaks into route files.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
