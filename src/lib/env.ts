/**
 * Typed access to environment variables.
 * Add new vars here so the rest of the codebase never reads
 * `process.env` directly.
 *
 * Throws early on the server if a required variable is missing,
 * which makes misconfiguration loud instead of silent.
 */

const isServer = typeof window === "undefined";

function readServer(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (isServer && value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function readPublic(
  name: `NEXT_PUBLIC_${string}`,
  fallback = "",
): string {
  const value = process.env[name];
  // Treat empty strings as "not set" so callers can rely on the
  // fallback. Otherwise an explicit `KEY=` line in .env behaves
  // differently from a missing line, which is surprising.
  if (value === undefined || value === "") return fallback;
  return value;
}

export const env = {
  nodeEnv: readServer("NODE_ENV", "development") as
    | "development"
    | "production"
    | "test",
  appUrl: readPublic("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  /** WhatsApp number for direct-message buttons. Optional. */
  whatsappNumber: readPublic("NEXT_PUBLIC_WHATSAPP_NUMBER", ""),
  /** Google Search Console verification token. Optional. */
  googleSiteVerification: readPublic(
    "NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION",
    "",
  ),
  /** Yandex Webmaster verification token. Optional. */
  yandexVerification: readPublic("NEXT_PUBLIC_YANDEX_VERIFICATION", ""),
} as const;

export const isDev = env.nodeEnv === "development";
export const isProd = env.nodeEnv === "production";
