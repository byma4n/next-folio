"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { isDev } from "@/lib/env";

/**
 * Root error boundary.
 * Per Next.js convention, error files must be Client Components.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Hook a real reporter (Sentry, Datadog, etc.) here later.
    if (isDev) console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="text-muted-foreground">
        An unexpected error occurred. You can try again.
      </p>
      {isDev && (
        <pre className="w-full overflow-auto rounded-md border border-border/60 bg-muted/40 p-3 text-xs">
          {error.message}
        </pre>
      )}
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
