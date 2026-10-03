export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/[\s-]+/g, " ")
    .toLowerCase();
}

export function nameAsId(name: string) {
  return encodeURIComponent(normalizeName(name).replace(/ /g, "-"));
}

/**
 * Only allow same-origin relative paths as post-login redirect targets.
 */
export function safeRedirectPath(value: string | null | undefined) {
  if (!value || !value.startsWith("/")) return "/";
  if (value.startsWith("//") || value.includes("\\")) return "/";
  return value;
}
