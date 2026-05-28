"use server";

import type { ArticlePage } from "../types";
import { loadArticles } from "./articles.repository";

/**
 * Server Action wrapper around `loadArticles`.
 * Lets client components fetch additional pages without exposing
 * data-access concerns to the browser bundle.
 */
export async function loadArticlesAction(args: {
  cursor?: number;
  limit?: number;
}): Promise<ArticlePage> {
  return loadArticles(args);
}
