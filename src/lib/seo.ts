/**
 * SEO helpers.
 *
 * Pure, framework-agnostic helpers for building canonical URLs,
 * sanitising JSON-LD payloads, and assembling the structured-data
 * objects we surface across the site.
 *
 * Per the architecture rules, this lives in `lib/` and stays free of
 * React. Components consume the values returned here.
 */

import { siteConfig } from "@/config/site";

/**
 * Builds an absolute URL by joining `pathname` to `siteConfig.url`.
 * Always normalises to a single leading slash and strips any trailing
 * slash on the base, so the result is consistent across environments.
 */
export function absoluteUrl(pathname: string = "/"): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path === "/" ? `${base}/` : `${base}${path}`;
}

/**
 * Sanitises a JSON-LD payload for safe injection inside a `<script>`
 * tag. Replaces `<` with its unicode escape so attackers can't break
 * out of the script context with `</script>` even if data is dirty.
 *
 * See https://nextjs.org/docs/app/guides/json-ld
 */
export function jsonLdToString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// ---------------------------------------------------------------------------
// Structured-data factories
// ---------------------------------------------------------------------------

type JsonObject = Record<string, unknown>;

/**
 * Person schema describing the site owner.
 * Embedded once on the home page and the profile page.
 */
export function personJsonLd(args?: {
  socialUrls?: readonly string[];
}): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    alternateName: siteConfig.author.handle,
    url: siteConfig.url,
    jobTitle: siteConfig.author.role,
    sameAs: args?.socialUrls ?? [],
  };
}

/**
 * WebSite schema with a `SearchAction` so search engines can offer a
 * site-search box in their results.
 */
export function webSiteJsonLd(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url.replace(/\/+$/, "")}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Article schema. `BlogPosting` is more specific than `Article` and
 * is what Google prefers for editorial content.
 */
export function articleJsonLd(args: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  authorName: string;
  authorUrl: string;
}): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: args.title,
    description: args.description,
    image: [args.imageUrl],
    datePublished: args.publishedAt,
    dateModified: args.publishedAt,
    author: {
      "@type": "Person",
      name: args.authorName,
      url: args.authorUrl,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": args.url,
    },
    inLanguage: siteConfig.locale,
  };
}

/**
 * Product schema for store items.
 */
export function productJsonLd(args: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  pricing: "free" | "paid";
  priceAmount?: number;
  priceLabel?: string;
  currency?: string;
  purchaseUrl?: string;
}): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.title,
    description: args.description,
    image: [args.imageUrl],
    url: args.url,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: args.purchaseUrl ?? args.url,
      priceCurrency: args.currency ?? "USD",
      price:
        args.pricing === "free"
          ? "0"
          : (args.priceAmount?.toString() ??
            args.priceLabel?.replace(/[^\d]/g, "") ??
            "0"),
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * Breadcrumb schema. Pass an ordered list from root to current page.
 */
export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; url: string }>,
): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * CollectionPage schema for index-style pages (Projects, Store).
 */
export function collectionPageJsonLd(args: {
  name: string;
  description: string;
  url: string;
}): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: siteConfig.locale,
  };
}
