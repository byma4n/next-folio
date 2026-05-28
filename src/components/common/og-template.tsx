/**
 * OG image presentation template.
 *
 * Used by the per-route `opengraph-image.tsx` files. Pure
 * presentation — no domain logic, no React state, just JSX shaped
 * for Satori.
 *
 * Constraints worth remembering when editing:
 *   - Satori only supports flexbox; no `display: grid`.
 *   - Every parent of multiple children must explicitly set
 *     `display: flex`.
 *   - Background images via CSS `background-image: url(...)` aren't
 *     supported; use an absolutely-positioned `<img>` instead.
 *   - The bundle (JSX + assets) must stay under 500KB.
 *
 * Dimensions are baked to the OG/Twitter recommended 1200×630.
 */

import { siteConfig } from "@/config/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export type OgTemplateProps = {
  title: string;
  coverDataUrl?: string | null;
  eyebrow?: string;
  meta?: string;
};

export function OgTemplate({
  title,
  coverDataUrl,
  eyebrow,
  meta,
}: OgTemplateProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 60%, #0ea5e9 200%)",
        color: "#fafafa",
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        overflow: "hidden",
      }}
    >
      {coverDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- this template renders inside Satori, not the browser DOM
        <img
          src={coverDataUrl}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: 28,
          color: "#e5e5e5",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "9999px",
            background: "#0ea5e9",
            display: "block",
          }}
        />
        {siteConfig.shortName}
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "1000px",
        }}
      >
        {eyebrow ? (
          <div
            style={{
              fontSize: 24,
              color: "#7dd3fc",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div
          style={{
            fontSize: pickTitleSize(title),
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            display: "flex",
          }}
        >
          {title}
        </div>

        {meta ? (
          <div style={{ fontSize: 22, color: "#d4d4d8" }}>{meta}</div>
        ) : null}
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#a1a1aa",
        }}
      >
        <span>{stripScheme(siteConfig.url)}</span>
        <span>@{siteConfig.author.handle}</span>
      </div>
    </div>
  );
}

function pickTitleSize(title: string): number {
  const len = title.length;
  if (len < 30) return 92;
  if (len < 60) return 76;
  if (len < 90) return 64;
  return 54;
}

function stripScheme(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}
