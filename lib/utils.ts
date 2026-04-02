export function normalizeName(name: string) {
  return name.replaceAll("-", " ").toLowerCase();
}

export function nameAsId(name: string) {
  return name.replaceAll(" ", "-").toLowerCase();
}
