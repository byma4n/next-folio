import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Shown when an article slug doesn't match any entry.
 */
export default function ArticleNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start gap-4 py-16">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">
        Article not found
      </h1>
      <p className="text-muted-foreground">
        The link you followed may be broken or the article may have been
        moved.
      </p>
      <Button asChild>
        <Link href="/articles">
          <ArrowLeft className="size-3.5" aria-hidden />
          Back to Articles
        </Link>
      </Button>
    </div>
  );
}
