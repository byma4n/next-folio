/**
 * Static articles content.
 *
 * Add, remove, or reorder entries here. Slugs must be URL-safe and
 * unique. `publishedAt` drives sort order across the site.
 *
 * Body blocks use a small structured schema (paragraph / heading) so
 * we don't need a markdown parser at runtime. If you want richer
 * content, add a new block kind in `@/features/articles/types` and
 * extend the renderer in `article-body.tsx`.
 */

import type { Article } from "@/features/articles";

export const articlesData: readonly Article[] = [
  {
    id: "a-1",
    slug: "hello-world",
    title: "Hello, world",
    excerpt:
      "An obligatory first post — a quick tour of what this template ships with and how to make it your own.",
    body: [
      { kind: "heading", level: 3, text: "Why a template" },
      {
        kind: "paragraph",
        text: "Most portfolio templates are heavy. They ship a CMS, an auth layer, and three fonts you don't need. This one keeps the surface tight: a few static data files, reusable components, and the things you'd actually edit in week one.",
      },
      { kind: "heading", level: 3, text: "What's inside" },
      {
        kind: "paragraph",
        text: "Profile, projects, articles, store, contact. Each one is a feature folder with a public API, so you can delete entire sections with confidence. The home page composes them; the sidebars compose the latest entries.",
      },
      { kind: "heading", level: 3, text: "Where to start" },
      {
        kind: "paragraph",
        text: "Open `src/data/`. That's where every editable string lives. Save a file, see it on the next page reload. No database, no auth, no migrations.",
      },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-05-20T00:00:00.000Z",
    readingTimeMin: 4,
  },
  {
    id: "a-2",
    slug: "writing-with-static-data",
    title: "Writing with static data",
    excerpt:
      "How structured content modules keep the editing surface small while the rendering surface stays flexible.",
    body: [
      {
        kind: "paragraph",
        text: "Splitting content from rendering is one of those moves that pays off long after you set it up. The data files don't import any React, so the type-checker tells you immediately when a field goes missing.",
      },
      { kind: "heading", level: 3, text: "Adding a new article" },
      {
        kind: "paragraph",
        text: "Append a new entry to `articlesData` in `src/data/articles.ts`. The home page, sidebar, sitemap, and OG image all pick it up. No CMS, no rebuild scripts.",
      },
      { kind: "heading", level: 3, text: "Reading time" },
      {
        kind: "paragraph",
        text: "Reading time is part of the data — set it manually so you can fine-tune. Auto-calculation is a one-liner if you'd rather: round up `body.text.split(/\\s+/).length / 200`.",
      },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-05-04T00:00:00.000Z",
    readingTimeMin: 5,
  },
  {
    id: "a-3",
    slug: "deploy-to-vercel-in-five-minutes",
    title: "Deploy to Vercel in five minutes",
    excerpt:
      "Push to GitHub, import to Vercel, set one environment variable. That's the whole guide.",
    body: [
      { kind: "heading", level: 3, text: "Push and import" },
      {
        kind: "paragraph",
        text: "Create a new GitHub repo from this template, push your edits, and import the repo on vercel.com/new. Vercel detects Next.js automatically; no build settings to tweak.",
      },
      { kind: "heading", level: 3, text: "One environment variable" },
      {
        kind: "paragraph",
        text: "Set `NEXT_PUBLIC_APP_URL` to your production URL. That's how canonical links, sitemap entries, and OG cards know where the site lives.",
      },
      { kind: "heading", level: 3, text: "After deploying" },
      {
        kind: "paragraph",
        text: "Verify ownership in Google Search Console — fill in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and re-deploy. Submit `/sitemap.xml` while you're there.",
      },
    ],
    coverUrl:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
    publishedAt: "2026-04-18T00:00:00.000Z",
    readingTimeMin: 3,
  },
];
