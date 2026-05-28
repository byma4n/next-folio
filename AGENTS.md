<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture

Key invariants:

- `src/app/` contains routing only. No business logic in route files.
- Each feature lives in `src/features/<name>/` and exposes a public API via
  `index.ts`. Other code must import only from that barrel.
- Features must not import from other features. To combine many features
  into a single composed block of UI, create a widget under
  `src/widgets/<name>/`. Widgets and `app/` are the only places allowed
  to import from more than one feature.
- `src/components/ui/` is shadcn primitives only — presentational, no
  domain logic.
- `src/lib/` is framework-agnostic. No React components there.
- All client providers compose into `<AppProviders />` in `src/providers/`
  and mount once in the root layout.
- Only `src/lib/env.ts` reads `process.env`.
- All static content lives in `src/data/` as plain TypeScript modules.

When unsure where something belongs, prefer the most local layer first
(feature → shared → lib).
