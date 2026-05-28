/** Public types for the `articles` feature. */

/**
 * A single chunk of article body content.
 * Modelled as a discriminated union so renderers can switch
 * exhaustively without parsing markdown at render time.
 */
export type ArticleBlock =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "heading"; readonly level: 2 | 3; readonly text: string };

export type Article = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  /** Short summary shown in lists and as the lede on the detail page. */
  readonly excerpt: string;
  /** Article body as structured blocks. Optional for legacy entries. */
  readonly body?: readonly ArticleBlock[];
  readonly coverUrl: string;
  /** ISO date used for sorting and display. */
  readonly publishedAt: string;
  /** Estimated reading time, in minutes. */
  readonly readingTimeMin?: number;
};

export type ArticlePage = {
  readonly items: readonly Article[];
  /** `null` when no more pages remain. */
  readonly nextCursor: number | null;
};
