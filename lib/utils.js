import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
/**
 * Valida si una URL es un enlace válido (http, https o mailto)
 */
export function isValidLink(url) {
  if (!url || typeof url !== "string") return false;

  const trimmedUrl = url.trim();

  // Validación para mailto
  if (trimmedUrl.startsWith("mailto:")) {
    const email = trimmedUrl.slice(7);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validación para http/https
  try {
    const parsedUrl = new URL(trimmedUrl);
    return ["http:", "https:"].includes(parsedUrl.protocol);
  } catch (e) {
    return false;
  }
}
