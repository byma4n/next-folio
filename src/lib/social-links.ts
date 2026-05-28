/**
 * Helpers for building canonical URLs for social-media platforms.
 *
 * Centralised so the format is consistent and we don't repeat the
 * "is it https://www.tiktok.com/@user or tiktok.com/user" guesswork
 * everywhere.
 *
 * Each helper returns `null` when the input is empty so callers can
 * conditionally hide a link instead of producing a broken URL.
 */

import { buildWhatsAppUrl } from "./whatsapp";

function trimAt(handle: string): string {
  return handle.replace(/^@/, "").trim();
}

function nullIfEmpty(value: string): string | null {
  return value.trim() === "" ? null : value;
}

export function facebookUrl(handle: string): string | null {
  const h = trimAt(handle);
  return h ? `https://www.facebook.com/${h}` : null;
}

export function instagramUrl(handle: string): string | null {
  const h = trimAt(handle);
  return h ? `https://www.instagram.com/${h}` : null;
}

export function threadsUrl(handle: string): string | null {
  const h = trimAt(handle);
  return h ? `https://www.threads.net/@${h}` : null;
}

export function tiktokUrl(handle: string): string | null {
  const h = trimAt(handle);
  return h ? `https://www.tiktok.com/@${h}` : null;
}

export function linkedinUrl(handle: string): string | null {
  const h = trimAt(handle);
  return h ? `https://www.linkedin.com/in/${h}` : null;
}

export function githubUrl(handle: string): string | null {
  const h = trimAt(handle);
  return h ? `https://github.com/${h}` : null;
}

export function xUrl(handle: string): string | null {
  const h = trimAt(handle);
  return h ? `https://x.com/${h}` : null;
}

export function mailtoUrl(email: string): string | null {
  return nullIfEmpty(email) ? `mailto:${email.trim()}` : null;
}

export { buildWhatsAppUrl };
