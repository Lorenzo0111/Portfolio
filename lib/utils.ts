export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/[\s-]+/g, " ")
    .toLowerCase();
}

export function nameAsId(name: string) {
  return encodeURIComponent(normalizeName(name).replace(/ /g, "-"));
}
