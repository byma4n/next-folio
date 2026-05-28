import { jsonLdToString } from "@/lib/seo";

/**
 * Embeds a JSON-LD payload as a `<script type="application/ld+json">`
 * tag. Server Component — no client JavaScript shipped.
 *
 * The payload is sanitised via `jsonLdToString` to escape any `<`
 * characters that could break out of the script context.
 *
 * Use one instance per schema entity (Person, Article, Product, …).
 * Multiple instances on the same page are valid — search engines
 * merge them into the page's structured-data graph.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdToString(data) }}
    />
  );
}
