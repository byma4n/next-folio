/**
 * Helpers for building wa.me deep links.
 * Centralised so the format is consistent across the app and easy
 * to test or swap for the WhatsApp Business API later.
 */

/**
 * Normalises a phone number to the digits-only format wa.me expects.
 * Accepts inputs like "+62 812-3456-7890" or "(0812) 3456 7890".
 *
 * - Strips whitespace, dashes, parentheses, plus signs.
 * - Converts a leading "0" to the given country code (defaults to 1, US).
 */
export function normalizePhone(
  input: string,
  defaultCountryCode = "1",
): string {
  const digits = input.replace(/[^\d]/g, "");
  if (digits.startsWith("0")) {
    return `${defaultCountryCode}${digits.slice(1)}`;
  }
  return digits;
}

/**
 * Builds a WhatsApp click-to-chat URL.
 * Returns `null` if the phone number is empty so callers can decide
 * how to render (e.g. hide the button) instead of producing a broken
 * link.
 */
export function buildWhatsAppUrl(
  phone: string,
  message?: string,
): string | null {
  const normalized = normalizePhone(phone);
  if (!normalized) return null;
  const url = new URL(`https://wa.me/${normalized}`);
  if (message) url.searchParams.set("text", message);
  return url.toString();
}
