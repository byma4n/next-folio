/**
 * Static store catalogue.
 *
 * Each item is either `free` (with optional `repoUrl` and
 * `downloadUrl`) or `paid` (with a required `purchaseUrl` such as
 * Lemon Squeezy, Gumroad, Lynk, etc.).
 *
 * The `categories` array lets visitors filter on the `/store` page.
 * Define the taxonomy in `storeCategoriesData` first, then reference
 * the slugs from each item.
 */

import type { StoreCategory, StoreItem } from "@/features/store";

export const storeCategoriesData: readonly StoreCategory[] = [
  {
    id: "cat-source-code",
    slug: "source-code",
    name: "Source Code",
    description: "Repositories, templates, and ready-to-use code.",
  },
  {
    id: "cat-ebook",
    slug: "ebook",
    name: "E-books",
    description: "Long-form reads in PDF or EPUB.",
  },
  {
    id: "cat-design",
    slug: "design",
    name: "Design",
    description: "UI kits, icons, and design assets.",
  },
  {
    id: "cat-tools",
    slug: "tools",
    name: "Tools",
    description: "Small utilities and ready-to-use snippets.",
  },
];

const byCategorySlug = new Map(
  storeCategoriesData.map((c) => [c.slug, c] as const),
);

function categoriesBySlugs(
  slugs: readonly string[],
): readonly StoreCategory[] {
  return slugs
    .map((slug) => byCategorySlug.get(slug))
    .filter((c): c is StoreCategory => c !== undefined);
}

export const storeData: readonly StoreItem[] = [
  {
    id: "nextfolio-template",
    slug: "nextfolio",
    title: "Nextfolio",
    excerpt:
      "The free, open-source template this very site is built on. Fork it, brand it, ship it.",
    body: [
      { kind: "heading", level: 3, text: "What's included" },
      {
        kind: "paragraph",
        text: "A complete portfolio scaffold with profile, projects, articles, store, and contact pages — plus dark mode, SEO metadata, and dynamic OG images.",
      },
      { kind: "heading", level: 3, text: "Use it for" },
      {
        kind: "paragraph",
        text: "Personal portfolios, agency landing pages, or as a teaching example for the App Router.",
      },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    coverWidth: 1200,
    coverHeight: 800,
    previewUrl: "https://example.com",
    categories: categoriesBySlugs(["source-code", "tools"]),
    pricing: "free",
    repoUrl: "https://github.com/your-handle/nextfolio",
    publishedAt: "2026-05-20T00:00:00.000Z",
  },
  {
    id: "ui-snippets",
    slug: "ui-snippets",
    title: "Tailwind UI Snippets",
    excerpt:
      "A growing collection of copy-paste Tailwind components — heroes, footers, dashboards, and more.",
    body: [
      {
        kind: "paragraph",
        text: "Plain HTML with Tailwind classes, no dependencies. Drop them straight into your project.",
      },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=80",
    coverWidth: 1200,
    coverHeight: 900,
    previewUrl: "https://example.com",
    categories: categoriesBySlugs(["source-code", "design", "tools"]),
    pricing: "free",
    repoUrl: "https://github.com/your-handle/tailwind-snippets",
    publishedAt: "2026-04-15T00:00:00.000Z",
  },
  {
    id: "premium-template",
    slug: "premium-template",
    title: "Premium Portfolio Template",
    excerpt:
      "An enhanced version with extra sections, animations, and a built-in admin panel for content edits.",
    body: [
      { kind: "heading", level: 3, text: "Sections" },
      {
        kind: "paragraph",
        text: "Hero, services, case studies, testimonials, pricing, FAQ, contact — every section is optional and themeable.",
      },
      { kind: "heading", level: 3, text: "License" },
      {
        kind: "paragraph",
        text: "Personal use plus one client project. Reach out for multi-client licensing.",
      },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    coverWidth: 1200,
    coverHeight: 750,
    previewUrl: "https://example.com",
    categories: categoriesBySlugs(["source-code"]),
    pricing: "paid",
    purchaseUrl: "https://example.com/checkout",
    priceLabel: "$49",
    publishedAt: "2026-03-22T00:00:00.000Z",
  },
  {
    id: "design-handbook",
    slug: "design-handbook",
    title: "The Pragmatic Design Handbook",
    excerpt:
      "A 70-page e-book on the design choices that pay off in the long run — written for developers, not designers.",
    body: [
      {
        kind: "paragraph",
        text: "Covers spacing, typography, colour, motion, and the small ergonomic decisions that compound over a project's lifetime.",
      },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    coverWidth: 1200,
    coverHeight: 800,
    previewUrl: "https://example.com",
    categories: categoriesBySlugs(["ebook", "design"]),
    pricing: "paid",
    purchaseUrl: "https://example.com/checkout",
    priceLabel: "$19",
    publishedAt: "2026-02-08T00:00:00.000Z",
  },
];
