/**
 * Helpers for building dynamic OG images.
 *
 * Lives in `lib/` per the architecture rules: no React, no framework
 * coupling — just utilities to fetch external images and turn them
 * into data URLs that Satori can embed.
 *
 * Why data URLs instead of letting Satori fetch the URL directly?
 *   - Satori's image fetch is fire-and-forget; if it fails, we get a
 *     broken image without an obvious error.
 *   - Pre-fetching lets us fall back gracefully (return null and let
 *     the template render its gradient background only).
 *   - We can short-circuit on bad URLs before invoking ImageResponse.
 */

/**
 * Fetches an image and returns it as a `data:` URL. Returns `null`
 * on any failure (network, non-2xx, oversized payload) so the caller
 * can decide how to render without the cover.
 *
 * The `maxBytes` cap defends the OG image bundle's 500KB limit — a
 * single oversized cover would blow it. We accept up to 800KB raw
 * before declining, since base64-encoding inflates by ~33%.
 */
export async function fetchImageAsDataUrl(
  url: string,
  options: { timeoutMs?: number; maxBytes?: number } = {},
): Promise<string | null> {
  const timeoutMs = options.timeoutMs ?? 5000;
  const maxBytes = options.maxBytes ?? 800_000;

  if (!url || !/^https?:\/\//i.test(url)) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "nextfolio-og/1.0" },
    });
    if (!response.ok) return null;

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > maxBytes) return null;

    const contentType =
      response.headers.get("content-type")?.split(";")[0]?.trim() ||
      sniffMime(buffer) ||
      "image/jpeg";

    const base64 = arrayBufferToBase64(buffer);
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function sniffMime(buffer: ArrayBuffer): string | null {
  const view = new Uint8Array(buffer.slice(0, 12));
  if (
    view[0] === 0x89 &&
    view[1] === 0x50 &&
    view[2] === 0x4e &&
    view[3] === 0x47
  ) {
    return "image/png";
  }
  if (view[0] === 0xff && view[1] === 0xd8 && view[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    view[0] === 0x47 &&
    view[1] === 0x49 &&
    view[2] === 0x46 &&
    view[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    view[0] === 0x52 &&
    view[1] === 0x49 &&
    view[2] === 0x46 &&
    view[3] === 0x46 &&
    view[8] === 0x57 &&
    view[9] === 0x45 &&
    view[10] === 0x42 &&
    view[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return Buffer.from(buffer).toString("base64");
}

/**
 * Coerces an Unsplash URL down to a smaller, cheaper variant suitable
 * for OG generation. Other hosts pass through unchanged.
 */
export function compressForOg(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("unsplash.com")) {
      u.searchParams.set("w", "1200");
      u.searchParams.set("q", "70");
      u.searchParams.set("fit", "crop");
      u.searchParams.set("auto", "format");
    }
    return u.toString();
  } catch {
    return url;
  }
}
