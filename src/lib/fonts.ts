/**
 * Centralised font configuration.
 * Keeps `next/font` setup out of layout files so they stay focused
 * on structure and rendering.
 */

import { Geist, Geist_Mono, Inter } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontGeistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const fontGeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Variables to spread on `<html>` for global font availability. */
export const fontVariables = [
  fontSans.variable,
  fontGeistSans.variable,
  fontGeistMono.variable,
].join(" ");
