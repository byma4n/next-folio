# Nextfolio

An open-source Next.js portfolio template — no backend, no database, no auth. Just static data files, reusable components, and a clean architecture you can grow into.

## Preview

![Nextfolio preview](https://iodrtdxpbsawbfjieaiy.supabase.co/storage/v1/object/public/assets/b1868fd5-e8fe-40ec-95d6-fee4cfa4b2d3.png)

## Features

- **Next.js 16** with the App Router and React Compiler enabled.
- **React 19** + **TypeScript 5** in strict mode.
- **Tailwind CSS v4** with OKLCH theming and dark mode out of the box.
- **shadcn/ui** primitives (50+ components) under `src/components/ui/`.
- **Feature-sliced architecture** — `profile`, `articles`, `projects`, `store`, each with a public API and no cross-feature imports.
- **Three-column app shell** (left sidebar, content, right sidebar) that collapses to a mobile bottom nav.
- **Profile** page with cover, bio, skills marquee, experience timeline, and social links.
- **Articles** with infinite scroll, dynamic OG images, and per-article structured data (BlogPosting JSON-LD).
- **Projects** masonry grid with open-source/private filters and search.
- **Store** with categories, free/paid filtering, and per-item Product JSON-LD.
- **Contact** page that surfaces WhatsApp, email, and every social channel you've configured.
- **SEO** essentials: dynamic sitemap, robots, manifest, canonical URLs, breadcrumbs, OpenGraph, Twitter cards.
- **Theme switcher** (System / Light / Dark) wired to `next-themes`.
- **Lucide icons** for general UI plus **Font Awesome** brand icons (GitHub, X, LinkedIn, Instagram, Facebook, Threads, TikTok, WhatsApp).
- **No backend** — everything reads from `src/data/*.ts` modules.

## Tech stack

| Layer       | Choice                                                                 |
|-------------|------------------------------------------------------------------------|
| Framework   | [Next.js 16](https://nextjs.org)                                        |
| Language    | [TypeScript 5](https://www.typescriptlang.org/)                         |
| Runtime     | [React 19](https://react.dev) with the React Compiler                   |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com)                              |
| UI kit      | [shadcn/ui](https://ui.shadcn.com) + [@base-ui/react](https://base-ui.com) |
| Icons       | [Lucide](https://lucide.dev) + [Font Awesome](https://fontawesome.com)  |
| Theme       | [next-themes](https://github.com/pacocoursey/next-themes)               |
| Dates       | [date-fns](https://date-fns.org)                                        |

## Getting started

Requirements: Node.js ≥ 18 and npm (or pnpm / yarn / bun).

```bash
git clone https://github.com/your-handle/nextfolio.git
cd nextfolio
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're up.

## Editing your content

Every editable string lives in two places:

### 1. `src/config/site.ts` — site-wide identity

- `name`, `shortName`, `description`, `keywords`
- `author.name`, `author.handle`, `author.role`
- `contact.whatsapp`, `contact.socials.*` (set to empty string to hide)
- `verification.*` (Search Console, Yandex)

### 2. `src/data/*.ts` — page content

| File                 | Powers                                       |
|----------------------|----------------------------------------------|
| `profile.ts`         | `/` and `/profile` — bio, skills, experience |
| `articles.ts`        | `/articles` and `/articles/[slug]`           |
| `projects.ts`        | `/projects`                                  |
| `store.ts`           | `/store` and `/store/[slug]`                 |

Each file is plain TypeScript. The types live in the matching feature folder (`src/features/<name>/types.ts`), so the editor catches missing fields as you type.

To add a new article, append a new entry to `articlesData`:

```ts
{
  id: "a-4",
  slug: "my-new-post",
  title: "My new post",
  excerpt: "One-line summary.",
  body: [
    { kind: "heading", level: 3, text: "First heading" },
    { kind: "paragraph", text: "First paragraph." },
  ],
  coverUrl: "https://...",
  publishedAt: "2026-06-01T00:00:00.000Z",
  readingTimeMin: 4,
}
```

The home page, sidebar, sitemap, and OG image route pick it up automatically.

## Project structure

```
src/
├── app/                 # Routing only (App Router)
│   ├── (app)/           # Route group sharing the AppShell layout
│   │   ├── page.tsx     # Home
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── articles/
│   │   ├── store/
│   │   └── contact/
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── common/          # Cross-feature presentational pieces
│   ├── layout/          # SidebarNav, MobileBottomNav, etc.
│   └── ui/              # shadcn primitives (don't put domain logic here)
├── config/              # site.ts, nav.ts
├── data/                # Editable static content
├── features/            # Feature folders, each exposing a public API via index.ts
│   ├── articles/
│   ├── profile/
│   ├── projects/
│   └── store/
├── hooks/
├── lib/                 # Framework-agnostic helpers (no React)
├── providers/           # All client providers compose into AppProviders
├── types/
└── widgets/             # Compose multiple features (e.g. AppShell)
```

The architectural rules in `AGENTS.md` are worth a read if you plan to extend the structure.

## Customising the theme

Tokens live in `src/app/globals.css` under the `:root` and `.dark` blocks. They use OKLCH so colour transitions stay perceptually even — bump the `--primary` lightness and the rest of the palette still feels balanced.

Fonts come from `next/font` in `src/lib/fonts.ts`. The default stack is Inter (sans), Geist (display), and Geist Mono (code). Swap any of them by updating the imports — they're mounted as CSS variables, so usage doesn't need to change.

## Running the project

```bash
npm run dev      # Dev server with hot reload
npm run build    # Production build
npm start        # Serve the production build
npm run lint     # ESLint
```

## Deploying to Vercel

The fastest path:

1. Push your fork to GitHub.
2. Visit [vercel.com/new](https://vercel.com/new) and import the repo.
3. Set `NEXT_PUBLIC_APP_URL` to your production URL (e.g. `https://yourname.dev`). Other env vars are optional.
4. Click **Deploy**.

Vercel detects Next.js automatically — no build settings to tweak.

After deploying, head to Search Console, verify ownership, and submit `/sitemap.xml` so the content gets indexed.

## Environment variables

All variables are public and prefixed with `NEXT_PUBLIC_`. Anything else has no place in this project.

| Variable                                  | Required | Purpose                                       |
|-------------------------------------------|:--------:|-----------------------------------------------|
| `NEXT_PUBLIC_APP_URL`                     | recommended | Canonical/OG/sitemap base URL              |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`             | optional | Show a WhatsApp contact button                |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`    | optional | Google Search Console meta tag                |
| `NEXT_PUBLIC_YANDEX_VERIFICATION`         | optional | Yandex Webmaster meta tag                     |

## Pre-publish checklist

Before shipping Nextfolio as your portfolio (or a fork as your own template):

- [ ] Replace **every** placeholder name and handle in `src/config/site.ts`.
- [ ] Update content in `src/data/profile.ts`, `articles.ts`, `projects.ts`, `store.ts`.
- [ ] Swap placeholder Unsplash covers for your own images. Add new hosts to `next.config.ts > images.remotePatterns` or drop files into `public/`.
- [ ] Replace `src/app/favicon.ico` with your favicon.
- [ ] Set `NEXT_PUBLIC_APP_URL` in production.
- [ ] Update the `LICENSE` copyright line if you're republishing under your own name.
- [ ] Update repository links in the README (the GitHub URL above and any `your-handle/...` links inside `src/data/*`).
- [ ] Verify there's nothing private in `.env.local` — it's git-ignored, but double-check before pushing.
- [ ] Run `npm run build` locally — a green build is a green deploy.

## License

[MIT](./LICENSE) — use it for personal, client, or commercial work.
