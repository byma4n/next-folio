## Where to start when editing

- Site identity: `src/config/site.ts`
- Page content: `src/data/*.ts`
- Navigation: `src/config/nav.ts`
- Theme tokens: `src/app/globals.css`

## Architecture rules

See `AGENTS.md`. The short version:

- `src/app/` is routing only.
- `src/features/<name>/` exposes a public API via `index.ts`. Never import a feature's internals from outside the folder.
- Features must not import other features. Compose features inside `src/widgets/<name>/` or in route files under `src/app/`.
- `src/lib/` is framework-agnostic. No React.
- Only `src/lib/env.ts` reads `process.env`.
- All static content lives in `src/data/` as plain TypeScript modules.
